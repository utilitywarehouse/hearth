import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const distIndex = path.resolve('./dist/index.js');
const src = fs.readFileSync(distIndex, 'utf-8');
const allExports = [...src.matchAll(/export\{([^}]+)\}/g)].flatMap((m) =>
  m[1].split(',').map((s) => s.trim().split(' as ').pop())
);

const entryFile = path.resolve('./scratch-entry.mjs');
fs.writeFileSync(
  entryFile,
  `import { ${allExports.join(', ')} } from ${JSON.stringify(distIndex)};\nconsole.log(${allExports.join(', ')});\n`
);

const { metafile } = await esbuild.build({
  entryPoints: [entryFile],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  metafile: true,
  write: false,
  minify: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  logLevel: 'silent',
});

fs.unlinkSync(entryFile);

const outputKey = Object.keys(metafile.outputs).find((k) => !k.endsWith('.map'));
const inputs = metafile.outputs[outputKey].inputs;

const groups = {};
for (const [file, { bytesInOutput }] of Object.entries(inputs)) {
  let key;
  const nmMatch = file.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/);
  if (nmMatch) {
    key = nmMatch[1];
  } else if (file.includes('dist/')) {
    key = 'hearth-react (own code)';
  } else {
    key = 'other';
  }
  groups[key] = (groups[key] || 0) + bytesInOutput;
}

const total = Object.values(groups).reduce((a, b) => a + b, 0);
const sorted = Object.entries(groups).sort((a, b) => b[1] - a[1]);

console.log(`Total minified bundle (full package, all exports): ${(total / 1024).toFixed(1)} KB\n`);
for (const [key, bytes] of sorted) {
  console.log(`${((100 * bytes) / total).toFixed(1)}%\t${(bytes / 1024).toFixed(1)} KB\t${key}`);
}

console.log('\n--- @base-ui/react breakdown by submodule ---\n');
const baseUiGroups = {};
for (const [file, { bytesInOutput }] of Object.entries(inputs)) {
  const m = file.match(/@base-ui\/react\/esm\/([^/]+)\//);
  if (m) baseUiGroups[m[1]] = (baseUiGroups[m[1]] || 0) + bytesInOutput;
}
const baseUiTotal = Object.values(baseUiGroups).reduce((a, b) => a + b, 0);
for (const [key, bytes] of Object.entries(baseUiGroups).sort((a, b) => b[1] - a[1])) {
  console.log(`${((100 * bytes) / baseUiTotal).toFixed(1)}%\t${(bytes / 1024).toFixed(1)} KB\t${key}`);
}

console.log('\n--- top "other" files ---\n');
const otherFiles = Object.entries(inputs)
  .filter(([file]) => !file.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/) && !file.includes('/dist/'))
  .sort((a, b) => b[1].bytesInOutput - a[1].bytesInOutput)
  .slice(0, 15);
for (const [file, { bytesInOutput }] of otherFiles) {
  console.log(`${(bytesInOutput / 1024).toFixed(1)} KB\t${file}`);
}

console.log('\n--- by ecosystem family ---\n');
const RADIX_FAMILY = new Set(['react-remove-scroll','react-remove-scroll-bar','aria-hidden','use-sidecar','use-sync-external-store','tslib','get-nonce','use-callback-ref','react-style-singleton']);
const families = {};
for (const [key, bytes] of Object.entries(groups)) {
  let fam;
  if (key.startsWith('@radix-ui/') || key === 'radix-ui' || RADIX_FAMILY.has(key)) fam = 'radix-ui (family)';
  else if (key === '@base-ui/react' || key === '@base-ui/utils' || key.startsWith('@floating-ui/')) fam = 'base-ui (family, incl. floating-ui)';
  else fam = key;
  families[fam] = (families[fam] || 0) + bytes;
}
for (const [key, bytes] of Object.entries(families).sort((a,b)=>b[1]-a[1])) {
  console.log(`${((100*bytes)/total).toFixed(1)}%\t${(bytes/1024).toFixed(1)} KB\t${key}`);
}
