/* ==========================================
   Memes Slide Puzzle - Game Engine
   Optimized for YouTube Playables (Self-contained, Offline, Audio)
   ========================================== */

const safeStorage = {
    getItem(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    setItem(key, value) {
        try { localStorage.setItem(key, value); } catch (e) {}
    }
};

// 35 Meme Image Levels (3x3, 4x4, 5x5 grid progression)
const LEVELS = [
    { id: 1, size: 3, image: 'resimler/meme.jpg', name: 'Classic Meme', shuffleMoves: 6 },
    { id: 2, size: 3, image: 'resimler/meme (1).jpg', name: 'Grumpy Cat', shuffleMoves: 8 },
    { id: 3, size: 3, image: 'resimler/‘The rock’.jpg', name: 'The Rock Eyebrow', shuffleMoves: 10 },
    { id: 4, size: 3, image: 'resimler/beluga cat.jpg', name: 'Beluga Cat', shuffleMoves: 12 },
    { id: 5, size: 3, image: 'resimler/Komikkk.jpg', name: 'Funny Cat', shuffleMoves: 14 },
    { id: 6, size: 3, image: 'resimler/cringeee.jpg', name: 'Cringe Kid', shuffleMoves: 16 },
    { id: 7, size: 3, image: 'resimler/ooo.jpg', name: 'Shocked Face', shuffleMoves: 18 },
    { id: 8, size: 3, image: 'resimler/indir.jpg', name: 'Meme Grid', shuffleMoves: 20 },
    { id: 9, size: 3, image: 'resimler/ewwww.jpg', name: 'Ewwww', shuffleMoves: 22 },
    { id: 10, size: 3, image: 'resimler/caballo.jpg', name: 'Caballo', shuffleMoves: 24 },
    { id: 11, size: 3, image: 'resimler/Hello.jpg', name: 'Hello Meme', shuffleMoves: 26 },
    { id: 12, size: 3, image: 'resimler/Monkey_.jpg', name: 'Monkey', shuffleMoves: 28 },
    { id: 13, size: 4, image: 'resimler/indir (1).jpg', name: 'Distracted BF', shuffleMoves: 35 },
    { id: 14, size: 4, image: 'resimler/indir (2).jpg', name: 'Drake Hotline', shuffleMoves: 40 },
    { id: 15, size: 4, image: 'resimler/indir (3).jpg', name: 'Success Kid', shuffleMoves: 45 },
    { id: 16, size: 4, image: 'resimler/indir (4).jpg', name: 'Hide the Pain', shuffleMoves: 48 },
    { id: 17, size: 4, image: 'resimler/indir (5).jpg', name: 'Disaster Girl', shuffleMoves: 52 },
    { id: 18, size: 4, image: 'resimler/indir (6).jpg', name: 'Expanding Brain', shuffleMoves: 55 },
    { id: 19, size: 4, image: 'resimler/indir (7).jpg', name: 'Think About It', shuffleMoves: 58 },
    { id: 20, size: 4, image: 'resimler/indir (8).jpg', name: 'Stonks', shuffleMoves: 62 },
    { id: 21, size: 4, image: 'resimler/indir (9).jpg', name: 'This Is Fine', shuffleMoves: 65 },
    { id: 22, size: 4, image: 'resimler/indir (10).jpg', name: 'Ight Imma Head Out', shuffleMoves: 68 },
    { id: 23, size: 4, image: 'resimler/indir (11).jpg', name: 'Trade Offer', shuffleMoves: 72 },
    { id: 24, size: 4, image: 'resimler/indir (12).jpg', name: 'Sad Cat', shuffleMoves: 75 },
    { id: 25, size: 5, image: 'resimler/cocomelon.jpg', name: 'Cocomelon Kid', shuffleMoves: 85 },
    { id: 26, size: 5, image: 'resimler/zenci Masha.jpg', name: 'Dark Masha', shuffleMoves: 95 },
    { id: 27, size: 5, image: 'resimler/Water your garden.jpg', name: 'Water Garden', shuffleMoves: 105 },
    { id: 28, size: 5, image: 'resimler/sticker neymar.jpg', name: 'Neymar Roll', shuffleMoves: 115 },
    { id: 29, size: 5, image: 'resimler/Edit san andres_.jpg', name: 'San Andreas', shuffleMoves: 125 },
    { id: 30, size: 5, image: 'resimler/Ekmek Reis.jpg', name: 'Ekmek Reis', shuffleMoves: 130 },
    { id: 31, size: 5, image: 'resimler/GERALD___.jpg', name: 'Gerald', shuffleMoves: 135 },
    { id: 32, size: 5, image: 'resimler/🤣🤣🤏🏻.jpg', name: 'Laugh Emoji', shuffleMoves: 140 },
    { id: 33, size: 5, image: 'resimler/RONALDO SUUIIIIIII.jpg', name: 'Ronaldo Suii', shuffleMoves: 145 },
    { id: 34, size: 5, image: 'resimler/👌🏿.jpg', name: 'OK Hand', shuffleMoves: 150 },
    { id: 35, size: 5, image: 'resimler/_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA_ meme✨.jpg', name: 'AAAA Meme', shuffleMoves: 160 }
];

const SVG_ICONS = {
    lock: `<svg class="svg-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    check: `<svg class="svg-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    soundOn: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    soundOff: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="m23 9-6 6M17 9l6 6"/></svg>`
};

// Arkaplan müziği — <audio> elementi streaming yapar, bekleme yok
const bgMusic = new Audio('puzzle-drift.mp3');
bgMusic.loop = true;
bgMusic.preload = 'auto';
let musicStarted = false;

// Tıklama sesi (menü butonları için)
const clickSound = new Audio('click-sound.mp3');
clickSound.preload = 'auto';

const gameState = {
    currentLevelIndex: 0,
    unlockedLevel: 1,
    size: 3,
    tiles: [],
    solution: [],
    moves: 0,
    startTime: null,
    elapsedSeconds: 0,
    timerInterval: null,
    isPlaying: false,
    blankIndex: 8,
    tileElements: new Map(),
    soundEnabled: true,
    soundVolume: 0.5,
    audioCtx: null,
    masterGainNode: null,
    confetti: {
        active: false,
        particles: [],
        canvas: null,
        ctx: null,
        animationFrame: null
    }
};

// ==========================================
// AUDIO
// ==========================================
function initAudio() {
    if (!gameState.audioCtx) {
        gameState.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        gameState.masterGainNode = gameState.audioCtx.createGain();
        gameState.masterGainNode.connect(gameState.audioCtx.destination);
    }
    const currentVol = gameState.soundEnabled ? gameState.soundVolume : 0;
    gameState.masterGainNode.gain.setValueAtTime(currentVol, gameState.audioCtx.currentTime);
    if (gameState.audioCtx.state === 'suspended') {
        gameState.audioCtx.resume();
    }
}

function playSound(type) {
    if (!gameState.soundEnabled) return;

    function _play() {
        if (!gameState.audioCtx) {
            gameState.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            gameState.masterGainNode = gameState.audioCtx.createGain();
            gameState.masterGainNode.gain.value = 1;
            gameState.masterGainNode.connect(gameState.audioCtx.destination);
        }
        const ctx = gameState.audioCtx;
        const vol = gameState.soundVolume;
        const now = ctx.currentTime + 0.02;

        try {
            if (type === 'slide') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(140, now);
                osc.frequency.exponentialRampToValueAtTime(280, now + 0.08);
                gain.gain.setValueAtTime(vol * 0.6, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'victory') {
                const notes = [
                    { f: 261.63, d: 0.12 }, { f: 329.63, d: 0.12 },
                    { f: 392.00, d: 0.12 }, { f: 523.25, d: 0.35 }
                ];
                let delay = 0;
                notes.forEach((note, index) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = index === notes.length - 1 ? 'sine' : 'triangle';
                    osc.frequency.setValueAtTime(note.f, now + delay);
                    if (index === notes.length - 1) {
                        const lfo = ctx.createOscillator();
                        const lfoGain = ctx.createGain();
                        lfo.frequency.value = 6;
                        lfoGain.gain.value = 5;
                        lfo.connect(lfoGain);
                        lfoGain.connect(osc.frequency);
                        lfo.start(now + delay);
                        lfo.stop(now + delay + note.d);
                    }
                    gain.gain.setValueAtTime(vol * 0.4, now + delay);
                    gain.gain.linearRampToValueAtTime(0.001, now + delay + note.d);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + delay);
                    osc.stop(now + delay + note.d);
                    delay += 0.10;
                });
            } else if (type === 'shuffle') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);
                gain.gain.setValueAtTime(vol * 0.4, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.05);
            } else if (type === 'lock') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.setValueAtTime(80, now + 0.1);
                gain.gain.setValueAtTime(vol * 0.4, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.15);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.15);
            }
        } catch (e) {
            console.warn("playSound error:", e);
        }
    }

    // Context suspended ise resume bitince çal, yoksa direkt çal
    if (gameState.audioCtx && gameState.audioCtx.state === 'suspended') {
        gameState.audioCtx.resume().then(_play);
    } else {
        _play();
    }
}

function playClickSound() {
    if (!gameState.soundEnabled) return;
    try {
        clickSound.currentTime = 0;
        clickSound.volume = gameState.soundVolume;
        clickSound.play().catch(() => {});
    } catch (e) {}
}

// Tüm level resimlerini önceden yükle (gelmeme sorununu çözer)
function preloadImages() {
    for (const level of LEVELS) {
        const img = new Image();
        img.src = level.image;
    }
}

function preloadBgMusic() {
    bgMusic.load();
}

function startBgMusic() {
    if (!gameState.soundEnabled || !gameState.audioCtx) return;
    if (musicStarted && bgMusic.paused) {
        bgMusic.volume = gameState.soundVolume;
        bgMusic.play().catch(() => {});
    } else if (!musicStarted) {
        musicStarted = true;
        bgMusic.volume = gameState.soundVolume;
        bgMusic.play().catch(() => {});
    }
}

function stopBgMusic() {
    bgMusic.pause();
    bgMusic.currentTime = 0;
}

function updateBgMusicVolume() {
    bgMusic.volume = gameState.soundEnabled ? gameState.soundVolume : 0;
}

function safePlayMusic() {
    if (!gameState.soundEnabled || !gameState.audioCtx) return;
    if (!musicStarted) {
        musicStarted = true;
        bgMusic.volume = gameState.soundVolume;
        bgMusic.play().catch(() => {});
    } else {
        bgMusic.volume = gameState.soundVolume;
    }
}

// ==========================================
// BACKGROUND PHOTO (Splash)
// ==========================================
function generateBackgroundPhoto() {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        const bgGrad = ctx.createRadialGradient(512, 512, 10, 512, 512, 700);
        bgGrad.addColorStop(0, '#13162b');
        bgGrad.addColorStop(1, '#040409');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1024, 1024);

        ctx.globalCompositeOperation = 'screen';
        const neb1 = ctx.createRadialGradient(250, 300, 50, 250, 300, 350);
        neb1.addColorStop(0, 'rgba(236, 72, 153, 0.18)');
        neb1.addColorStop(1, 'rgba(236, 72, 153, 0)');
        ctx.fillStyle = neb1;
        ctx.beginPath();
        ctx.arc(250, 300, 350, 0, Math.PI * 2);
        ctx.fill();

        const neb2 = ctx.createRadialGradient(780, 450, 50, 780, 450, 350);
        neb2.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
        neb2.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = neb2;
        ctx.beginPath();
        ctx.arc(780, 450, 350, 0, Math.PI * 2);
        ctx.fill();

        const neb3 = ctx.createRadialGradient(512, 800, 50, 512, 800, 350);
        neb3.addColorStop(0, 'rgba(168, 85, 247, 0.15)');
        neb3.addColorStop(1, 'rgba(168, 85, 247, 0)');
        ctx.fillStyle = neb3;
        ctx.beginPath();
        ctx.arc(512, 800, 350, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 80; i++) {
            const x = Math.abs(Math.sin(i * 456.78)) * 1024;
            const y = Math.abs(Math.cos(i * 876.54)) * 1024;
            const r = Math.abs(Math.sin(i)) * 2 + 0.5;
            ctx.globalAlpha = 0.2 + Math.abs(Math.cos(i)) * 0.7;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        ctx.strokeStyle = 'rgba(236, 72, 153, 0.15)';
        ctx.lineWidth = 1.5;
        const horizonY = 550;
        for (let i = 0; i < 15; i++) {
            const y = horizonY + Math.pow(i / 14, 2.8) * (1024 - horizonY);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(1024, y);
            ctx.stroke();
        }
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.18)';
        for (let i = -15; i <= 25; i++) {
            const startX = 512 + i * 20;
            const endX = 512 + i * 90;
            ctx.beginPath();
            ctx.moveTo(startX, horizonY);
            ctx.lineTo(endX, 1024);
            ctx.stroke();
        }

        ctx.save();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(512, 512, 280, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.2)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ec4899';
        ctx.beginPath();
        ctx.arc(512, 512, 260, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();

        const startX = 512 - 130;
        const startY = 512 - 160;
        const tileSize = 80;
        const gap = 10;
        const values = ['M', 'E', 'M', 'E', 'S', ''];

        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const tileIdx = r * 3 + c;
                const x = startX + c * (tileSize + gap);
                const y = startY + r * (tileSize + gap);
                if (tileIdx < 5) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    if (typeof ctx.roundRect === 'function') { ctx.roundRect(x, y, tileSize, tileSize, 12); } else { ctx.rect(x, y, tileSize, tileSize); }
                    ctx.fill();
                    ctx.stroke();
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
                    ctx.fillText(values[tileIdx], x + tileSize / 2, y + tileSize / 2);
                } else {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([4, 4]);
                    ctx.beginPath();
                    if (typeof ctx.roundRect === 'function') { ctx.roundRect(x, y, tileSize, tileSize, 12); } else { ctx.rect(x, y, tileSize, tileSize); }
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            }
        }

        ctx.font = '900 48px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.textAlign = 'center';
        if ('letterSpacing' in ctx) { ctx.letterSpacing = '6px'; }
        ctx.fillText('MEMES SLIDE PUZZLE', 512, 720);

        const dataUrl = canvas.toDataURL();
        document.body.style.backgroundImage = `url(${dataUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
    } catch (e) {
        console.warn("Background image fell back:", e);
        document.body.style.backgroundColor = '#05060f';
    }
}

// ==========================================
// SOLVABILITY SHUFFLE
// ==========================================
function countInversions(arr) {
    let inversions = 0;
    const list = arr.filter(n => n !== 0);
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i] > list[j]) { inversions++; }
        }
    }
    return inversions;
}

function isSolvable(arr, size) {
    const inversions = countInversions(arr);
    if (size % 2 !== 0) { return inversions % 2 === 0; }
    const blankIdx = arr.indexOf(0);
    const blankRowFromBottom = size - Math.floor(blankIdx / size);
    if (blankRowFromBottom % 2 === 0) { return inversions % 2 !== 0; }
    else { return inversions % 2 === 0; }
}

function generateSolvableBoard(size, shuffleMoves) {
    const totalTiles = size * size;
    let arr = Array.from({ length: totalTiles }, (_, i) => (i === totalTiles - 1 ? 0 : i + 1));
    let blankIdx = totalTiles - 1;

    let prevIndex = -1;
    for (let i = 0; i < shuffleMoves; i++) {
        const validSwaps = [];
        const r = Math.floor(blankIdx / size);
        const c = blankIdx % size;
        if (r > 0) validSwaps.push(blankIdx - size);
        if (r < size - 1) validSwaps.push(blankIdx + size);
        if (c > 0) validSwaps.push(blankIdx - 1);
        if (c < size - 1) validSwaps.push(blankIdx + 1);
        const choices = validSwaps.filter(idx => idx !== prevIndex);
        const nextIdx = choices.length > 0 ? choices[Math.floor(Math.random() * choices.length)] : validSwaps[Math.floor(Math.random() * validSwaps.length)];
        [arr[blankIdx], arr[nextIdx]] = [arr[nextIdx], arr[blankIdx]];
        prevIndex = blankIdx;
        blankIdx = nextIdx;
    }

    if (!isSolvable(arr, size)) {
        for (let i = totalTiles - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
        if (!isSolvable(arr, size)) {
            let swapIdx1 = -1, swapIdx2 = -1;
            for (let i = 0; i < totalTiles; i++) {
                if (arr[i] !== 0) {
                    if (swapIdx1 === -1) swapIdx1 = i;
                    else if (swapIdx2 === -1) { swapIdx2 = i; break; }
                }
            }
            if (swapIdx1 !== -1 && swapIdx2 !== -1) { [arr[swapIdx1], arr[swapIdx2]] = [arr[swapIdx2], arr[swapIdx1]]; }
        }
    }
    return arr;
}

function checkVictory() {
    for (let i = 0; i < gameState.tiles.length; i++) {
        if (gameState.tiles[i] !== gameState.solution[i]) { return false; }
    }
    return true;
}

// ==========================================
// TIMER
// ==========================================
function startTimer() {
    clearInterval(gameState.timerInterval);
    gameState.startTime = Date.now() - (gameState.elapsedSeconds * 1000);
    gameState.timerInterval = setInterval(() => {
        gameState.elapsedSeconds = Math.floor((Date.now() - gameState.startTime) / 1000);
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() { clearInterval(gameState.timerInterval); }

function updateTimerDisplay() {
    const mins = Math.floor(gameState.elapsedSeconds / 60);
    const secs = gameState.elapsedSeconds % 60;
    const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    const timerEl = document.getElementById('game-timer');
    if (timerEl) timerEl.innerText = formatted;
    return formatted;
}

// ==========================================
// CONFETTI
// ==========================================
function initConfetti() {
    gameState.confetti.canvas = document.getElementById('confetti-canvas');
    if (gameState.confetti.canvas) {
        gameState.confetti.ctx = gameState.confetti.canvas.getContext('2d');
        resizeConfettiCanvas();
        window.addEventListener('resize', resizeConfettiCanvas);
    }
}

function resizeConfettiCanvas() {
    if (gameState.confetti.canvas) {
        gameState.confetti.canvas.width = window.innerWidth;
        gameState.confetti.canvas.height = window.innerHeight;
    }
}

function startConfetti() {
    initConfetti();
    const conf = gameState.confetti;
    if (!conf.canvas || !conf.ctx) return;
    conf.active = true;
    conf.particles = [];
    const colors = ['#ec4899', '#06b6d4', '#f59e0b', '#a855f7', '#10b981', '#ff7849'];
    for (let i = 0; i < 120; i++) {
        conf.particles.push({
            x: Math.random() * conf.canvas.width,
            y: Math.random() * conf.canvas.height - conf.canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * conf.canvas.height,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 5,
            tiltAngleIncremental: Math.random() * 0.07 + 0.02,
            tiltAngle: 0
        });
    }

    function draw() {
        if (!conf.active) return;
        conf.ctx.clearRect(0, 0, conf.canvas.width, conf.canvas.height);
        conf.particles.forEach((p, idx) => {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
            p.x += Math.sin(p.tiltAngle) * 0.5;
            p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;
            if (p.y > conf.canvas.height) { p.x = Math.random() * conf.canvas.width; p.y = -20; p.tilt = Math.random() * 10 - 5; }
            conf.ctx.beginPath();
            conf.ctx.lineWidth = p.r;
            conf.ctx.strokeStyle = p.color;
            conf.ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            conf.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            conf.ctx.stroke();
        });
        conf.animationFrame = requestAnimationFrame(draw);
    }
    draw();
}

function stopConfetti() {
    const conf = gameState.confetti;
    conf.active = false;
    if (conf.animationFrame) { cancelAnimationFrame(conf.animationFrame); }
    if (conf.ctx) { conf.ctx.clearRect(0, 0, conf.canvas.width, conf.canvas.height); }
    window.removeEventListener('resize', resizeConfettiCanvas);
}

// ==========================================
// BUILD BOARD WITH MEME IMAGES
// ==========================================
function buildBoardDOM() {
    const board = document.getElementById('puzzle-board');
    if (!board) return;
    board.innerHTML = '';
    gameState.tileElements.clear();

    const currentLevel = LEVELS[gameState.currentLevelIndex];
    board.style.setProperty('--grid-size', currentLevel.size);
    board.style.setProperty('--bg-img', `url('${currentLevel.image}')`);

    gameState.tiles.forEach((value, index) => {
        if (value === 0) { gameState.blankIndex = index; return; }

        const tile = document.createElement('div');
        tile.className = 'puzzle-tile';

        const origIndex = value - 1;
        const origR = Math.floor(origIndex / currentLevel.size);
        const origC = origIndex % currentLevel.size;
        tile.style.setProperty('--orig-x', origC);
        tile.style.setProperty('--orig-y', origR);

        const curR = Math.floor(index / currentLevel.size);
        const curC = index % currentLevel.size;
        tile.style.setProperty('--tx', curC);
        tile.style.setProperty('--ty', curR);

        const inner = document.createElement('div');
        inner.className = 'tile-inner';

        tile.appendChild(inner);
        tile.addEventListener('pointerdown', (e) => { e.preventDefault(); handleTileMove(value); });
        board.appendChild(tile);
        gameState.tileElements.set(value, tile);
    });
}

function updateBoardDOM() {
    gameState.tiles.forEach((value, index) => {
        if (value === 0) { gameState.blankIndex = index; return; }
        const tile = gameState.tileElements.get(value);
        if (tile) {
            const r = Math.floor(index / gameState.size);
            const c = index % gameState.size;
            tile.style.setProperty('--tx', c);
            tile.style.setProperty('--ty', r);
        }
    });
}

function handleTileMove(value) {
    if (!gameState.isPlaying) return;
    const tileIndex = gameState.tiles.indexOf(value);
    const blankIndex = gameState.blankIndex;
    const tr = Math.floor(tileIndex / gameState.size);
    const tc = tileIndex % gameState.size;
    const br = Math.floor(blankIndex / gameState.size);
    const bc = blankIndex % gameState.size;
    const isAdjacent = (Math.abs(tr - br) === 1 && tc === bc) || (Math.abs(tc - bc) === 1 && tr === br);
    if (isAdjacent) {
        gameState.tiles[blankIndex] = value;
        gameState.tiles[tileIndex] = 0;
        gameState.blankIndex = tileIndex;
        gameState.moves++;
        const movesEl = document.getElementById('moves-count');
        if (movesEl) movesEl.innerText = gameState.moves;
        playSound('slide');
        updateBoardDOM();
        if (checkVictory()) { triggerVictory(); }
    }
}

function moveInDirection(dir) {
    if (!gameState.isPlaying) return;
    const size = gameState.size;
    const blank = gameState.blankIndex;
    const r = Math.floor(blank / size);
    const c = blank % size;
    let targetIndex = -1;
    switch (dir) {
        case 'up': if (r < size - 1) targetIndex = blank + size; break;
        case 'down': if (r > 0) targetIndex = blank - size; break;
        case 'left': if (c < size - 1) targetIndex = blank + 1; break;
        case 'right': if (c > 0) targetIndex = blank - 1; break;
    }
    if (targetIndex !== -1) {
        const value = gameState.tiles[targetIndex];
        handleTileMove(value);
    }
}

// ==========================================
// LEVELS MENU
// ==========================================
function renderLevelsMenu() {
    const container = document.getElementById('levels-grid-container');
    if (!container) return;
    container.innerHTML = '';

    LEVELS.forEach((level, index) => {
        const card = document.createElement('div');
        card.className = 'level-card';
        const isUnlocked = level.id <= gameState.unlockedLevel;
        const isCompleted = level.id < gameState.unlockedLevel;

        if (!isUnlocked) {
            card.classList.add('locked');
            card.innerHTML = `<div class="level-lock-svg-wrapper">${SVG_ICONS.lock}</div><div class="level-name">Level ${level.id}</div>`;
            card.addEventListener('click', () => { playSound('lock'); });
        } else {
            let completedBadge = '';
            if (isCompleted) { card.classList.add('completed-level'); completedBadge = `<div class="completed-level-badge">${SVG_ICONS.check}</div>`; }
            card.innerHTML = `${completedBadge}<div class="level-number">${level.id}</div><div class="level-name">${level.name}</div><div class="level-badges"><span class="level-badge size-badge">${level.size}x${level.size}</span></div>`;
            card.addEventListener('click', () => { playClickSound(); startPuzzle(index); });
        }
        container.appendChild(card);
    });
}

// ==========================================
// GAME STATE TRANSITIONS
// ==========================================
function startPuzzle(levelIndex = null) {
    const highestPlayableIdx = Math.min(gameState.unlockedLevel - 1, LEVELS.length - 1);
    let targetIdx = levelIndex !== null ? levelIndex : highestPlayableIdx;
    if (isNaN(targetIdx) || targetIdx < 0 || targetIdx >= LEVELS.length) targetIdx = 0;

    gameState.currentLevelIndex = targetIdx;
    const currentLevel = LEVELS[gameState.currentLevelIndex];
    gameState.size = currentLevel.size;
    gameState.moves = 0;
    gameState.elapsedSeconds = 0;
    gameState.isPlaying = true;

    const movesEl = document.getElementById('moves-count');
    if (movesEl) movesEl.innerText = 0;
    updateTimerDisplay();

    const dispNameEl = document.getElementById('level-display-name');
    if (dispNameEl) { dispNameEl.innerText = `Level ${currentLevel.id} - ${currentLevel.name} (${currentLevel.size}x${currentLevel.size})`; }

    const totalTiles = gameState.size * gameState.size;
    gameState.solution = Array.from({ length: totalTiles }, (_, i) => (i === totalTiles - 1 ? 0 : i + 1));
    gameState.tiles = generateSolvableBoard(gameState.size, currentLevel.shuffleMoves);

    stopTimer();
    stopBgMusic();
    playSound('shuffle');

    // Show Level Splash Screen
    const splash = document.getElementById('level-splash');
    const splashText = document.getElementById('splash-level-text');
    if (splash && splashText) {
        splashText.innerText = `LEVEL ${currentLevel.id}`;
        splash.classList.add('active');
    }

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    setTimeout(() => {
        if (splash) splash.classList.remove('active');
        const gameScreen = document.getElementById('game-screen');
        if (gameScreen) gameScreen.classList.add('active');
        buildBoardDOM();
        startTimer();
        startBgMusic();
    }, 1500);
}

function restartLevel() { stopTimer(); startPuzzle(gameState.currentLevelIndex); }

function triggerVictory() {
    gameState.isPlaying = false;
    stopTimer();
    stopBgMusic();
    playSound('victory');

    const currentLevel = LEVELS[gameState.currentLevelIndex];

    if (currentLevel.id === gameState.unlockedLevel && currentLevel.id < LEVELS.length) {
        gameState.unlockedLevel = currentLevel.id + 1;
        safeStorage.setItem('slideQuest_unlockedLevel', gameState.unlockedLevel);
        renderLevelsMenu();
    }

    const finalMoves = document.getElementById('final-moves');
    if (finalMoves) finalMoves.innerText = gameState.moves;
    const finalTime = document.getElementById('final-time');
    if (finalTime) finalTime.innerText = updateTimerDisplay();
    const finalLevel = document.getElementById('final-level');
    if (finalLevel) finalLevel.innerText = `Level ${currentLevel.id}`;

    const nextBtn = document.getElementById('next-puzzle-btn');
    const subtitleText = document.getElementById('victory-subtitle-text');

    if (nextBtn && subtitleText) {
        if (currentLevel.id === LEVELS.length) {
            subtitleText.innerText = "Congratulations! You have completed all Meme levels!";
            nextBtn.innerText = "REPLAY GAME";
            nextBtn.onclick = () => {
                stopConfetti();
                const vicScreen = document.getElementById('victory-screen');
                if (vicScreen) vicScreen.classList.remove('active');
                startPuzzle(0);
            };
        } else {
            subtitleText.innerText = "You solved the Meme puzzle!";
            nextBtn.innerText = "NEXT LEVEL";
            nextBtn.onclick = () => {
                stopConfetti();
                const vicScreen = document.getElementById('victory-screen');
                if (vicScreen) vicScreen.classList.remove('active');
                startPuzzle(gameState.currentLevelIndex + 1);
            };
        }
    }

    const vicScreen = document.getElementById('victory-screen');
    if (vicScreen) vicScreen.classList.add('active');
    startConfetti();
}

function quitToMenu() {
    stopTimer();
    stopConfetti();
    const vicScreen = document.getElementById('victory-screen');
    if (vicScreen) vicScreen.classList.remove('active');
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const menuScreen = document.getElementById('menu-screen');
    if (menuScreen) menuScreen.classList.add('active');
    safePlayMusic();
}

// ==========================================
// GAME INITIALIZATION
// ==========================================
function initGame() {
    generateBackgroundPhoto();

    // Load Progression
    const savedLevel = safeStorage.getItem('slideQuest_unlockedLevel');
    if (savedLevel !== null) {
        const parsed = parseInt(savedLevel, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= LEVELS.length) {
            gameState.unlockedLevel = parsed;
        } else {
            gameState.unlockedLevel = 1;
            safeStorage.setItem('slideQuest_unlockedLevel', 1);
        }
    } else {
        gameState.unlockedLevel = 1;
    }

    // Load Sound Settings
    const savedSound = safeStorage.getItem('slideQuest_soundEnabled');
    if (savedSound !== null) { gameState.soundEnabled = savedSound === 'true'; }

    const savedVolume = safeStorage.getItem('slideQuest_soundVolume');
    if (savedVolume !== null) {
        const parsedVolume = parseFloat(savedVolume);
        if (!isNaN(parsedVolume) && parsedVolume >= 0 && parsedVolume <= 1) { gameState.soundVolume = parsedVolume; }
    }

    const volumeSlider = document.getElementById('volume-slider');
    const volumePercent = document.getElementById('volume-percent');
    if (volumeSlider) { volumeSlider.value = gameState.soundVolume; }
    if (volumePercent) { volumePercent.innerText = `${Math.round(gameState.soundVolume * 100)}%`; }

    if (gameState.soundEnabled) {
        // Don't try to play here, it will be started on first user click
    }

    // Menu Buttons
    const playBtn = document.getElementById('play-btn');
    const levelsBtn = document.getElementById('levels-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const backFromLevelsBtn = document.getElementById('back-from-levels-btn');

    // Sound Toggles
    const homeSoundBtn = document.getElementById('home-sound-toggle');
    const gameSoundBtn = document.getElementById('game-sound-toggle');
    const menuSoundBtn = document.getElementById('menu-sound-toggle');

    function toggleSound() {
        gameState.soundEnabled = !gameState.soundEnabled;
        safeStorage.setItem('slideQuest_soundEnabled', gameState.soundEnabled);
        if (gameState.soundEnabled) { safePlayMusic(); } else { stopBgMusic(); }
        if (gameState.masterGainNode) {
            const currentVol = gameState.soundEnabled ? gameState.soundVolume : 0;
            gameState.masterGainNode.gain.setValueAtTime(currentVol, gameState.audioCtx ? gameState.audioCtx.currentTime : 0);
        }
        updateSoundButtonsDisplay();
        initAudio();
    }

    function updateSoundButtonsDisplay() {
        if (!homeSoundBtn || !gameSoundBtn) return;
        if (gameState.soundEnabled) {
            homeSoundBtn.innerHTML = SVG_ICONS.soundOn; homeSoundBtn.style.opacity = '1.0';
            gameSoundBtn.innerHTML = SVG_ICONS.soundOn; gameSoundBtn.style.opacity = '1.0';
            const volIcon = document.getElementById('volume-slider-icon');
            if (volIcon) volIcon.innerText = '🔊';
        } else {
            homeSoundBtn.innerHTML = SVG_ICONS.soundOff; homeSoundBtn.style.opacity = '0.5';
            gameSoundBtn.innerHTML = SVG_ICONS.soundOff; gameSoundBtn.style.opacity = '0.5';
            const volIcon = document.getElementById('volume-slider-icon');
            if (volIcon) volIcon.innerText = '🔇';
        }
    }

    updateSoundButtonsDisplay();

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const newVol = parseFloat(e.target.value);
            gameState.soundVolume = newVol;
            safeStorage.setItem('slideQuest_soundVolume', newVol);
            if (volumePercent) { volumePercent.innerText = `${Math.round(newVol * 100)}%`; }
            updateBgMusicVolume();
            if (gameState.masterGainNode) { initAudio(); gameState.masterGainNode.gain.setValueAtTime(newVol, gameState.audioCtx.currentTime); }
        });
    }

    renderLevelsMenu();

    function onUserFirstClick() {
        if (!musicStarted && gameState.soundEnabled) {
            musicStarted = true;
            startBgMusic();
        }
    }

    // PLAY button
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            playClickSound();
            initAudio();
            onUserFirstClick();
            startPuzzle();
        });
    }

    // LEVELS button
    if (levelsBtn) {
        levelsBtn.addEventListener('click', () => {
            playClickSound();
            initAudio();
            onUserFirstClick();
            renderLevelsMenu();
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            const lvScreen = document.getElementById('levels-screen');
            if (lvScreen) lvScreen.classList.add('active');
        });
    }

    if (settingsBtn && settingsModal) { settingsBtn.addEventListener('click', () => { playClickSound(); initAudio(); settingsModal.classList.add('active'); }); }
    if (closeSettingsBtn && settingsModal) { closeSettingsBtn.addEventListener('click', () => { playClickSound(); settingsModal.classList.remove('active'); }); }
    window.addEventListener('click', (e) => { if (e.target === settingsModal) { settingsModal.classList.remove('active'); } });

    if (backFromLevelsBtn) {
        backFromLevelsBtn.addEventListener('click', () => {
            playClickSound();
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            const menuScreen = document.getElementById('menu-screen');
            if (menuScreen) menuScreen.classList.add('active');
        });
    }

    if (menuSoundBtn) menuSoundBtn.addEventListener('click', () => { playClickSound(); toggleSound(); });
    if (gameSoundBtn) gameSoundBtn.addEventListener('click', () => { playClickSound(); toggleSound(); });
    if (homeSoundBtn) homeSoundBtn.addEventListener('click', () => { playClickSound(); toggleSound(); });

    // Reset Progress
    const resetProgressBtn = document.getElementById('reset-progress-btn');
    if (resetProgressBtn) {
        resetProgressBtn.addEventListener('click', () => {
            playClickSound();
            if (confirm("Are you sure you want to reset all game progress? This cannot be undone.")) {
                gameState.unlockedLevel = 1;
                safeStorage.setItem('slideQuest_unlockedLevel', 1);
                playSound('lock');
                if (settingsModal) { settingsModal.classList.remove('active'); }
                renderLevelsMenu();
            }
        });
    }

    // Action Hooks
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    if (backToMenuBtn) backToMenuBtn.addEventListener('click', () => { playClickSound(); quitToMenu(); });

    const restartLevelBtn = document.getElementById('restart-level-btn');
    if (restartLevelBtn) restartLevelBtn.addEventListener('click', () => { playClickSound(); restartLevel(); });

    const victoryMenuBtn = document.getElementById('victory-menu-btn');
    if (victoryMenuBtn) victoryMenuBtn.addEventListener('click', () => { playClickSound(); quitToMenu(); });

    // Preview Meme Image
    const previewArtBtn = document.getElementById('preview-art-btn');
    const previewModal = document.getElementById('preview-modal');
    const closePreviewBtn = document.getElementById('close-preview-btn');
    const artPreviewContainer = document.getElementById('modal-art-preview');

    if (previewArtBtn && previewModal && closePreviewBtn && artPreviewContainer) {
        previewArtBtn.addEventListener('click', () => {
            const level = LEVELS[gameState.currentLevelIndex];
            if (level && level.image) {
                artPreviewContainer.innerHTML = '';
                const img = document.createElement('img');
                img.src = level.image;
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.borderRadius = '8px';
                artPreviewContainer.appendChild(img);
                previewModal.classList.add('active');
            }
        });

        closePreviewBtn.addEventListener('click', () => { playClickSound(); previewModal.classList.remove('active'); });
        previewModal.addEventListener('click', (e) => { if (e.target === previewModal) { previewModal.classList.remove('active'); } });
    }

    // Keyboard bindings
    document.addEventListener('keydown', (e) => {
        if (!gameState.isPlaying) return;
        const key = e.key.toLowerCase();
        if (key === 'arrowup' || key === 'w') moveInDirection('up');
        else if (key === 'arrowdown' || key === 's') moveInDirection('down');
        else if (key === 'arrowleft' || key === 'a') moveInDirection('left');
        else if (key === 'arrowright' || key === 'd') moveInDirection('right');
    });

    // Swipe gesture tracking
    const board = document.getElementById('puzzle-board');
    if (board) {
        let touchStartX = 0, touchStartY = 0;
        board.addEventListener('touchstart', (e) => {
            if (!gameState.isPlaying) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        board.addEventListener('touchend', (e) => {
            if (!gameState.isPlaying) return;
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;
            const minSwipeDistance = 35;
            if (Math.abs(dx) > Math.abs(dy)) {
                if (Math.abs(dx) > minSwipeDistance) { if (dx > 0) moveInDirection('right'); else moveInDirection('left'); }
            } else {
                if (Math.abs(dy) > minSwipeDistance) { if (dy > 0) moveInDirection('down'); else moveInDirection('up'); }
            }
        }, { passive: true });
    }
}

// Ön yüklemeler (arka planda)
preloadBgMusic();
preloadImages();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
