import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'src/components/cart/**/*.{js,jsx}',
        'src/components/food/**/*.{js,jsx}',
        'src/components/order/**/*.{js,jsx}',
        'src/components/ui/**/*.{js,jsx}',
        'src/context/**/*.{js,jsx}',
        'src/hooks/**/*.{js,jsx}',
        'src/utils/**/*.{js,jsx}',
        'src/constants/**/*.{js,jsx}',
      ],
      exclude: ['src/tests/**', 'src/hooks/useOrderSocket.js'],
      thresholds: {
        lines: 80,
        functions: 70,
        branches: 60,
        statements: 80,
      },
    },
  },
});
