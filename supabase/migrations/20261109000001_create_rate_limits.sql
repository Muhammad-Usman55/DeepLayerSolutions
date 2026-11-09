-- ==============================================================================
-- DeepLayer Solutions — Distributed Rate Limiting Architecture
-- Migration: 20261109000001_create_rate_limits.sql
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- TABLE: rate_limits
-- Serverless-safe, distributed rate-limit tracking across multiple instances.
-- Stores SHA-256 anonymized client hashes instead of raw IP addresses.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.rate_limits (
  key text PRIMARY KEY,
  count integer NOT NULL DEFAULT 1,
  reset_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Deny all public access (anon & authenticated).
-- Strictly accessible via server-side service_role admin client.
CREATE POLICY "rate_limits_service_role_all"
  ON public.rate_limits
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Automated index for fast lookup and cleanup of expired windows
CREATE INDEX IF NOT EXISTS idx_rate_limits_reset_at ON public.rate_limits (reset_at);

