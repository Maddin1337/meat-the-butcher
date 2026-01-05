import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
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
