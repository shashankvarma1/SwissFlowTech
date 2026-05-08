export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          phone: string | null;
          linkedin_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          linkedin_url?: string | null;
          created_at?: string;
        };
        Update: {
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          linkedin_url?: string | null;
        };
      };
      job_postings: {
        Row: {
          id: string;
          title: string;
          department: string | null;
          type: string | null;
          location: string | null;
          salary: string | null;
          description: string | null;
          requirements: string[] | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          department?: string | null;
          type?: string | null;
          location?: string | null;
          salary?: string | null;
          description?: string | null;
          requirements?: string[] | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string;
          department?: string | null;
          type?: string | null;
          location?: string | null;
          salary?: string | null;
          description?: string | null;
          requirements?: string[] | null;
          is_active?: boolean;
        };
      };
      applications: {
        Row: {
          id: string;
          job_id: string;
          user_id: string;
          status: string;
          cover_letter: string | null;
          resume_url: string | null;
          resume_filename: string | null;
          applied_at: string;
          updated_at: string;
          admin_notes: string | null;
        };
        Insert: {
          id?: string;
          job_id: string;
          user_id: string;
          status?: string;
          cover_letter?: string | null;
          resume_url?: string | null;
          resume_filename?: string | null;
          applied_at?: string;
          updated_at?: string;
          admin_notes?: string | null;
        };
        Update: {
          status?: string;
          cover_letter?: string | null;
          resume_url?: string | null;
          resume_filename?: string | null;
          admin_notes?: string | null;
          updated_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
        };
      };
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
        Update: {
          name?: string;
          email?: string;
          company?: string | null;
          service?: string | null;
          message?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          email?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}