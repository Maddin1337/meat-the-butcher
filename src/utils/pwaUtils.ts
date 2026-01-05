/**
 * PWA Utility-Funktionen
 * 
 * Hilfsfunktionen für Progressive Web App Features
 */

/**
 * Prüft ob die App als PWA installiert ist
 */
export const isPWAInstalled = (): boolean => {
  // Prüfe ob im Standalone-Modus (installiert)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }
  // Prüfe iOS Safari
  if ((window.navigator as any).standalone === true) {
    return true;
  }
  return false;
};

/**
 * Zeigt Install-Prompt an (falls verfügbar)
 */
export const showInstallPrompt = async (): Promise<boolean> => {
  // Prüfe ob beforeinstallprompt Event verfügbar ist
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    // PWA Install-Prompt wird automatisch vom Browser angezeigt
    // Diese Funktion kann erweitert werden für Custom Install-Buttons
    return true;
  }
  return false;
};

/**
 * Prüft ob Service Worker unterstützt wird
 */
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};

/**
 * Prüft ob die App offline ist
 */
export const isOffline = (): boolean => {
  return !navigator.onLine;
};

/**
 * Registriert einen Offline-Event-Listener
 */
export const onOfflineStatusChange = (
  callback: (isOffline: boolean) => void
): (() => void) => {
  const handleOnline = () => callback(false);
  const handleOffline = () => callback(true);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Cleanup-Funktion
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

