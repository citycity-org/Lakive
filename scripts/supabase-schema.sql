-- ==========================================================================
-- Lakive Supabase Schema
-- Run this in Supabase Dashboard → SQL Editor
-- Safe to re-run: uses CREATE TABLE IF NOT EXISTS + ALTER ... IF NOT EXISTS
-- ==========================================================================

-- City indices table (one row per city)
CREATE TABLE IF NOT EXISTS city_indices (
  id           text PRIMARY KEY,        -- city slug e.g. 'vancouver'
  name         text NOT NULL,
  province     text NOT NULL,
  short        text NOT NULL,
  eoi          integer NOT NULL DEFAULT 0,
  tai          integer NOT NULL DEFAULT 0,
  hai          integer NOT NULL DEFAULT 0,
  eqi          integer NOT NULL DEFAULT 0,
  tci          integer NOT NULL DEFAULT 0,
  psi          integer NOT NULL DEFAULT 0,
  edi          integer NOT NULL DEFAULT 0,
  tai_note     text,
  median_rent  integer,
  base_price   integer,
  effective_tax numeric(4,3),           -- e.g. 0.28 = 28%
  currency     text DEFAULT 'CAD',      -- 'CAD' or 'USD'
  data_version text,
  updated_at   timestamptz DEFAULT now()
);

-- Add columns to existing table if migrating from older schema
ALTER TABLE city_indices ADD COLUMN IF NOT EXISTS effective_tax numeric(4,3);
ALTER TABLE city_indices ADD COLUMN IF NOT EXISTS currency text DEFAULT 'CAD';

-- City × occupation scores table
CREATE TABLE IF NOT EXISTS city_occupation_scores (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id        text NOT NULL,
  occupation_id  text NOT NULL,
  score          integer NOT NULL,
  hpi_years      numeric(4,1) NOT NULL,
  rpi            integer NOT NULL,
  eoi            text NOT NULL,         -- 'High' | 'Mid' | 'Low'
  data_version   text,
  updated_at     timestamptz DEFAULT now(),
  UNIQUE(city_id, occupation_id)
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_cos_city    ON city_occupation_scores(city_id);
CREATE INDEX IF NOT EXISTS idx_cos_occ     ON city_occupation_scores(occupation_id);
CREATE INDEX IF NOT EXISTS idx_ci_updated  ON city_indices(updated_at);

-- Enable RLS (rows are public-read, service-role writes)
ALTER TABLE city_indices             ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_occupation_scores   ENABLE ROW LEVEL SECURITY;

-- Public read policy
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'city_indices' AND policyname = 'public_read'
  ) THEN
    CREATE POLICY public_read ON city_indices FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'city_occupation_scores' AND policyname = 'public_read'
  ) THEN
    CREATE POLICY public_read ON city_occupation_scores FOR SELECT USING (true);
  END IF;
END $$;
