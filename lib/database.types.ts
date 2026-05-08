export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          service: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          service?: string | null;
          message: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>;
      };
      job_applications: {
        Row: {
          id: string;
          job_title: string;
          applicant_name: string;
          email: string;
          linkedin_url: string | null;
          cover_letter: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          job_title: string;
          applicant_name: string;
          email: string;
          linkedin_url?: string | null;
          cover_letter?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['job_applications']['Insert']>;
      };
      newsletter_subscribers: {
        Row: { id: string; email: string; created_at: string };
        Insert: { id?: string; email: string; created_at?: string };
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Insert']>;
      };
    };
  };
}