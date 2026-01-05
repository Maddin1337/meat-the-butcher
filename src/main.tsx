import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initI18n } from './i18n';

// Initialisiere Internationalisierung
initI18n();

// Service Worker für PWA registrieren
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registriert:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker Registrierung fehlgeschlagen:', error);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
