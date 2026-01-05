/**
 * Analytics-Konfiguration
 * 
 * Diese Datei enthält die Konfiguration für Analytics-Tools wie Google Analytics.
 * Um Google Analytics zu aktivieren, fügen Sie Ihre Tracking-ID in die Umgebungsvariable ein.
 */

// Google Analytics Tracking ID (aus Umgebungsvariable oder direkt hier eintragen)
// Format: G-XXXXXXXXXX oder UA-XXXXXXXXX-X
export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

// Prüfe ob Analytics aktiviert ist
export const isAnalyticsEnabled = (): boolean => {
  return GA_TRACKING_ID !== '' && GA_TRACKING_ID.length > 0;
};

/**
 * Initialisiert Google Analytics
 * Sollte nur einmal beim App-Start aufgerufen werden
 */
export const initGoogleAnalytics = (): void => {
  if (!isAnalyticsEnabled()) {
    console.log('Google Analytics ist nicht konfiguriert. Setzen Sie VITE_GA_TRACKING_ID in Ihrer .env Datei.');
    return;
  }

  // Google Analytics 4 (gtag.js) Script einfügen
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  // gtag Konfiguration
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
  });

  // Globale gtag-Funktion verfügbar machen
  (window as any).gtag = gtag;
};

/**
 * Sendet ein Pageview-Event an Google Analytics
 * @param path - Der Pfad der Seite (optional, verwendet aktuellen Pfad wenn nicht angegeben)
 */
export const trackPageView = (path?: string): void => {
  if (!isAnalyticsEnabled() || !(window as any).gtag) {
    return;
  }

  const pagePath = path || window.location.pathname + window.location.search;
  (window as any).gtag('config', GA_TRACKING_ID, {
    page_path: pagePath,
  });
};

/**
 * Sendet ein Custom Event an Google Analytics
 * @param eventName - Name des Events
 * @param eventParams - Zusätzliche Event-Parameter
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
): void => {
  if (!isAnalyticsEnabled() || !(window as any).gtag) {
    return;
  }

  (window as any).gtag('event', eventName, eventParams);
};

// TypeScript-Deklarationen für gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

