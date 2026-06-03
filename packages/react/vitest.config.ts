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
                // Chromium refuses to start with its sandbox when running as root,
                // causing a silent hang while Playwright waits for the browser
                // WebSocket connection that never arrives. --no-sandbox is the
                // standard fix for root-user setups (e.g. the default
                // mcr.microsoft.com/playwright Docker image). Keyed off UID so
                // that switching to a rootless image automatically re-enables the
                // sandbox without any config change. process.getuid is Unix-only,
                // so the optional call returns undefined (falsy) on Windows.
                //
                // --disable-dev-shm-usage redirects Chromium's shared-memory
                // writes to /tmp instead of /dev/shm. Without it, 63 sequential
                // story files each leave allocations in /dev/shm that aren't
                // released until the browser closes; even with --shm-size=2g that
                // cap can be breached mid-run, causing "Failed to fetch" errors
                // and iframe CORS failures for random files.
                args: [
                  '--disable-dev-shm-usage',
                  ...(process.getuid?.() === 0 ? ['--no-sandbox', '--disable-setuid-sandbox'] : []),
                ],
              },
            }),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
