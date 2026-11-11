import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts', check: 'src/check/cli.ts' },
  format: ['esm'],
  target: 'node18',
  outDir: 'dist',
  clean: true,
});
