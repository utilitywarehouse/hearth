import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';
import type { File } from '@babel/types';

/**
 * Parse a JS/TS/JSX/TSX source string into a Babel AST, tolerant of the syntax
 * mix found across the org (decorators, flow-free TS, JSX everywhere).
 * Returns null if the file can't be parsed (we skip it rather than crash a run).
 */
export function parseModule(code: string): File | null {
  try {
    return parse(code, {
      sourceType: 'unambiguous',
      allowReturnOutsideFunction: true,
      errorRecovery: true,
      plugins: [
        'typescript',
        'jsx',
        'decorators-legacy',
        'classProperties',
        'importAttributes',
        'explicitResourceManagement',
      ],
    });
  } catch {
    return null;
  }
}

/**
 * Collect every named export from a module AST — covers `export { A } from`,
 * `export { default as color }`, `export * as ns`, and `export type { T }`.
 * Default and bare `export *` (re-export all) are ignored since they carry no
 * enumerable symbol name.
 */
export function collectNamedExports(ast: File): string[] {
  const names = new Set<string>();
  for (const node of ast.program.body) {
    if (node.type === 'ExportNamedDeclaration') {
      for (const spec of node.specifiers) {
        // Covers ExportSpecifier and ExportNamespaceSpecifier (`export * as ns`).
        const exported = spec.exported;
        const name = exported.type === 'Identifier' ? exported.name : exported.value;
        if (name && name !== 'default') names.add(name);
      }
      // e.g. `export const foo = …` / `export function Bar() {}`
      const decl = node.declaration;
      if (decl) {
        if ('declarations' in decl && decl.declarations) {
          for (const d of decl.declarations) {
            if (d.id.type === 'Identifier') names.add(d.id.name);
          }
        } else if ('id' in decl && decl.id && decl.id.type === 'Identifier') {
          names.add(decl.id.name);
        }
      }
    }
    // Note: `export * as ns from '…'` parses as an ExportNamedDeclaration with an
    // ExportNamespaceSpecifier (handled above). A bare `export * from '…'` has no
    // enumerable name and is followed via collectExportSurface().
  }
  return [...names];
}

const RESOLVE_EXTS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.d.ts'];

/** Resolve a relative import specifier to a real file on disk (build-time only). */
function resolveModuleFile(fromDir: string, spec: string): string | null {
  const base = path.resolve(fromDir, spec);
  const candidates = [
    base,
    ...RESOLVE_EXTS.map(e => base + e),
    ...RESOLVE_EXTS.map(e => path.join(base, 'index' + e)),
  ];
  for (const c of candidates) {
    try {
      if (fs.statSync(c).isFile()) return c;
    } catch {
      /* not found */
    }
  }
  return null;
}

/**
 * Collect a module's full public export surface, following bare
 * `export * from './x'` barrel re-exports recursively. Used at manifest-build
 * time against the local hearth workspace (so relative paths resolve on disk).
 */
export function collectExportSurface(absFile: string, seen = new Set<string>()): string[] {
  if (seen.has(absFile)) return [];
  seen.add(absFile);
  let code: string;
  try {
    code = fs.readFileSync(absFile, 'utf8');
  } catch {
    return [];
  }
  const ast = parseModule(code);
  if (!ast) return [];

  const names = new Set(collectNamedExports(ast));
  const dir = path.dirname(absFile);
  for (const node of ast.program.body) {
    // Bare `export * from './x'` — recurse into the target to enumerate names.
    if (node.type === 'ExportAllDeclaration') {
      const spec = node.source.value;
      if (spec.startsWith('.')) {
        const target = resolveModuleFile(dir, spec);
        if (target) for (const n of collectExportSurface(target, seen)) names.add(n);
      }
    }
  }
  return [...names];
}
