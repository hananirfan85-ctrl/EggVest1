import { createClient, SupabaseClient } from '@supabase/supabase-js';

const meta = import.meta as unknown as { env: Record<string, string | undefined> };

const supabaseUrl = meta.env?.VITE_SUPABASE_URL || 'https://demo-eggvest.supabase.co';
const supabaseAnonKey = meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_key';

let client: SupabaseClient | null = null;

try {
  client = createClient(supabaseUrl, supabaseAnonKey);
} catch (err) {
  console.warn('Supabase client initialization warning:', err);
}

export const supabase = client;

export const isSupabaseConfigured = () => {
  return Boolean(
    meta.env?.VITE_SUPABASE_URL &&
    meta.env?.VITE_SUPABASE_ANON_KEY &&
    !meta.env.VITE_SUPABASE_URL.includes('demo-eggvest')
  );
};

