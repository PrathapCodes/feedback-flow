import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gyuixlsugavtrqgefssa.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5dWl4bHN1Z2F2dHJxZ2Vmc3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MTk3MjAsImV4cCI6MjA3OTk5NTcyMH0.Q9RN3khyvbn0YcBZYjgAYz8_EDl8xk92Gnf4-ZuBzQk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
