/**
 * Generates AI-friendly markdown documentation from .docs.mdx source files.
 *
 * For each .docs.mdx file in src/:
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
import typescript from 'typescript';
import { withCompilerOptions } from 'react-docgen-typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PKG_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(PKG_ROOT, 'src');

// ─── File discovery ───────────────────────────────────────────────────────────

function findMdxFiles(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMdxFiles(full, results);
    } else if (entry.name.endsWith('.docs.mdx')) {
      results.push(full);
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
 * src/components/Badge/Badge.docs.mdx  → <outputDir>/components/badge.md
 * src/docs/GettingStarted.docs.mdx     → <outputDir>/docs/getting-started.md
 * src/docs/common-props/Text.docs.mdx  → <outputDir>/docs/common-props/text.md
 */
function deriveOutputPath(mdxAbsPath, outputDir) {
  const rel = path.relative(SRC_DIR, mdxAbsPath); // e.g. components/Badge/Badge.docs.mdx
  const noExt = rel.replace(/\.docs\.mdx$/, '');   // components/Badge/Badge

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
      const names = jsonMatch[1].split(',').map(n => n.trim().split(/\s+as\s+/)[0].trim());
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

    // Named imports from relative paths: import { Badge } from './Badge'
    const namedMatch = line.match(/import\s+\{([^}]+)\}\s+from\s+['"](\.[^'"]+)['"]/);
    if (namedMatch) {
      const names = namedMatch[1].split(',').map(n => n.trim().split(/\s+as\s+/)[0].trim());
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
  if (error) throw new Error(`tsconfig read error: ${typescript.flattenDiagnosticMessageText(error.messageText, '\n')}`);

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
    const values = prop.type.value
      .map(v => v.value)
      .filter(v => v !== 'undefined');

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

function generatePropTable(componentFile) {
  let docs;
  try {
    docs = getParser().parse(componentFile);
  } catch (err) {
    return null;
  }

  if (!docs?.length) return null;

  const props = Object.values(docs[0].props);
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

// ─── DocExample source extraction ────────────────────────────────────────────

/**
 * Parses an .examples.tsx file and extracts the JSX return value of the named
 * exported function component, returned as a dedented string.
 */
function extractExampleSource(filePath, functionName) {
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
    const jsx = _stmtJsx(stmt, functionName, source, sf);
    if (jsx) return jsx;
  }

  return null;
}

function _stmtJsx(node, name, source, sf) {
  if (typescript.isFunctionDeclaration(node) && node.name?.text === name && _isExported(node)) {
    return _blockJsx(node.body, source, sf);
  }
  if (typescript.isVariableStatement(node) && _isExported(node)) {
    for (const decl of node.declarationList.declarations) {
      if (!typescript.isIdentifier(decl.name) || decl.name.text !== name || !decl.initializer) continue;
      const init = decl.initializer;
      if (typescript.isArrowFunction(init) || typescript.isFunctionExpression(init)) {
        return _fnJsx(init, source, sf);
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
  const raw = source.slice(inner.getStart(sf), inner.getEnd());
  return _dedent(raw);
}

function _isExported(node) {
  return !!(
    typescript.canHaveModifiers(node) &&
    typescript.getModifiers(node)?.some(m => m.kind === typescript.SyntaxKind.ExportKeyword)
  );
}

function _dedent(str) {
  const lines = str.split('\n');
  const minIndent = Math.min(
    ...lines
      .filter(l => l.trim().length > 0)
      .map(l => (l.match(/^(\s*)/) ?? ['', ''])[1].length)
  );
  return lines.map(l => l.slice(minIndent)).join('\n');
}

// ─── MDX line-by-line transformation ─────────────────────────────────────────

// Matches a full line that is purely a self-closing block JSX element to drop
const BLOCK_DROP_RE = /^\s*<(Meta|Canvas|Controls)\b[^>]*\/?>\s*$/;

// Matches a full line that is an <ArgTypes> element; captures the attribute string
const ARG_TYPES_RE = /^\s*<ArgTypes\b([^>]*)\/?>\s*$/;

// Matches a full line that is a <DocExample of={X} /> element; captures the attribute string
const DOC_EXAMPLE_RE = /^\s*<DocExample\b([^>]*)\/?>\s*$/;

// Matches inline <StorybookLink ...>text</StorybookLink> — global, may appear multiple times per line
const STORYBOOK_LINK_RE = /<StorybookLink[^>]*>([^<]*)<\/StorybookLink>/g;

// Matches import declarations
const IMPORT_RE = /^import\s+/;

function transformContent(content, importMap, exprMap) {
  const lines = normaliseImports(content).split('\n');
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

    // Drop block JSX: Meta, Canvas, Controls
    if (BLOCK_DROP_RE.test(line)) continue;

    // Replace ArgTypes with generated prop table
    const argMatch = line.match(ARG_TYPES_RE);
    if (argMatch) {
      const ofMatch = argMatch[1].match(/\bof=\{([^}]+)\}/);
      if (ofMatch) {
        const componentName = ofMatch[1].trim();
        const filePath = importMap.get(componentName);
        if (filePath) {
          const table = generatePropTable(filePath);
          if (table) {
            output.push(table);
            continue;
          }
        }
      }
      continue;
    }

    // Replace DocExample with an extracted tsx code block
    const docExMatch = line.match(DOC_EXAMPLE_RE);
    if (docExMatch) {
      const ofMatch = docExMatch[1].match(/\bof=\{([^}]+)\}/);
      if (ofMatch) {
        const componentName = ofMatch[1].trim();
        const filePath = importMap.get(componentName);
        if (filePath) {
          const jsx = extractExampleSource(filePath, componentName);
          if (jsx) {
            output.push('', '```tsx', jsx, '```', '');
            continue;
          }
        }
      }
      continue;
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
    '> @utilitywarehouse/hearth-react — React component library for Utility Warehouse products.',
    '',
    '## Components',
    '',
    ...components.map(e =>
      e.description
        ? `- [${e.title}](${rel(e.outputPath)}): ${e.description}`
        : `- [${e.title}](${rel(e.outputPath)})`
    ),
    '',
    '## Guides',
    '',
    ...guides.map(e => `- [${e.title}](${rel(e.outputPath)})`),
  ];

  if (commonProps.length) {
    lines.push('', '## Common Props', '', ...commonProps.map(e => `- [${e.title}](${rel(e.outputPath)})`));
  }

  if (responsive.length) {
    lines.push('', '## Responsive Design', '', ...responsive.map(e => `- [${e.title}](${rel(e.outputPath)})`));
  }

  return lines.join('\n') + '\n';
}

// ─── Category detection ───────────────────────────────────────────────────────

function categorise(mdxAbsPath) {
  const rel = path.relative(SRC_DIR, mdxAbsPath);
  const parts = rel.split(path.sep);
  const category = parts[0]; // 'components' or 'docs'
  const sub = category === 'docs' && parts.length > 2 ? parts[1] : null;
  return { category, sub };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const outputDir = process.argv[2] ?? path.join(PKG_ROOT, 'storybook-static', 'llms');
  const llmsTxtPath = path.join(outputDir, '..', 'llms.txt');

  const mdxFiles = findMdxFiles(SRC_DIR).sort();
  const entries = [];
  let ok = 0;
  let fail = 0;

  for (const mdxFile of mdxFiles) {
    const outputPath = deriveOutputPath(mdxFile, outputDir);
    const relInput = path.relative(PKG_ROOT, mdxFile);

    try {
      const { markdown, title, description } = processMdxFile(mdxFile);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, markdown + '\n');

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
  fs.writeFileSync(llmsTxtPath, generateLlmsTxt(entries, llmsTxtDir));
  console.log(`  ✓ llms.txt`);

  console.log(`\n${ok} file${ok !== 1 ? 's' : ''} written, ${fail} error${fail !== 1 ? 's' : ''}`);
  if (fail > 0) process.exit(1);
}

main();
