# EmailJS Einrichtung für das Kontaktformular

Um das Kontaktformular funktionsfähig zu machen, müssen Sie EmailJS einrichten. Folgen Sie diesen Schritten:

## 1. EmailJS-Konto erstellen

1. Besuchen Sie [https://www.emailjs.com/](https://www.emailjs.com/)
2. Klicken Sie auf "Sign Up" und erstellen Sie ein kostenloses Konto
3. Bestätigen Sie Ihre E-Mail-Adresse

## 2. E-Mail-Dienst hinzufügen

1. Loggen Sie sich in Ihr EmailJS-Dashboard ein
2. Klicken Sie auf "Email Services" im linken Menü
3. Klicken Sie auf "Add New Service"
4. Wählen Sie Ihren E-Mail-Anbieter (z.B. Gmail, Outlook usw.)
5. Folgen Sie den Anweisungen, um Ihren E-Mail-Dienst zu verbinden

## 3. E-Mail-Vorlage erstellen

1. Klicken Sie auf "Email Templates" im linken Menü
2. Klicken Sie auf "Create New Template"
3. Geben Sie einen Template-Namen ein (z.B. "Kontaktanfrage")
4. Passen Sie die Vorlage mit folgendem Inhalt an:

**Betreff:** Neue Kontaktanfrage von {{from_name}}

**Inhalt:**
```
Sie haben eine neue Kontaktanfrage erhalten:

Name: {{from_name}}
E-Mail: {{from_email}}
Telefon: {{phone}}
Event-Datum: {{event_date}}
Anzahl Gäste: {{guests}}

Nachricht:
{{message}}
```

5. Klicken Sie auf "Save"

## 4. Anmeldeinformationen kopieren

1. Gehen Sie zu "Email Services" und notieren Sie sich Ihre **Service ID**
2. Gehen Sie zu "Email Templates" und notieren Sie sich Ihre **Template ID**
3. Klicken Sie auf "Account" im linken Menü und notieren Sie sich Ihren **Public Key**

## 5. Konfigurationsdatei aktualisieren

Öffnen Sie die Datei `src/config/emailjs.ts` und ersetzen Sie die Platzhalter:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'IHRE_SERVICE_ID', // Ersetzen mit Ihrer Service-ID
  TEMPLATE_ID: 'IHRE_TEMPLATE_ID', // Ersetzen mit Ihrer Template-ID
  PUBLIC_KEY: 'IHR_PUBLIC_KEY', // Ersetzen mit Ihrem Public Key
};
```

## 6. Testen

Starten Sie die Anwendung mit `npm run dev` und füllen Sie das Kontaktformular aus. Sie sollten eine E-Mail mit den Formulardaten erhalten.

## Hinweise

- Das kostenlose EmailJS-Konto ist auf 200 E-Mails pro Monat begrenzt
- Die Empfänger-E-Mail-Adresse ist bereits auf `meatthebutcher@web.de` eingestellt, kann aber in der Konfigurationsdatei geändert werden
- Stellen Sie sicher, dass alle Formularfelder in Ihrer EmailJS-Vorlage mit den Parametern im Code übereinstimmen