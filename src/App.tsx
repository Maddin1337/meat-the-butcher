import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PhotoGallery from './components/PhotoGallery';
import Contact from './components/Contact';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollIndicator from './components/ScrollIndicator';
import StructuredData from './components/StructuredData';
import SkipToContent from './components/SkipToContent';
import ErrorBoundary from './components/ErrorBoundary';
import Analytics from './components/Analytics';
import { ARIA_LABELS } from './constants';

// Lazy Loading für weniger häufig besuchte Seiten
const Impressum = lazy(() => import('./components/Impressum'));
const Datenschutz = lazy(() => import('./components/Datenschutz'));

/**
 * HomePage-Komponente - Hauptseite der Anwendung
 * Enthält alle Hauptsektionen: Hero, Features, Galerie, Kontakt, Social Media
 */
function HomePage() {
  return (
    <>
      <SkipToContent />
      <div className="min-h-screen">
        <ScrollIndicator />
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Features />
          <PhotoGallery />
          <Contact />
          <SocialMedia />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

/**
 * Loading Fallback für lazy-loaded Komponenten
 * Wird angezeigt während Komponenten geladen werden
 */
const LoadingFallback = () => (
  <div className="min-h-screen bg-butcher-black text-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-butcher-red border-t-transparent rounded-full animate-spin mx-auto mb-4" aria-label={ARIA_LABELS.LOADING}></div>
      <p className="text-gray-300">{ARIA_LABELS.LOADING}</p>
    </div>
  </div>
);

/**
 * Haupt-App-Komponente
 * Enthält Routing, Error Boundary und Strukturierte Daten
 */
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Analytics />
        <StructuredData />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
