import fs from 'fs';
import path from 'path';
import { camelCase } from './helpers/camel-case.js';

const CSS_DIR = path.resolve('./css');
const DESIGN_MD_PATH = path.resolve('../../DESIGN.md');

const VAR_RE = /^\s*(--h-[\w-]+):\s*(.+?);\s*$/gm;

function readVars(fileName) {
  const content = fs.readFileSync(path.join(CSS_DIR, fileName), 'utf8');
  const vars = new Map();
  for (const match of content.matchAll(VAR_RE)) {
    vars.set(match[1], match[2]);
  }
  return vars;
}

const varMap = new Map([
  ...readVars('color.css'),
  ...readVars('border.css'),
  ...readVars('space.css'),
  ...readVars('font.css'),
  ...readVars('semantic.css'),
  ...readVars('components.css'),
]);

function resolve(varName) {
  const value = varMap.get(varName);
  const ref = value?.match(/^var\((--h-[\w-]+)\)$/);
  return ref ? resolve(ref[1]) : value;
}

function nameFromVar(varName, stripPrefix) {
  return camelCase(varName.replace(stripPrefix, ''));
}

function buildColors() {
  const semanticVars = readVars('semantic.css');
  const entries = [];
  for (const varName of semanticVars.keys()) {
    const value = resolve(varName);
    if (/^#[0-9a-fA-F]{3,8}$/.test(value)) {
      entries.push([varName.replace(/^--h-/, ''), value]);
    }
  }
  return entries;
}

function buildRounded() {
  const borderVars = readVars('border.css');
  const entries = [];
  for (const varName of borderVars.keys()) {
    if (varName.startsWith('--h-border-radius-')) {
      entries.push([nameFromVar(varName, /^--h-border-radius-/), resolve(varName)]);
    }
  }
  return entries;
}

function buildSpacing() {
  const spaceVars = readVars('space.css');
  const entries = [];
  for (const varName of spaceVars.keys()) {
    if (varName.startsWith('--h-space-')) {
      entries.push([nameFromVar(varName, /^--h-space-/), resolve(varName)]);
    }
  }
  return entries;
}

const LEVEL_ORDER = ['4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm'];

function buildTypography() {
  const componentVars = [...readVars('components.css').keys()];
  const families = {
    heading: {
      re: /^--h-heading-(2xl|xl|lg|md|sm)-(font-size|line-height|font-weight)(?:-(desktop|mobile|tablet))?$/,
      fontFamily: resolve('--h-font-family-heading'),
    },
    'body-text': {
      re: /^--h-body-text-(sm|md|lg|xl)-(font-size|line-height)$/,
      fontFamily: resolve('--h-font-family-body'),
      sharedFontWeight: resolve('--h-body-text-font-weight'),
    },
    'detail-text': {
      re: /^--h-detail-text-(sm|md|lg|xl|2xl|3xl|4xl)-(font-size|line-height|letter-spacing)$/,
      fontFamily: resolve('--h-font-family-detail'),
      sharedFontWeight: resolve('--h-detail-text-font-weight'),
    },
  };

  const levels = {};
  for (const [category, config] of Object.entries(families)) {
    levels[category] = {};
    for (const varName of componentVars) {
      const match = varName.match(config.re);
      if (!match) continue;
      const [, level, prop, breakpoint] = match;
      if (breakpoint && breakpoint !== 'desktop') continue;
      levels[category][level] ??= {};
      levels[category][level][prop] = resolve(varName);
    }
  }

  const entries = [];
  const shortName = { heading: 'heading', 'body-text': 'body', 'detail-text': 'detail' };
  for (const [category, config] of Object.entries(families)) {
    const foundLevels = Object.keys(levels[category]).sort(
      (a, b) => LEVEL_ORDER.indexOf(a) - LEVEL_ORDER.indexOf(b)
    );
    for (const level of foundLevels) {
      const props = levels[category][level];
      const typography = { fontFamily: config.fontFamily };
      typography.fontSize = props['font-size'];
      typography.fontWeight = props['font-weight'] ?? config.sharedFontWeight;
      typography.lineHeight = props['line-height'];
      if (props['letter-spacing']) typography.letterSpacing = props['letter-spacing'];
      entries.push([`${shortName[category]}-${level}`, typography]);
    }
  }
  return entries;
}

function serializeColors(entries) {
  return entries.map(([name, value]) => `  ${name}: "${value}"`).join('\n');
}

function serializeScale(entries) {
  return entries.map(([name, value]) => `  ${name}: ${value}`).join('\n');
}

function serializeTypography(entries) {
  return entries
    .map(([name, typography]) => {
      const props = Object.entries(typography)
        .map(([prop, value]) => `    ${prop}: ${value}`)
        .join('\n');
      return `  ${name}:\n${props}`;
    })
    .join('\n');
}

function buildBlock(key, serialized) {
  return `${key}:\n${serialized}`;
}

const colorEntries = buildColors();

const blocks = {
  colors: buildBlock('colors', serializeColors(colorEntries)),
  typography: buildBlock('typography', serializeTypography(buildTypography())),
  rounded: buildBlock('rounded', serializeScale(buildRounded())),
  spacing: buildBlock('spacing', serializeScale(buildSpacing())),
};

// components: is hand-authored and left untouched, but its {colors.*}
// references point to names that colors: is about to lose (mechanical names
// replace the old curated ones). Rewrite just those references so
// components: keeps resolving.
function normalizeHex(value) {
  const hex = value.replace('#', '').toLowerCase();
  return `#${hex.length === 3 ? [...hex].map(c => c + c).join('') : hex}`;
}

function rewriteComponentRefs(componentLines, oldColorNameToValue) {
  const newColorValueToName = new Map();
  for (const [name, value] of colorEntries) {
    const key = normalizeHex(value);
    if (!newColorValueToName.has(key)) newColorValueToName.set(key, name);
  }

  return componentLines.map(line =>
    line.replace(/\{colors\.([\w-]+)\}/g, (full, name) => {
      const oldValue = oldColorNameToValue.get(name);
      const newName = oldValue && newColorValueToName.get(normalizeHex(oldValue));
      return newName ? `{colors.${newName}}` : full;
    })
  );
}

function parseOldColorsBlock(colorLines = []) {
  const nameToValue = new Map();
  for (const line of colorLines) {
    const match = line.match(/^\s*([\w-]+):\s*"(.+)"\s*$/);
    if (match) nameToValue.set(match[1], match[2]);
  }
  return nameToValue;
}

function spliceFrontMatter(designMd) {
  const lines = designMd.split('\n');
  const fmStart = lines.indexOf('---');
  const fmEnd = lines.indexOf('---', fmStart + 1);
  const frontMatter = lines.slice(fmStart + 1, fmEnd);

  const topLevelKeyLines = [];
  frontMatter.forEach((line, i) => {
    if (/^\w[\w-]*:/.test(line)) topLevelKeyLines.push(i);
  });

  const rawBlocks = {};
  topLevelKeyLines.forEach((lineIndex, i) => {
    const key = frontMatter[lineIndex].match(/^(\w[\w-]*):/)[1];
    const blockEnd = topLevelKeyLines[i + 1] ?? frontMatter.length;
    rawBlocks[key] = frontMatter.slice(lineIndex, blockEnd);
  });

  const oldColorNameToValue = parseOldColorsBlock(rawBlocks.colors);

  const newFrontMatter = [];
  topLevelKeyLines.forEach(lineIndex => {
    const key = frontMatter[lineIndex].match(/^(\w[\w-]*):/)[1];
    if (blocks[key]) {
      newFrontMatter.push(...blocks[key].split('\n'));
    } else if (key === 'components') {
      newFrontMatter.push(...rewriteComponentRefs(rawBlocks[key], oldColorNameToValue));
    } else {
      newFrontMatter.push(...rawBlocks[key]);
    }
  });

  return [...lines.slice(0, fmStart + 1), ...newFrontMatter, ...lines.slice(fmEnd)].join('\n');
}

const designMd = fs.readFileSync(DESIGN_MD_PATH, 'utf8');
fs.writeFileSync(DESIGN_MD_PATH, spliceFrontMatter(designMd));
console.log('DESIGN.md token front matter regenerated.');
