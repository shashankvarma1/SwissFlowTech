import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null as unknown as ReturnType<typeof createClient<Database>>;
  return createClient<Database>(url, key);
}

const globalForSupabase = globalThis as unknown as {
  supabase: ReturnType<typeof createClient<Database>> | null;
};

export const supabase = globalForSupabase.supabase ?? getSupabase();

if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabase = supabase;
}

export async function isAdmin(userId: string): Promise<boolean> {
  if (!supabase) return false;
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