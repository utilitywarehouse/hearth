import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  target: 'node18',
  outDir: 'dist',
  clean: true,
  // the private manifest package (and its zod dependency) ship inside the bundle
  noExternal: ['@utilitywarehouse/hearth-manifest', 'zod'],
});
