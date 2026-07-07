import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// First plain Vite SPA in the monorepo. Data snapshots are synced into
// `public/data` by `scripts/copy-data.js` (run via the `copy-data` script) and
// fetched at runtime, so they stay out of the JS bundle.
export default defineConfig({
  plugins: [react()],
  // Relative base so the built bundle works whether it's served from the root
  // (local dev/preview) or mounted under a sub-path, e.g. /analytics in
  // server-storybook-docs's Express server.
  base: './',
  server: {
    port: Number(process.env.PORT) || 4321,
  },
  build: {
    outDir: 'dist',
  },
});
