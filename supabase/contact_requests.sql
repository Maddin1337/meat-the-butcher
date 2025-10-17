-- Erstellen der Tabelle für Kontaktanfragen
CREATE TABLE contact_requests (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  event_date DATE NOT NULL,
  guests INTEGER NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'neu' -- neu, in_bearbeitung, erledigt
);

-- RLAS (Row Level Security) Richtlinie
-- Erlaube das Einfügen von Daten für alle (ohne Authentifizierung)
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Alle dürfen Kontaktanfragen einfügen" ON contact_requests
  FOR INSERT WITH CHECK (true);

-- Erlaube das Lesen von Daten nur für authentifizierte Benutzer
CREATE POLICY "Nur authentifizierte Benutzer dürfen Kontaktanfragen lesen" ON contact_requests
  FOR SELECT USING (auth.role() = 'authenticated');

-- Index für bessere Performance
CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at);
CREATE INDEX idx_contact_requests_status ON contact_requests(status);