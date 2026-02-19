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

    registerServiceWorker();
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
        const childProg = allProgressData.find(p => p.child_name === child.name);
        const starCount = childProg ? (childProg.completed_tasks || []).length : 0; // Updated property

        tab.innerHTML = `<span>${sanitize(child.name)}</span> <span class="tab-star">⭐ ${starCount}</span>`;
        tab.setAttribute('aria-label', `${sanitize(child.name)}: ${starCount} Sterne gesammelt`);

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
                completedTasks = data.completed_tasks || []; // Updated property
                revealedTiles = data.revealed_tiles || [];

                // Sync with local cache for tabs
                const idx = allProgressData.findIndex(p => p.child_name === safeName);
                if (idx !== -1) {
                    allProgressData[idx].completed_tasks = completedTasks; // Updated property
                } else {
                    allProgressData.push({ child_name: safeName, completed_tasks: completedTasks }); // Updated property
                }
                return;
            }
        } catch (e) { }
    }

    // Fallback: localStorage
    const key = `ramadan_completed_tasks_${safeName}`; // Updated key
    const revKey = `ramadan_revealed_${safeName}`;
    try {
        completedTasks = JSON.parse(localStorage.getItem(key) || '[]'); // Updated property
        revealedTiles = JSON.parse(localStorage.getItem(revKey) || '[]');
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

        let isLocked = false;

        // Prüfen, ob der Tag gesperrt sein muss
        if (today !== null && i > today) {
            isLocked = true;
        }

        // Ein Tag gilt als "fertig" fürs Kalenderblatt, wenn mindestens eine Aufgabe gemacht wurde
        // Check if any task for this day is completed
        const tasksForThisDay = dailyTasks.filter(task => task.day === i);
        const anyTaskCompletedForDay = tasksForThisDay.some(task => completedTasks.includes(task.id));

        if (anyTaskCompletedForDay && !isLocked) {
            day.classList.add('completed');
            day.innerHTML = `<span class="star-icon">⭐</span><span class="day-num">${i}</span>`;
        }

        if (isLocked) {
            day.classList.add('locked');
            day.innerHTML = `<span class="lock-icon">🔒</span><span class="day-num">${i}</span>`;
            day.addEventListener('click', (e) => {
                e.stopPropagation();
                showToast(`⏳ Geduld! Diese Tür öffnet sich erst am ${i}. Tag.`);
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

    badge.textContent = `Tag ${dayNum}`;
    title.textContent = `Tag ${dayNum}: Deine Aufgaben`;

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

        taskEl.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h4 style="margin:0; font-size:1.05rem; color:var(--modal-text);">${taskData.icon || '🌙'} ${sanitize(taskData.title)}</h4>
                ${isDone ? '<span style="color:#2ecc71; font-weight:700;">✅</span>' : ''}
            </div>
            <p style="margin:8px 0 12px 0; font-size:0.95rem; color:var(--modal-text-secondary); line-height:1.4;">${sanitize(taskData.task)}</p>
            ${!isDone ? `<button class="modal-btn-small" onclick="window.markTaskCompleted('${taskData.id}', ${dayNum})" style="
                background: var(--gold-primary);
                color: white;
                border: none;
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 0.85rem;
                cursor: pointer;
                transition: opacity 0.2s;
            ">Ich hab's geschafft! ⭐</button>` : ''}
        `;
        taskContainer.appendChild(taskEl);
    });

    // Update main button text if all tasks are done
    const allDone = tasksForDay.every(t => completedTasks.includes(t.id));
    const doneBtn = document.getElementById('modalDoneBtn');
    if (doneBtn) {
        doneBtn.textContent = allDone ? 'Super gemacht! 🌙' : 'Ich hab\'s geschafft! ✨';
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
    // Find the global index of this task in the 90 tasks list
    const taskIndex = dailyTasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1 && !revealedTiles.includes(taskIndex)) {
        revealRandomTile(taskIndex);
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

    // Update UI
    renderChildTabs();

    // Refresh the modal to show the checkmark
    openModal(dayNum);

    // Day 30 celebration
    if (dayNum === 30 && revealedTiles.length >= 30) {
        setTimeout(showCelebration, 800);
    }
}

// ========== REVEAL TILE (90-Tile System) ==========
function revealRandomTile(taskIdx) {
    if (revealedTiles.includes(taskIdx)) return;

    // Use tileMapping to find which physical tile (0-89) to reveal
    const tileIndex = tileMapping[taskIdx];
    revealedTiles.push(taskIdx);

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
