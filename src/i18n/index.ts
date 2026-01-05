/**
 * Internationalisierung (i18n) Setup
 * 
 * Diese Datei bereitet die Anwendung für mehrsprachige Unterstützung vor.
 * Aktuell ist die App auf Deutsch konfiguriert, aber die Struktur ist
 * erweiterbar für weitere Sprachen.
 */

export type SupportedLocale = 'de' | 'en';

export interface Translations {
  [key: string]: string | Translations;
}

// Standard-Sprache
export const DEFAULT_LOCALE: SupportedLocale = 'de';

// Unterstützte Sprachen
export const SUPPORTED_LOCALES: SupportedLocale[] = ['de', 'en'];

// Aktuelle Sprache (kann später aus LocalStorage oder URL-Parameter geladen werden)
let currentLocale: SupportedLocale = DEFAULT_LOCALE;

/**
 * Setzt die aktuelle Sprache
 */
export const setLocale = (locale: SupportedLocale): void => {
  if (SUPPORTED_LOCALES.includes(locale)) {
    currentLocale = locale;
    // Speichere in LocalStorage für Persistenz
    localStorage.setItem('preferred-locale', locale);
    // Aktualisiere HTML lang-Attribut
    document.documentElement.lang = locale;
  }
};

/**
 * Gibt die aktuelle Sprache zurück
 */
export const getLocale = (): SupportedLocale => {
  // Versuche aus LocalStorage zu laden
  const saved = localStorage.getItem('preferred-locale') as SupportedLocale;
  if (saved && SUPPORTED_LOCALES.includes(saved)) {
    currentLocale = saved;
  }
  return currentLocale;
};

/**
 * Initialisiert i18n beim App-Start
 */
export const initI18n = (): void => {
  const locale = getLocale();
  setLocale(locale);
};

// Übersetzungen (aktuell nur Deutsch)
const translations: Record<SupportedLocale, Translations> = {
  de: {
    // Navigation
    nav: {
      home: 'Startseite',
      features: 'Features',
      gallery: 'Galerie',
      contact: 'Kontakt',
      impressum: 'Impressum',
      datenschutz: 'Datenschutz',
    },
    // Hero Section
    hero: {
      title: 'MEAT THE BUTCHER',
      subtitle: 'Catering Euskirchen',
    },
    // Contact Form
    contact: {
      title: 'KONTAKT',
      name: 'Name',
      email: 'E-Mail',
      phone: 'Telefon',
      eventDate: 'Event-Datum',
      guests: 'Anzahl Gäste',
      message: 'Nachricht',
      submit: 'ANFRAGE SENDEN',
      submitting: 'WIRD GESENDET...',
      required: 'erforderlich',
    },
    // Success Messages
    success: {
      formSubmitted: 'ANFRAGE ERFOLGREICH GESENDET',
      formSubmittedDescription: 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.',
    },
    // Error Messages
    error: {
      emailSendFailed: 'Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.',
    },
  },
  en: {
    // English translations (Platzhalter für zukünftige Implementierung)
    nav: {
      home: 'Home',
      features: 'Features',
      gallery: 'Gallery',
      contact: 'Contact',
      impressum: 'Imprint',
      datenschutz: 'Privacy',
    },
    hero: {
      title: 'MEAT THE BUTCHER',
      subtitle: 'Catering Euskirchen',
    },
    contact: {
      title: 'CONTACT',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      eventDate: 'Event Date',
      guests: 'Number of Guests',
      message: 'Message',
      submit: 'SEND REQUEST',
      submitting: 'SENDING...',
      required: 'required',
    },
    success: {
      formSubmitted: 'REQUEST SUCCESSFULLY SENT',
      formSubmittedDescription: 'Thank you! We will contact you shortly.',
    },
    error: {
      emailSendFailed: 'There was a problem sending your request. Please try again later.',
    },
  },
};

/**
 * Übersetzungsfunktion
 * @param key - Übersetzungsschlüssel (z.B. 'nav.home' oder 'contact.title')
 * @param params - Optionale Parameter für Platzhalter
 * @returns Übersetzter Text
 */
export const t = (key: string, params?: Record<string, string>): string => {
  const locale = getLocale();
  const keys = key.split('.');
  let value: string | Translations | undefined = translations[locale];

  // Navigiere durch verschachtelte Objekte
  for (const k of keys) {
    if (typeof value === 'object' && value !== null && k in value) {
      value = value[k];
    } else {
      // Fallback auf Deutsch wenn Übersetzung fehlt
      value = translations[DEFAULT_LOCALE];
      for (const fallbackKey of keys) {
        if (typeof value === 'object' && value !== null && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Gib Schlüssel zurück wenn keine Übersetzung gefunden
        }
      }
      break;
    }
  }

  // Wenn value ein String ist, ersetze Platzhalter
  if (typeof value === 'string' && params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
      return params[paramKey] || match;
    });
  }

  return typeof value === 'string' ? value : key;
};

/**
 * Hook für React-Komponenten (für zukünftige Verwendung)
 * @example const { t, locale, setLocale } = useTranslation();
 */
export const useTranslation = () => {
  return {
    t,
    locale: getLocale(),
    setLocale,
    supportedLocales: SUPPORTED_LOCALES,
  };
};

