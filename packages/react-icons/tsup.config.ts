import { defineConfig } from 'tsup';

export default defineConfig([
  {
    sourcemap: true,
    clean: true,
    format: ['cjs', 'esm'],
    bundle: true,
    skipNodeModulesBundle: true,
    target: 'es2020',
    outDir: 'dist',
    entry: ['./lib/**/*.ts?(x)'],
  },
]);
