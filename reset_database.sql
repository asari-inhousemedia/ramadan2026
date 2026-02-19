-- ======================================
-- RESET SCRIPT: Alle Testdaten löschen
-- Führe dies im Supabase SQL Editor aus:
-- https://supabase.com/dashboard/project/thscbzyzblpqwbskymbg/sql
-- ======================================

-- 1. Fortschritt der Kinder leeren
TRUNCATE TABLE progress;

-- 2. Familien-Konfigurationen leeren
TRUNCATE TABLE families;

-- HINWEIS ZU USERN:
-- Um die Benutzerkonten komplett zu löschen, gehe bitte im Supabase Dashboard auf:
-- Authentication -> Users -> (Benutzer auswählen) -> Delete User
-- Dies ist über SQL aus Sicherheitsgründen oft nicht direkt möglich.
