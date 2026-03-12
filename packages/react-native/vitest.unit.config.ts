import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['src/**/*.stories.ts', 'src/**/*.stories.tsx'],
    environment: 'node',
  },
});
