/// <reference types="vite/client" />

/**
 * Erweiterte TypeScript-Deklarationen für die Anwendung
 */

// Service Worker Types
interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  skipWaiting(): Promise<void>;
  clients: Clients;
}

interface Clients {
  claim(): Promise<void>;
}

interface ExtendableEvent extends Event {
  waitUntil(promise: Promise<void>): void;
}

interface FetchEvent extends ExtendableEvent {
  request: Request;
  respondWith(response: Promise<Response>): void;
}

// Environment Variables
interface ImportMetaEnv {
  readonly VITE_GA_TRACKING_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
