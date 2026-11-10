-- ==============================================================================
-- DeepLayer Solutions — Phase 1 Admin Architecture & Extended Schema
-- Migration: 20261111000000_phase1_admin_schema.sql
-- ==============================================================================

-- 1. EXTEND admin_profiles TABLE
ALTER TABLE public.admin_profiles
  ADD COLUMN IF NOT EXISTS full_name text,
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS avatar_url text,
  ADD COLUMN IF NOT EXISTS last_sign_in_at timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Update Role Constraint to include all 4 official roles
ALTER TABLE public.admin_profiles
  DROP CONSTRAINT IF EXISTS admin_profiles_role_check;

ALTER TABLE public.admin_profiles
  ADD CONSTRAINT admin_profiles_role_check
  CHECK (role IN ('superadmin', 'admin', 'recruitment_manager', 'content_manager', 'editor'));

-- Helper function: Check if current user has specific role or higher
CREATE OR REPLACE FUNCTION public.has_admin_role(required_role text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_profiles
    WHERE id = auth.uid()
      AND (
        role = 'superadmin'
        OR role = required_role
        OR (required_role = 'admin' AND role IN ('superadmin', 'admin'))
      )
  );
$$;

GRANT EXECUTE ON FUNCTION public.has_admin_role(text) TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 2. TABLE: activity_logs
-- Records all administrative operations for compliance, audit, and security.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  admin_email text NOT NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  details jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_admin_id ON public.activity_logs (admin_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON public.activity_logs (action);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON public.activity_logs (entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs (created_at DESC);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "activity_logs_select_admin"
  ON public.activity_logs
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "activity_logs_insert_admin"
  ON public.activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- 3. TABLE: notifications
-- Real-time notification inbox for staff alerts (applications, inquiries, etc.).
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'inquiry', 'application', 'subscriber', 'alert', 'system')),
  link text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications (is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications (created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notifications_select_admin"
  ON public.notifications
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "notifications_update_admin"
  ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "notifications_delete_admin"
  ON public.notifications
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 4. TABLE: analytics_events & analytics_sessions
-- Privacy-first, first-party telemetry tracking pageviews and conversions.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL DEFAULT 'pageview',
  path text NOT NULL,
  referrer text,
  device_category text DEFAULT 'desktop' CHECK (device_category IN ('desktop', 'mobile', 'tablet', 'unknown')),
  browser text,
  country text,
  visitor_hash text NOT NULL,
  session_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_path ON public.analytics_events (path);
CREATE INDEX IF NOT EXISTS idx_analytics_events_visitor ON public.analytics_events (visitor_hash);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON public.analytics_events (session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events (created_at DESC);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "analytics_events_insert_public"
  ON public.analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "analytics_events_select_admin"
  ON public.analytics_events
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 5. TABLE: jobs (Phase 2 Foundation)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  department text NOT NULL,
  description text NOT NULL,
  responsibilities text[] DEFAULT '{}',
  requirements text[] DEFAULT '{}',
  skills text[] DEFAULT '{}',
  experience_level text NOT NULL,
  employment_type text NOT NULL CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'internship', 'freelance')),
  workplace_type text NOT NULL CHECK (workplace_type IN ('remote', 'onsite', 'hybrid')),
  location text NOT NULL DEFAULT 'Lahore, Pakistan / Remote',
  salary_range text,
  vacancies integer DEFAULT 1,
  deadline timestamptz,
  is_featured boolean DEFAULT false,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'unpublished', 'closed')),
  seo_title text,
  seo_description text,
  views_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_jobs_slug ON public.jobs (slug);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs (status);
CREATE INDEX IF NOT EXISTS idx_jobs_department ON public.jobs (department);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs (created_at DESC);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Public can read only published jobs
CREATE POLICY "jobs_select_public"
  ON public.jobs
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Admins and Recruitment Managers can manage all jobs
CREATE POLICY "jobs_admin_all"
  ON public.jobs
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- 6. TABLE: job_applications (Phase 2 Foundation)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.jobs(id) ON DELETE SET NULL,
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

CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON public.job_applications (job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON public.job_applications (lower(email));
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications (status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON public.job_applications (created_at DESC);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Public can submit applications
CREATE POLICY "job_applications_insert_public"
  ON public.job_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'new' AND admin_notes IS NULL);

-- Only verified admins can read/update/delete applications
CREATE POLICY "job_applications_admin_all"
  ON public.job_applications
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- 7. TABLE: admin_settings
-- Global system and operational configuration.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id text PRIMARY KEY DEFAULT 'global',
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_settings_select_admin"
  ON public.admin_settings
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "admin_settings_update_superadmin"
  ON public.admin_settings
  FOR UPDATE
  TO authenticated
  USING (public.has_admin_role('superadmin'))
  WITH CHECK (public.has_admin_role('superadmin'));
