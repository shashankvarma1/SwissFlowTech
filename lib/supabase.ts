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

if (process.env.NODE_ENV !== 'production') globalForSupabase.supabase = supabase;

export type ContactSubmission =
  Database['public']['Tables']['contact_submissions']['Insert'];

export type JobApplication =
  Database['public']['Tables']['job_applications']['Insert'];

export async function submitContactForm(data: ContactSubmission) {
  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert([data])
    .select();
  return { result, error };
}

export async function submitJobApplication(data: JobApplication) {
  const { data: result, error } = await supabase
    .from('job_applications')
    .insert([data])
    .select();
  return { result, error };
}

export async function subscribeNewsletter(email: string) {
  const { data: result, error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }])
    .select();
  return { result, error };
}