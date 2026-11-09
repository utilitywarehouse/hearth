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

const allCss = fs
  .readdirSync(path.join(root, 'css'))
  .filter(file => file.endsWith('.css') && file !== 'index.css')
  .map(file => fs.readFileSync(path.join(root, 'css', file), 'utf8'))
  .join('\n');
const declarations = new Map(
  [...allCss.matchAll(/^\s*(--h-[\w-]+):\s*(.+);$/gm)].map(m => [m[1], m[2]])
);
const declaredVariables = new Set(declarations.keys());

// 'color.blue[200]' => ['color', 'blue', '200'], 'layout.spacing["2xl"]' => [..., '2xl']
const resolve = (tokens, accessor) =>
  accessor
    .split(/[.[\]]+/)
    .filter(Boolean)
    .map(key => key.replace(/^"|"$/g, ''))
    .reduce((node, key) => node?.[key], tokens);

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

describe('hearth-manifest.json', () => {
  it('is a valid manifest', () => {
    expect(validateManifest(manifest)).toEqual({ success: true, manifest });
  });

  it('names this package and its current version', () => {
    expect(manifest.package).toEqual({ name: packageJson.name, version: packageJson.version });
  });

  it('gives every primitive and semantic colour a CSS and a browser surface', () => {
    const missing = manifest.entries.filter(
      ({ type, layer, surfaces }) =>
        type === 'color' && layer !== 'component' && (!surfaces.css || !surfaces.browser)
    );

    expect(missing.map(entry => entry.path)).toEqual([]);
  });

  it('covers every token group', () => {
    const groups = new Set(manifest.entries.map(({ path }) => path.split('.')[0]));

    expect([...groups]).toEqual(
      expect.arrayContaining([
        'color',
        'space',
        'border-radius',
        'border-width',
        'font',
        'letter-spacing',
        'line-height',
        'semantic',
        'component',
      ])
    );
    const semantic = new Set(
      manifest.entries
        .filter(entry => entry.layer === 'semantic')
        .map(({ path }) => path.split('.')[1])
    );
    expect([...semantic]).toEqual(
      expect.arrayContaining(['layout', 'shadow', 'typography', 'opacity'])
    );
  });

  it('gives each device variant of a path its own CSS variable and JS path', () => {
    const variants = Map.groupBy(
      manifest.entries.filter(entry => entry.device),
      entry => entry.path
    );
    const clashes = [...variants]
      .filter(([, entries]) => {
        const variables = entries.map(entry => entry.surfaces.css?.variable).filter(Boolean);
        const jsPaths = entries.map(entry => entry.surfaces.js.path);
        return new Set(variables).size < variables.length || new Set(jsPaths).size < jsPaths.length;
      })
      .map(([entryPath]) => entryPath);

    expect(clashes).toEqual([]);
  });

  it('reports the value the CSS declares, following references to the variable that holds it', () => {
    const literal = variable => {
      let value = declarations.get(variable);
      while (/^var\(/.test(value)) value = declarations.get(value.slice(4, -1));
      return value;
    };
    // the committed CSS is lint-formatted, which lowercases font family names (`DM Sans` -> `dm sans`);
    // names are case-insensitive in CSS, so compare without case
    const wrong = manifest.entries.filter(
      ({ type, surfaces }) =>
        surfaces.css &&
        type !== 'color' &&
        surfaces.css.value.toLowerCase() !== literal(surfaces.css.variable).toLowerCase()
    );

    expect(wrong.map(entry => entry.path)).toEqual([]);
  });

  it('only names CSS variables that the generated CSS declares', () => {
    const missing = manifest.entries
      .map(entry => entry.surfaces.css?.variable)
      .filter(variable => variable && !declaredVariables.has(variable));

    expect(missing).toEqual([]);
  });

  it('points each browser accessor at that entry’s CSS variable', () => {
    const wrong = manifest.entries.filter(
      ({ surfaces }) =>
        surfaces.css &&
        surfaces.browser &&
        resolve(browserTokens, surfaces.browser.path) !== `var(${surfaces.css.variable})`
    );

    expect(wrong.map(entry => entry.path)).toEqual([]);
  });

  it('points each JS accessor at that entry’s value, and each dark path at its dark value', () => {
    const wrong = manifest.entries.filter(({ values, surfaces }) => {
      const light = resolve(jsTokens, surfaces.js.path);
      const dark = surfaces.js.darkPath && resolve(jsTokens, surfaces.js.darkPath);
      return light !== values.default || dark !== values.dark;
    });

    expect(wrong.map(entry => entry.path)).toEqual([]);
  });

  it('covers every generated CSS variable', () => {
    const covered = new Set(manifest.entries.map(entry => entry.surfaces.css?.variable));
    const uncovered = [...declaredVariables].filter(variable => !covered.has(variable));

    expect(uncovered).toEqual([]);
  });
});
