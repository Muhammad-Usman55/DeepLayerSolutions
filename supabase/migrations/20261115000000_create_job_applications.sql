-- ==============================================================================
-- DeepLayer Solutions — Job Applications Table & ATS Schema
-- Migration: 20261115000000_create_job_applications.sql
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  applied_position text NOT NULL,
  experience_years numeric,
  skills text[] DEFAULT '{}',
  linkedin_url text,
  portfolio_url text,
  resume_path text,
  cover_letter text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'shortlisted', 'interview', 'selected', 'rejected', 'hired')),
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_job_applications_email ON public.job_applications (lower(email));
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications (status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON public.job_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_position ON public.job_applications (applied_position);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Allow public applicant submissions
DROP POLICY IF EXISTS "job_applications_insert_public" ON public.job_applications;
CREATE POLICY "job_applications_insert_public"
  ON public.job_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'new' AND admin_notes IS NULL);

-- Allow authenticated admins full access
DROP POLICY IF EXISTS "job_applications_admin_all" ON public.job_applications;
CREATE POLICY "job_applications_admin_all"
  ON public.job_applications
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
