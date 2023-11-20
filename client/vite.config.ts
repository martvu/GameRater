import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ['src/setupTests.ts'],
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
    },
  },
  base: '/project2',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
