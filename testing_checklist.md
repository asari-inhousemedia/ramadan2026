# 🚀 Launch-Checkliste: Mein Ramadan Kalender 2026

Führe diese Tests durch, um sicherzustellen, dass alles perfekt läuft:

## 1. Authentifizierung & Sicherheit
- [ ] **Registrierung**: Neues Konto erstellen. Erhältst du eine Bestätigung (falls eingestellt)? Funktioniert der automatische Login nach Registrierung?
- [ ] **Login / Logout**: Abmelden und wieder Anmelden. Bleibt die Session stabil?
- [ ] **Passwort vergessen**:
    - [ ] Erhältst du die E-Mail von Resend.com?
    - [ ] Leitet der Link auf `reset-password.html` weiter?
    - [ ] Akzeptiert das System das neue Passwort?
    - [ ] Funktioniert der Login mit dem NEUEN Passwort?

## 2. Einrichtung (Setup)
- [ ] **Kind anlegen**: 1-3 Kinder hinzufügen. Werden die Namen korrekt gespeichert?
- [ ] **Bild-Upload**: Ein Bild pro Kind hochladen.
    - [ ] Wird das Bild optimiert (kleiner gemacht)?
    - [ ] Erscheint die Vorschau?
- [ ] **Speichern**: Werden die Daten in Supabase (`families` Tabelle) gespeichert?

## 3. Kalender-Nutzung
- [ ] **Türen öffnen**: Kannst du nur den aktuellen Tag (Tag 1 am 19. Feb) öffnen? Sind zukünftige Tage gesperrt (🔒)?
- [ ] **Aufgabe erledigen**: Klick auf "Ich hab's geschafft!".
    - [ ] Erscheint das Konfetti?
    - [ ] Wird ein Teil des Mosaiks aufgedeckt?
    - [ ] Verringert sich der Blur-Effekt des Hintergrundbildes minimal?
- [ ] **Persistenz**: Lade die Seite neu. Bleibt der Haken bei der erledigten Aufgabe?

## 4. Multi-Kind Modus
- [ ] **Tab-Wechsel**: Zwischen den Kindern wechseln.
    - [ ] Ändert sich das Hintergrundbild zum Bild des jeweiligen Kindes?
    - [ ] Wird der jeweilige Fortschritt (offene Türen) korrekt angezeigt?

## 5. Rechtliches & Mobile
- [ ] **Datenschutz**: Link im Footer und in der Registrierung prüfen.
- [ ] **Responsive Design**: Teste auf einem echten Handy. Sind Buttons gut klickbar? Scrollt nichts seitlich?
- [ ] **PWA**: Kannst du die App zum Home-Bildschirm hinzufügen? Erscheint das Icon?
