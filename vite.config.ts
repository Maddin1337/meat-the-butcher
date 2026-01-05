import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    cssCodeSplit: true, // CSS-Code-Splitting aktivieren
    rollupOptions: {
      output: {
        // Optimiertes Chunk-Splitting
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Sourcemaps für Production deaktivieren (kleinere Bundle-Größe)
    sourcemap: false,
    // Minify für kleinere Bundle-Größe
    minify: 'esbuild',
  },
  server: {
    host: '0.0.0.0', // Erlaubt Zugriff von allen Netzwerk-Interfaces
    port: 5173, // Standard Vite Port (kann geändert werden)
    strictPort: false, // Wenn Port belegt ist, wird automatisch nächster freier Port verwendet
  },
  preview: {
    host: '0.0.0.0', // Auch für Preview-Modus
    port: 4173, // Standard Vite Preview Port
    strictPort: false,
  },
});
