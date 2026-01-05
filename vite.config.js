import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    hmr: {
      clientPort: 3000
    },
    watch: {
      usePolling: false
    }
  },
  preview: {
    port: process.env.PORT || 5000,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
});

