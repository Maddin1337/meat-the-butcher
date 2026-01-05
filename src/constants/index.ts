/**
 * Zentrale Konstanten für die Anwendung
 * Enthält alle Magic Numbers, Strings und Konfigurationswerte
 */

// Navigation IDs
export const SECTION_IDS = {
  HERO: 'hero',
  FEATURES: 'features',
  GALLERY: 'gallery',
  CONTACT: 'contact',
  SOCIAL: 'social',
} as const;

// Scroll-Verhalten
export const SCROLL_BEHAVIOR = {
  SMOOTH: 'smooth' as const,
  INSTANT: 'instant' as const,
} as const;

// Intersection Observer Konfiguration
export const INTERSECTION_OBSERVER_CONFIG = {
  THRESHOLD: 0.1,
  ROOT_MARGIN: '50px',
  THRESHOLD_LAZY: 0.01,
} as const;

// Animation Delays (in Millisekunden)
export const ANIMATION_DELAYS = {
  FEATURE_SECTION_1: 0,
  FEATURE_SECTION_2: 200,
  FEATURE_SECTION_3: 400,
  GALLERY_IMAGE: 50,
} as const;

// Galerie Konfiguration
export const GALLERY_CONFIG = {
  INITIAL_IMAGES_COUNT: 16,
  SKELETON_COUNT: 16,
} as const;

// Formular Validierung
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_GUESTS: 1,
} as const;

// Success Modal
export const SUCCESS_MODAL = {
  AUTO_CLOSE_DELAY: 5000, // 5 Sekunden
} as const;

// Responsive Breakpoints (für JavaScript-Logik)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Z-Index Layers
export const Z_INDEX = {
  HEADER: 50,
  MODAL: 50,
  MODAL_OVERLAY: 40,
  BACK_TO_TOP: 30,
} as const;

// Accessibility
export const ARIA_LABELS = {
  MENU_OPEN: 'Menü öffnen',
  MENU_CLOSE: 'Menü schließen',
  CLOSE_MODAL: 'Modal schließen',
  PREVIOUS_IMAGE: 'Vorheriges Bild',
  NEXT_IMAGE: 'Nächstes Bild',
  LOADING: 'Laden...',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  EMAIL_SEND_FAILED: 'Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.',
  GALLERY_LOAD_FAILED: 'Fehler beim Laden der Galerie-Bilder',
  PHOTOS_LOAD_FAILED: 'Fehler beim Laden der Fotos',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'ANFRAGE ERFOLGREICH GESENDET',
  FORM_SUBMITTED_DESCRIPTION: 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.',
} as const;

