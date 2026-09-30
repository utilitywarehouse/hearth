// Finds a11y opt-outs in story files so the weekly report can list them.
// A static scan is enough: overrides are plain object literals in `parameters`.
import fs from 'node:fs';
import path from 'node:path';

/**
 * @typedef {{
 *   package: string,
 *   file: string,
 *   line: number,
 *   kind: 'axe' | 'native',
 *   rules: string[],
 *   reason?: string,
 * }} Override
 */

/** Return the `{ ... }` block that starts at `open`, respecting nesting. */
function braceBlock(source, open) {
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}' && --depth === 0) return source.slice(open, i + 1);
  }
  return source.slice(open);
}

const lineOf = (source, index) => source.slice(0, index).split('\n').length;

// Line comments (not `://` in URLs) and block comments.
const LINE_COMMENT = /(^|[^:])\/\/(.*)$/gm;
const BLOCK_COMMENT = /\/\*([\s\S]*?)\*\//g;

/** Split a block into its code (comments removed) and the text of its comments. */
function stripComments(block) {
  const comments = [];
  const code = block
    .replace(BLOCK_COMMENT, (_, text) => (comments.push(text), ''))
    .replace(LINE_COMMENT, (_, before, text) => (comments.push(text), before));
  return {
    code,
    comments: comments.map(c => c.replace(/^\s*\*?\s*/gm, ' ').trim()).filter(Boolean),
  };
}

/**
 * @param {string} source story file contents
 * @returns {Omit<Override, 'package' | 'file'>[]}
 */
export function findOverrides(source) {
  const found = [];
  for (const match of source.matchAll(/\b(nativeA11y|a11y)\s*:\s*\{/g)) {
    const { code: block, comments } = stripComments(
      braceBlock(source, match.index + match[0].length - 1)
    );
    const kind = match[1] === 'nativeA11y' ? 'native' : 'axe';
    const rules = [];

    if (/\bdisable\s*:\s*true\b/.test(block) || /\btest\s*:\s*['"]off['"]/.test(block))
      rules.push('*');
    if (kind === 'axe') {
      // Each `{ id, enabled: false }` rule object, in any property order.
      for (const [object] of block.matchAll(/\{[^{}]*\}/g)) {
        const id = object.match(/\bid\s*:\s*['"]([a-z0-9-]+)['"]/)?.[1];
        if (id && /\benabled\s*:\s*false\b/.test(object)) rules.push(id);
      }
    } else {
      for (const m of block.matchAll(/['"]?([a-z0-9-]+)['"]?\s*:\s*['"]off['"]/g)) rules.push(m[1]);
    }
    if (!rules.length) continue;

    // An explicit `reason` wins; otherwise a comment explaining the opt-out.
    const reason = block.match(/\breason\s*:\s*(['"`])([\s\S]*?)\1/)?.[2] ?? comments[0];
    found.push({ line: lineOf(source, match.index), kind, rules, ...(reason ? { reason } : {}) });
  }
  return found;
}

/** Recursively list `*.stories.tsx` files under `dir`. */
function storyFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === 'node_modules' ? [] : storyFiles(full);
    return entry.name.endsWith('.stories.tsx') ? [full] : [];
  });
}

/**
 * @param {string} repoRoot
 * @param {string[]} packages package folder names under packages/
 * @returns {Override[]}
 */
export function scanOverrides(repoRoot, packages) {
  return packages.flatMap(pkg =>
    storyFiles(path.join(repoRoot, 'packages', pkg, 'src')).flatMap(file =>
      findOverrides(fs.readFileSync(file, 'utf8')).map(o => ({
        package: pkg,
        file: path.relative(repoRoot, file),
        ...o,
      }))
    )
  );
}
