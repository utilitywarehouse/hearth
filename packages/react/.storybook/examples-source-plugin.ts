/**
 * Vite plugin that processes *.examples.tsx files and injects a __source string
 * onto each exported function component at build time.
 *
 * This lets DocExample display the original JSX source code without any
 * manual duplication — authors write the example function once and both the
 * rendered preview and the syntax-highlighted code block come from the same source.
 *
 * The plugin:
 *   1. Detects *.examples.tsx files
 *   2. Parses them with the TypeScript compiler API (already a project dep)
 *   3. Finds every exported function/arrow-function component
 *   4. Extracts the JSX from its return statement as a dedented string
 *   5. Appends Object.assign(FnName, { __source: "..." }) to the module output
 *
 * enforce: 'pre' ensures the transform runs before @vitejs/plugin-react
 * converts JSX to React.createElement calls, so we capture raw JSX strings.
 */

import type { Plugin } from 'vite';
import ts from 'typescript';
import path from 'path';

export function examplesSourcePlugin(): Plugin {
  return {
    name: 'hearth-examples-source',
    enforce: 'pre',

    transform(code: string, id: string): { code: string; map: null } | null {
      if (!id.endsWith('.examples.tsx')) return null;

      const sourceFile = ts.createSourceFile(
        path.basename(id),
        code,
        ts.ScriptTarget.Latest,
        /* setParentNodes */ true,
        ts.ScriptKind.TSX
      );

      const injections: string[] = [];

      for (const statement of sourceFile.statements) {
        const injection = processStatement(statement, code, sourceFile);
        if (injection) injections.push(injection);
      }

      if (injections.length === 0) return null;

      return {
        code: `${code}\n\n// __source injected by hearth-examples-source plugin\n${injections.join('\n')}`,
        map: null,
      };
    },
  };
}

// ─── Statement handlers ───────────────────────────────────────────────────────

function processStatement(
  node: ts.Statement,
  source: string,
  sourceFile: ts.SourceFile
): string | null {
  // export function Name() { return (<JSX />) }
  if (ts.isFunctionDeclaration(node) && node.name && isExported(node)) {
    const jsx = getBlockJsx(node.body, source, sourceFile);
    if (jsx) {
      return `Object.assign(${node.name.text}, { __source: ${JSON.stringify(jsx)} });`;
    }
  }

  // export const Name = () => ... or export const Name = function() { ... }
  if (ts.isVariableStatement(node) && isExported(node)) {
    const parts: string[] = [];
    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
      const name = decl.name.text;
      const jsx =
        ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer)
          ? getFunctionJsx(decl.initializer, source, sourceFile)
          : null;
      if (jsx) parts.push(`Object.assign(${name}, { __source: ${JSON.stringify(jsx)} });`);
    }
    return parts.join('\n') || null;
  }

  return null;
}

// ─── JSX extraction ───────────────────────────────────────────────────────────

function getFunctionJsx(
  fn: ts.ArrowFunction | ts.FunctionExpression,
  source: string,
  sourceFile: ts.SourceFile
): string | null {
  // Arrow with expression body: () => <JSX />  or  () => (<JSX />)
  if (ts.isArrowFunction(fn) && !ts.isBlock(fn.body)) {
    return extractJsxText(fn.body, source, sourceFile);
  }
  return getBlockJsx(fn.body as ts.Block, source, sourceFile);
}

function getBlockJsx(
  block: ts.Block | undefined,
  source: string,
  sourceFile: ts.SourceFile
): string | null {
  if (!block) return null;
  for (const stmt of block.statements) {
    if (ts.isReturnStatement(stmt) && stmt.expression) {
      return extractJsxText(stmt.expression, source, sourceFile);
    }
  }
  return null;
}

function extractJsxText(
  node: ts.Expression,
  source: string,
  sourceFile: ts.SourceFile
): string | null {
  const inner = ts.isParenthesizedExpression(node) ? node.expression : node;
  if (
    !ts.isJsxElement(inner) &&
    !ts.isJsxSelfClosingElement(inner) &&
    !ts.isJsxFragment(inner)
  ) {
    return null;
  }
  const raw = source.slice(inner.getStart(sourceFile), inner.getEnd());
  return dedent(raw);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isExported(node: ts.Node): boolean {
  return !!(
    ts.canHaveModifiers(node) &&
    ts.getModifiers(node)?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)
  );
}

/**
 * Strips common leading whitespace from a multi-line string so that the
 * extracted JSX starts at column 0 regardless of its indentation in the file.
 */
function dedent(str: string): string {
  const lines = str.split('\n');
  const minIndent = Math.min(
    ...lines
      .filter(l => l.trim().length > 0)
      .map(l => (l.match(/^(\s*)/) ?? ['', ''])[1].length)
  );
  return lines.map(l => l.slice(minIndent)).join('\n');
}
