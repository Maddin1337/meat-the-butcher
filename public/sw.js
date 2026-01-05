/**
 * Service Worker für Progressive Web App (PWA)
 * 
 * Dieser Service Worker ermöglicht:
 * - Offline-Funktionalität
 * - Caching von statischen Assets
 * - Verbesserte Performance durch Cache-Strategien
 */

const CACHE_NAME = 'meat-the-butcher-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/logo-meatthebutcher.png',
  '/manifest.json',
];

// Install Event - Cache statische Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Aktiviere den Service Worker sofort
  self.skipWaiting();
});

// Activate Event - Lösche alte Caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Übernehme Kontrolle über alle Clients sofort
  (self as ServiceWorkerGlobalScope).clients.claim();
});

// Fetch Event - Cache-First Strategie
self.addEventListener('fetch', (event) => {
  // Nur GET-Requests cachen
  if (event.request.method !== 'GET') {
    return;
  }

  // Ignoriere Analytics- und Tracking-Requests
  const url = new URL(event.request.url);
  if (
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('googletagmanager.com') ||
    url.hostname.includes('analytics')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache Hit - gib gecachte Version zurück
      if (response) {
        return response;
      }

      // Cache Miss - lade vom Netzwerk
      return fetch(event.request)
        .then((response) => {
          // Prüfe ob Response gültig ist
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone Response für Cache
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Bei Netzwerkfehler: Fallback für Navigation-Requests
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// Message Event - Für Kommunikation mit der App
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

