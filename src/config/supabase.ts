import { createClient } from '@supabase/supabase-js';

// Supabase Konfiguration
// Diese Werte müssen durch Ihre Supabase-Anmeldeinformationen ersetzt werden
const supabaseUrl = 'https://your-project-id.supabase.co'; // Ersetzen mit Ihrer Supabase URL
const supabaseAnonKey = 'your-anon-key'; // Ersetzen mit Ihrem Supabase Anonymous Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);