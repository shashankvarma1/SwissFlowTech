-- Swiss Flow Tech — Supabase Schema
-- Run this in your Supabase SQL editor to set up all tables

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job applications
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_title TEXT NOT NULL,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin_url TEXT,
  cover_letter TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policies: allow anonymous inserts (public forms)
CREATE POLICY "Allow public insert" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Policies: only service_role can read (admin dashboard)
CREATE POLICY "Service role reads" ON contact_submissions FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Service role reads" ON job_applications FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Service role reads" ON newsletter_subscribers FOR SELECT USING (auth.role() = 'service_role');
