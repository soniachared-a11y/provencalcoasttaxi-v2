import { createClient } from '@supabase/supabase-js'

// Clé anon publique (JWT role=anon) — conçue pour être exposée côté client.
// La sécurité repose sur la Row Level Security (RLS) activée côté Supabase,
// pas sur le secret de cette clé. Fallback pour garantir que les réservations
// soient toujours enregistrées même si les env vars Vercel ne sont pas définies.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://amhhptkignyvqrlssqys.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtaGhwdGtpZ255dnFybHNzcXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDU4MjIsImV4cCI6MjA5MDYyMTgyMn0.pjwvfjCEVb1A3GrqyMSm01Nls9EYUnQFIsYuozBeoWI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
