import path from 'path';
import { defineConfig } from 'tsup';

// actual exposed modules = 1 per component
export default defineConfig([
  {
    splitting: true,
    sourcemap: true,
    clean: true,
    format: ['cjs', 'esm'],
    minify: true,
    bundle: true,
    skipNodeModulesBundle: true,
    target: 'es2020',
    outDir: 'dist',
    entry: [
      './src/**/*.ts?(x)',
      '!./src/figma/**',
      '!./src/**/*.stories.ts?(x)',
      '!./src/**/*.docs.mdx',
      '!./src/docs/**',
      '!./src/scripts/**',
    ],
    tsconfig: path.join(__dirname, './tsconfig.build.json'),
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";\n',
      };
    },
  },
]);
