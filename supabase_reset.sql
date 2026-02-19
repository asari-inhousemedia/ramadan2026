-- ==========================================
-- RESET DATABASE (Löscht alle User-Daten!)
-- Führe dies im Supabase Dashboard -> SQL Editor aus.
-- ==========================================

-- 1. Löscht alle Familien und deren Kinder (Cascade löscht Kinder mit)
TRUNCATE TABLE families RESTART IDENTITY CASCADE;

-- 2. Löscht allen Fortschritt
TRUNCATE TABLE progress RESTART IDENTITY CASCADE;

-- HINWEIS:
-- Die Tabelle 'daily_tasks' bleibt erhalten, da das dein Inhalt ist.
-- Die Auth-User (E-Mail Logins) bleiben in Supabase Auth erhalten, 
-- aber ihre verknüpften Familien-Daten sind weg. 
-- Sie müssen sich also neu "einrichten" (Kind anlegen).
