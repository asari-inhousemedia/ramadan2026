-- Delete existing tasks to avoid duplicates if re-running
TRUNCATE TABLE daily_tasks;
-- Import parsed tasks from ramadan-aufgaben-2026.md
INSERT INTO daily_tasks (day, title, icon, task) VALUES (1, 'Begrüßung', '👋', 'Sage „Ramadan Mubarak!" oder „Hayırlı Ramazanlar!" zu jedem in deiner Familie.
*(Für Ältere: Schreibe außerdem dein persönliches Ramadan-Ziel auf.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (1, 'Verstehen', '🧠', 'Frage deine Eltern: „Warum fasten Muslime im Ramadan?" und hör gut zu.
*(Für Ältere: Erkläre selbst, was Ramadan bedeutet – mit eigenen Worten.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (1, 'Herzensaufgabe', '❤️', 'Male ein Bild oder zeichne etwas, auf das du dich im Ramadan freust.
*(Für Ältere: Schreibe 3 Dinge auf, die du diesen Ramadan anders machen möchtest.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (2, 'Helfen', '🤝', 'Hilf beim Tischdecken für das Iftar-Essen.
*(Für Ältere: Hilf aktiv beim Vorbereiten des Iftars – Kochen, Schneiden, Anrichten.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (2, 'Freundlichkeit', '🌙', 'Sage heute mindestens 3 Mal „Danke" – ohne dass jemand dich daran erinnert.
*(Für Ältere: Danke bewusst und mit echten Worten – nicht nur kurz.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (2, 'Aufmerksamkeit', '🌙', 'Frage jemanden in der Familie: „Kann ich dir helfen?"
*(Für Ältere: Tu etwas Hilfreiches, bevor jemand dich darum bitten muss.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (3, 'Nachdenken', '🧠', 'Denke an 3 Dinge, für die du heute dankbar bist – erzähle sie deinen Eltern.
*(Für Ältere: Schreibe deine 3 Dankbarkeiten auf.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (3, 'Dankeschön sagen', '🙏', 'Bedanke dich bei jemandem, dem du noch nie richtig „Danke" gesagt hast.
*(Für Ältere: Schreibe eine kleine Dankes-Nachricht oder -Karte.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (3, 'Vergleichen', '🧠', 'Sprecht in der Familie darüber: Was haben wir, das andere nicht haben?
*(Für Ältere: Überlege, wie du anderen etwas zurückgeben kannst.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (4, 'Liebe Worte', '❤️', 'Sage heute nur nette, liebe Dinge zu anderen. Kein Streiten, kein Beleidigen.
*(Für Ältere: Vermeide heute bewusst jede negative Aussage über andere.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (4, 'Kompliment', '🌙', 'Sage einer Person in deiner Familie etwas wirklich Nettes.
*(Für Ältere: Mache mindestens 2 ehrliche Komplimente.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (4, 'Reflexion', '🧠', 'Frage dich abends: „Habe ich heute jemandem mit meinen Worten wehgetan?" Falls ja – entschuldige dich.
*(Für Ältere: Schreibe auf, was du morgen besser machen möchtest.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (5, 'Aufräumen', '🧹', 'Räume 5 Spielsachen oder Sachen an ihren richtigen Platz.
*(Für Ältere: Räume dein gesamtes Zimmer auf.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (5, 'Teilen', '🤲', 'Suche ein Spielzeug oder eine Sache, die du nicht mehr brauchst – zum Verschenken oder Spenden.
*(Für Ältere: Suche 3 Dinge zum Spenden und gib sie deinen Eltern.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (5, 'Initiative', '🤝', 'Mach eine Aufgabe im Haushalt, ohne gefragt zu werden.
*(Für Ältere: Übernimm heute eine Aufgabe, die normalerweise deine Eltern machen.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (6, 'Umarmen', '❤️', 'Umarme Mama oder Baba und sage „Ich hab dich lieb."
*(Für Ältere: Bedanke dich bewusst bei deinen Eltern für alles, was sie tun.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (6, 'Aufmerksamkeit', '🌙', 'Setz dich heute 10 Minuten zu jemandem in der Familie – ohne Handy, ohne Bildschirm.
*(Für Ältere: Höre einer Person wirklich zu – frage nach ihrem Tag.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (6, 'Großeltern/Familie', '🌙', 'Ruf Oma, Opa oder jemanden aus der Familie an (oder schreibe eine Nachricht).
*(Für Ältere: Erzähle ihnen von deinem Ramadan.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (7, 'Beten', '🤲', 'Mache heute eine kleine Du''a vor dem Schlafen.
*(Für Ältere: Mache Du''a für jedes Familienmitglied einzeln.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (7, 'Wünsche', '🌙', 'Was wünschst du dir für deine Familie? Erzähle es deinen Eltern oder schreibe es auf.
*(Für Ältere: Schreibe eine kurze Du''a in eigenen Worten auf.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (7, 'Rückblick Woche 1', '🌙', 'Was war dein schönster Moment in dieser Woche? Erzähle ihn der Familie.
*(Für Ältere: Schreibe auf, was dich diese Woche bewegt hat.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (8, 'Spenden', '💰', 'Lege eine Münze in eine Spendebox – oder gib sie deinen Eltern zum Spenden für dich.
*(Für Ältere: Spende bewusst etwas von deinem Taschengeld.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (8, 'Nachdenken', '🧠', 'Frage deine Eltern: „Warum ist Spenden im Islam so wichtig?"
*(Für Ältere: Lies oder lerne etwas über Sadaqa und erkläre es jemandem.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (8, 'Bewusstsein', '🌙', 'Sprecht gemeinsam darüber: Gibt es Kinder auf der Welt, die kein Essen zum Iftar haben?
*(Für Ältere: Überlege, wie du in Zukunft regelmäßig spenden könntest.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (9, 'Teilen', '🤲', 'Teile heute etwas mit jemandem – ein Spielzeug, eine Süßigkeit, eine Aufgabe.
*(Für Ältere: Teile dein Essen oder deine Zeit bewusst mit jemandem.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (9, 'Großzügigkeit', '🤲', 'Gib jemandem das letzte Stück von etwas, das du eigentlich selbst haben willst.
*(Für Ältere: Tu das, ohne darüber zu sprechen oder Lob zu erwarten.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (9, 'Empathie', '🌙', 'Stell dir vor: Du hast nichts zu essen. Wie würde das sich anfühlen? Erzähle es.
*(Für Ältere: Schreibe auf, was du dabei gefühlt hast.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (10, 'Grüßen', '👋', 'Begrüße heute jeden in der Familie mit „Selam!" oder „Esselamu Aleyküm!"
*(Für Ältere: Grüße bewusst mehrere Personen freundlich – auch außerhalb der Familie.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (10, 'Lächeln', '🌙', 'Lächle heute so viel wie möglich – auch wenn du müde bist.
*(Für Ältere: Sei auch zu jemandem freundlich, der nicht nett zu dir war.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (10, 'Türen öffnen', '🌙', 'Halte heute jemandem eine Tür auf oder lass jemanden zuerst.
*(Für Ältere: Tu eine kleine freundliche Geste für einen Fremden oder Nachbarn.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (11, 'Freude schenken', '🌙', 'Tue heute etwas, das jemand anderem ein Lächeln ins Gesicht zaubert.
*(Für Ältere: Überlege vorher, was diese Person besonders freuen würde.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (11, 'Positive Worte', '🌙', 'Sage heute nur freundliche Worte – gar keine Klage, kein Jammern.
*(Für Ältere: Notiere abends, wie es sich angefühlt hat.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (11, 'Strahlen', '🌙', 'Male ein Smiley-Gesicht oder bastle etwas Kleines und verschenke es.
*(Für Ältere: Schreibe jemandem eine kurze Aufmunterungsnachricht.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (12, 'Entschuldigen', '🕊️', 'Sage heute „Entschuldigung" oder „Özür dilerim" – wenn es nötig ist, auch ohne dass jemand dich fragt.
*(Für Ältere: Bitte ehrlich um Verzeihung bei jemandem, dem du Unrecht getan hast.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (12, 'Vergeben', '🕊️', 'Vergib jemandem innerlich, der dich geärgert hat – ohne dass du es laut sagen musst.
*(Für Ältere: Sag der Person auch wirklich: „Ich hab dir vergeben.")*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (12, 'Frieden', '🕊️', 'Schließe heute keinen Streit ab, ohne ihn wieder gutzumachen.
*(Für Ältere: Überlege: Gibt es einen alten Streit, der noch offen ist?)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (13, 'Heimlich helfen', '🤝', 'Mache eine gute Tat, ohne dass es jemand sieht – z. B. heimlich aufräumen.
*(Für Ältere: Mache eine gute Tat ohne sie jemals zu erzählen.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (13, 'Stille Fürsorge', '🤝', 'Überrasche jemanden mit etwas Kleinem – ein Glas Wasser hinstellen, Schuhe wegräumen.
*(Für Ältere: Tu etwas Gutes für eine Person, die es gerade schwer hat.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (13, 'Absicht zählt', '🤫', 'Lerne: Im Islam zählt die Absicht. Was hast du heute mit guter Absicht getan?
*(Für Ältere: Schreibe auf, was Niyyah (Absicht) bedeutet.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (14, 'Kompliment', '🌙', 'Sage jemandem heute etwas wirklich Nettes – von Herzen.
*(Für Ältere: Mache mindestens 2 ehrliche Komplimente an 2 verschiedene Personen.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (14, 'Schreiben', '🌙', 'Male oder schreibe einen kleinen Zettel mit „Du bist toll, weil..." und gib ihn jemandem.
*(Für Ältere: Schreibe einen kurzen Brief an jemanden, dem du selten sagst, wie wichtig er ist.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (14, 'Rückblick Woche 2', '🌙', 'Was war deine schönste gute Tat diese Woche? Erzähle sie.
*(Für Ältere: Schreibe auf, was du gelernt hast.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (15, 'Draußen schauen', '🌳', 'Gehe mit deinen Eltern raus und suche 1–2 Dinge in der Natur – ein Tier, eine Blume, ein Baum.
*(Für Ältere: Beobachte 3 verschiedene Dinge und denke darüber nach, wie Allah sie erschaffen hat.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (15, 'Staunen', '🌙', 'Erzähle: Was hat dich heute in der Natur überrascht oder beeindruckt?
*(Für Ältere: Schreibe oder zeichne deine Beobachtungen auf.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (15, 'Subhanallah', '🌙', 'Sage 10 x „Subhanallah" für die Schönheit, die du heute gesehen hast.
*(Für Ältere: Sage 33 x Subhanallah und lerne die Bedeutung.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (16, 'Du''a lernen', '🤲', 'Lerne heute eine kurze Du''a – z. B. die Du''a vor dem Essen: „Bismillahi wa ala barakatillah."
*(Für Ältere: Lerne eine neue Du''a mit Übersetzung und Bedeutung.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (16, 'Üben', '🌙', 'Sage die Du''a heute so oft wie möglich – und erkläre sie jemandem in der Familie.
*(Für Ältere: Erkläre die Bedeutung einem jüngeren Geschwister oder Kind.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (16, 'Aufschreiben', '🌙', 'Schreibe oder male die Du''a auf ein Blatt Papier – als Erinnerung für dich.
*(Für Ältere: Erstelle eine kleine persönliche Du''a-Sammlung.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (17, 'Bismillah', '📿', 'Sage vor jedem Essen und Trinken heute „Bismillah".
*(Für Ältere: Achte auf gute Essmanieren: nicht schmatzen, mit der rechten Hand essen, warten bis alle sitzen.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (17, 'Alhamdulillah', '🙏', 'Sage nach dem Essen „Alhamdulillah" und erkläre, was es bedeutet.
*(Für Ältere: Erkläre den Unterschied zwischen Bismillah und Alhamdulillah.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (17, 'Respekt', '🌙', 'Warte, bis alle am Tisch sitzen, bevor du anfängst zu essen.
*(Für Ältere: Achte heute den ganzen Tag auf gute Manieren gegenüber jedem.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (18, 'Sagen', '🌙', 'Sage heute 10 x „Subhanallah" und lass dir die Bedeutung erklären.
*(Für Ältere: Sage 33 x Subhanallah – mit Tesbih oder Finger zählen.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (18, 'Verstehen', '🧠', '„Subhanallah" bedeutet: „Allah ist vollkommen und frei von Fehlern." Was bedeutet das für dich?
*(Für Ältere: Schreibe auf, wann du „Subhanallah" sagen möchtest.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (18, 'Tesbih basteln (optional)', '📿', 'Beginne mit deinen Eltern, eine eigene Tesbih (Gebetskette) zu basteln.
*(Für Ältere: Bastle die vollständige Tesbih mit 33 Perlen – Anleitung bei deinen Eltern.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (19, 'Sagen', '🌙', 'Sage heute 10 x „Alhamdulillah" und lass dir die Bedeutung erklären.
*(Für Ältere: Sage 33 x Alhamdulillah – mit Bewusstsein.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (19, 'Dankbarkeit', '🙏', '„Alhamdulillah" bedeutet: „Alles Lob und Dank gebührt Allah." Wofür bist du heute dankbar?
*(Für Ältere: Führe heute ein kleines Dankbarkeits-Tagebuch.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (19, 'Weitergeben', '🌙', 'Erkläre einem Freund oder Geschwister, was „Alhamdulillah" bedeutet.
*(Für Ältere: Schreibe einen kurzen Text darüber.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (20, 'Sagen', '🌙', 'Sage heute 10 x „Allahu Akbar" und lass dir die Bedeutung erklären.
*(Für Ältere: Sage 34 x Allahu Akbar.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (20, 'Verstehen', '🧠', '„Allahu Akbar" bedeutet: „Allah ist am größten." Erzähle, was das für dich bedeutet.
*(Für Ältere: Schreibe auf, in welchen Momenten du das besonders spürst.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (20, 'Tesbih komplett', '📿', 'Jetzt weißt du alle 3: Subhanallah (33x), Alhamdulillah (33x), Allahu Akbar (34x) = 100 Dhikr.
*(Für Ältere: Mache heute alle 100 Dhikr hintereinander.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (21, 'Erzählen', '🌙', 'Erzähle jemandem: „Ramadan ist ein besonderer Monat, weil..."
*(Für Ältere: Erkläre vollständig, warum Muslime fasten – mit Worten, die Nicht-Muslime verstehen.)*

**Aufgabe 2 – Wofür steht Ramadan?**
Sprecht in der Familie: Was bedeutet Ramadan für euch persönlich?
*(Für Ältere: Schreibe auf, was sich für dich in diesem Ramadan verändert hat.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (21, 'Rückblick Woche 3', '🌙', 'Was war dein schönster Lern-Moment dieser Woche?
*(Für Ältere: Was hat dich am meisten überrascht oder bewegt?)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (22, 'Für andere beten', '🤲', 'Mache heute eine Du''a für jemanden, der es gerade schwer hat.
*(Für Ältere: Mache Du''a für deine Familie, Freunde und alle Muslime auf der Welt.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (22, 'Wunschliste fürs Herz', '❤️', 'Schreibe oder zeichne 3 Dinge auf, um die du Allah bittest.
*(Für Ältere: Schreibe eine persönliche Du''a in eigenen Worten auf.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (22, 'Stille', '🤫', 'Nimm dir heute 2 Minuten – komplett ohne Bildschirm, ohne Lärm – und sei einfach still und dankbar.
*(Für Ältere: Sitze 5 Minuten in Stille und denke nach.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (23, 'Geduld üben', '⏳', 'Warte ruhig, wenn du etwas willst – und zwar ohne zu quengeln oder zu drängeln.
*(Für Ältere: Übe heute bewusst Geduld – in einer Situation, die dich normalerweise nervt.)*

**Aufgabe 2 – Was ist Sabr?**
Lerne: Sabr bedeutet Geduld. Im Ramadan üben wir Geduld mit dem Fasten. Was bedeutet das?
*(Für Ältere: Schreibe auf, wann Geduld dir schon einmal geholfen hat.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (23, 'Andere ermutigen', '🌙', 'Sage jemandem heute: „Du schaffst das!" oder „Ich bin stolz auf dich."
*(Für Ältere: Sei heute eine Stütze für jemanden, der Geduld braucht.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (24, 'Positiv denken', '🌙', 'Denke heute an etwas Schönes, wenn du merkst, dass du traurig oder genervt wirst.
*(Für Ältere: Schreibe eine positive Eigenschaft von dir auf und erkläre, woher sie kommt.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (24, 'Gutes sehen', '🌙', 'Suche heute in allem etwas Gutes – auch im Kleinen.
*(Für Ältere: Schreibe 5 Dinge auf, die heute gut waren.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (24, 'Selbstliebe', '❤️', 'Sage dir selbst: „Ich bin ein guter Mensch, weil..."
*(Für Ältere: Schreibe einen liebevollen Brief an dich selbst.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (25, 'Mond anschauen', '🌙', 'Schaue heute Abend den Mond an und denke daran: Allah hat diesen Mond erschaffen.
*(Für Ältere: Bleibe 5 Minuten länger wach und mache eine besondere Du''a.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (25, 'Stille Nacht', '🤫', 'Erzähle deinen Eltern, was du beim Anschauen des Mondes gedacht oder gefühlt hast.
*(Für Ältere: Schreibe deine Gedanken auf – als kleines Ramadan-Tagebucheintrag.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (25, 'Danken', '🙏', 'Sage „Elhamdülillah" für den Tag, der heute war – egal wie er war.
*(Für Ältere: Schreibe einen Dankesgedanken für jeden Moment des Tages.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (26, 'Vergeben', '🕊️', 'Sage jemandem heute: „Ich verzeihe dir." – auch wenn es schwer fällt.
*(Für Ältere: Vergib jemandem innerlich, dem du noch nicht verziehen hast.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (26, 'Um Vergebung bitten', '🕊️', 'Bitte Allah um Vergebung für das, was du falsch gemacht hast.
*(Für Ältere: Sage Istighfar: „Astağfirullah" – und erkläre, was das bedeutet.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (26, 'Leichtigkeit', '🌙', 'Wie fühlt es sich an, wenn man vergibt? Erzähle es oder schreibe es auf.
*(Für Ältere: Reflektiere: Was hält uns davon ab zu vergeben?)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (27, 'Besondere Nacht', '🌙', 'Heute ist eine der heiligsten Nächte im Islam! Mache eine ganz besondere Du''a.
*(Für Ältere: Lerne die Du''a der Laylat al-Qadr: „Allahumma innaka afuwwun tuhibbul afwa fa''fu anni.")*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (27, 'Bedeutung', '🌙', 'Lass dir von deinen Eltern erklären: Was ist Laylat al-Qadr? Warum ist diese Nacht so besonders?
*(Für Ältere: Schreibe auf, was du in dieser Nacht Allah bittest.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (27, 'Stille & Gebet', '🤫', 'Sitze heute Abend 5 Minuten in Stille und denke an Allah.
*(Für Ältere: Versuche in dieser Nacht länger wach zu bleiben und zu beten.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (28, 'Danken', '🙏', 'Sage laut: „Elhamdülillah, danke Allah für alles!"
*(Für Ältere: Schreibe auf, was dieser Ramadan dir gegeben hat.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (28, 'Schönste Erinnerung', '🌙', 'Was war dein schönstes Ramadan-Erlebnis bis jetzt? Erzähle es deinen Eltern.
*(Für Ältere: Schreibe deine schönste Ramadan-Erinnerung auf.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (28, 'Weitermachen', '🌙', 'Überlege: Was möchtest du nach Ramadan weitermachen – z. B. täglich Bismillah sagen, teilen, helfen?
*(Für Ältere: Schreibe 3 Gewohnheiten auf, die du nach Ramadan behalten möchtest.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (29, 'Rückblick', '🌙', 'Was hat dir in diesem Ramadan am meisten Spaß gemacht? Erzähle es!
*(Für Ältere: Was hast du in diesem Ramadan über dich selbst gelernt?)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (29, 'Stolz', '🌙', 'Auf was bist du in diesem Ramadan stolz? Nenne 3 Dinge.
*(Für Ältere: Schreibe einen Brief an dein zukünftiges Ich: „Liebe/r ich, diesen Ramadan habe ich...")*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (29, 'Vorbereitung Bayram', '🎉', 'Helfe dabei, das Haus für Bayram vorzubereiten – aufräumen, dekorieren, Tisch decken.
*(Für Ältere: Schreibe eine Eid-Mubarak-Nachricht an jemanden, dem du sie schicken möchtest.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (30, 'Gratulieren', '🎉', 'Sage zu allen: „Bayramın mübarek olsun!" oder „Eid Mubarak!"
*(Für Ältere: Schicke eine persönliche Eid-Nachricht an jemanden, den du vermisst oder an den du denkst.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (30, 'Feiern & Danken', '🙏', 'Umarme alle in der Familie und sage ihnen, dass du sie liebst.
*(Für Ältere: Bedanke dich bei deinen Eltern für diesen gemeinsamen Ramadan.)*');
INSERT INTO daily_tasks (day, title, icon, task) VALUES (30, 'Geschenk des Herzens', '❤️', 'Das Bild ist vollständig! Du hast 30 Tage lang gute Taten getan, gelernt und gegeben. Du hast Bayram verdient! 🌟
*(Für Ältere: Schreibe auf, was du nächstes Jahr im Ramadan noch besser oder anders machen möchtest.)*');