# PWA und Analytics Setup

Diese Dokumentation beschreibt die implementierten Features für Progressive Web App (PWA), Analytics und Internationalisierung.

## 1. Analytics und Tracking

### Google Analytics Integration

Die Anwendung ist vorbereitet für Google Analytics. Um Analytics zu aktivieren:

1. **Erstellen Sie eine `.env` Datei** im Projekt-Root:
```env
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

2. **Holen Sie sich Ihre Google Analytics Tracking-ID**:
   - Gehen Sie zu [Google Analytics](https://analytics.google.com/)
   - Erstellen Sie eine neue Property oder verwenden Sie eine bestehende
   - Kopieren Sie die Tracking-ID (Format: `G-XXXXXXXXXX` für GA4)

3. **Die Analytics-Komponente wird automatisch geladen**:
   - Die `Analytics.tsx` Komponente ist bereits in `App.tsx` integriert
   - Seitenaufrufe werden automatisch getrackt
   - Route-Änderungen werden erfasst

### Verwendung in Komponenten

```typescript
import { trackEvent } from '../config/analytics';

// Custom Event tracken
trackEvent('button_click', {
  button_name: 'contact_submit',
  section: 'contact'
});
```

### Verfügbare Funktionen

- `initGoogleAnalytics()` - Initialisiert Google Analytics
- `trackPageView(path?)` - Trackt einen Seitenaufruf
- `trackEvent(eventName, params?)` - Trackt ein Custom Event
- `isAnalyticsEnabled()` - Prüft ob Analytics aktiviert ist

## 2. Progressive Web App (PWA)

### Features

Die Anwendung ist jetzt als Progressive Web App konfiguriert mit:

- **Offline-Funktionalität** - Service Worker cached statische Assets
- **Installierbar** - Kann auf dem Home-Screen installiert werden
- **App-Manifest** - Vollständige Manifest-Datei mit Icons und Metadaten
- **Cache-Strategie** - Cache-First für bessere Performance

### Service Worker

Der Service Worker (`public/sw.js`) implementiert:

- **Caching** von statischen Assets
- **Offline-Fallback** für Navigation-Requests
- **Automatische Cache-Bereinigung** bei Updates
- **Ignorierung** von Analytics-Requests (nicht gecacht)

### Manifest

Das PWA-Manifest (`public/manifest.json`) enthält:

- App-Name und Beschreibung
- Icons für verschiedene Geräte
- Theme-Farbe (Butcher-Rot: #C41E3A)
- Start-URL und Display-Modus
- Shortcuts für schnellen Zugriff

### Installation

Benutzer können die App installieren:

- **Desktop**: Browser zeigt Install-Button in der Adressleiste
- **Mobile**: "Zum Home-Bildschirm hinzufügen" Option
- **Automatisch**: Nach wiederholtem Besuch

### PWA Utility-Funktionen

```typescript
import { 
  isPWAInstalled, 
  isServiceWorkerSupported,
  isOffline,
  onOfflineStatusChange 
} from '../utils/pwaUtils';

// Prüfe ob App installiert ist
if (isPWAInstalled()) {
  console.log('App ist als PWA installiert');
}

// Offline-Status überwachen
const cleanup = onOfflineStatusChange((isOffline) => {
  if (isOffline) {
    console.log('App ist offline');
  }
});
```

## 3. Internationalisierung (i18n)

### Struktur

Die i18n-Struktur ist vorbereitet für mehrsprachige Unterstützung:

- **Aktuell unterstützt**: Deutsch (Standard)
- **Vorbereitet für**: Englisch (Platzhalter vorhanden)
- **Erweiterbar**: Weitere Sprachen können einfach hinzugefügt werden

### Verwendung

```typescript
import { t, setLocale, getLocale } from '../i18n';

// Übersetzung abrufen
const title = t('hero.title'); // "MEAT THE BUTCHER"
const contactTitle = t('contact.title'); // "KONTAKT"

// Sprache ändern
setLocale('en'); // Wechselt zu Englisch

// Aktuelle Sprache abrufen
const currentLang = getLocale(); // "de" oder "en"
```

### Übersetzungen hinzufügen

1. Öffnen Sie `src/i18n/index.ts`
2. Fügen Sie Übersetzungen zum entsprechenden Sprach-Objekt hinzu:

```typescript
de: {
  mySection: {
    myKey: 'Mein deutscher Text'
  }
},
en: {
  mySection: {
    myKey: 'My English text'
  }
}
```

3. Verwenden Sie die Übersetzung:

```typescript
const text = t('mySection.myKey');
```

### React Hook (für zukünftige Verwendung)

```typescript
import { useTranslation } from '../i18n';

function MyComponent() {
  const { t, locale, setLocale } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <button onClick={() => setLocale('en')}>
        Switch to English
      </button>
    </div>
  );
}
```

## Konfiguration

### Umgebungsvariablen

Erstellen Sie eine `.env` Datei im Projekt-Root:

```env
# Google Analytics Tracking ID (optional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Build-Konfiguration

Die PWA-Features funktionieren automatisch nach dem Build. Der Service Worker wird beim Build-Prozess in den `dist`-Ordner kopiert.

## Testing

### PWA testen

1. **Lokaler Build**: `npm run build && npm run preview`
2. **Service Worker prüfen**: 
   - Öffnen Sie DevTools > Application > Service Workers
   - Prüfen Sie ob Service Worker registriert ist
3. **Offline testen**:
   - DevTools > Network > Offline aktivieren
   - Seite sollte weiterhin funktionieren

### Analytics testen

1. **Google Analytics DebugView**:
   - Installieren Sie die [Google Analytics Debugger Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
   - Aktivieren Sie die Extension
   - Öffnen Sie DevTools > Console
   - Events sollten in der Console erscheinen

2. **Real-Time Reports**:
   - Gehen Sie zu Google Analytics > Reports > Real-Time
   - Besuchen Sie die Website
   - Sie sollten sich selbst als aktiven Benutzer sehen

## Browser-Unterstützung

- **Service Worker**: Chrome, Firefox, Safari (iOS 11.3+), Edge
- **PWA Install**: Chrome, Edge, Safari (iOS), Firefox
- **Google Analytics**: Alle modernen Browser

## Nächste Schritte

1. **Google Analytics aktivieren**: Fügen Sie Ihre Tracking-ID in `.env` ein
2. **Icons optimieren**: Erstellen Sie spezifische PWA-Icons in verschiedenen Größen
3. **Weitere Sprachen**: Fügen Sie Übersetzungen für weitere Sprachen hinzu
4. **Push-Notifications**: Erweitern Sie den Service Worker für Push-Benachrichtigungen (optional)

## Troubleshooting

### Service Worker wird nicht registriert

- Prüfen Sie ob HTTPS aktiviert ist (oder localhost)
- Prüfen Sie die Browser-Konsole auf Fehler
- Stellen Sie sicher, dass `sw.js` im `public`-Ordner liegt

### Analytics trackt nicht

- Prüfen Sie ob `VITE_GA_TRACKING_ID` korrekt gesetzt ist
- Prüfen Sie die Browser-Konsole auf Fehler
- Verwenden Sie die Google Analytics Debugger Extension

### PWA kann nicht installiert werden

- Stellen Sie sicher, dass das Manifest korrekt ist
- Prüfen Sie ob alle Icons vorhanden sind
- Die App muss über HTTPS (oder localhost) geladen werden

