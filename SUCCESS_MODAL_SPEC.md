# Spezifikation für Erfolgs-Modal mit Blur-Effekt

## Übersicht
Erstellung eines visuell ansprechenden Erfolgs-Modals, das nach dem Senden einer Kontaktanfrage erscheint. Der Hintergrund soll unscharf (geblurred) werden, während die Erfolgsmeldung prominent im Vordergrund angezeigt wird.

## Design-Anforderungen

### 1. Layout-Struktur
- Vollflächiges Overlay, das den gesamten Bildschirm abdeckt
- Zentriertes Modal mit Erfolgsmeldung
- Halbtransparenter Hintergrund mit Blur-Effekt

### 2. Visuelle Elemente
- **Hintergrund-Overlay:**
  - Halbtransparenter schwarzer Hintergrund (rgba(0, 0, 0, 0.7))
  - Blur-Effekt für den Inhalt dahinter
  - Vollständige Bildschirmabdeckung (100vw x 100vh)

- **Modal-Container:**
  - Zentriert auf dem Bildschirm
  - Abgerundete Ecken
  - Hintergrund in Butcher-Schwarz oder -Rot
  - Border im Butcher-Rot-Stil
  - Padding für ausreichenden Weißraum
  - Maximale Breite: 500px

- **Erfolgs-Icon:**
  - Großes Erfolgssymbol (z.B. Haken oder Stern)
  - Farbe: Butcher-Rot oder Weiß
  - Animation: Einblenden oder Skalieren

- **Erfolgsmeldung:**
  - Hauptüberschrift: "ANFRAGE ERFOLGREICH GESENDET"
  - Untertitel: "Vielen Dank! Wir melden uns in Kürze bei Ihnen."
  - Schriftart: Bebas für Überschrift, Standardschrift für Untertitel
  - Farbe: Weiß

- **Schließen-Button:**
  - Optional: Button zum Schließen des Modals
  - Text: "OK" oder "SCHLIESSEN"
  - Styling im Butcher-Design

### 3. Animationen
- **Einblendeffekt:**
  - Hintergrund: Fade-in (0.3s)
  - Modal: Skalieren von 0.8 auf 1 mit Fade-in (0.4s)
  - Leichtes Bouncing bei voller Größe

- **Erfolgs-Icon:**
  - Verzögerte Animation (0.2s nach Modal)
  - Skalieren mit elastischem Effekt

### 4. Funktionalität
- Automatisches Schließen nach 5 Sekunden
- Manuelles Schließen durch Klick auf Schließen-Button
- Klick auf Hintergrund schließt das Modal
- Escape-Taste schließt das Modal

## Technical Implementation Details

### Dateistruktur
- Neue Komponente: `src/components/SuccessModal.tsx`
- Integration in: `src/components/Contact.tsx`

### State-Management
- Zusätzlicher State in Contact-Komponente: `showSuccessModal`
- Zeit automatisches Schließen: 5000ms

### Styling-Klassen
- Tailwind-Klassen für Layout und Styling
- Custom CSS für Blur-Effekt und komplexe Animationen

### Responsive Design
- Anpassung für mobile Geräte (kleinere Modal-Größe)
- Sicherstellung der Lesbarkeit auf allen Bildschirmgrößen

## Content-Texte
- **Titel:** "ANFRAGE ERFOLGREICH GESENDET"
- **Nachricht:** "Vielen Dank! Wir melden uns in Kürze bei Ihnen."
- **Button-Text:** "OK"

## Implementierungsreihenfolge
1. SuccessModal-Komponente erstellen
2. Contact-Komponente um Modal-State erweitern
3. Modal bei erfolgreichem Senden anzeigen
4. Animationen und Übergänge implementieren
5. Automatisches und manuelles Schließen implementieren
6. Responsive-Anpassungen vornehmen