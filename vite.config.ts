import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@design-system': path.resolve(__dirname, 'design-system'),
      '@api-sdk': path.resolve(__dirname, 'api-sdk')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          student: ['./src/features/student/index.ts'],
          faculty: ['./src/features/faculty/index.ts'],
          admin: ['./src/features/admin/index.ts'],
          auth: ['amazon-cognito-identity-js'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});