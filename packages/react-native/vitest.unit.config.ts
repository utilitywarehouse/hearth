import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', '.storybook/a11y/**/*.test.ts'],
    exclude: ['src/**/*.stories.ts', 'src/**/*.stories.tsx'],
    environment: 'node',
  },
});
