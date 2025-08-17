// WAAAGH! SLAMBALL JAVASCRIPT - DA MEKBOY'Z FINEST COURT!

// Game State
let scores = { home: 0, guest: 0 };
let waaaghLevels = { home: 0, guest: 0 };
let stats = { 
    home: { krumps: 0, teef: 0 },
    guest: { krumps: 0, teef: 0 }
};

// Ork Phrases for maximum WAAAGH!
const orkPhrases = [
    "WAAAGH!",
    "MORE DAKKA!",
    "GREEN IZ BEST!",
    "KRUMP 'EM GOOD!",
    "OI! DATZ ROIGHT PROPPA!",
    "NEEDZ MORE TEEF!",
    "STOMPY STOMPY!",
    "FOR GORK... OR MORK!",
    "CHOPPY CHOPPY!",
    "RED WUNZ GO FASTA!",
    "WAAAAAGH! WAAAAAGH!",
    "GET STUCK IN, BOYZ!",
    "SMASH DAT GIT!",
    "'ERE WE GO!",
    "PROPPA ORKY!",
    "DAKKA DAKKA DAKKA!",
    "IZ DAT ALL YA GOT?",
    "NEEDS MORE KRUMPIN'!",
    "BOYZ BEFORE TOYZ!",
    "GORK IZ WATCHIN'!",
    "SLAM DUNK, YA GIT!",
    "NOTHIN' BUT NET!",
    "FROM DOWNTOWN!",
    "POSTERIZED DAT GIT!",
    "ANKLE BREAKA!",
    "CROSSOVA KRUMP!",
    "ALLEY-OOP TO GORK!",
    "BOOM SHAKA-WAAAGH!",
    "GREEN TEAM SUPREME!"
];

// Score milestones
const milestones = {
    5: "First bucket, ya git!",
    10: "Heatin' up!",
    15: "ON FIRE!",
    20: "DOUBLE-DOUBLE!",
    25: "Da crowd goes wild!",
    30: "TRIPLE-DOUBLE TERRITORY!",
    40: "MAXIMUM SLAMPAGE!",
    50: "HALF CENTURY OF KRUMPS!",
    69: "NICE... SHOT YA GIT!",
    100: "WARBOSS CHAMPION!"
};

// Main scoring function
function addScore(team, points, eventObj = null) {
    // Input validation
    if (!team || (team !== 'home' && team !== 'guest')) {
        console.error('Invalid team specified:', team);
        return;
    }
    
    if (typeof points !== 'number' || points < 0 || points > 10) {
        console.error('Invalid points value:', points);
        return;
    }
    
    // Check if required DOM elements exist
    const scoreEl = document.getElementById(`${team}-score`);
    const waaaghEl = document.getElementById(`${team}-waaagh`);
    const phraseEl = document.getElementById(`${team}-text`);
    
    if (!scoreEl || !waaaghEl || !phraseEl) {
        console.error('Required DOM elements not found for team:', team);
        return;
    }
    
    // Update scores
    scores[team] += points;
    stats[team].teef += points;
    
    // Prevent score overflow
    if (scores[team] > 999) {
        scores[team] = 999;
        stats[team].teef = Math.min(stats[team].teef, 999);
    }
    
    // Update display with flash effect
    scoreEl.textContent = scores[team];
    scoreEl.classList.add('flash');
    setTimeout(() => scoreEl.classList.remove('flash'), 500);
    
    // Update WAAAGH meter
    waaaghLevels[team] = Math.min(100, waaaghLevels[team] + (points * 5));
    waaaghEl.style.width = waaaghLevels[team] + '%';
    
    // Show random Ork phrase
    phraseEl.textContent = orkPhrases[Math.floor(Math.random() * orkPhrases.length)];
    setTimeout(() => phraseEl.textContent = '', 6000);
    
    // Get coordinates for effects (fallback to center if no event)
    const x = eventObj?.clientX || window.innerWidth / 2;
    const y = eventObj?.clientY || window.innerHeight / 2;
    
    // Check for milestones
    if (milestones[scores[team]]) {
        createExplosion(x, y, milestones[scores[team]]);
    }
    
    // Create dakka effects
    for (let i = 0; i < points; i++) {
        setTimeout(() => createDakka(x, y), i * 100);
    }
    
    // Update stats display
    updateStats(team);
    
    // Special effects at every 10 points
    if (scores[team] % 10 === 0 && scores[team] > 0) {
        triggerWaaaghEffect(team);
    }
}

// KRUMP special ability
function krump(team, eventObj = null) {
    if (waaaghLevels[team] >= 50) {
        // Calculate bonus points
        const bonusPoints = Math.floor(Math.random() * 6) + 5;
        scores[team] += bonusPoints;
        stats[team].krumps++;
        stats[team].teef += bonusPoints;
        
        // Update score display
        const scoreEl = document.getElementById(`${team}-score`);
        scoreEl.textContent = scores[team];
        
        // Epic explosion at center
        createExplosion(window.innerWidth / 2, window.innerHeight / 2, `+${bonusPoints} SLAM DUNK!`);
        
        // Multiple smaller explosions
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const x = (window.innerWidth / 2) + (Math.random() - 0.5) * 200;
                const y = (window.innerHeight / 2) + (Math.random() - 0.5) * 200;
                createExplosion(x, y, "SLAM!");
            }, i * 150);
        }
        
        // Reset WAAAGH meter
        waaaghLevels[team] = 0;
        document.getElementById(`${team}-waaagh`).style.width = '0%';
        
        // Show epic message
        const phraseEl = document.getElementById(`${team}-text`);
        const epicMessages = [
            "MASSIVE SLAM! GORK IZ PLEASED!",
            "POSTERIZED 'EM PROPPA!",
            "FROM DA TOP ROPE!",
            "360 WINDMILL KRUMP!",
            "SHATTERED DA BACKBOARD!"
        ];
        phraseEl.textContent = epicMessages[Math.floor(Math.random() * epicMessages.length)];
        setTimeout(() => phraseEl.textContent = '', 8000);
        
        updateStats(team);
        shakeScreen();
    } else {
        // Not enough WAAAGH energy
        const phraseEl = document.getElementById(`${team}-text`);
        const needed = 50 - waaaghLevels[team];
        phraseEl.textContent = `NEED ${needed}% MORE WAAAGH!`;
        setTimeout(() => phraseEl.textContent = '', 4000);
        
        // Shake the krump button to show it's not ready
        if (eventObj && eventObj.target) {
            eventObj.target.style.animation = 'shake 0.3s';
            setTimeout(() => eventObj.target.style.animation = '', 300);
        }
    }
}

// Create explosion effect
function createExplosion(x, y, text) {
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.textContent = text;
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';
    document.body.appendChild(explosion);
    
    setTimeout(() => explosion.remove(), 1000);
}

// Create dakka effect
function createDakka(x, y) {
    const dakka = document.createElement('div');
    dakka.className = 'dakka';
    const dakkaText = ['DAKKA!', 'BOOM!', 'BLAM!', 'POW!'];
    dakka.textContent = dakkaText[Math.floor(Math.random() * dakkaText.length)];
    dakka.style.left = x + 'px';
    dakka.style.top = y + 'px';
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 50;
    dakka.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
    dakka.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
    
    document.body.appendChild(dakka);
    setTimeout(() => dakka.remove(), 500);
}

// Trigger special WAAAGH effect
function triggerWaaaghEffect(team) {
    const container = document.querySelector('.container');
    container.style.animation = 'shake 0.5s';
    setTimeout(() => container.style.animation = '', 500);
    
    // Add multiple explosions around the screen
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createExplosion(x, y, 'SWISH!');
        }, i * 100);
    }
    
    // Flash the background
    document.body.style.background = 'linear-gradient(135deg, #2a2a2a 0%, #3d3d3d 100%)';
    setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
    }, 200);
}

// Screen shake effect
function shakeScreen() {
    document.body.style.animation = 'screenShake 0.5s';
    setTimeout(() => document.body.style.animation = '', 500);
}

// Update stats display
function updateStats(team) {
    const statsEl = document.getElementById(`${team}-stats`);
    statsEl.textContent = `Krumps: ${stats[team].krumps} | Teef: ${stats[team].teef}`;
}

// Reset the game
function resetGame() {
    if (confirm("START A NEW GAME? ALL YER POINTS WILL BE LOST!")) {
        // Reset all game state
        scores = { home: 0, guest: 0 };
        waaaghLevels = { home: 0, guest: 0 };
        stats = { 
            home: { krumps: 0, teef: 0 },
            guest: { krumps: 0, teef: 0 }
        };
        
        // Reset displays
        document.getElementById('home-score').textContent = '0';
        document.getElementById('guest-score').textContent = '0';
        document.getElementById('home-waaagh').style.width = '0%';
        document.getElementById('guest-waaagh').style.width = '0%';
        document.getElementById('home-text').textContent = '';
        document.getElementById('guest-text').textContent = '';
        
        updateStats('home');
        updateStats('guest');
        
        // Celebration effect
        createExplosion(window.innerWidth / 2, window.innerHeight / 2, "NEW GAME! TIP OFF!");
        
        // Victory lap explosions
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 150;
                const x = (window.innerWidth / 2) + Math.cos(angle) * radius;
                const y = (window.innerHeight / 2) + Math.sin(angle) * radius;
                createExplosion(x, y, "BALL UP!");
            }, i * 100);
        }
        
        shakeScreen();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add some initial flair
    console.log('%cWAAAAGH! SLAMBALL LOADED!', 'color: #7fb069; font-size: 30px; font-weight: bold; text-shadow: 2px 2px 0 #2d5016;');
    console.log('%cTIME TO DUNK ON SOME GITZ!', 'color: #a4d65e; font-size: 20px;');
    console.log('%c🏀 NOTHIN\' BUT NET, YA GIT! 🏀', 'color: #7fb069; font-size: 16px;');
    
    // Optional: Add keyboard shortcuts
    document.addEventListener('keypress', function(e) {
        switch(e.key.toLowerCase()) {
            case 'q': addScore('home', 1, null); break;
            case 'w': addScore('home', 2, null); break;
            case 'e': addScore('home', 3, null); break;
            case 'r': krump('home', null); break;
            case 'u': addScore('guest', 1, null); break;
            case 'i': addScore('guest', 2, null); break;
            case 'o': addScore('guest', 3, null); break;
            case 'p': krump('guest', null); break;
            case 'n': resetGame(); break;
        }
    });
    
    // Easter egg: Konami code for ULTIMATE WAAAGH
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                          'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                          'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            ultimateWaaagh();
            konamiCode = [];
        }
    });
});

// Easter egg function
function ultimateWaaagh() {
    // Fill both WAAAGH meters
    waaaghLevels.home = 100;
    waaaghLevels.guest = 100;
    document.getElementById('home-waaagh').style.width = '100%';
    document.getElementById('guest-waaagh').style.width = '100%';
    
    // Epic announcement
    createExplosion(window.innerWidth / 2, window.innerHeight / 2, "SHOWTIME UNLOCKED!");
    
    // Explosion spiral
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const angle = (i / 10) * Math.PI * 2;
            const radius = 50 + i * 10;
            const x = (window.innerWidth / 2) + Math.cos(angle) * radius;
            const y = (window.innerHeight / 2) + Math.sin(angle) * radius;
            createExplosion(x, y, "JAM!");
        }, i * 50);
    }
    
    shakeScreen();
}