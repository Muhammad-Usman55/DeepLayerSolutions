-- ==============================================================================
-- DeepLayer Solutions — Core Database Architecture & Production Schema
-- Migration: 20261109000000_create_core_schema.sql
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. SEQUENCES & IDENTIFIER GENERATORS
-- Sequence for human-readable inquiry reference numbers (e.g., DLS-2026-00001)
CREATE SEQUENCE IF NOT EXISTS public.contact_submission_seq START 1;

CREATE OR REPLACE FUNCTION public.generate_contact_reference()
RETURNS text
LANGUAGE sql
AS $$
  SELECT 'DLS-' || to_char(CURRENT_DATE, 'YYYY') || '-' || lpad(nextval('public.contact_submission_seq')::text, 5, '0');
$$;

-- 3. TRIGGER FUNCTION: updated_at auto-refresh
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ==============================================================================
-- 4. TABLE DEFINITIONS
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- TABLE: admin_profiles
-- Stores authorization roles for authenticated Supabase users.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'editor')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Helper Function: Check if current user is an authorized administrator
-- SECURITY DEFINER and fixed search_path prevent recursive RLS and search-path hijacking
CREATE OR REPLACE FUNCTION public.is_admin()
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
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- TABLE: contact_submissions
-- Stores enterprise client inquiries, service requests, and triage status.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text UNIQUE NOT NULL DEFAULT public.generate_contact_reference(),
  full_name text NOT NULL CHECK (char_length(trim(full_name)) >= 2 AND char_length(full_name) <= 120),
  email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  company text CHECK (company IS NULL OR char_length(company) <= 150),
  service text CHECK (service IS NULL OR char_length(service) <= 100),
  subject text NOT NULL CHECK (char_length(trim(subject)) >= 3 AND char_length(subject) <= 200),
  message text NOT NULL CHECK (char_length(trim(message)) >= 10 AND char_length(message) <= 5000),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'closed', 'spam')),
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE TRIGGER on_contact_submission_updated
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- TABLE: subscribers
-- Stores newsletter subscriptions, verification tokens, and subscription state.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'unsubscribed')),
  confirmation_token_hash text,
  token_expires_at timestamptz,
  subscribed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- TABLE: cookie_consents
-- Stores anonymized consent receipts adhering to GDPR, CCPA, and privacy laws.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cookie_consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  consent_id text UNIQUE NOT NULL,
  necessary boolean NOT NULL DEFAULT true CHECK (necessary = true),
  analytics boolean NOT NULL DEFAULT false,
  marketing boolean NOT NULL DEFAULT false,
  policy_version text NOT NULL DEFAULT '1.0',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- TABLE: email_logs
-- Audit trail of all outbound system notifications, autoresponders, and dispatches.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient text NOT NULL CHECK (recipient ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  email_type text NOT NULL CHECK (email_type IN (
    'contact_notification',
    'contact_autoresponder',
    'newsletter_confirmation',
    'newsletter_welcome',
    'system_alert'
  )),
  related_record_id uuid,
  provider_message_id text,
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'delivered', 'failed', 'bounced')),
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 5. PERFORMANCE INDEXES
-- ==============================================================================

-- contact_submissions
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions (lower(email));
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions (status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_ref ON public.contact_submissions (reference_number);

-- subscribers
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers (lower(email));
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON public.subscribers (status);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON public.subscribers (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscribers_token_hash ON public.subscribers (confirmation_token_hash)
  WHERE confirmation_token_hash IS NOT NULL;

-- cookie_consents
CREATE INDEX IF NOT EXISTS idx_cookie_consents_consent_id ON public.cookie_consents (consent_id);
CREATE INDEX IF NOT EXISTS idx_cookie_consents_created_at ON public.cookie_consents (created_at DESC);

-- email_logs
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON public.email_logs (lower(recipient));
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON public.email_logs (status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON public.email_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_related_record ON public.email_logs (related_record_id)
  WHERE related_record_id IS NOT NULL;

-- admin_profiles
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role ON public.admin_profiles (role);

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cookie_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- POLICIES: admin_profiles
-- ------------------------------------------------------------------------------
-- Admins can view other admin profiles (or own profile)
CREATE POLICY "admin_profiles_select_admin"
  ON public.admin_profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR public.is_admin());

-- Only superadmins can create new admin profiles
CREATE POLICY "admin_profiles_insert_superadmin"
  ON public.admin_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

-- Only superadmins can update admin profiles
CREATE POLICY "admin_profiles_update_superadmin"
  ON public.admin_profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

-- Only superadmins can delete admin profiles
CREATE POLICY "admin_profiles_delete_superadmin"
  ON public.admin_profiles
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

-- ------------------------------------------------------------------------------
-- POLICIES: contact_submissions
-- ------------------------------------------------------------------------------
-- Public visitors can submit inquiries; must have status='new' and no admin_notes
CREATE POLICY "contact_submissions_insert_public"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'new' AND admin_notes IS NULL
  );

-- Only verified administrators can read inquiries
CREATE POLICY "contact_submissions_select_admin"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Only verified administrators can update inquiries (triage, notes, status)
CREATE POLICY "contact_submissions_update_admin"
  ON public.contact_submissions
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only verified administrators can delete inquiries
CREATE POLICY "contact_submissions_delete_admin"
  ON public.contact_submissions
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- POLICIES: subscribers
-- ------------------------------------------------------------------------------
-- Public visitors can subscribe (initially 'pending' or 'active')
CREATE POLICY "subscribers_insert_public"
  ON public.subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status IN ('pending', 'active')
  );

-- Only verified administrators can view the subscriber list
CREATE POLICY "subscribers_select_admin"
  ON public.subscribers
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Only verified administrators can modify subscriber records directly
CREATE POLICY "subscribers_update_admin"
  ON public.subscribers
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only verified administrators can delete subscriber records
CREATE POLICY "subscribers_delete_admin"
  ON public.subscribers
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- POLICIES: cookie_consents
-- ------------------------------------------------------------------------------
-- Public visitors can record their cookie consent decision
CREATE POLICY "cookie_consents_insert_public"
  ON public.cookie_consents
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    necessary = true
  );

-- Only verified administrators can inspect consent logs
CREATE POLICY "cookie_consents_select_admin"
  ON public.cookie_consents
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Only verified administrators can delete consent logs
CREATE POLICY "cookie_consents_delete_admin"
  ON public.cookie_consents
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- POLICIES: email_logs
-- ------------------------------------------------------------------------------
-- Public visitors have ZERO direct access. All writes and reads are restricted
-- to verified administrators (or service-role from background dispatchers).
CREATE POLICY "email_logs_select_admin"
  ON public.email_logs
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "email_logs_admin_all"
  ON public.email_logs
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
