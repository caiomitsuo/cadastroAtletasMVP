import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ekmywryltyxcqmdynglv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrbXl3cnlsdHl4Y3FtZHluZ2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI1NjA1NzMsImV4cCI6MTk5ODEzNjU3M30.LSFAsFqU6F1ItgsfnMHRZuqjbIYnAChNq1aMrFLBnkE'
const supabase = createClient(supabaseUrl, supabaseKey)

console.log('init supabase', supabase)
export default function useSupabase () {
  return { supabase }
}
