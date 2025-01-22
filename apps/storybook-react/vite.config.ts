import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@utilitywarehouse/hearth-fonts',
        replacement: path.resolve(__dirname, '../../packages/fonts/index.css'),
      },
    ],
  },
});
