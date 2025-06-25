
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mrtusrbfgwlpkodndvoh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ydHVzcmJmZ3dscGtvZG5kdm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MTgzMTAsImV4cCI6MjA2NDE5NDMxMH0.kSaf5AYls6QhkuoujMTUSmM9uyY8SQT5U0X8RpO18vE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
});
