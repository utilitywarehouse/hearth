import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    // a `vi.spyOn(console, 'warn')` is undone after each test, even when its assertions throw
    restoreMocks: true,
    include: ['src/**/__tests__/*.test.ts'],
  },
});
