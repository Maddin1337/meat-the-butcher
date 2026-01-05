import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGoogleAnalytics, trackPageView, isAnalyticsEnabled } from '../config/analytics';

/**
 * Analytics-Komponente
 * 
 * Initialisiert Analytics-Tools und trackt Seitenaufrufe.
 * Diese Komponente sollte einmalig in der App-Komponente eingebunden werden.
 */
export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Initialisiere Google Analytics beim ersten Laden
    if (isAnalyticsEnabled()) {
      initGoogleAnalytics();
    }
  }, []);

  useEffect(() => {
    // Tracke Seitenaufrufe bei Route-Änderungen
    if (isAnalyticsEnabled()) {
      trackPageView(location.pathname + location.search);
    }
  }, [location]);

  // Diese Komponente rendert nichts
  return null;
}

