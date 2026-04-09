import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://amhhptkignyvqrlssqys.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtaGhwdGtpZ255dnFybHNzcXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDU4MjIsImV4cCI6MjA5MDYyMTgyMn0.pjwvfjCEVb1A3GrqyMSm01Nls9EYUnQFIsYuozBeoWI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
