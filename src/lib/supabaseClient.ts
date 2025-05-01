import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ciwgaftygkmbqpmdjwki.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpd2dhZnR5Z2ttYnFwbWRqd2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NTcwOTUsImV4cCI6MjA2MTMzMzA5NX0.9PfAA3l8G2fJCOYdhZSEgLZw8Hw0e7Z3Bwida9lFyeM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 