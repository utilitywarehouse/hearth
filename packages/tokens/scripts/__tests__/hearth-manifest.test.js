import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { validateManifest } from '@utilitywarehouse/hearth-manifest';

// Checks the committed hearth-manifest.json against the committed token outputs the
// manifest describes. If tokens are regenerated without the manifest (or the reverse),
// these fail.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'hearth-manifest.json'), 'utf8'));
const browserTokens = await import('../../browser/index.js');
const jsTokens = await import('../../js/index.js');

const colorCss = ['css/color.css', 'css/semantic.css']
  .map(file => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');
const declaredVariables = new Set([...colorCss.matchAll(/^\s*(--h-[\w-]+):/gm)].map(m => m[1]));

// 'color.blue[200]' => ['color', 'blue', '200']
const resolve = (tokens, accessor) =>
  accessor
    .split(/[.[\]]+/)
    .filter(Boolean)
    .reduce((node, key) => node?.[key], tokens);

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

describe('hearth-manifest.json', () => {
  it('is a valid manifest', () => {
    expect(validateManifest(manifest)).toEqual({ success: true, manifest });
  });

  it('names this package and its current version', () => {
    expect(manifest.package).toEqual({ name: packageJson.name, version: packageJson.version });
  });

  it('only names CSS variables that the generated CSS declares', () => {
    const missing = manifest.entries
      .map(entry => entry.surfaces.css.variable)
      .filter(variable => !declaredVariables.has(variable));

    expect(missing).toEqual([]);
  });

  it('points each browser accessor at that entry’s CSS variable', () => {
    const wrong = manifest.entries.filter(
      ({ surfaces }) =>
        resolve(browserTokens, surfaces.browser.path) !== `var(${surfaces.css.variable})`
    );

    expect(wrong.map(entry => entry.path)).toEqual([]);
  });

  it('points each JS accessor at that entry’s value, and each dark path at its dark value', () => {
    const wrong = manifest.entries.filter(({ values, surfaces }) => {
      const light = resolve(jsTokens, surfaces.js.path);
      const dark = surfaces.js.darkPath && resolve(jsTokens, surfaces.js.darkPath);
      return light !== values.default || (values.dark !== undefined && dark !== values.dark);
    });

    expect(wrong.map(entry => entry.path)).toEqual([]);
  });

  it('covers every generated colour variable', () => {
    const covered = new Set(manifest.entries.map(entry => entry.surfaces.css.variable));
    // non-colour semantic tokens (opacity) are not in the manifest yet
    const uncovered = [...declaredVariables].filter(
      variable => !variable.startsWith('--h-opacity') && !covered.has(variable)
    );

    expect(uncovered).toEqual([]);
  });
});
