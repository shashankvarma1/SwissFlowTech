import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Singleton pattern — prevents multiple GoTrueClient instances
const globalForSupabase = globalThis as unknown as { supabase: ReturnType<typeof createClient> };

export const supabase =
  globalForSupabase.supabase ?? createClient(supabaseUrl, supabaseAnonKey);

if (process.env.NODE_ENV !== 'production') globalForSupabase.supabase = supabase;

// Types
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  created_at?: string;
}

export interface JobApplication {
  id?: string;
  job_title: string;
  applicant_name: string;
  email: string;
  linkedin_url?: string;
  cover_letter?: string;
  created_at?: string;
}

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