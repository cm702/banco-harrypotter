import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ldvjysvwpfimelqphzdw.supabase.co';  // Tu URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkdmp5c3Z3cGZpbWVscXBoemR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODkxMTEsImV4cCI6MjA2MjU2NTExMX0.HZhWKW2sFIPa646BWtPr7zhKzvqQpKL0uWZTApP-Dx0';  // Tu public API key

export const supabase = createClient(supabaseUrl, supabaseKey);
