/**
 * Generates AI-friendly markdown documentation from .docs.mdx source files.
 *
 * For each .docs.mdx file in src/ and docs/:
 *   - Strips Storybook JSX (Meta, Canvas, Controls) and import declarations
 *   - Replaces <ArgTypes> with a full prop table via react-docgen-typescript
 *   - Replaces <StorybookLink> with plain text
 *   - Resolves simple JSX expressions (e.g. {version} from package.json imports)
 *   - Prunes headings whose entire section became empty after stripping Canvas blocks
 *
 * Writes output to storybook-static/llms/ (configurable via first CLI arg).
 * Also writes a root storybook-static/llms.txt index.
 *
 * Usage:
 *   node scripts/generate-llm-docs.js [output-dir]
 *
 * Default output-dir: ./storybook-static/llms
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import typescript from 'typescript';
import { withCompilerOptions } from 'react-docgen-typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PKG_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(PKG_ROOT, 'src');
const DOCS_DIR = path.join(PKG_ROOT, 'docs');

// MDX files to exclude from LLM doc generation (relative to SRC_DIR / DOCS_DIR)
const EXCLUDED_MDX = new Set(['docs/Changelog.docs.mdx']);

/**
 * Returns a logical relative path for a .docs.mdx file, regardless of whether
 * it lives under src/ or the top-level docs/ directory.
 *
 * docs/GettingStarted.docs.mdx     → 'docs/GettingStarted.docs.mdx'
 * src/components/Badge/Badge.docs.mdx → 'components/Badge/Badge.docs.mdx'
 */
function relPath(absPath) {
  if (absPath.startsWith(DOCS_DIR + path.sep) || absPath === DOCS_DIR) {
    return 'docs/' + path.relative(DOCS_DIR, absPath).split(path.sep).join('/');
  }
  return path.relative(SRC_DIR, absPath).split(path.sep).join('/');
}

// ─── File discovery ───────────────────────────────────────────────────────────

function findMdxFiles(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMdxFiles(full, results);
    } else if (entry.name.endsWith('.docs.mdx')) {
      if (!EXCLUDED_MDX.has(relPath(full))) results.push(full);
    }
  }
  return results;
}

// ─── Output path derivation ───────────────────────────────────────────────────

function toKebabCase(str) {
  return str.replace(/([A-Z])/g, (m, l, offset) =>
    offset > 0 ? '-' + l.toLowerCase() : l.toLowerCase()
  );
}

/**
 * Maps an absolute .docs.mdx path to its output .md path.
 *
 * src/components/Badge/Badge.docs.mdx → <outputDir>/components/badge.md
 * docs/GettingStarted.docs.mdx        → <outputDir>/docs/getting-started.md
 * docs/common-props/Text.docs.mdx     → <outputDir>/docs/common-props/text.md
 */
function deriveOutputPath(mdxAbsPath, outputDir) {
  const rel = relPath(mdxAbsPath); // e.g. components/Badge/Badge.docs.mdx
  const noExt = rel.replace(/\.docs\.mdx$/, ''); // components/Badge/Badge

  // De-duplicate consecutive identical segments (Badge/Badge → Badge)
  const parts = noExt.split(path.sep);
  const deduped = [];
  for (const part of parts) {
    if (deduped.length === 0 || deduped[deduped.length - 1] !== part) {
      deduped.push(part);
    }
  }

  const kebabPath = deduped.map(toKebabCase).join('/');
  return path.join(outputDir, kebabPath + '.md');
}

// ─── Import parsing ───────────────────────────────────────────────────────────

/**
 * Parses import declarations from MDX content.
 *
 * Returns:
 *   importMap  — component name → resolved absolute file path
 *   exprMap    — identifier name → resolved string value (for JSON imports like {version})
 */

// Known Storybook block elements that may span multiple lines in MDX.
const STORYBLOCK_TAG_RE = /^\s*<(Meta|Canvas|Controls|Source|ArgTypes)\b/;

/**
 * Collapses multi-line Storybook block JSX elements into single lines so they
 * can be matched by simple single-line regexes later.
 *
 * e.g. <Source\n  of={...}\n  transform={...}\n/> → one long line
 *
 * Closing is detected by a line whose trimmed value is exactly '/>'.
 */
function normaliseJsxBlocks(content) {
  const lines = content.split('\n');
  const out = [];
  let acc = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (acc !== null) {
      acc += ' ' + trimmed;
      if (trimmed === '/>') {
        out.push(acc);
        acc = null;
      }
    } else if (STORYBLOCK_TAG_RE.test(line) && !trimmed.endsWith('/>')) {
      acc = line; // start of a multi-line block element
    } else {
      out.push(line);
    }
  }

  if (acc !== null) out.push(acc);
  return out.join('\n');
}

/**
 * Joins multi-line import statements into single lines so they can be matched
 * by simple single-line regexes.
 */
function normaliseImports(content) {
  const lines = content.split('\n');
  const out = [];
  let acc = null;

  for (const line of lines) {
    if (acc !== null) {
      // Accumulating a multi-line import
      acc += ' ' + line.trim();
      if (line.includes(';')) {
        out.push(acc);
        acc = null;
      }
    } else if (line.trimStart().startsWith('import ') && !line.includes(';')) {
      // Start of a multi-line import
      acc = line;
    } else {
      out.push(line);
    }
  }

  if (acc !== null) out.push(acc);
  return out.join('\n');
}

function parseImports(content, mdxDir) {
  const importMap = new Map();
  const exprMap = new Map();

  for (const line of normaliseImports(content).split('\n')) {
    if (!line.trimStart().startsWith('import ')) continue;

    // JSON value imports: import { version } from '../../package.json'
    const jsonMatch = line.match(/import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+\.json)['"]/);
    if (jsonMatch) {
      const names = jsonMatch[1].split(',').map(n =>
        n
          .trim()
          .split(/\s+as\s+/)[0]
          .trim()
      );
      const resolved = path.resolve(mdxDir, jsonMatch[2]);
      if (fs.existsSync(resolved)) {
        try {
          const data = JSON.parse(fs.readFileSync(resolved, 'utf-8'));
          for (const name of names) {
            if (data[name] !== undefined) exprMap.set(name, String(data[name]));
          }
        } catch {
          // ignore malformed JSON
        }
      }
      continue;
    }

    // Namespace imports: import * as Stories from './Badge.stories'
    const nsMatch = line.match(/import\s+\*\s+as\s+(\w+)\s+from\s+['"](\.[^'"]+)['"]/);
    if (nsMatch) {
      const resolved = resolveFile(path.resolve(mdxDir, nsMatch[2]));
      if (resolved) importMap.set(nsMatch[1], resolved);
      continue;
    }

    // Named imports from relative paths: import { Badge } from './Badge'
    const namedMatch = line.match(/import\s+\{([^}]+)\}\s+from\s+['"](\.[^'"]+)['"]/);
    if (namedMatch) {
      const names = namedMatch[1].split(',').map(n =>
        n
          .trim()
          .split(/\s+as\s+/)[0]
          .trim()
      );
      const resolved = resolveFile(path.resolve(mdxDir, namedMatch[2]));
      if (resolved) {
        for (const name of names) importMap.set(name, resolved);
      }
    }
  }

  return { importMap, exprMap };
}

function resolveFile(base) {
  for (const ext of ['.tsx', '.ts', '.jsx', '.js']) {
    const candidate = base + ext;
    if (fs.existsSync(candidate)) return candidate;
  }
  if (fs.existsSync(base) && fs.statSync(base).isDirectory()) {
    for (const ext of ['.tsx', '.ts', '.jsx', '.js']) {
      const idx = path.join(base, 'index' + ext);
      if (fs.existsSync(idx)) return idx;
    }
  }
  return null;
}

// ─── Prop table generation ────────────────────────────────────────────────────

let _parser = null;

function getParser() {
  if (_parser) return _parser;

  const tsConfigPath = path.join(PKG_ROOT, 'tsconfig.json');
  const { config, error } = typescript.readConfigFile(tsConfigPath, typescript.sys.readFile);
  if (error)
    throw new Error(
      `tsconfig read error: ${typescript.flattenDiagnosticMessageText(error.messageText, '\n')}`
    );

  const { options } = typescript.parseJsonConfigFileContent(config, typescript.sys, PKG_ROOT);

  _parser = withCompilerOptions(options, {
    shouldExtractLiteralValuesFromEnum: true,
    propFilter: prop => {
      // Keep component-specific and design-system props; drop raw HTML element props
      if (prop.parent) {
        return !prop.parent.fileName.includes('node_modules/@types/');
      }
      return true;
    },
  });

  return _parser;
}

function formatPropType(prop) {
  if (!prop.type) return '';

  // react-docgen-typescript uses name="enum" with a value array for union/enum types
  // when shouldExtractLiteralValuesFromEnum is true
  if (prop.type.name === 'enum' && Array.isArray(prop.type.value)) {
    const values = prop.type.value.map(v => v.value).filter(v => v !== 'undefined');

    if (values.length === 0) return '';

    // Normalise boolean (false|true → boolean)
    if (values.length === 2 && values.includes('false') && values.includes('true')) {
      return 'boolean';
    }

    return values.join(' | ');
  }

  // Strip trailing "| undefined" — redundant since optionality is already implied
  return (prop.type.name ?? '').replace(/\s*\|\s*undefined$/, '');
}

/**
 * Converts a Storybook include/exclude pattern string to a RegExp.
 * Patterns use glob-style `*` (match any chars) and `|` as OR separator.
 * e.g. 'margin*' → /^(margin.*)$/  'border*Width|border*Style' → /^(border.*Width|border.*Style)$/
 */
function patternToRegExp(pattern) {
  const alts = pattern
    .split('|')
    .map(p => p.replace(/[.+^${}()[\]\\]/g, '\\$&').replace(/\*/g, '.*'));
  return new RegExp(`^(${alts.join('|')})$`);
}

function generatePropTable(componentFile, { include, exclude } = {}) {
  let docs;
  try {
    docs = getParser().parse(componentFile);
  } catch (err) {
    return null;
  }

  if (!docs?.length) return null;

  let props = Object.values(docs[0].props);
  if (!props.length) return null;

  if (include) {
    const re = patternToRegExp(include);
    props = props.filter(p => re.test(p.name));
  }
  if (exclude) {
    const re = patternToRegExp(exclude);
    props = props.filter(p => !re.test(p.name));
  }

  if (!props.length) return null;

  const rows = props.map(prop => {
    const rawType = formatPropType(prop);
    const type = rawType ? `\`${rawType.replace(/\|/g, '\\|')}\`` : '';
    const def = prop.defaultValue?.value != null ? `\`${prop.defaultValue.value}\`` : '—';
    const desc = (prop.description ?? '').replace(/\r?\n/g, ' ').trim();
    return `| \`${prop.name}\` | ${type} | ${def} | ${desc} |`;
  });

  return [
    '',
    '| Prop | Type | Default | Description |',
    '|------|------|---------|-------------|',
    ...rows,
    '',
  ].join('\n');
}

// ─── Story render extraction ──────────────────────────────────────────────────

/**
 * Parses a stories file and extracts the JSX return value from the `render`
 * function of the named story export.
 *
 * Handles CSF stories written as:
 *   export const MyStory: Story = { render: () => <JSX /> }
 */
function extractStoryRender(filePath, storyName) {
  let source;
  try {
    source = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }

  const sf = typescript.createSourceFile(
    path.basename(filePath),
    source,
    typescript.ScriptTarget.Latest,
    /* setParentNodes */ true,
    typescript.ScriptKind.TSX
  );

  for (const stmt of sf.statements) {
    if (!typescript.isVariableStatement(stmt) || !_isExported(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (!typescript.isIdentifier(decl.name) || decl.name.text !== storyName) continue;
      if (!decl.initializer || !typescript.isObjectLiteralExpression(decl.initializer)) continue;
      for (const prop of decl.initializer.properties) {
        if (!typescript.isPropertyAssignment(prop)) continue;
        if (!typescript.isIdentifier(prop.name) || prop.name.text !== 'render') continue;
        const fn = prop.initializer;
        if (typescript.isArrowFunction(fn) || typescript.isFunctionExpression(fn)) {
          return _fnJsx(fn, source, sf);
        }
      }
    }
  }
  return null;
}

function _fnJsx(fn, source, sf) {
  if (typescript.isArrowFunction(fn) && !typescript.isBlock(fn.body)) {
    return _jsxText(fn.body, source, sf);
  }
  return _blockJsx(fn.body, source, sf);
}

function _blockJsx(block, source, sf) {
  if (!block) return null;
  for (const stmt of block.statements) {
    if (typescript.isReturnStatement(stmt) && stmt.expression) {
      return _jsxText(stmt.expression, source, sf);
    }
  }
  return null;
}

function _jsxText(node, source, sf) {
  const inner = typescript.isParenthesizedExpression(node) ? node.expression : node;
  if (
    !typescript.isJsxElement(inner) &&
    !typescript.isJsxSelfClosingElement(inner) &&
    !typescript.isJsxFragment(inner)
  ) {
    return null;
  }
  const start = inner.getStart(sf);
  // getStart() skips leading trivia, so line 0 of the raw slice already starts
  // at column 0. Subsequent lines still carry their absolute file indentation
  // and need the same number of spaces stripped.
  let lineStart = start;
  while (lineStart > 0 && source[lineStart - 1] !== '\n') lineStart--;
  const indent = start - lineStart;

  const raw = source.slice(start, inner.getEnd());
  if (indent === 0) return raw;
  return raw
    .split('\n')
    .map((l, i) => (i === 0 ? l : l.slice(indent)))
    .join('\n');
}

function _isExported(node) {
  return !!(
    typescript.canHaveModifiers(node) &&
    typescript.getModifiers(node)?.some(m => m.kind === typescript.SyntaxKind.ExportKeyword)
  );
}

// ─── Story args-based fallback ────────────────────────────────────────────────

/**
 * Fallback for stories that have no `render` function.
 * Reads the meta's `export default` to find the component name and default args,
 * merges in the story's own args, and emits a JSX usage snippet.
 *
 * e.g.  meta.args = { children: 'Hello', disabled: false }
 *       → <ComponentName>Hello</ComponentName>
 */
function extractStoryFromArgs(filePath, storyName) {
  let source;
  try {
    source = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }

  const sf = typescript.createSourceFile(
    path.basename(filePath),
    source,
    typescript.ScriptTarget.Latest,
    true,
    typescript.ScriptKind.TSX
  );

  // ── 1. Find the meta object via `export default` ──
  let componentName = null;
  let metaArgNodes = {};

  for (const stmt of sf.statements) {
    if (!typescript.isExportAssignment(stmt) || stmt.isExportEquals) continue;
    // Resolve `export default metaVar` or `export default { ... }`
    let obj = stmt.expression;
    if (typescript.isIdentifier(obj)) obj = _findDeclValue(sf, obj.text) ?? obj;
    // Unwrap `satisfies` expression: { ... } satisfies Meta<...>
    if (obj && typescript.isSatisfiesExpression?.(obj)) obj = obj.expression;
    if (obj && typescript.isObjectLiteralExpression(obj)) {
      componentName = _objProp(obj, 'component', n => (typescript.isIdentifier(n) ? n.text : null));
      metaArgNodes = _objArgNodes(obj, source, sf);
    }
    break;
  }

  if (!componentName) return null;

  // ── 2. Find the story's own args ──
  let storyArgNodes = {};
  for (const stmt of sf.statements) {
    if (!typescript.isVariableStatement(stmt) || !_isExported(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (!typescript.isIdentifier(decl.name) || decl.name.text !== storyName) continue;
      if (decl.initializer && typescript.isObjectLiteralExpression(decl.initializer)) {
        storyArgNodes = _objArgNodes(decl.initializer, source, sf);
      }
    }
  }

  // ── 3. Merge and emit JSX ──
  const args = { ...metaArgNodes, ...storyArgNodes };
  if (Object.keys(args).length === 0) return null;
  return _argsToJsx(componentName, args, source, sf);
}

/** Resolve a named variable declaration's initializer within the source file. */
function _findDeclValue(sf, name) {
  for (const stmt of sf.statements) {
    if (!typescript.isVariableStatement(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (typescript.isIdentifier(decl.name) && decl.name.text === name) {
        return decl.initializer ?? null;
      }
    }
  }
  return null;
}

/** Extract the value of a named property from an ObjectLiteralExpression via a mapper. */
function _objProp(obj, propName, mapper) {
  for (const prop of obj.properties) {
    if (!typescript.isPropertyAssignment(prop)) continue;
    if (!typescript.isIdentifier(prop.name) || prop.name.text !== propName) continue;
    return mapper(prop.initializer);
  }
  return null;
}

/** Extract the `args` property of an ObjectLiteralExpression as a map of name → AST node. */
function _objArgNodes(obj, source, sf) {
  const result = {};
  for (const prop of obj.properties) {
    if (!typescript.isPropertyAssignment(prop)) continue;
    if (!typescript.isIdentifier(prop.name) || prop.name.text !== 'args') continue;
    if (!typescript.isObjectLiteralExpression(prop.initializer)) continue;
    for (const argProp of prop.initializer.properties) {
      if (!typescript.isPropertyAssignment(argProp)) continue;
      const key = typescript.isIdentifier(argProp.name) ? argProp.name.text : null;
      if (key) result[key] = argProp.initializer;
    }
  }
  return result;
}

/**
 * Converts a component name + merged args map into a JSX usage snippet.
 *
 * Rules:
 *   - `false` boolean args are omitted (implicit default)
 *   - `true` boolean args are emitted as a bare prop name
 *   - string args → prop="value" (or JSX children if key is `children`)
 *   - numbers → prop={n}
 *   - null / undefined identifiers → omitted
 *   - everything else → prop={raw source text}
 */
function _argsToJsx(componentName, args, source, sf) {
  const { SyntaxKind } = typescript;
  const childrenNode = args.children;
  const attrs = [];

  for (const [key, node] of Object.entries(args)) {
    if (key === 'children') continue;
    if (node.kind === SyntaxKind.FalseKeyword) continue;
    if (node.kind === SyntaxKind.NullKeyword) continue;
    if (typescript.isIdentifier(node) && node.text === 'undefined') continue;

    if (node.kind === SyntaxKind.TrueKeyword) {
      attrs.push(key);
    } else if (typescript.isStringLiteral(node)) {
      attrs.push(`${key}="${node.text}"`);
    } else if (typescript.isNumericLiteral(node)) {
      attrs.push(`${key}={${node.text}}`);
    } else {
      attrs.push(`${key}={${source.slice(node.getStart(sf), node.getEnd())}}`);
    }
  }

  const attrsStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';

  if (childrenNode) {
    const childrenStr = typescript.isStringLiteral(childrenNode)
      ? childrenNode.text
      : source.slice(childrenNode.getStart(sf), childrenNode.getEnd());
    return `<${componentName}${attrsStr}>${childrenStr}</${componentName}>`;
  }

  return `<${componentName}${attrsStr} />`;
}

// ─── MDX line-by-line transformation ─────────────────────────────────────────

// Matches a line that opens a Storybook block element to drop.
// Uses a start-anchor only — no '[^>]*' end match — because attribute values
// may contain '>' (e.g. arrow functions in <Source transform={s => s} />).
// Multi-line elements are already collapsed to one line by normaliseJsxBlocks().
const BLOCK_DROP_RE = /^\s*<(Meta|Canvas|Controls|Source)\b/;

// Matches a full line that is an <ArgTypes> element; captures the attribute string
const ARG_TYPES_RE = /^\s*<ArgTypes\b([^>]*)\/?>\s*$/;

// Matches a Canvas block with a story reference: <Canvas of={Stories.X} ... />
// Captures the namespace (group 1) and story name (group 2).
const CANVAS_STORY_RE = /^\s*<Canvas\b[^>]*\bof=\{(\w+)\.(\w+)\}[^>]*\/?>\s*$/;

// Matches inline <StorybookLink ...>text</StorybookLink> — global, may appear multiple times per line
const STORYBOOK_LINK_RE = /<StorybookLink[^>]*>([^<]*)<\/StorybookLink>/g;

// Matches import declarations
const IMPORT_RE = /^import\s+/;

// Matches a self-closing PascalCase JSX component on its own line: <FooTable />
const CUSTOM_COMPONENT_RE = /^\s*<([A-Z][a-zA-Z0-9]*)\b[^>]*\/>\s*$/;

// ─── Markdown export runner ───────────────────────────────────────────────────

const RUNNER_SCRIPT = path.join(__dirname, 'run-markdown-export.ts');

function findTsx() {
  const candidates = [
    path.join(PKG_ROOT, 'node_modules', '.bin', 'tsx'),
    path.join(PKG_ROOT, '..', '..', 'node_modules', '.bin', 'tsx'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return 'tsx';
}

const TSX_BIN = findTsx();

/**
 * Derives the markdown export function name from a component name.
 * Convention: replace trailing "Table" with "Markdown" and lowercase the first char.
 * e.g. ColorPropsTable → colorPropsMarkdown
 */
function deriveMarkdownFn(componentName) {
  const base = componentName.replace(/Table$/, '');
  return base[0].toLowerCase() + base.slice(1) + 'Markdown';
}

/**
 * Checks whether a TypeScript file exports a function with the given name.
 */
function hasNamedExport(filePath, exportName) {
  let source;
  try {
    source = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return false;
  }

  const sf = typescript.createSourceFile(
    path.basename(filePath),
    source,
    typescript.ScriptTarget.Latest,
    true,
    typescript.ScriptKind.TSX
  );

  for (const stmt of sf.statements) {
    if (!_isExported(stmt)) continue;

    if (typescript.isFunctionDeclaration(stmt) && stmt.name?.text === exportName) {
      return true;
    }

    if (typescript.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (typescript.isIdentifier(decl.name) && decl.name.text === exportName) {
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * Calls an exported markdown function in a TypeScript file via tsx and returns its output.
 * Returns null if the export doesn't exist or execution fails.
 */
function callMarkdownExport(filePath, componentName) {
  const fnName = deriveMarkdownFn(componentName);
  if (!hasNamedExport(filePath, fnName)) return null;

  try {
    return execFileSync(TSX_BIN, [RUNNER_SCRIPT, filePath, fnName], {
      encoding: 'utf-8',
      cwd: PKG_ROOT,
    }).trim();
  } catch {
    return null;
  }
}

/**
 * Strips the <Flex> wrapper added around page titles alongside <ViewMarkdownLink>,
 * leaving only the bare heading.
 *
 * <Flex justifyContent="between" alignItems="baseline">
 *   # Accordion
 *   <ViewMarkdownLink to="components/accordion" />
 * </Flex>
 *
 * → # Accordion
 */
function stripViewMarkdownLinkFlex(content) {
  return content.replace(
    /<Flex[^>]*>\s*\n\s*(#{1,6} [^\n]+)\s*\n\s*<ViewMarkdownLink[^>]*\/>\s*\n<\/Flex>/g,
    '$1'
  );
}

function transformContent(content, importMap, exprMap) {
  const lines = normaliseJsxBlocks(normaliseImports(stripViewMarkdownLinkFlex(content))).split(
    '\n'
  );
  const output = [];
  let inCodeFence = false;

  for (const line of lines) {
    // Track code fences — content inside fences passes through unchanged
    if (/^(`{3,}|~{3,})/.test(line.trimStart())) {
      inCodeFence = !inCodeFence;
      output.push(line);
      continue;
    }

    if (inCodeFence) {
      output.push(line);
      continue;
    }

    // Drop import declarations
    if (IMPORT_RE.test(line)) continue;

    // Canvas with a story reference: try to extract the story's render JSX.
    // Must come before BLOCK_DROP_RE, which would otherwise swallow all Canvas lines.
    const canvasMatch = line.match(CANVAS_STORY_RE);
    if (canvasMatch) {
      const [, ns, storyName] = canvasMatch;
      const filePath = importMap.get(ns);
      if (filePath) {
        const jsx =
          extractStoryRender(filePath, storyName) ?? extractStoryFromArgs(filePath, storyName);
        if (jsx) output.push('', '```tsx', jsx, '```', '');
      }
      continue; // always consume the Canvas line
    }

    // Drop remaining block JSX: Meta, Canvas (no story ref), Controls
    if (BLOCK_DROP_RE.test(line)) continue;

    // Replace ArgTypes with generated prop table
    const argMatch = line.match(ARG_TYPES_RE);
    if (argMatch) {
      const attrsStr = argMatch[1];
      const ofMatch = attrsStr.match(/\bof=\{([^}]+)\}/);
      if (ofMatch) {
        const componentName = ofMatch[1].trim();
        const filePath = importMap.get(componentName);
        if (filePath) {
          const includeMatch = attrsStr.match(/\binclude=\{'([^']+)'\}/);
          const excludeMatch = attrsStr.match(/\bexclude=\{'([^']+)'\}/);
          const filters = {
            include: includeMatch?.[1],
            exclude: excludeMatch?.[1],
          };
          const table = generatePropTable(filePath, filters);
          if (table) {
            output.push(table);
            continue;
          }
        }
      }
      continue;
    }

    // Custom PascalCase JSX components: try to resolve a co-located markdown export
    const customMatch = line.match(CUSTOM_COMPONENT_RE);
    if (customMatch) {
      const componentName = customMatch[1];
      const filePath = importMap.get(componentName);
      if (filePath) {
        const markdown = callMarkdownExport(filePath, componentName);
        if (markdown) {
          output.push('', markdown, '');
          continue;
        }
      }
    }

    // Replace StorybookLink with its text content
    let transformed = line.replace(STORYBOOK_LINK_RE, '$1');

    // Resolve simple JSX expressions like {version} from known imports
    transformed = transformed.replace(/\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}/g, (match, name) =>
      exprMap.has(name) ? exprMap.get(name) : match
    );

    output.push(transformed);
  }

  return output.join('\n');
}

// ─── Section pruning ──────────────────────────────────────────────────────────

/**
 * Removes headings whose entire section content became empty (e.g. a section
 * that only contained a Canvas block, which was stripped above).
 */
function pruneEmptySections(markdown) {
  const lines = markdown.split('\n');
  const sections = [];
  let current = { heading: null, level: 0, lines: [] };

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s/);
    if (headingMatch) {
      sections.push(current);
      current = { heading: line, level: headingMatch[1].length, lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  sections.push(current);

  const out = [];
  for (const { heading, level, lines: sectionLines } of sections) {
    const hasContent = sectionLines.some(l => l.trim() !== '');
    if (heading === null) {
      // Pre-title content — always include
      out.push(...sectionLines);
    } else if (hasContent || level === 1) {
      // Always keep h1 (document title); only prune h2+ that became empty
      out.push(heading, ...sectionLines);
    }
  }

  // Collapse runs of more than two blank lines
  const collapsed = [];
  let blankRun = 0;
  for (const line of out) {
    if (line.trim() === '') {
      blankRun++;
      if (blankRun <= 2) collapsed.push(line);
    } else {
      blankRun = 0;
      collapsed.push(line);
    }
  }

  return collapsed.join('\n').trim();
}

// ─── Metadata extraction ──────────────────────────────────────────────────────

function extractMetadata(markdown) {
  const lines = markdown.split('\n');
  let title = '';
  let description = '';
  let foundTitle = false;

  for (const line of lines) {
    if (!foundTitle && /^#\s+/.test(line)) {
      title = line.replace(/^#+\s+/, '').trim();
      foundTitle = true;
      continue;
    }
    if (foundTitle && !description && line.trim() && !/^#/.test(line)) {
      // First non-empty, non-heading line after title is the description
      description = line.trim().replace(/^[-*]\s+/, ''); // strip leading list markers
      break;
    }
  }

  return { title, description };
}

// ─── Process a single MDX file ────────────────────────────────────────────────

function processMdxFile(mdxAbsPath) {
  const content = fs.readFileSync(mdxAbsPath, 'utf-8');
  const mdxDir = path.dirname(mdxAbsPath);

  const { importMap, exprMap } = parseImports(content, mdxDir);
  const transformed = transformContent(content, importMap, exprMap);
  const pruned = pruneEmptySections(transformed);
  const { title, description } = extractMetadata(pruned);

  return { markdown: pruned, title, description };
}

// ─── llms.txt root index ──────────────────────────────────────────────────────

function generateLlmsTxt(entries, llmsTxtDir) {
  const rel = absPath => path.relative(llmsTxtDir, absPath).replace(/\\/g, '/');

  const components = entries
    .filter(e => e.category === 'components')
    .sort((a, b) => a.title.localeCompare(b.title));

  const guides = entries.filter(e => e.category === 'docs' && !e.sub);
  const commonProps = entries.filter(e => e.sub === 'common-props');
  const responsive = entries.filter(e => e.sub === 'responsive-design');

  const lines = [
    '# Hearth React',
    '',
    '> @utilitywarehouse/hearth-react - React component library for Utility Warehouse products.',
    '',
    '## Guides',
    '',
    ...guides.map(e => `- [${e.title}](${rel(e.outputPath)})`),
  ];

  if (commonProps.length) {
    lines.push(
      '',
      '## Common Props',
      '',
      ...commonProps.map(e => `- [${e.title}](${rel(e.outputPath)})`)
    );
  }

  if (responsive.length) {
    lines.push(
      '',
      '## Responsive Design',
      '',
      ...responsive.map(e => `- [${e.title}](${rel(e.outputPath)})`)
    );
  }

  lines.push(
    '',
    '## Components',
    '',
    ...components.map(e =>
      e.description
        ? `- [${e.title}](${rel(e.outputPath)}): ${e.description}`
        : `- [${e.title}](${rel(e.outputPath)})`
    )
  );

  return lines.join('\n') + '\n';
}

// ─── Category detection ───────────────────────────────────────────────────────

function categorise(mdxAbsPath) {
  const rel = relPath(mdxAbsPath);
  const parts = rel.split('/');
  const category = parts[0]; // 'components' or 'docs'
  const sub = category === 'docs' && parts.length > 2 ? parts[1] : null;
  return { category, sub };
}

// ─── Optional Prettier formatting ────────────────────────────────────────────

/**
 * Tries to format a markdown file using Prettier.
 * Silently skips if Prettier is not installed or fails for any reason.
 */
async function formatWithPrettier(filePath, content) {
  try {
    const prettier = await import('prettier');
    const config = (await prettier.resolveConfig(filePath)) ?? {};
    return await prettier.format(content, {
      ...config,
      parser: 'markdown',
      // Format embedded code blocks (TSX, etc.) when the language is recognised
      embeddedLanguageFormatting: 'auto',
    });
  } catch {
    return content;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const outputDir = process.argv[2] ?? path.join(PKG_ROOT, 'public', 'llms');
  const llmsTxtPath = path.join(outputDir, '..', 'llms.txt');

  const mdxFiles = [...findMdxFiles(SRC_DIR), ...findMdxFiles(DOCS_DIR)].sort();
  const entries = [];
  let ok = 0;
  let fail = 0;

  for (const mdxFile of mdxFiles) {
    const outputPath = deriveOutputPath(mdxFile, outputDir);
    const relInput = path.relative(PKG_ROOT, mdxFile);

    try {
      const { markdown, title, description } = processMdxFile(mdxFile);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      const content = await formatWithPrettier(outputPath, markdown + '\n');
      fs.writeFileSync(outputPath, content);

      const { category, sub } = categorise(mdxFile);
      entries.push({ outputPath, title, description, category, sub });
      ok++;
      console.log(`  ✓ ${relInput}`);
    } catch (err) {
      fail++;
      console.error(`  ✗ ${relInput}: ${err.message}`);
    }
  }

  // Write root llms.txt
  const llmsTxtDir = path.dirname(llmsTxtPath);
  fs.mkdirSync(llmsTxtDir, { recursive: true });
  const llmsTxt = await formatWithPrettier(llmsTxtPath, generateLlmsTxt(entries, llmsTxtDir));
  fs.writeFileSync(llmsTxtPath, llmsTxt);
  console.log(`  ✓ llms.txt`);

  console.log(`\n${ok} file${ok !== 1 ? 's' : ''} written, ${fail} error${fail !== 1 ? 's' : ''}`);
  if (fail > 0) process.exit(1);
}

main();
