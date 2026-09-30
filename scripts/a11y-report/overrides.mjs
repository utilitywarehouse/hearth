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

/**
 * @param {string} source story file contents
 * @returns {Omit<Override, 'package' | 'file'>[]}
 */
export function findOverrides(source) {
  const found = [];
  for (const match of source.matchAll(/\b(nativeA11y|a11y)\s*:\s*\{/g)) {
    const block = braceBlock(source, match.index + match[0].length - 1);
    const kind = match[1] === 'nativeA11y' ? 'native' : 'axe';
    const rules = [];

    if (/\bdisable\s*:\s*true\b/.test(block) || /\btest\s*:\s*['"]off['"]/.test(block))
      rules.push('*');
    if (kind === 'axe') {
      for (const m of block.matchAll(
        /\{\s*id\s*:\s*['"]([a-z0-9-]+)['"]\s*,\s*enabled\s*:\s*false\s*\}/g
      )) {
        rules.push(m[1]);
      }
    } else {
      for (const m of block.matchAll(/['"]?([a-z0-9-]+)['"]?\s*:\s*['"]off['"]/g)) rules.push(m[1]);
    }
    if (!rules.length) continue;

    const reason = block.match(/\breason\s*:\s*(['"`])([\s\S]*?)\1/)?.[2];
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
