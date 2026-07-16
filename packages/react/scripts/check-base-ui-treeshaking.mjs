/**
 * Verifies that importing a single hearth-react component doesn't pull unrelated
 * @base-ui/react submodules into the bundle. Requires `pnpm build:js` to have run first.
 */

import esbuild from 'esbuild';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distIndex = path.resolve(__dirname, '../dist/index.js');

// Expected sets include base-ui's own internal composition dependencies (e.g. `menu`
// pulls in `menubar`/`toolbar`/`context-menu` inside base-ui itself) — not just the
// single primitive each component imports directly.
const PROBES = [
  {
    component: 'Menu',
    expected: [
      'context-menu',
      'floating-ui-react',
      'internals',
      'menu',
      'menubar',
      'merge-props',
      'separator',
      'toolbar',
      'utils',
    ],
  },
  {
    component: 'Combobox',
    expected: [
      'combobox',
      'field',
      'floating-ui-react',
      'internals',
      'merge-props',
      'separator',
      'utils',
    ],
  },
  {
    component: 'SegmentedControl',
    expected: [
      'floating-ui-react',
      'internals',
      'merge-props',
      'toggle',
      'toggle-group',
      'toolbar',
      'utils',
    ],
  },
];

if (!fs.existsSync(distIndex)) {
  console.error(`Missing ${distIndex} — run \`pnpm build:js\` first.`);
  process.exit(1);
}

const baseUiSubmodule = inputPath => {
  const match = inputPath.match(/@base-ui\/react\/esm\/([^/]+)\//);
  return match ? match[1] : null;
};

let hasFailure = false;

for (const { component, expected } of PROBES) {
  const entryFile = path.join(os.tmpdir(), `treeshake-probe-${component}.mjs`);
  fs.writeFileSync(
    entryFile,
    `import { ${component} } from ${JSON.stringify(distIndex)};\nconsole.log(${component});\n`
  );

  const { metafile } = await esbuild.build({
    entryPoints: [entryFile],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    metafile: true,
    write: false,
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    logLevel: 'silent',
  });

  fs.unlinkSync(entryFile);

  // metafile.inputs lists every file esbuild *read*, including ones tree-shaken down to
  // zero bytes — metafile.outputs[...].inputs[...].bytesInOutput is what actually shipped.
  const outputKey = Object.keys(metafile.outputs).find(k => !k.endsWith('.map'));
  const shippedInputs = metafile.outputs[outputKey].inputs;
  const submodules = [
    ...new Set(
      Object.entries(shippedInputs)
        .filter(([, { bytesInOutput }]) => bytesInOutput > 0)
        .map(([file]) => baseUiSubmodule(file))
        .filter(Boolean)
    ),
  ].sort();
  const expectedSorted = [...expected].sort();
  const unexpected = submodules.filter(s => !expectedSorted.includes(s));

  if (unexpected.length > 0) {
    hasFailure = true;
    console.error(
      `✗ ${component}: expected [${expectedSorted.join(', ')}], got [${submodules.join(', ')}]`
    );
    console.error(`  unexpected base-ui submodules leaked in: ${unexpected.join(', ')}`);
  } else {
    console.log(`✓ ${component}: [${submodules.join(', ')}]`);
  }
}

if (hasFailure) {
  console.error('\nbase-ui tree-shaking check failed.');
  process.exit(1);
}
