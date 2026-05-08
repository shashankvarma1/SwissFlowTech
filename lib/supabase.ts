import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const globalForSupabase = globalThis as unknown as {
  supabase: ReturnType<typeof createClient<Database>>;
};

export const supabase =
  globalForSupabase.supabase ??
  createClient<Database>(supabaseUrl, supabaseAnonKey);

if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabase = supabase;
}

// Untyped client for mutations that hit TS inference issues

export async function isAdmin(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', userId)
    .single();
  return !!data;
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  company?: string | null;
  service?: string | null;
  message: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (supabase as any).from('contact_submissions').insert([data]).select();
}