/* ======================================
   RAMADAN KALENDER 2026 — SCRIPT
   Supabase-First, PWA-Ready, Secure
   ====================================== */

// ========== SUPABASE CONFIG ==========
const SUPABASE_URL = 'https://thscbzyzblpqwbskymbg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_w4wZcJW_TOnzxlgr-kMr5Q_aCu8OxTz';
const APP_VERSION = '1.2.2';

let supabaseClient = null;
try {
    if (window.supabase && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        window.supabaseClient = supabaseClient; // Explicitly global
        console.log('[Ramadan] Supabase client initialized.');
    }
} catch (e) {
    console.warn('[Ramadan] Supabase init failed:', e);
}

// ========== FALLBACK TASKS (used until Supabase table is ready) ==========
const FALLBACK_TASKS = [
    { id: 'f1-1', day: 1, icon: '👋', title: 'Begrüßung', task: 'Sage „Ramadan Mubarak!" oder „Hayırlı Ramazanlar!" zu jedem in deiner Familie.' },
    { id: 'f1-2', day: 1, icon: '🧠', title: 'Verstehen', task: 'Frage deine Eltern: „Warum fasten Muslime im Ramadan?" und hör gut zu.' },
    { id: 'f1-3', day: 1, icon: '❤️', title: 'Herzensaufgabe', task: 'Male ein Bild oder zeichne etwas, auf das du dich im Ramadan freust.' },
    { id: 'f2-1', day: 2, icon: '🤝', title: 'Helfen', task: 'Hilf beim Tischdecken für das Iftar-Essen.' },
    { id: 'f2-2', day: 2, icon: '🌙', title: 'Freundlichkeit', task: 'Sage heute mindestens 3 Mal „Danke" – ohne dass jemand dich daran erinnert.' },
    { id: 'f2-3', day: 2, icon: '🌙', title: 'Aufmerksamkeit', task: 'Frage jemanden in der Familie: „Kann ich dir helfen?"' },
    { id: 'f3-1', day: 3, icon: '🧠', title: 'Nachdenken', task: 'Denke an 3 Dinge, für die du heute dankbar bist – erzähle sie deinen Eltern.' },
    { id: 'f3-2', day: 3, icon: '🙏', title: 'Dankeschön sagen', task: 'Bedanke dich bei jemandem, dem du noch nie richtig „Danke" gesagt hast.' },
    { id: 'f3-3', day: 3, icon: '🧠', title: 'Vergleichen', task: 'Sprecht in der Familie darüber: Was haben wir, das andere nicht haben?' },
    { id: 'f4', day: 4, icon: '🍽️', title: 'Essen teilen', task: 'Teile heute dein Essen mit einem Nachbarn oder Freund.' },
    { id: 'f5', day: 5, icon: '🧹', title: 'Helfen im Haushalt', task: 'Hilf heute ohne gefragt zu werden im Haushalt mit.' },
    { id: 'f6', day: 6, icon: '💌', title: 'Brief schreiben', task: 'Schreibe einen lieben Brief oder eine Nachricht an jemanden.' },
    { id: 'f7', day: 7, icon: '🌳', title: 'Natur genießen', task: 'Gehe heute nach draußen und danke Allah für die Natur.' },
    { id: 'f8', day: 8, icon: '🤝', title: 'Versöhnung', task: 'Versöhne dich heute mit jemandem, mit dem du im Streit warst.' },
    { id: 'f9', day: 9, icon: '💰', title: 'Spenden', task: 'Spende heute etwas – egal wie klein – für einen guten Zweck.' },
    { id: 'f10', day: 10, icon: '🧸', title: 'Spielzeug verschenken', task: 'Verschenke ein Spielzeug, das du nicht mehr brauchst.' },
    { id: 'f11', day: 11, icon: '🕌', title: 'Moschee besuchen', task: 'Besuche heute die Moschee für ein gemeinsames Gebet.' },
    { id: 'f12', day: 12, icon: '👴', title: 'Ältere besuchen', task: 'Besuche oder rufe heute Oma, Opa oder ältere Nachbarn an.' },
    { id: 'f13', day: 13, icon: '🎨', title: 'Kreativ sein', task: 'Male ein schönes Bild zum Thema Ramadan.' },
    { id: 'f14', day: 14, icon: '🙏', title: 'Extra Gebet', task: 'Bete heute ein zusätzliches freiwilliges Gebet.' },
    { id: 'f15', day: 15, icon: '📚', title: 'Geschichte lernen', task: 'Lerne heute eine Geschichte über einen Propheten.' },
    { id: 'f16', day: 16, icon: '🥤', title: 'Wasser schätzen', task: 'Denke heute beim Trinken daran, wie wertvoll Wasser ist.' },
    { id: 'f17', day: 17, icon: '🌙', title: 'Nachtgebet', task: 'Versuche heute Nacht aufzustehen und ein kurzes Gebet zu sprechen.' },
    { id: 'f18', day: 18, icon: '👨‍👩‍👧‍👦', title: 'Familie', task: 'Verbringe heute bewusst Zeit mit deiner Familie.' },
    { id: 'f19', day: 19, icon: '🍪', title: 'Backen', task: 'Backe heute Kekse oder Kuchen und teile sie mit anderen.' },
    { id: 'f20', day: 20, icon: '🗑️', title: 'Aufräumen', task: 'Räume heute dein Zimmer gründlich auf und halte es sauber.' },
    { id: 'f21', day: 21, icon: '🤫', title: 'Geduld üben', task: 'Übe heute besonders viel Geduld – auch wenn es schwer fällt.' },
    { id: 'f22', day: 22, icon: '🎁', title: 'Überraschung', task: 'Überrasche heute jemanden mit einer kleinen Freude.' },
    { id: 'f23', day: 23, icon: '💧', title: 'Dhikr machen', task: 'Sage heute 100 Mal "SubhanAllah" über den Tag verteilt.' },
    { id: 'f24', day: 24, icon: '🌟', title: 'Vorbild sein', task: 'Sei heute ein gutes Vorbild für andere Kinder.' },
    { id: 'f25', day: 25, icon: '📿', title: 'Dankbarkeit', task: 'Schreibe 5 Dinge auf, für die du heute dankbar bist.' },
    { id: 'f26', day: 26, icon: '🕊️', title: 'Frieden stiften', task: 'Hilf heute dabei, einen Streit zwischen anderen zu schlichten.' },
    { id: 'f27', day: 27, icon: '✨', title: 'Lailat al-Qadr', task: 'Heute könnte die Nacht der Bestimmung sein – bete besonders viel!' },
    { id: 'f28', day: 28, icon: '🧕', title: 'Eltern ehren', task: 'Sage heute deinen Eltern, wie sehr du sie liebst.' },
    { id: 'f29', day: 29, icon: '🌅', title: 'Sonnenaufgang', task: 'Stehe heute früh auf und beobachte den Sonnenaufgang.' },
    { id: 'f30', day: 30, icon: '🎉', title: 'Bayram-Vorfreude', task: 'Bereite dich heute auf das Bayram-Fest vor – dein Geschenk wartet! 🎁' }
];

// ========== STATE ==========
let dailyTasks = [...FALLBACK_TASKS]; // Will be replaced by Supabase data
let completedTasks = []; // UUIDs of completed tasks
let revealedTiles = []; // Task IDs (or indices) that have unlocked a tile
let tileMapping = []; // Mapping for 90 tasks
let currentChild = null;
let childrenData = [];
let allProgressData = []; // Cache for all children's scores
let familyId = null;
let currentLang = localStorage.getItem('ramadan_lang') || 'de';
window.currentLang = currentLang;
window.familyId = familyId;

// ========== I18N ==========
const I18N = {
    de: {
        title: 'Mein Ramadan Kalender 2026',
        nav_setup: 'Konfigurieren',
        nav_logout: 'Abmelden',
        mosaic_counter: 'Dein Bayram-Bild: Noch <span id="tilesLeft">{count}</span> Teile fehlen!',
        mosaic_empty: 'Kein Bild hochgeladen',
        mosaic_link: 'Jetzt einrichten →',
        donation_title: 'Spendenaktion',
        donation_text: 'Wir spenden alles an bedürftige Kinder – für ein freudiges Bayram für alle!',
        donation_paypal: 'Spenden',
        donation_insta: 'Instagram',
        nav_parents: 'Für Eltern',
        nav_parents_sub: 'Motivation & Tipps',
        nav_children: 'Für Kinder',
        nav_children_sub: 'Infos & Spaß',
        loading: 'Kalender wird geladen…',
        modal_day: 'Tag {day}',
        modal_open_day: 'Tag {day} öffnen',
        modal_tasks_title: 'Tag {day}: Deine Aufgaben',
        modal_done: 'Ich hab\'s geschafft! ✨',
        modal_all_done: 'Super gemacht! 🌙',
        toast_locked: '⏳ Geduld! Diese Tür öffnet sich erst am {day}. Tag.',
        celebration_title: 'Bayram Mübarek!',
        celebration_text: 'Du hast alle 30 Tage geschafft! Dein Geschenk wartet auf dich! 🎁',
        celebration_btn: 'Geschenk enthüllen! 🌟',
        footer_setup: 'Einstellungen',
        footer_legal: 'Rechtliches',
        footer_copy: '© 2026 Inhouse Media · Mit 💛 gemacht',
        // Parents Page
        back_to_calendar: '← Zurück zum Kalender',
        motivation_title: 'Unsere Motivation',
        motivation_subtitle: 'Warum wir diesen digitalen Ramadan-Kalender ins Leben gerufen haben',
        motivation_p1: 'Die Idee zu diesem Projekt ist ganz spontan entstanden – aus dem Wunsch heraus, unseren Kindern Ramadan bewusster und gleichzeitig freudvoll näherzubringen.',
        motivation_p2: 'Wir wollten einen Rahmen schaffen, in dem Kinder diesen besonderen Monat aktiv erleben können: mit kleinen täglichen Impulsen, Aufgaben, Spielen und Reflexionsmomenten – altersgerecht und liebevoll gestaltet.',
        motivation_p3: 'Unser Ziel ist es, Ramadan nicht nur als Zeit des Verzichts, sondern als Zeit der Achtsamkeit, Dankbarkeit und Nächstenliebe erfahrbar zu machen.',
        motivation_p4: 'Gleichzeitig ist der Kalender mit einer freiwilligen Spendenaktion verbunden. So möchten wir gemeinsam mit den Kindern ein Zeichen setzen und zeigen, dass Ramadan auch Verantwortung und Mitgefühl bedeutet.',
        motivation_p5: 'Es geht uns darum, Werte erlebbar zu machen – spielerisch, bewusst und mit Herz.',
        spenden_note: '<strong>💛 100% für den guten Zweck:</strong> Die gesammelten Spenden werden zu 100 % an Kinder gespendet. Damit wir gemeinsam das Beste bewirken, entscheiden wir in der <strong>Community über Instagram</strong>, wohin die Hilfe genau fließt. So können wir an Bayram Kindern auf der ganzen Welt eine Freude bereiten!',
        motivation_footer: 'Wir freuen uns, wenn Sie diesen Weg gemeinsam mit Ihren Kindern gehen 🌙✨',
        ideas_title: 'Ideen für die Umsetzung der Aufgaben',
        ideas_p1: 'Die vorgeschlagenen Belohnungen sind lediglich Beispiele von uns. Natürlich können Sie eigene Belohnungen festlegen, die am besten zu Ihrer Familie passen.',
        ideas_p2: 'Wenn Sie bei den DIY-Aktivitäten gerne als Wochenbelohnung mitmachen möchten, empfehlen wir, die Materialien vorab zu besorgen.',
        material_tasbih: 'Zum Beispiel für das Tasbih-Basteln:',
        material_li1: '📿 33 Perlen',
        material_li2: '🧵 reißfeste Schnur',
        material_li3: '💎 ggf. eine größere Abschlussperle',
        ideas_p3: 'So sind Sie gut vorbereitet und können die Aktivität entspannt gemeinsam umsetzen.',
        weekly_rewards_title: 'Vorgeschlagene Wochenbelohnungen:',
        reward_1: '🎬 Familien-Filmabend',
        reward_2: '🍪 Gemeinsam etwas für Iftar backen',
        reward_3: '🎲 Spieleabend bestimmen dürfen',
        reward_4: '👑 „Ramadan-Held der Woche“-Urkunde erstellen',
        reward_5: '🍓 Wunsch-Dessert beim Iftar',
        reward_6: '📖 Extra-Geschichte vor dem Schlafengehen',
        reward_7: '🧁 Kleine Back- oder Bastelaktion (z. B. Tasbih basteln)',
        reward_8: '❤️ 1:1-Zeit mit Mama oder Baba',
        // Children Page
        how_works_title: 'Wie dein Kalender funktioniert',
        step_1: 'Für jede Aufgabe, die du an einem Tag schaffst, bekommst du einen <strong>Stern</strong>.',
        step_2: 'Diese Sterne sammelst du während der ganzen Woche.',
        step_3: 'Nach 7 Tagen schauen wir, wie viele Sterne du gesammelt hast – und dann gibt es eine <strong>Wochenbelohnung</strong>!',
        kids_p1: 'Übrigens: Die Belohnungen, die wir zeigen, sind nur Beispiele.<br>Jede Familie kann selbst entscheiden, welche Belohnung sie auswählen möchte. 🎁',
        important_title: 'Wichtig ist:',
        important_p1: 'Nicht die Belohnung zählt am meisten – sondern die guten Taten, die du im Ramadan sammelst 🤍✨',
        read_aloud: 'Lass dir diesen Text am besten von deinen Eltern vorlesen.',
        // Setup Page
        setup_title: 'Einstellungen',
        setup_how_it_works: '✨ So funktioniert\'s',
        setup_step1: '1. <strong>Kind anlegen</strong> (nur Vorname)',
        setup_step2: '2. <strong>Foto vom echten Bayram-Geschenk</strong> hochladen 🎁',
        setup_hint: 'Tipp: Mach ein Foto von dem Geschenk, das dein Kind am Festtag auch wirklich bekommt. So steigt die Vorfreude jeden Tag!',
        setup_step3: '3. Jeden Tag öffnet sich ein Teil – an Bayram ist es komplett!',
        setup_add_children: '👧🧒 Kinder hinzufügen',
        setup_count: '{count} / {max} Kinder angelegt',
        setup_logged_in: 'Du bist aktuell eingeloggt.',
        setup_registered: 'Registriert mit: {email}',
        setup_info_text: 'Nur <strong style="color:var(--gold-light)">Vorname</strong> eingeben – kein Nachname oder andere persönliche Daten. Lade ein Bild hoch, das dein Kind am <strong style="color:var(--gold-light)">30. Tag (Bayram)</strong> als Geschenk bekommt. 🎁',
        setup_add_btn: '➕ Kind hinzufügen',
        setup_save_btn: '💾 Speichern & Zurück',
        setup_max_reached: '✅ Maximum erreicht ({max} Kinder)',
        child_label: 'Kind {idx}',
        child_name_label: 'Vorname des Kindes',
        child_name_placeholder: 'z.B. Elif, Yusuf, Leyla …',
        child_img_label: 'Geschenk-Bild (wird hinter dem Mosaik versteckt)',
        child_img_upload_text: 'Bild auswählen oder hierher ziehen',
        child_img_change: '🔄 Bild ändern',
        child_img_remove: '🗑️ Entfernen',
        // Login Page
        login_title: 'Anmelden',
        register_title: 'Registrieren',
        login_subtitle: 'Melde dich an, um den Kalender zu nutzen.',
        register_subtitle: 'Erstelle ein Konto für deine Familie.',
        email_label: 'E-Mail Adresse',
        password_label: 'Passwort',
        confirm_password_label: 'Passwort wiederholen',
        forgot_password_link: 'Passwort vergessen?',
        privacy_agree_text: 'Ich bin mit der <a href="rechtliches.html" target="_blank">Datenschutzerklärung</a> einverstanden.',
        login_btn: 'Anmelden',
        register_btn: 'Konto erstellen',
        no_account_question: 'Noch kein Konto?',
        have_account_question: 'Schon registriert?',
        register_link: 'Hier registrieren',
        login_link: 'Hier anmelden',
        reset_title: 'Passwort vergessen',
        reset_subtitle: 'Gib deine E-Mail ein, um einen Reset-Link zu erhalten.',
        reset_btn: 'Reset-Link senden',
        reset_back_question: 'Wieder eingefallen?',
        reset_back_link: 'Zum Login',
        wait_text: 'Bitte warten...',
        privacy_error: 'Bitte akzeptiere die Datenschutzerklärung.',
        password_mismatch: 'Die Passwörter stimmen nicht überein.',
        reset_success: 'Checke deine E-Mails! Wir haben dir einen Link geschickt.',
        account_created: 'Konto erstellt! Bitte melde dich jetzt an.'
    },
    tr: {
        title: 'Ramazan Takvimim 2026',
        nav_setup: 'Ayarlar',
        nav_logout: 'Çıkış Yap',
        mosaic_counter: 'Bayram Resmin: Daha <span id="tilesLeft">{count}</span> parça eksik!',
        mosaic_empty: 'Resim yüklenmedi',
        mosaic_link: 'Şimdi ayarla →',
        donation_title: 'Bağış Kampanyası',
        donation_text: 'Tüm bağışları ihtiyaç sahibi çocuklara gönderiyoruz – herkes için mutlu bir Bayram!',
        donation_paypal: 'Bağış Yap',
        donation_insta: 'Instagram',
        nav_parents: 'Ebeveynlere',
        nav_parents_sub: 'Motivasyon & İpuçları',
        nav_children: 'Çocuklara',
        nav_children_sub: 'Bilgi & Eğlence',
        loading: 'Takvim yükleniyor…',
        modal_day: 'Gün {day}',
        modal_open_day: '{day}. günü aç',
        modal_tasks_title: 'Gün {day}: Görevlerin',
        modal_done: 'Başardım! ✨',
        modal_all_done: 'Harika gidiyorsun! 🌙',
        toast_locked: '⏳ Sabır! Bu kapı ancak {day}. günde açılır.',
        celebration_title: 'Bayramınız Mübarek Olsun!',
        celebration_text: '30 günün hepsini tamamladın! Hediyen seni bekliyor! 🎁',
        celebration_btn: 'Hediyeyi aç! 🌟',
        footer_setup: 'Ayarlar',
        footer_legal: 'Yasal Bilgiler',
        footer_copy: '© 2026 Inhouse Media · 💛 ile yapıldı',
        // Parents Page
        back_to_calendar: '← Takvime geri dön',
        motivation_title: 'Motivasyonumuz',
        motivation_subtitle: 'Bu dijital Ramazan takvimini neden hayata geçirdik?',
        motivation_p1: 'Bu proje fikri tamamen kendiliğinden gelişti – çocuklarımıza Ramazan\'ı daha bilinçli ve aynı zamanda neşeyle anlatma isteğimizden doğdu.',
        motivation_p2: 'Çocukların bu özel ayı aktif bir şekilde yaşayabilecekleri bir ortam oluşturmak istedik: küçük günlük teşvikler, görevler, oyunlar ve tefekkür anları ile – yaşlarına uygun ve sevgiyle tasarlanmış.',
        motivation_p3: 'Amacımız, Ramazan\'ı sadece bir mahrumiyet zamanı değil, aynı zamanda farkındalık, şükür ve yardımlaşma zamanı olarak deneyimletmek.',
        motivation_p4: 'Aynı zamanda takvim, gönüllü bir bağış kampanyası ile bağlantılıdır. Böylece çocuklarla birlikte bir işaret koymak ve Ramazan\'ın aynı zamanda sorumluluk ve merhamet anlamına geldiğini göstermek istiyoruz.',
        motivation_p5: 'Bizim için önemli olan değerleri yaşatmak – oyunla, bilinçli ve yürekten.',
        spenden_note: '<strong>💛 %100 iyilik için:</strong> Toplanan bağışların tamamı ihtiyaç sahibi çocuklara gönderilecektir. Birlikte en iyisini yapabilmek için yardımın nereye gideceğine <strong>Instagram topluluğumuz</strong> üzerinden karar veriyoruz. Böylece Bayram\'da dünyanın dört bir yanındaki çocukları mutlu edebiliriz!',
        motivation_footer: 'Bu yolda çocuklarınızla birlikte yürümenizden mutluluk duyarız 🌙✨',
        ideas_title: 'Görevlerin Uygulanması İçin Fikirler',
        ideas_p1: 'Önerilen ödüller sadece bizim örneklerimizdir. Elbette ailenize en uygun kendi ödüllerinizi belirleyebilirsiniz.',
        ideas_p2: 'Eğer haftalık ödül olarak DIY (kendin yap) aktivitelerine katılmak isterseniz, malzemeleri önceden temin etmenizi öneririz.',
        material_tasbih: 'Örneğin tespih yapımı için:',
        material_li1: '📿 33 boncuk',
        material_li2: '🧵 sağlam ip',
        material_li3: '💎 gerekirse daha büyük bir imame boncuğu',
        ideas_p3: 'Böylece iyi hazırlanmış olursunuz ve aktiviteyi birlikte keyifle yapabilirsiniz.',
        weekly_rewards_title: 'Önerilen Haftalık Ödüller:',
        reward_1: '🎬 Ailece film gecesi',
        reward_2: '🍪 İftar için birlikte bir şeyler pişirmek',
        reward_3: '🎲 Oyun gecesini seçme hakkı',
        reward_4: '👑 „Haftanın Ramazan Kahramanı“ belgesi hazırlamak',
        reward_5: '🍓 İftarda rüya tatlısı',
        reward_6: '📖 Yatmadan önce ekstra masal',
        reward_7: '🧁 Küçük pişirme veya el işi aktivitesi (örn. tespih yapma)',
        reward_8: '❤️ Anne veya baba ile 1:1 özel vakit',
        // Children Page
        how_works_title: 'Takvimin Nasıl Çalışır?',
        step_1: 'Bir günde başardığın her görev için bir <strong>yıldız</strong> kazanırsın.',
        step_2: 'bu yıldızları tüm hafta boyunca toplarsın.',
        step_3: '7 günün sonunda kaç yıldız topladığına bakıyoruz – ve sonra bir <strong>haftalık ödül</strong> var!',
        kids_p1: 'Bu arada: Gösterdiğimiz ödüller sadece örnektir.<br>Her aile hangi ödülü seçeceğine kendisi karar verebilir. 🎁',
        important_title: 'Önemli Olan:',
        important_p1: 'En önemli olan ödül değil, Ramazan boyunca topladığın iyiliklerdir 🤍✨',
        read_aloud: 'Bu metni ailene sesli okutabilirsin.',
        // Setup Page
        setup_title: 'Ayarlar',
        setup_how_it_works: '✨ Nasıl Çalışır?',
        setup_step1: '1. <strong>Çocuk ekle</strong> (sadece isim)',
        setup_step2: '2. <strong>Gerçek Bayram hediyesinin fotoğrafını</strong> yükle 🎁',
        setup_hint: 'İpucu: Çocuğunuzun bayramda gerçekten alacağı hediyenin fotoğrafını çekin. Böylece her gün heyecanı artar!',
        setup_step3: '3. Her gün bir parça açılır – Bayram\'da tamamlanır!',
        setup_add_children: '👧🧒 Çocuk Ekle',
        setup_count: '{count} / {max} Çocuk eklendi',
        setup_logged_in: 'Şu an giriş yapmış durumdasınız.',
        setup_registered: '{email} ile kayıtlı',
        setup_info_text: 'Sadece <strong style="color:var(--gold-light)">İsim</strong> girin – soyisim veya başka kişisel veri yok. Çocuğunun <strong style="color:var(--gold-light)">30. günde (Bayram)</strong> hediye olarak alacağı bir resim yükle. 🎁',
        setup_add_btn: '➕ Çocuk Ekle',
        setup_save_btn: '💾 Kaydet ve Geri Dön',
        setup_max_reached: '✅ Sınıra ulaşıldı ({max} Çocuk)',
        child_label: 'Çocuk {idx}',
        child_name_label: 'Çocuğun İsmi',
        child_name_placeholder: 'örn. Elif, Yusuf, Leyla …',
        child_img_label: 'Hediye Resmi (mozaik arkasına gizlenecektir)',
        child_img_upload_text: 'Resim seçin veya buraya sürükleyin',
        child_img_change: '🔄 Resmi Değiştir',
        child_img_remove: '🗑️ Kaldır',
        // Login Page
        login_title: 'Giriş Yap',
        register_title: 'Kayıt Ol',
        login_subtitle: 'Takvimi kullanmak için giriş yapın.',
        register_subtitle: 'Aileniz için bir hesap oluşturun.',
        email_label: 'E-posta Adresi',
        password_label: 'Şifre',
        confirm_password_label: 'Şifreyi Tekrarla',
        forgot_password_link: 'Şifremi Unuttum?',
        privacy_agree_text: '<a href="rechtliches.html" target="_blank">Gizlilik politikasını</a> kabul ediyorum.',
        login_btn: 'Giriş Yap',
        register_btn: 'Hesap Oluştur',
        no_account_question: 'Henüz hesabınız yok mu?',
        have_account_question: 'Zaten kayıtlı mısınız?',
        register_link: 'Buradan kayıt olun',
        login_link: 'Buradan giriş yapın',
        reset_title: 'Şifremi Unuttum',
        reset_subtitle: 'Sıfırlama bağlantısı almak için e-postanızı girin.',
        reset_btn: 'Sıfırlama Bağlantısı Gönder',
        reset_back_question: 'Hatırladınız mı?',
        reset_back_link: 'Giriş ekranına dön',
        wait_text: 'Lütfen bekleyin...',
        privacy_error: 'Lütfen gizlilik politikasını kabul edin.',
        password_mismatch: 'Şifreler eşleşmiyor.',
        reset_success: 'E-postalarınızı kontrol edin! Size bir bağlantı gönderdik.',
        account_created: 'Hesap oluşturuldu! Lütfen şimdi giriş yapın.'
    }
};

const TASK_TRANSLATIONS = {
    tr: {
        // Day 1
        'f1-1': { title: 'Selamlaşma', task: 'Ailendeki herkese „Hayırlı Ramazanlar!" veya „Ramadan Mubarak!" de.' },
        'f1-2': { title: 'Anlama', task: 'Ailene sor: „Müslümanlar neden Ramazan\'da oruç tutar?" ve onları dikkatlice dinle.' },
        'f1-3': { title: 'Kalp Görevi', task: 'Ramazan\'da seni mutlu eden bir şeyin resmini çiz.' },
        // Day 2
        'f2-1': { title: 'Yardım Etme', task: 'İftar sofrasını kurarken yardım et.' },
        'f2-2': { title: 'Nazik Olma', task: 'Bugün en az 3 kere kimseden uyarı almadan „Teşekkür ederim" de.' },
        'f2-3': { title: 'Dikkat ve Özen', task: 'Aileden birine sor: „Sana yardım edebilir miyim?"' },
        // Day 3
        'f3-1': { title: 'Tefekkür', task: 'Bugün şükrettiğin 3 şeyi düşün ve ailene anlat.' },
        'f3-2': { title: 'Teşekkür Etme', task: 'Daha önce hiç gerçekten „Teşekkür ederim" demediğin birine teşekkür et.' },
        'f3-3': { title: 'Karşılaştırma', task: 'Ailenle konuş: Başkalarında olmayan neyimiz var?' },
        // Day 4
        'f4': { title: 'Güzel Sözler', task: 'Bugün sadece nazik ve güzel şeyler söyle. Kavga etmek ve kalp kırmak yok.' },
        // Day 5
        'f5': { title: 'Toplama', task: '5 oyuncağını oder eşyanı doğru yerlerine kaldır.' },
        // Day 6
        'f6': { title: 'Mektup Yazma', task: 'Sevdiğin birine güzel bir mektup veya mesaj yaz.' },
        // Day 7
        'f7': { title: 'Doğanın Tadını Çıkar', task: 'Bugün dışarı çık ve doğa için Allah\'a şükret.' },
        // Day 8
        'f8': { title: 'Barışma', task: 'Bugün küs olduğun biri varsa onunla barış.' },
        // Day 9
        'f9': { title: 'Bağış', task: 'Bugün küçük de olsa bir bağış yap veya bir iyilikte bulun.' },
        // Day 10
        'f10': { title: 'Oyuncak Paylaşma', task: 'Artık oynamadığın bir oyuncağını birine hediye et.' },
        // Day 11
        'f11': { title: 'Camii Ziyareti', task: 'Bugün cemaatle namaz kılmak için camiyi ziyaret et.' },
        // Day 12
        'f12': { title: 'Büyükleri Ziyaret', task: 'Bugün büyükanne, büyükbaba veya yaşlı komşularını ziyaret et veya onları ara.' },
        // Day 13
        'f13': { title: 'Yaratıcı Ol', task: 'Ramazan temalı güzel bir resim çiz.' },
        // Day 14
        'f14': { title: 'Fazladan Namaz', task: 'Bugün fazladan bir nafile namaz kıl.' },
        // Day 15
        'f15': { title: 'Hikaye Öğren', task: 'Bugün bir peygamberin hayatından bir hikaye öğren.' },
        // Day 16
        'f16': { title: 'Suyun Değeri', task: 'Bugün her su içtiğinde suyun ne kadar değerli olduğunu düşün.' },
        // Day 17
        'f17': { title: 'Gece Namazı', task: 'Bu gece uyanıp kısa bir namaz kılmayı dene.' },
        // Day 18
        'f18': { title: 'Aile', task: 'Bugün ailene özel vakit ayır.' },
        // Day 19
        'f19': { title: 'Pişirme', task: 'Bugün kurabiye veya kek yapıp başkalarıyla paylaş.' },
        // Day 20
        'f20': { title: 'Düzen', task: 'Bugün odanı iyice topla ve temiz tut.' },
        // Day 21
        'f21': { title: 'Sabır', task: 'Bugün özellikle sabırlı olmaya çalış – zor gelse bile.' },
        // Day 22
        'f22': { title: 'Sürpriz', task: 'Bugün birine küçük bir sürpriz yapıp onu mutlu et.' },
        // Day 23
        'f23': { title: 'Zikir', task: 'Bugün gün boyunca 100 defa „SubhanAllah“ de.' },
        // Day 24
        'f24': { title: 'Örnek Ol', task: 'Bugün diğer çocuklara iyi bir örnek ol.' },
        // Day 25
        'f25': { title: 'Şükür', task: 'Bugün şükrettiğin 5 şeyi not et.' },
        // Day 26
        'f26': { title: 'Barış Sağlama', task: 'Bugün başkaları arasındaki bir tartışmayı çözmeye yardım et.' },
        // Day 27
        'f27': { title: 'Kadir Gecesi', task: 'Bugün Kadir Gecesi olabilir – özellikle çok dua et!' },
        // Day 28
        'f28': { title: 'Anne Babaya Sevgi', task: 'Bugün anne ve babana onları ne kadar çok sevdiğini söyle.' },
        // Day 29
        'f29': { title: 'Gün Doğumu', task: 'Bugün erken uyan ve gün doğumunu izle.' },
        // Day 30
        'f30': { title: 'Bayram Heyecanı', task: 'Bugün Bayram şenliği için hazırlan – hediyen seni bekliyor! 🎁' }
    }
};

// ========== I18N LOGIC ==========
function setupLanguageSwitcher() {
    const langSwitch = document.getElementById('langSwitch');
    if (!langSwitch) return;

    const btns = langSwitch.querySelectorAll('.lang-btn');
    btns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            localStorage.setItem('ramadan_lang', currentLang);
            btns.forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
            updateUI();

            // Re-render components that depend on lang
            if (typeof buildMosaicGrid === 'function') buildMosaicGrid();
            if (typeof buildCalendarGrid === 'function') buildCalendarGrid();
            if (typeof renderChildTabs === 'function') renderChildTabs();
            if (typeof updateTilesCounter === 'function') updateTilesCounter();
            if (typeof updateChildrenCount === 'function') updateChildrenCount();
            if (typeof updateAddButton === 'function') updateAddButton();
            if (typeof relabelChildren === 'function') relabelChildren();
        });
    });
}

function t(key, data = {}) {
    const local = I18N[currentLang] || I18N['de'];
    let str = local[key] || I18N['de'][key] || key;

    // Replace placeholders like {day} or {count}
    Object.keys(data).forEach(k => {
        // Use replaceAll if available, otherwise a global regex
        if (str.replaceAll) {
            str = str.replaceAll(`{${k}}`, data[k]);
        } else {
            const regex = new RegExp(`\\{${k}\\}`, 'g');
            str = str.replace(regex, data[k]);
        }
    });

    return str;
}

function updateUI() {
    // 1. Update document title
    document.title = t('title');

    // 2. Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const dataStr = el.dataset.i18nData;
        let data = {};
        if (dataStr) {
            try { data = JSON.parse(dataStr); } catch (e) { }
        }

        const translation = t(key, data);
        if (translation.includes('<')) {
            el.innerHTML = translation;
        } else {
            el.textContent = translation;
        }
    });

    // 3. Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    // 4. Special cases (HTML content or complex selectors)
    const mosaicCounter = document.getElementById('mosaicCounter');
    if (mosaicCounter) {
        const countValue = (typeof revealedTiles !== 'undefined' && revealedTiles.length) ? 90 - revealedTiles.length : 90;
        mosaicCounter.innerHTML = t('mosaic_counter', { count: countValue });
    }

    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) mainTitle.textContent = t('title');

    const childCountEl = document.getElementById('childrenCount');
    const actualMax = window.MAX_CHILDREN || (typeof MAX_CHILDREN !== 'undefined' ? MAX_CHILDREN : null);
    if (childCountEl && actualMax !== null) {
        const currentCount = document.querySelectorAll('.child-card').length;
        childCountEl.textContent = t('setup_count', { count: currentCount, max: actualMax });
    }
    // Setup page email info
    const emailInfo = document.getElementById('userEmailInfo');
    if (emailInfo && familyId) {
        // This is handled in setup.html init but we can try to update it if we have session info
    }
}

// ========== UTILS ==========
function sanitize(str) {
    if (typeof str !== 'string') return '';
    const trimmed = str.trim();
    // If string already contains common HTML entities, don't re-sanitize to avoid double encoding
    if (trimmed.includes('&amp;') || trimmed.includes('&lt;') || trimmed.includes('&gt;')) {
        return trimmed;
    }
    return trimmed
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Seeded shuffle: same family always gets same tile mapping
function seededShuffle(array, seed) {
    const arr = [...array];
    let s = seed;
    for (let i = arr.length - 1; i > 0; i--) {
        s = (s * 1664525 + 1013904223) & 0xffffffff;
        const j = Math.abs(s) % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function seedFromId(id) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = ((hash << 5) - hash) + id.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

// ========== FAMILY ID ==========
function initFamilyId() {
    // Check URL param first
    const params = new URLSearchParams(window.location.search);
    let id = params.get('family');

    if (!id) {
        id = localStorage.getItem('ramadan_family_id');
    }

    if (!id) {
        id = generateUUID();
        localStorage.setItem('ramadan_family_id', id);
    } else {
        localStorage.setItem('ramadan_family_id', id);
    }

    familyId = id;

    // Build tile mapping based on family seed
    const seed = seedFromId(familyId);
    const indices = Array.from({ length: 30 }, (_, i) => i);
    tileMapping = seededShuffle(indices, seed);

    return id;
}

// ========== SERVICE WORKER ==========
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then((reg) => {
            console.log('[PWA] ServiceWorker registered.');

            // Listen for updates
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateBanner(newWorker);
                    }
                });
            });

            // Check for updates whenever the app is re-opened or focused
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    console.log('[PWA] Checking for updates...');
                    reg.update();
                }
            });

            // Periodically check for updates (every 30 minutes)
            setInterval(() => {
                console.log('[PWA] Periodic update check...');
                reg.update();
            }, 30 * 60 * 1000);

        }).catch((e) => {
            console.warn('[PWA] Registration failed:', e);
        });
    }
}

function showUpdateBanner(worker) {
    let banner = document.getElementById('updateBanner');

    // Inject banner if it doesn't exist on this page
    if (!banner) {
        banner = document.createElement('div');
        banner.id = 'updateBanner';
        banner.className = 'update-banner';
        banner.innerHTML = `
            <span>🔄 Neue Version verfügbar!</span>
            <button class="update-btn" id="updateBtn">Jetzt aktualisieren</button>
        `;
        document.body.prepend(banner);
    }

    const btn = document.getElementById('updateBtn');
    if (!btn) return;

    banner.style.display = 'flex';

    btn.addEventListener('click', () => {
        if (worker) {
            worker.postMessage({ type: 'SKIP_WAITING' });
        }
        window.location.reload();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    // 0. Register Service Worker and I18N (Always)
    registerServiceWorker();
    setupLanguageSwitcher();
    updateUI();

    // Only run on main calendar page
    if (!document.getElementById('calendarGrid')) return;

    // 1. AUTH CHECK
    if (!supabaseClient) {
        console.error('[Ramadan] Supabase not initialized');
        return;
    }

    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        // Not logged in -> Go to login
        window.location.href = 'login.html';
        return;
    }

    // Set familyId to User ID (Persistent across devices)
    familyId = session.user.id;
    console.log('[Auth] User session found:', familyId);

    // FIX: Initialize tile mapping for 90 tasks
    const seed = seedFromId(familyId);
    const indices = Array.from({ length: 90 }, (_, i) => i);
    tileMapping = seededShuffle(indices, seed);
    console.log('[Ramadan] Tile mapping (90) initialized.');

    createFloatingSymbols();
    startShootingStars();
    setupModal();

    // Logout Listener
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    showLoading(true);

    try {
        // Load tasks from Supabase (or fallback)
        await loadDailyTasks();

        // Load children & progress
        await loadFamilyData();

        buildMosaicGrid();
        buildCalendarGrid();
        updateTilesCounter();
    } catch (err) {
        console.error('[Ramadan] Initialization error:', err);
    } finally {
        showLoading(false);
    }
});

/**
 * Handle user logout
 */
async function handleLogout() {
    if (confirm('Möchtest du dich wirklich abmelden?')) {
        if (supabaseClient) {
            await supabaseClient.auth.signOut();
        }
        // Clear local session hints
        localStorage.removeItem('ramadan_children');
        localStorage.removeItem('ramadan_current_child');
        window.location.href = 'login.html';
    }
}

// ========== LOADING ==========
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (!overlay) return;
    if (show) {
        overlay.classList.add('active');
        overlay.style.display = 'flex';
    } else {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
    }
}

// ========== LOAD DAILY TASKS FROM SUPABASE ==========
async function loadDailyTasks() {
    if (!supabaseClient) return;

    try {
        const { data, error } = await supabaseClient
            .from('daily_tasks')
            .select('*')
            .order('day', { ascending: true });

        if (!error && data && data.length > 0) {
            dailyTasks = data;
            console.log(`[Ramadan] ${data.length} tasks loaded from Supabase.`);
        }
    } catch (e) {
        console.warn('[Ramadan] Could not load tasks from Supabase, using fallback.');
    }
}

// ========== LOAD FAMILY DATA ==========
async function loadFamilyData() {
    // Try Supabase first
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from('families')
                .select('*')
                .eq('family_id', familyId)
                .single();

            if (!error && data) {
                childrenData = data.children || [];
                console.log('[Ramadan] Family data loaded from Supabase. Children:', childrenData.length);
            } else {
                if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" for .single()
                    console.error('[Ramadan] Supabase load error:', error);
                } else {
                    console.log('[Ramadan] No family record found in Supabase for ID:', familyId);
                }
                // Family not in DB yet, try localStorage
                loadFromLocalStorage();
            }
        } catch (e) {
            loadFromLocalStorage();
        }
    } else {
        loadFromLocalStorage();
    }

    // Set current child
    const savedChild = localStorage.getItem('ramadan_current_child');
    if (childrenData.length > 0) {
        currentChild = childrenData.find(c => c.name === savedChild) || childrenData[0];
    }

    // Load progress for current child
    if (currentChild) {
        await loadChildProgress(currentChild.name);
        loadChildImage(currentChild);
    }

    // Fetch progress for ALL children (to show stars in tabs)
    if (supabaseClient && familyId) {
        try {
            const { data: progData } = await supabaseClient
                .from('progress')
                .select('child_name, completed_tasks')
                .eq('family_id', familyId);
            if (progData) allProgressData = progData;
        } catch (e) { }
    }

    renderChildTabs();
}

function loadFromLocalStorage() {
    const stored = localStorage.getItem('ramadan_children');
    if (stored) {
        try {
            childrenData = JSON.parse(stored) || [];

            // Also load star counts for all children from local storage
            allProgressData = childrenData.map(child => {
                const safeName = sanitize(child.name);
                const key = `ramadan_completed_tasks_${safeName}`; // Updated key
                const completed = JSON.parse(localStorage.getItem(key) || '[]');
                return { child_name: safeName, completed_tasks: completed }; // Updated property
            });

        } catch (e) {
            childrenData = [];
            allProgressData = [];
        }
    }
}

// ========== CHILD TABS ==========
function renderChildTabs() {
    const selector = document.getElementById('childSelector');
    const tabs = document.getElementById('childTabs');
    if (!selector || !tabs) return;

    if (childrenData.length === 0) {
        selector.style.display = 'none';
        return;
    }

    selector.style.display = 'block';
    tabs.innerHTML = '';

    childrenData.forEach((child) => {
        const tab = document.createElement('button');
        tab.className = 'child-tab';

        // Find star count for this child
        const childName = (child.name || '').trim();
        const childProg = allProgressData.find(p => (p.child_name || '').trim() === childName);
        const starCount = childProg ? (childProg.completed_tasks || []).length : 0;

        tab.innerHTML = `<span>${childName}</span> <span class="tab-star">⭐ ${starCount}</span>`;
        tab.setAttribute('aria-label', `${childName}: ${starCount} Sterne gesammelt`);

        if (currentChild && child.name === currentChild.name) {
            tab.classList.add('active');
        }

        tab.addEventListener('click', () => selectChild(child, tab));
        tabs.appendChild(tab);
    });
}

async function selectChild(child, tabEl) {
    currentChild = child;
    localStorage.setItem('ramadan_current_child', child.name);

    document.querySelectorAll('.child-tab').forEach(t => t.classList.remove('active'));
    tabEl.classList.add('active');

    await loadChildProgress(child.name);
    loadChildImage(child);
    buildMosaicGrid();
    buildCalendarGrid();
    updateTilesCounter();
    updateImageBlur();
}

// ========== CHILD IMAGE ==========
function loadChildImage(child) {
    const img = document.getElementById('giftImage');
    const placeholder = document.getElementById('mosaicPlaceholder');

    if (child && child.imageData) {
        img.src = child.imageData;
        img.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
        setTimeout(updateImageBlur, 100);
    } else {
        img.style.display = 'none';
        if (placeholder) placeholder.style.display = 'flex';
    }
}

// ========== LOAD CHILD PROGRESS ==========
async function loadChildProgress(childName) {
    const safeName = sanitize(childName);

    // Try Supabase
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from('progress')
                .select('completed_tasks, revealed_tiles') // Updated property
                .eq('family_id', familyId)
                .eq('child_name', safeName)
                .single();

            if (!error && data) {
                completedTasks = data.completed_tasks || [];

                // CRITICAL: Re-derive revealedTiles from completedTasks to ensure 
                // they follow the random tileMapping based on family seed.
                // This fixes existing sequential progress without breaking data.
                revealedTiles = [];
                completedTasks.forEach(taskId => {
                    const tIdx = dailyTasks.findIndex(t => t.id === taskId);
                    if (tIdx !== -1) {
                        const tileIdx = tileMapping[tIdx];
                        if (tileIdx !== undefined && !revealedTiles.includes(tileIdx)) {
                            revealedTiles.push(tileIdx);
                        }
                    }
                });

                // Sync with local cache for tabs...
                const idx = allProgressData.findIndex(p => p.child_name === safeName);
                if (idx !== -1) {
                    allProgressData[idx].completed_tasks = completedTasks;
                } else {
                    allProgressData.push({ child_name: safeName, completed_tasks: completedTasks });
                }
                return;
            }
        } catch (e) { }
    }

    // Fallback: localStorage
    const key = `ramadan_completed_tasks_${safeName}`; // Updated key
    const revKey = `ramadan_revealed_${safeName}`;
    try {
        completedTasks = JSON.parse(localStorage.getItem(key) || '[]');
        revealedTiles = JSON.parse(localStorage.getItem(revKey) || '[]');

        // Sync local cache
        const idx = allProgressData.findIndex(p => p.child_name === safeName);
        if (idx !== -1) {
            allProgressData[idx].completed_tasks = completedTasks;
        } else {
            allProgressData.push({ child_name: safeName, completed_tasks: completedTasks });
        }
    } catch (e) {
        completedTasks = []; // Updated property
        revealedTiles = [];
    }
}

// ========== MOSAIC GRID (90 Tiles) ==========
function buildMosaicGrid() {
    const grid = document.getElementById('mosaicGrid');
    if (!grid) return;
    grid.innerHTML = '';

    for (let i = 0; i < 90; i++) {
        const tile = document.createElement('div');
        tile.className = 'mosaic-tile';
        tile.id = `mosaic-tile-${i}`;

        if (revealedTiles.includes(i)) {
            tile.classList.add('revealed');
        }

        grid.appendChild(tile);
    }
}

// ========== IMAGE BLUR (Progressive Reveal) ==========
function updateImageBlur() {
    const img = document.getElementById('giftImage');
    if (!img || img.style.display === 'none') return;

    const revealed = revealedTiles.length;
    const total = 90; // Fixed for 90 tiles

    if (revealed >= total) {
        // Tag 30 (alle Aufgaben): Bild kristallklar!
        img.style.filter = 'none';
    } else {
        // Progress reveal: Von 30px Blur -> 6px Blur
        const progress = revealed / total;
        const minBlur = 6;
        const maxBlur = 30;
        const blurAmount = Math.max(minBlur, maxBlur - (progress * (maxBlur - minBlur)));

        // Sättigung und Helligkeit langsam erhöhen
        const saturation = 0.4 + progress * 0.6; // Von 40% auf 100%
        const brightness = 0.8 + progress * 0.2; // Von 80% auf 100%

        img.style.filter = `blur(${blurAmount}px) saturate(${saturation}) brightness(${brightness})`;
    }
}

// ========== CALENDAR GRID ==========
function buildCalendarGrid() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const today = getRamadanDay();

    for (let i = 1; i <= 30; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.id = `calendar-day-${i}`;
        day.dataset.day = i;
        day.textContent = i;
        day.setAttribute('role', 'button');
        day.setAttribute('aria-label', t('modal_open_day', { day: i }));
        day.setAttribute('tabindex', '0');

        let isLocked = false;

        // Prüfen, ob der Tag gesperrt sein muss
        if (today !== null && i > today) {
            isLocked = true;
        }

        const tasksForThisDay = dailyTasks.filter(task => task.day === i);
        const completedForThisDay = tasksForThisDay.filter(task => completedTasks.includes(task.id));

        if (completedForThisDay.length > 0 && !isLocked) {
            day.classList.add('completed');
            let stars = '';
            for (let s = 0; s < completedForThisDay.length; s++) stars += '⭐';
            day.innerHTML = `<span class="star-icon">${stars}</span><span class="day-num">${i}</span>`;
        }

        if (isLocked) {
            day.classList.add('locked');
            day.innerHTML = `<span class="lock-icon">🔒</span><span class="day-num">${i}</span>`;
            day.addEventListener('click', (e) => {
                e.stopPropagation();
                showToast(t('toast_locked', { day: i }));
            });
        } else {
            // Offene Tür: Click erlaubt
            day.addEventListener('click', () => openModal(i));
            day.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') openModal(i);
            });
        }

        if (i === today) {
            day.classList.add('today');
        }

        grid.appendChild(day);
    }
}

// Get current Ramadan day (1–30) based on real date
function getRamadanDay() {
    // STARTDATUM: 19. Februar 2026
    const ramadanStart = new Date('2026-02-19T00:00:00');

    // HEUTE
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zeit ignorieren, nur Datum
    ramadanStart.setHours(0, 0, 0, 0);

    // Differenz in Tagen
    const diffTime = today - ramadanStart;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Wenn vor Start: Tag 0 oder negativ
    // Wenn nach Ende (30 Tage): > 30
    // Wir geben den Tag zurück oder null, wenn außerhalb
    if (diffDays < 1) return 0; // Noch nicht gestartet
    if (diffDays > 30) return 31; // Vorbei

    return diffDays;
}

// ========== MODAL ==========
function setupModal() {
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const doneBtn = document.getElementById('modalDoneBtn');

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (doneBtn) {
        doneBtn.addEventListener('click', closeModal);
        doneBtn.style.display = 'block';
    }
    if (overlay) overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}
window.setupModal = setupModal;

function openModal(dayNum) {
    const tasksForDay = dailyTasks.filter(t => t.day === dayNum);
    if (tasksForDay.length === 0) return;

    const overlay = document.getElementById('modalOverlay');
    const badge = document.getElementById('modalDayBadge');
    const title = document.getElementById('modalTitle');
    const taskContainer = document.getElementById('modalTask');

    badge.textContent = t('modal_day', { day: dayNum });
    title.textContent = t('modal_tasks_title', { day: dayNum });

    taskContainer.innerHTML = '';

    tasksForDay.forEach(taskData => {
        const isDone = completedTasks.includes(taskData.id);

        const taskEl = document.createElement('div');
        taskEl.className = 'modal-task-item';
        taskEl.style = `
            background: rgba(0,0,0,0.03);
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 12px;
            text-align: left;
            border-left: 4px solid ${isDone ? '#3de8a0' : 'var(--gold-primary)'};
        `;

        // Translate task if available
        let displayTitle = taskData.title;
        let displayTask = taskData.task;

        if (currentLang !== 'de' && TASK_TRANSLATIONS[currentLang]) {
            // 1. Try direct ID lookup (for Fallback Tasks)
            let trans = TASK_TRANSLATIONS[currentLang][taskData.id];

            // 2. Fallback: Lookup by Day & Index (for Supabase Tasks with UUIDs)
            if (!trans) {
                const indexInDay = tasksForDay.indexOf(taskData);
                // Pattern: f1-1, f1-2, f1-3 (for day 1-3) or f4, f5... (for day 4-30)
                let fallbackId = `f${dayNum}`;
                if (dayNum <= 3) {
                    fallbackId = `f${dayNum}-${indexInDay + 1}`;
                }
                trans = TASK_TRANSLATIONS[currentLang][fallbackId];
            }

            if (trans) {
                displayTitle = trans.title;
                displayTask = trans.task;
            }
        }

        taskEl.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h4 style="margin:0; font-size:1.05rem; color:var(--modal-text);">${taskData.icon || '🌙'} ${sanitize(displayTitle)}</h4>
                ${isDone ? '<span style="color:#2ecc71; font-weight:700;">✅</span>' : ''}
            </div>
            <p style="margin:8px 0 12px 0; font-size:0.95rem; color:var(--modal-text-secondary); line-height:1.4;">${sanitize(displayTask)}</p>
            ${!isDone ? `<button class="modal-btn-small" onclick="window.markTaskCompleted('${taskData.id}', ${dayNum})" style="
                background: var(--gold-primary);
                color: white;
                border: none;
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 0.85rem;
                cursor: pointer;
                transition: opacity 0.2s;
            ">${t('modal_done')}</button>` : ''}
        `;
        taskContainer.appendChild(taskEl);
    });

    // Update main button text if all tasks are done
    const allDone = tasksForDay.every(t => completedTasks.includes(t.id));
    const doneBtn = document.getElementById('modalDoneBtn');
    if (doneBtn) {
        doneBtn.textContent = allDone ? t('modal_all_done') : t('modal_done');
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}
window.closeModal = closeModal;

async function markTaskCompleted(taskId, dayNum) {
    if (completedTasks.includes(taskId)) return;

    completedTasks.push(taskId);

    // Reveal a unique tile for EVERY task
    const taskIndex = dailyTasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        const tileIdx = tileMapping[taskIndex];
        // Correct check: check if the PHYSICAL TILE is already revealed
        if (!revealedTiles.includes(tileIdx)) {
            revealRandomTile(taskIndex);
        }
    }

    // Check if the daily door should show a star (if at least one task is done)
    const tasksForDay = dailyTasks.filter(t => t.day === dayNum);
    const completedForDay = tasksForDay.filter(t => completedTasks.includes(t.id));

    const calDay = document.getElementById(`calendar-day-${dayNum}`);
    if (calDay && completedForDay.length > 0) {
        calDay.classList.add('completed');
        // Show how many stars (1-3)
        let stars = '';
        for (let s = 0; s < completedForDay.length; s++) stars += '⭐';
        calDay.innerHTML = `<span class="star-icon">${stars}</span><span class="day-num">${dayNum}</span>`;
    }

    // Confetti
    spawnConfetti();

    // Save progress
    await saveProgress();

    // Update local score cache for tabs
    if (currentChild) {
        const idx = allProgressData.findIndex(p => (p.child_name || '').trim() === (currentChild.name || '').trim());
        if (idx !== -1) {
            allProgressData[idx].completed_tasks = [...completedTasks];
        } else {
            allProgressData.push({ child_name: currentChild.name, completed_tasks: [...completedTasks] });
        }
    }

    // Update UI
    renderChildTabs();

    // Refresh the modal to show the checkmark
    openModal(dayNum);

    // Day 30 celebration (only when ALL 90 tiles are open)
    if (dayNum === 30 && revealedTiles.length >= 90) {
        setTimeout(showCelebration, 800);
    }
}

// ========== REVEAL TILE (90-Tile System) ==========
function revealRandomTile(taskIdx) {
    // Use tileMapping to find which physical tile (0-89) to reveal
    const tileIndex = tileMapping[taskIdx];
    if (tileIndex === undefined) return;

    // Check if THIS PHYSICAL TILE is already in the list
    if (revealedTiles.includes(tileIndex)) return;

    revealedTiles.push(tileIndex); // STORE THE TILE INDEX, NOT TASK INDEX

    const tile = document.getElementById(`mosaic-tile-${tileIndex}`);
    if (tile) {
        tile.classList.add('revealing');
        setTimeout(() => {
            tile.classList.remove('revealing');
            tile.classList.add('revealed');
        }, 700);
    }

    updateTilesCounter();
    updateImageBlur();
}
window.revealRandomTile = revealRandomTile;
window.markTaskCompleted = markTaskCompleted;
window.handleLogout = handleLogout;

// ========== UPDATE TILES COUNTER ==========
function updateTilesCounter() {
    const el = document.getElementById('tilesLeft');
    if (el) {
        const left = 90 - revealedTiles.length;
        el.textContent = left;
    }
    // Also update the description if needed via updateUI
    const mosaicCounter = document.getElementById('mosaicCounter');
    if (mosaicCounter) {
        mosaicCounter.innerHTML = t('mosaic_counter', { count: 90 - revealedTiles.length });
    }
}

// ========== SAVE PROGRESS ==========
async function saveProgress() {
    const safeName = currentChild ? sanitize(currentChild.name) : 'default';

    // localStorage backup
    localStorage.setItem(`ramadan_completed_tasks_${safeName}`, JSON.stringify(completedTasks)); // Updated key and variable
    localStorage.setItem(`ramadan_revealed_${safeName}`, JSON.stringify(revealedTiles));

    // Supabase
    if (!supabaseClient) return;

    try {
        await supabaseClient.from('progress').upsert({
            family_id: familyId,
            child_name: safeName,
            completed_tasks: completedTasks,
            revealed_tiles: revealedTiles,
            last_updated: new Date().toISOString()
        }, { onConflict: 'family_id,child_name' });
    } catch (e) {
        console.warn('[Ramadan] Progress save to Supabase failed:', e);
    }
}

// ========== CONFETTI ==========
function spawnConfetti() {
    const colors = ['#f5c842', '#ff6b9d', '#7c4dff', '#26c6da', '#4caf50', '#ff9800', '#e91e63'];

    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = 15 + Math.random() * 70;
        const fallDur = 1.5 + Math.random() * 2;
        const rot = 360 + Math.random() * 720;
        const size = 5 + Math.random() * 7;
        const isCircle = Math.random() > 0.5;

        confetti.style.cssText = `
            left: ${x}%;
            top: -10px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            --fall-dur: ${fallDur}s;
            --rot: ${rot}deg;
            animation-delay: ${Math.random() * 0.5}s;
            border-radius: ${isCircle ? '50%' : '1px'};
        `;

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), (fallDur + 0.6) * 1000);
    }
}

// ========== DAY 30 CELEBRATION ==========
function showCelebration() {
    const overlay = document.getElementById('celebrationOverlay');
    if (!overlay) return;

    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Play celebration sound
    playCelebrationSound();

    // Launch fireworks
    launchFireworks();

    const closeBtn = document.getElementById('celebrationClose');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
}

function playCelebrationSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();

        // Simple celebratory melody
        const notes = [523, 659, 784, 1047, 784, 1047, 1319];
        const times = [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1.0];

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, ctx.currentTime + times[i]);
            gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + times[i] + 0.05);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + times[i] + 0.25);
            osc.start(ctx.currentTime + times[i]);
            osc.stop(ctx.currentTime + times[i] + 0.3);
        });
    } catch (e) {
        // Audio not available
    }
}

function launchFireworks() {
    const container = document.getElementById('fireworks');
    if (!container) return;

    const colors = ['#f5c842', '#ff6b9d', '#7c4dff', '#26c6da', '#4caf50', '#ff9800', '#e91e63', '#fff'];

    function burst() {
        const cx = 20 + Math.random() * 60;
        const cy = 10 + Math.random() * 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const numParticles = 16 + Math.floor(Math.random() * 12);

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework';
            const angle = (i / numParticles) * Math.PI * 2;
            const dist = 60 + Math.random() * 80;
            const fx = Math.cos(angle) * dist;
            const fy = Math.sin(angle) * dist;
            const dur = 0.8 + Math.random() * 0.6;

            particle.style.cssText = `
                left: ${cx}%;
                top: ${cy}%;
                background: ${color};
                --fw-x: ${fx}px;
                --fw-y: ${fy}px;
                --fw-dur: ${dur}s;
                width: ${3 + Math.random() * 4}px;
                height: ${3 + Math.random() * 4}px;
                border-radius: 50%;
                animation-delay: ${Math.random() * 0.2}s;
            `;

            container.appendChild(particle);
            setTimeout(() => particle.remove(), (dur + 0.3) * 1000);
        }
    }

    // Launch multiple bursts
    for (let i = 0; i < 6; i++) {
        setTimeout(burst, i * 300);
    }

    // Continue bursting
    const interval = setInterval(burst, 600);
    setTimeout(() => clearInterval(interval), 5000);
}

// ========== FLOATING SYMBOLS ==========
function createFloatingSymbols() {
    const container = document.getElementById('floatingSymbols');
    if (!container) return;

    const symbols = ['🌙', '⭐', '🌟', '✨', '🍬', '🍫', '🍭', '🫘', '🌙', '⭐', '🍬', '✨', '🌟', '🍭', '⭐', '🫘'];

    symbols.forEach((sym) => {
        const el = document.createElement('div');
        el.className = 'floating-symbol';
        el.textContent = sym;
        el.setAttribute('aria-hidden', 'true');

        const size = 14 + Math.random() * 16;
        const startX = Math.random() * 100;
        const startY = 20 + Math.random() * 70;
        const mx = -40 + Math.random() * 80;
        const my = -60 - Math.random() * 80;
        const ex = -30 + Math.random() * 60;
        const ey = -100 - Math.random() * 100;
        const dur = 14 + Math.random() * 12;
        const delay = Math.random() * dur;

        el.style.cssText = `
            --size: ${size}px;
            --float-dur: ${dur}s;
            --delay: ${delay}s;
            --mx: ${mx}px; --my: ${my}px;
            --ex: ${ex}px; --ey: ${ey}px;
            left: ${startX}%;
            top: ${startY}%;
        `;

        container.appendChild(el);
    });
}

// ========== SHOOTING STARS ==========
function startShootingStars() {
    const container = document.getElementById('shootingStars');
    if (!container) return;

    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.setAttribute('aria-hidden', 'true');

        const startX = 10 + Math.random() * 80;
        const startY = Math.random() * 40;
        const angle = 30 + Math.random() * 30;
        const dx = 200 + Math.random() * 300;
        const dy = 100 + Math.random() * 200;
        const duration = 0.8 + Math.random() * 1.2;

        star.style.cssText = `
            left: ${startX}%;
            top: ${startY}%;
            --angle: ${angle}deg;
            --dx: ${dx}px;
            --dy: ${dy}px;
            --duration: ${duration}s;
        `;

        container.appendChild(star);
        setTimeout(() => star.remove(), duration * 1000 + 100);
    }

    setInterval(() => {
        if (Math.random() < 0.4) createShootingStar();
    }, 2000);

    setTimeout(createShootingStar, 1000);
}
