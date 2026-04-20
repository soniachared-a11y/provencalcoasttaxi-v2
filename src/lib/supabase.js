import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Les clés DOIVENT venir des env vars (Vercel: Settings → Environment Variables).
// Si absentes en prod, le site continue de fonctionner (EmailJS reste opérationnel)
// mais les réservations ne sont plus enregistrées en base.
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { from: () => ({ insert: async () => ({ error: new Error('Supabase non configuré') }) }) }
