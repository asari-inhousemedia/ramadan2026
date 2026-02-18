/* ======================================
   RAMADAN KALENDER 2026 — SCRIPT
   Supabase-First, PWA-Ready, Secure
   ====================================== */

// ========== SUPABASE CONFIG ==========
const SUPABASE_URL = 'https://thscbzyzblpqwbskymbg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_w4wZcJW_TOnzxlgr-kMr5Q_aCu8OxTz';
const APP_VERSION = '1.0.0';

let supabaseClient = null;
try {
    if (window.supabase && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('[Ramadan] Supabase client initialized.');
    }
} catch (e) {
    console.warn('[Ramadan] Supabase init failed:', e);
}

// ========== FALLBACK TASKS (used until Supabase table is ready) ==========
const FALLBACK_TASKS = [
    { day: 1, icon: '😊', title: 'Lächeln schenken', task: 'Schenke heute jemandem ein ehrliches Lächeln und sag etwas Nettes.' },
    { day: 2, icon: '🤲', title: 'Dua für andere', task: 'Bete heute ein Dua für jemanden, den du liebst.' },
    { day: 3, icon: '📖', title: 'Quran lesen', task: 'Lies heute mindestens eine Seite aus dem Quran.' },
    { day: 4, icon: '🍽️', title: 'Essen teilen', task: 'Teile heute dein Essen mit einem Nachbarn oder Freund.' },
    { day: 5, icon: '🧹', title: 'Helfen im Haushalt', task: 'Hilf heute ohne gefragt zu werden im Haushalt mit.' },
    { day: 6, icon: '💌', title: 'Brief schreiben', task: 'Schreibe einen lieben Brief oder eine Nachricht an jemanden.' },
    { day: 7, icon: '🌳', title: 'Natur genießen', task: 'Gehe heute nach draußen und danke Allah für die Natur.' },
    { day: 8, icon: '🤝', title: 'Versöhnung', task: 'Versöhne dich heute mit jemandem, mit dem du im Streit warst.' },
    { day: 9, icon: '💰', title: 'Spenden', task: 'Spende heute etwas – egal wie klein – für einen guten Zweck.' },
    { day: 10, icon: '🧸', title: 'Spielzeug verschenken', task: 'Verschenke ein Spielzeug, das du nicht mehr brauchst.' },
    { day: 11, icon: '🕌', title: 'Moschee besuchen', task: 'Besuche heute die Moschee für ein gemeinsames Gebet.' },
    { day: 12, icon: '👴', title: 'Ältere besuchen', task: 'Besuche oder rufe heute Oma, Opa oder ältere Nachbarn an.' },
    { day: 13, icon: '🎨', title: 'Kreativ sein', task: 'Male ein schönes Bild zum Thema Ramadan.' },
    { day: 14, icon: '🙏', title: 'Extra Gebet', task: 'Bete heute ein zusätzliches freiwilliges Gebet.' },
    { day: 15, icon: '📚', title: 'Geschichte lernen', task: 'Lerne heute eine Geschichte über einen Propheten.' },
    { day: 16, icon: '🥤', title: 'Wasser schätzen', task: 'Denke heute beim Trinken daran, wie wertvoll Wasser ist.' },
    { day: 17, icon: '🌙', title: 'Nachtgebet', task: 'Versuche heute Nacht aufzustehen und ein kurzes Gebet zu sprechen.' },
    { day: 18, icon: '👨‍👩‍👧‍👦', title: 'Familie', task: 'Verbringe heute bewusst Zeit mit deiner Familie.' },
    { day: 19, icon: '🍪', title: 'Backen', task: 'Backe heute Kekse oder Kuchen und teile sie mit anderen.' },
    { day: 20, icon: '🗑️', title: 'Aufräumen', task: 'Räume heute dein Zimmer gründlich auf und halte es sauber.' },
    { day: 21, icon: '🤫', title: 'Geduld üben', task: 'Übe heute besonders viel Geduld – auch wenn es schwer fällt.' },
    { day: 22, icon: '🎁', title: 'Überraschung', task: 'Überrasche heute jemanden mit einer kleinen Freude.' },
    { day: 23, icon: '💧', title: 'Dhikr machen', task: 'Sage heute 100 Mal "SubhanAllah" über den Tag verteilt.' },
    { day: 24, icon: '🌟', title: 'Vorbild sein', task: 'Sei heute ein gutes Vorbild für andere Kinder.' },
    { day: 25, icon: '📿', title: 'Dankbarkeit', task: 'Schreibe 5 Dinge auf, für die du heute dankbar bist.' },
    { day: 26, icon: '🕊️', title: 'Frieden stiften', task: 'Hilf heute dabei, einen Streit zwischen anderen zu schlichten.' },
    { day: 27, icon: '✨', title: 'Lailat al-Qadr', task: 'Heute könnte die Nacht der Bestimmung sein – bete besonders viel!' },
    { day: 28, icon: '🧕', title: 'Eltern ehren', task: 'Sage heute deinen Eltern, wie sehr du sie liebst.' },
    { day: 29, icon: '🌅', title: 'Sonnenaufgang', task: 'Stehe heute früh auf und beobachte den Sonnenaufgang.' },
    { day: 30, icon: '🎉', title: 'Bayram-Vorfreude', task: 'Bereite dich heute auf das Bayram-Fest vor – dein Geschenk wartet! 🎁' }
];

// ========== STATE ==========
let dailyTasks = [...FALLBACK_TASKS]; // Will be replaced by Supabase data
let completedDays = [];
let revealedTiles = [];
let tileMapping = []; // tileMapping[doorIndex] = tileIndex (random shuffle)
let currentChild = null;
let childrenData = [];
let familyId = null;

// ========== UTILS ==========
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .trim()
        .slice(0, 100);
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
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateBanner(newWorker);
                    }
                });
            });
        }).catch(() => { });
    }
}

function showUpdateBanner(worker) {
    const banner = document.getElementById('updateBanner');
    const btn = document.getElementById('updateBtn');
    if (!banner || !btn) return;

    banner.style.display = 'flex';

    btn.addEventListener('click', () => {
        if (worker) {
            worker.postMessage({ type: 'SKIP_WAITING' });
        }
        window.location.reload();
    });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', async () => {
    if (!document.getElementById('calendarGrid')) return;

    initFamilyId();
    registerServiceWorker();
    createFloatingSymbols();
    startShootingStars();

    showLoading(true);

    // Load tasks from Supabase (or fallback)
    await loadDailyTasks();

    // Load children & progress
    await loadFamilyData();

    buildMosaicGrid();
    buildCalendarGrid();
    setupModal();
    updateTilesCounter();

    showLoading(false);
});

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

        if (!error && data && data.length === 30) {
            dailyTasks = data;
            console.log('[Ramadan] Tasks loaded from Supabase.');
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
                console.log('[Ramadan] Family data loaded from Supabase.');
            } else {
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
        renderChildTabs();
    }
}

function loadFromLocalStorage() {
    const stored = localStorage.getItem('ramadan_children');
    if (stored) {
        try {
            childrenData = JSON.parse(stored) || [];
        } catch (e) {
            childrenData = [];
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
        tab.textContent = sanitize(child.name);
        tab.setAttribute('aria-label', `Kind ${sanitize(child.name)} auswählen`);

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
                .select('completed_days, revealed_tiles')
                .eq('family_id', familyId)
                .eq('child_name', safeName)
                .single();

            if (!error && data) {
                completedDays = data.completed_days || [];
                revealedTiles = data.revealed_tiles || [];
                return;
            }
        } catch (e) { }
    }

    // Fallback: localStorage
    const key = `ramadan_completed_${safeName}`;
    const revKey = `ramadan_revealed_${safeName}`;
    try {
        completedDays = JSON.parse(localStorage.getItem(key) || '[]');
        revealedTiles = JSON.parse(localStorage.getItem(revKey) || '[]');
    } catch (e) {
        completedDays = [];
        revealedTiles = [];
    }
}

// ========== MOSAIC GRID ==========
function buildMosaicGrid() {
    const grid = document.getElementById('mosaicGrid');
    if (!grid) return;
    grid.innerHTML = '';

    for (let i = 0; i < 30; i++) {
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
    const total = 30;

    if (revealed >= total) {
        // Tag 30: Bild kristallklar!
        img.style.filter = 'none';
    } else {
        // Bis Tag 29 bleibt es "milchig" (mind. 6px Blur), um Spannung zu halten
        const progress = revealed / total;

        // Start: 25px Blur -> Ende (Tag 29): 6px Blur
        const minBlur = 6;
        const maxBlur = 30;
        const blurAmount = maxBlur - (progress * (maxBlur - minBlur));

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
        day.setAttribute('aria-label', `Tag ${i} öffnen`);
        day.setAttribute('tabindex', '0');

        if (completedDays.includes(i)) {
            day.classList.add('completed');
        }

        if (i === today) {
            day.classList.add('today');
        }

        day.addEventListener('click', () => openModal(i));
        day.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') openModal(i);
        });

        grid.appendChild(day);
    }
}

// Get current Ramadan day (1–30) based on real date
function getRamadanDay() {
    const ramadanStart = new Date('2026-03-01');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    ramadanStart.setHours(0, 0, 0, 0);
    const diff = Math.floor((today - ramadanStart) / (1000 * 60 * 60 * 24)) + 1;
    if (diff < 1 || diff > 30) return null;
    return diff;
}

// ========== MODAL ==========
function setupModal() {
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const doneBtn = document.getElementById('modalDoneBtn');

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    if (doneBtn) doneBtn.addEventListener('click', () => {
        const dayNum = parseInt(doneBtn.dataset.day);
        if (dayNum && !completedDays.includes(dayNum)) {
            markDayCompleted(dayNum);
        }
        closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(dayNum) {
    const taskData = dailyTasks.find(t => t.day === dayNum);
    if (!taskData) return;

    const overlay = document.getElementById('modalOverlay');
    const badge = document.getElementById('modalDayBadge');
    const title = document.getElementById('modalTitle');
    const task = document.getElementById('modalTask');
    const doneBtn = document.getElementById('modalDoneBtn');

    badge.textContent = `Tag ${dayNum}`;
    title.textContent = `${taskData.icon || '🌙'} ${sanitize(taskData.title)}`;
    task.textContent = sanitize(taskData.task);
    doneBtn.dataset.day = dayNum;

    if (completedDays.includes(dayNum)) {
        doneBtn.textContent = '✅ Bereits erledigt!';
        doneBtn.style.opacity = '0.6';
        doneBtn.style.cursor = 'default';
    } else {
        doneBtn.textContent = 'Ich hab\'s geschafft! ✨';
        doneBtn.style.opacity = '1';
        doneBtn.style.cursor = 'pointer';
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ========== MARK DAY COMPLETED ==========
async function markDayCompleted(dayNum) {
    if (completedDays.includes(dayNum)) return;

    completedDays.push(dayNum);

    // Update calendar tile
    const calDay = document.getElementById(`calendar-day-${dayNum}`);
    if (calDay) calDay.classList.add('completed');

    // Reveal random mosaic tile
    revealRandomTile(dayNum);

    // Confetti
    spawnConfetti();

    // Save progress
    await saveProgress();

    // Day 30 celebration
    if (dayNum === 30 && revealedTiles.length >= 30) {
        setTimeout(showCelebration, 800);
    }
}

// ========== REVEAL TILE (Random Mapping) ==========
function revealRandomTile(dayNum) {
    // tileMapping[dayNum - 1] gives the tile index for this door
    const tileIndex = tileMapping[dayNum - 1];

    if (revealedTiles.includes(tileIndex)) return;

    revealedTiles.push(tileIndex);

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

// ========== UPDATE TILES COUNTER ==========
function updateTilesCounter() {
    const el = document.getElementById('tilesLeft');
    if (el) {
        const left = 30 - revealedTiles.length;
        el.textContent = left;
    }
}

// ========== SAVE PROGRESS ==========
async function saveProgress() {
    const safeName = currentChild ? sanitize(currentChild.name) : 'default';

    // localStorage backup
    localStorage.setItem(`ramadan_completed_${safeName}`, JSON.stringify(completedDays));
    localStorage.setItem(`ramadan_revealed_${safeName}`, JSON.stringify(revealedTiles));

    // Supabase
    if (!supabaseClient) return;

    try {
        await supabaseClient.from('progress').upsert({
            family_id: familyId,
            child_name: safeName,
            completed_days: completedDays,
            revealed_tiles: revealedTiles,
            updated_at: new Date().toISOString()
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
