-- ======================================
-- RAMADAN KALENDER 2026 – Supabase Setup
-- Führe dieses Script im Supabase SQL Editor aus:
-- https://supabase.com/dashboard/project/thscbzyzblpqwbskymbg/sql
-- ======================================

-- 1. DAILY TASKS TABLE
-- Speichert die 30 Tagesaufgaben (jederzeit editierbar)
CREATE TABLE IF NOT EXISTS daily_tasks (
    id          SERIAL PRIMARY KEY,
    day         INTEGER NOT NULL UNIQUE CHECK (day BETWEEN 1 AND 30),
    icon        TEXT NOT NULL DEFAULT '🌙',
    title       TEXT NOT NULL,
    task        TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. FAMILIES TABLE
-- Speichert Family-UUID + Kindervornamen (KEIN Bild – bleibt lokal)
CREATE TABLE IF NOT EXISTS families (
    id          SERIAL PRIMARY KEY,
    family_id   UUID NOT NULL UNIQUE,
    children    JSONB NOT NULL DEFAULT '[]',
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROGRESS TABLE
-- Speichert den Fortschritt pro Kind pro Familie
CREATE TABLE IF NOT EXISTS progress (
    id              SERIAL PRIMARY KEY,
    family_id       UUID NOT NULL,
    child_name      TEXT NOT NULL,
    completed_days  INTEGER[] NOT NULL DEFAULT '{}',
    revealed_tiles  INTEGER[] NOT NULL DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(family_id, child_name)
);

-- ======================================
-- ROW LEVEL SECURITY (RLS)
-- ======================================

ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE families    ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress    ENABLE ROW LEVEL SECURITY;

-- daily_tasks: Jeder darf lesen (public read)
CREATE POLICY "daily_tasks: public read"
    ON daily_tasks FOR SELECT
    TO anon, authenticated
    USING (true);

-- families: Jeder darf seinen eigenen Eintrag lesen/schreiben
-- (family_id kommt aus dem client – UUID als Identifikation)
CREATE POLICY "families: read own"
    ON families FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "families: insert own"
    ON families FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "families: update own"
    ON families FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- progress: Jeder darf lesen/schreiben (family_id ist anonym)
CREATE POLICY "progress: read"
    ON progress FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "progress: insert"
    ON progress FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "progress: update"
    ON progress FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- ======================================
-- SEED: Die 30 Tagesaufgaben einfügen
-- ======================================

INSERT INTO daily_tasks (day, icon, title, task) VALUES
(1,  '😊', 'Lächeln schenken',     'Schenke heute jemandem ein ehrliches Lächeln und sag etwas Nettes.'),
(2,  '🤲', 'Dua für andere',        'Bete heute ein Dua für jemanden, den du liebst.'),
(3,  '📖', 'Quran lesen',           'Lies heute mindestens eine Seite aus dem Quran.'),
(4,  '🍽️', 'Essen teilen',          'Teile heute dein Essen mit einem Nachbarn oder Freund.'),
(5,  '🧹', 'Helfen im Haushalt',    'Hilf heute ohne gefragt zu werden im Haushalt mit.'),
(6,  '💌', 'Brief schreiben',       'Schreibe einen lieben Brief oder eine Nachricht an jemanden.'),
(7,  '🌳', 'Natur genießen',        'Gehe heute nach draußen und danke Allah für die Natur.'),
(8,  '🤝', 'Versöhnung',            'Versöhne dich heute mit jemandem, mit dem du im Streit warst.'),
(9,  '💰', 'Spenden',               'Spende heute etwas – egal wie klein – für einen guten Zweck.'),
(10, '🧸', 'Spielzeug verschenken', 'Verschenke ein Spielzeug, das du nicht mehr brauchst.'),
(11, '🕌', 'Moschee besuchen',      'Besuche heute die Moschee für ein gemeinsames Gebet.'),
(12, '👴', 'Ältere besuchen',       'Besuche oder rufe heute Oma, Opa oder ältere Nachbarn an.'),
(13, '🎨', 'Kreativ sein',          'Male ein schönes Bild zum Thema Ramadan.'),
(14, '🙏', 'Extra Gebet',           'Bete heute ein zusätzliches freiwilliges Gebet.'),
(15, '📚', 'Geschichte lernen',     'Lerne heute eine Geschichte über einen Propheten.'),
(16, '🥤', 'Wasser schätzen',       'Denke heute beim Trinken daran, wie wertvoll Wasser ist.'),
(17, '🌙', 'Nachtgebet',            'Versuche heute Nacht aufzustehen und ein kurzes Gebet zu sprechen.'),
(18, '👨‍👩‍👧‍👦', 'Familie',           'Verbringe heute bewusst Zeit mit deiner Familie.'),
(19, '🍪', 'Backen',                'Backe heute Kekse oder Kuchen und teile sie mit anderen.'),
(20, '🗑️', 'Aufräumen',             'Räume heute dein Zimmer gründlich auf und halte es sauber.'),
(21, '🤫', 'Geduld üben',           'Übe heute besonders viel Geduld – auch wenn es schwer fällt.'),
(22, '🎁', 'Überraschung',          'Überrasche heute jemanden mit einer kleinen Freude.'),
(23, '💧', 'Dhikr machen',          'Sage heute 100 Mal "SubhanAllah" über den Tag verteilt.'),
(24, '🌟', 'Vorbild sein',          'Sei heute ein gutes Vorbild für andere Kinder.'),
(25, '📿', 'Dankbarkeit',           'Schreibe 5 Dinge auf, für die du heute dankbar bist.'),
(26, '🕊️', 'Frieden stiften',      'Hilf heute dabei, einen Streit zwischen anderen zu schlichten.'),
(27, '✨', 'Lailat al-Qadr',        'Heute könnte die Nacht der Bestimmung sein – bete besonders viel!'),
(28, '🧕', 'Eltern ehren',          'Sage heute deinen Eltern, wie sehr du sie liebst.'),
(29, '🌅', 'Sonnenaufgang',         'Stehe heute früh auf und beobachte den Sonnenaufgang.'),
(30, '🎉', 'Bayram-Vorfreude',      'Bereite dich heute auf das Bayram-Fest vor – dein Geschenk wartet! 🎁')
ON CONFLICT (day) DO NOTHING;

-- ======================================
-- VERIFY: Alles korrekt eingefügt?
-- ======================================
SELECT day, icon, title FROM daily_tasks ORDER BY day;
