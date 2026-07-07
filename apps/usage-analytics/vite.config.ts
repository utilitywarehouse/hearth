import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// First plain Vite SPA in the monorepo. Data snapshots are synced into
// `public/data` by `scripts/copy-data.js` (run via the `copy-data` script) and
// fetched at runtime, so they stay out of the JS bundle.
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 4321,
  },
  build: {
    outDir: 'dist',
  },
});
