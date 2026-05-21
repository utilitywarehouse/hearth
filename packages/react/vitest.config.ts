import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  server: {
    watch: null, // disable chokidar watchers — not needed for one-shot test runs
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          fileParallelism: false,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({
            launchOptions: {
              // In Docker (CI), /dev/shm is 64MB by default. Chromium uses shared
              // memory per browser context; across 63 sequential story files the
              // allocation exhausts it, causing the last file to fail to fetch the
              // Storybook setup module. Using /tmp sidesteps the limit entirely.
              args: ['--disable-dev-shm-usage'],
            },
          }),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
