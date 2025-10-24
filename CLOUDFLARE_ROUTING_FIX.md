# Cloudflare Pages Routing Problem - Lösung

## Problembeschreibung

Wenn Sie auf Ihrer auf Cloudflare Pages gehosteten Website auf die Links für "Impressum" oder "Datenschutz" klicken, werden Sie zur Homepage weitergeleitet anstatt zu den entsprechenden Seiten.

## Ursache des Problems

Das Problem liegt daran, dass Ihre React-Anwendung als Single Page Application (SPA) entwickelt wurde, die client-seitiges Routing verwendet. Cloudflare Pages weiß jedoch nicht, wie es mit den Routen `/impressum` und `/datenschutz` umgehen soll, da diese physisch nicht als Dateien existieren.

In Ihrer [`App.tsx`](src/App.tsx:30-40) haben Sie React Router mit folgenden Routen definiert:
- `/` für die Homepage
- `/impressum` für das Impressum
- `/datenschutz` für die Datenschutzerklärung

Wenn ein Benutzer jedoch direkt auf `https://ihre-domain.com/impressum` zugreift, sucht Cloudflare Pages nach einer physischen Datei `impressum.html` oder `impressum/index.html`, die nicht existiert.

## Lösung: _redirects-Datei erstellen

Um dieses Problem zu beheben, müssen Sie eine `_redirects`-Datei im `public`-Verzeichnis Ihrer Anwendung erstellen. Diese Datei weist Cloudflare Pages an, wie Anfragen für Ihre SPA-Routen behandelt werden sollen.

### Inhalt der _redirects-Datei:

```
# Single Page Application Routing für React
/*    /index.html   200
```

Diese Konfiguration bewirkt Folgendes:
- Alle Anfragen (`/*`), die nicht auf eine existierende Datei treffen
- Werden zur `index.html` weitergeleitet
- Mit HTTP-Statuscode 200 (nicht 302/301 Redirect, sondern internes Rewrite)

### Alternative detailliertere Konfiguration:

Wenn Sie spezifischer sein möchten, können Sie auch einzelne Routen definieren:

```
# Spezifische Routen
/impressum    /index.html   200
/datenschutz    /index.html   200

# Fallback für alle anderen Routen
/*              /index.html   200
```

## Implementierungsschritte

1. Erstellen Sie eine Datei namens `_redirects` im `public`-Verzeichnis
2. Fügen Sie den oben genannten Inhalt hinzu
3. Laden Sie Ihre Anwendung erneut zu Cloudflare Pages hoch

## Warum das funktioniert

Cloudflare Pages unterstützt die `_redirects`-Datei als Methode zur Konfiguration von URL-Umschreibungen. Die Syntax lautet:

```
# Format: [Quell-URL] [Ziel-URL] [HTTP-Statuscode]
```

Bei einer SPA möchten Sie, dass alle Routen intern zur `index.html` umgeschrieben werden, damit React Router die client-seitige Navigation übernehmen kann.

## Zusätzliche Empfehlungen

1. **Testen Sie lokal**: Stellen Sie sicher, dass das Routing lokal mit `npm run dev` funktioniert
2. **Build-Prozess überprüfen**: Stellen Sie sicher, dass die `_redirects`-Datei in den Build-Output kopiert wird
3. **Cloudflare Pages Einstellungen**: Überprüfen Sie in den Cloudflare Pages Einstellungen, ob "Single Page Application" aktiviert ist (falls verfügbar)

## Zusammenfassung

Das Problem ist typisch für SPAs, die auf statischen Hosting-Plattformen wie Cloudflare Pages部署 werden. Die `_redirects`-Datei ist die Standardlösung, um client-seitiges Routing auf solchen Plattformen zu ermöglichen.

Nach dem Hinzufügen dieser Datei sollten die Links zu Impressum und Datenschutz korrekt funktionieren.