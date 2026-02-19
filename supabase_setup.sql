-- ======================================
-- RAMADAN KALENDER 2026 – Supabase Setup
-- Führe dieses Script im Supabase SQL Editor aus:
-- https://supabase.com/dashboard/project/thscbzyzblpqwbskymbg/sql
-- ======================================

-- 1. DAILY TASKS TABLE (Support for multiple tasks per day)
CREATE TABLE IF NOT EXISTS daily_tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    day INT NOT NULL, -- 1 to 30
    title TEXT NOT NULL,
    icon TEXT DEFAULT '🌙',
    task TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. FAMILIES TABLE
CREATE TABLE IF NOT EXISTS families (
    family_id UUID PRIMARY KEY,
    children JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROGRESS TABLE (Track individual tasks and stars)
CREATE TABLE IF NOT EXISTS progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    family_id UUID REFERENCES families(family_id) ON DELETE CASCADE,
    child_name TEXT NOT NULL,
    completed_tasks UUID[] DEFAULT '{}', -- Store IDs of completed tasks
    revealed_tiles INT[] DEFAULT '{}', -- Store which days have unlocked a mosaic tile
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(family_id, child_name)
);

-- ======================================
-- ROW LEVEL SECURITY (RLS)
-- ======================================

ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE families    ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress    ENABLE ROW LEVEL SECURITY;

-- daily_tasks: Public read (or authenticated)
CREATE POLICY "daily_tasks: public read" ON daily_tasks FOR SELECT USING (true);

-- families: Open for public read/write by ID (simulated user tracking via UUID)
CREATE POLICY "families: public access" ON families FOR ALL USING (true) WITH CHECK (true);

-- progress: Open for public read/write
CREATE POLICY "progress: public access" ON progress FOR ALL USING (true) WITH CHECK (true);

-- ======================================
-- BUCKET SETUP (Child Images)
-- ======================================
-- Note: Create the 'child-images' bucket in the Supabase Dashboard UI first!
-- Permissions for the 'child-images' bucket:
-- 1. Insert/Select/Update/Delete for authenticated users if needed, 
--    but we'll keep it simple for now as per current setup.
