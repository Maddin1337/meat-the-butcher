# Supabase Einrichtung für das Kontaktformular

Um das Kontaktformular mit Supabase zu verwenden, müssen Sie ein Supabase-Konto einrichten und die Datenbank konfigurieren. Folgen Sie diesen Schritten:

## 1. Supabase-Konto erstellen

1. Besuchen Sie [https://supabase.com/](https://supabase.com/)
2. Klicken Sie auf "Start your project" und erstellen Sie ein kostenloses Konto
3. Melden Sie sich mit Ihrem GitHub-Konto oder einer E-Mail-Adresse an

## 2. Neues Projekt erstellen

1. Klicken Sie auf "New Project"
2. Wählen Sie Ihre Organisation
3. Geben Sie einen Projektnamen ein (z.B. "meatthebutcher-contact")
4. Wählen Sie eine Datenbank-Region (empfohlen: eine Region in Europa)
5. Erstellen Sie ein sicheres Datenbank-Passwort und speichern Sie es sicher
6. Klicken Sie auf "Create new project"

## 3. Datenbank-Tabelle erstellen

1. Warten Sie, bis Ihr Projekt bereit ist (dies kann einige Minuten dauern)
2. Gehen Sie zum "Table Editor" im linken Menü
3. Klicken Sie auf "Create a new table"
4. Geben Sie folgende Informationen ein:
   - **Name**: contact_requests
   - **Enable Row Level Security**: Ja

5. Fügen Sie folgende Spalten hinzu:
   - **name**: Type: text, Is Nullable: No
   - **email**: Type: text, Is Nullable: No
   - **phone**: Type: text, Is Nullable: No
   - **event_date**: Type: date, Is Nullable: No
   - **guests**: Type: int8, Is Nullable: No
   - **message**: Type: text, Is Nullable: No
   - **status**: Type: text, Default Value: 'neu', Is Nullable: No

6. Klicken Sie auf "Save"

## 4. Row Level Security (RLS) einrichten

1. Gehen Sie zum "Authentication" Menü und dann zu "Policies"
2. Wählen Sie die Tabelle "contact_requests"
3. Klicken Sie auf "Add Policy"
4. Wählen Sie "For full customization" und klicken Sie auf "Next"
5. Geben Sie einen Policynamen ein: "Alle dürfen Kontaktanfragen einfügen"
6. Wählen Sie "INSERT" als Operation
7. Lassen Sie die Policy-Bedingung leer (oder verwenden Sie `true`)
8. Klicken Sie auf "Review" und dann auf "Save policy"

9. Erstellen Sie eine zweite Policy:
   - Name: "Nur authentifizierte Benutzer dürfen Kontaktanfragen lesen"
   - Operation: SELECT
   - Policy-Bedingung: `auth.role() = 'authenticated'`

## 5. API-Anmeldeinformationen kopieren

1. Gehen Sie zum "Project Settings" (Zahnrad-Symbol)
2. Klicken Sie auf "API"
3. Kopieren Sie die **Project URL** und den **anon public** API-Schlüssel

## 6. Konfigurationsdatei aktualisieren

Öffnen Sie die Datei `src/config/supabase.ts` und ersetzen Sie die Platzhalter:

```typescript
const supabaseUrl = 'https://your-project-id.supabase.co'; // Ersetzen mit Ihrer Project URL
const supabaseAnonKey = 'your-anon-key'; // Ersetzen mit Ihrem anon public Key
```

## 7. SQL-Tabelle erstellen (Alternative zu Schritt 3)

Wenn Sie die SQL-Datei verwenden möchten:

1. Gehen Sie zum "SQL Editor" im linken Menü
2. Klicken Sie auf "New query"
3. Kopieren Sie den Inhalt der Datei `supabase/contact_requests.sql`
4. Klicken Sie auf "Run" um die Tabelle zu erstellen

## 8. Testen

Starten Sie die Anwendung mit `npm run dev` und füllen Sie das Kontaktformular aus. Die Daten sollten in Ihrer Supabase-Datenbank gespeichert werden.

## 9. Daten anzeigen

1. Gehen Sie zum "Table Editor" im linken Menü
2. Wählen Sie die Tabelle "contact_requests"
3. Hier sehen Sie alle eingegangenen Kontaktanfragen

## Hinweise

- Sie können E-Mail-Benachrichtigungen in Supabase einrichten, um über neue Kontaktanfragen informiert zu werden
- Die kostenlose Supabase-Version bietet 500 MB Speicher und 2 GB Bandbreite pro Monat
- Stellen Sie sicher, dass die RLS-Policen korrekt eingerichtet sind, um unbefugten Zugriff zu verhindern