const reasons = [
    "The first thing I love is your caring.",
    "Your sweet face when you look at me.",
    "Your glossy lips.",
    "Your little eyes.",
    "You remember the little things I say.",
    "That lovely best hug you gave me in the canteen.",
    "You look cute even when you're angry.",
    "The way you feed me morsels with your own hands.",
    "One look from you, and I'm fearless.",
    "You always know how to make me smile.",
    "I love your cheeks the most, and you know it very well.",
    "The way you cared for me when I was sick, and how you teared up.",
    "You inspire me to be a better person.",
    "Every day feels a little brighter because you're in it.",
    "Your eyes hold a kind of confidence that makes me fearless.",
    "You have the most beautiful eyes and those lovely cheeks.",
    "You make me feel loved every single day.",
    "The warmth of your heart makes the world a better place.",
    "Every step of the journey, every happy moment, and every lesson learned has made this story beautiful.",
    "The way you make me feel happy everywhere."
];

const reasonEmojis = ['💗', '🥰', '💋', '👀', '🧠', '🤗', '😤', '🍽️', '💪', '😊', '☺️', '🥺', '🌟', '☀️', '✨', '👁️', '💕', '🌍', '📖', '🎉'];

let player;
let isPlaying = false;
let playerReady = false;

document.addEventListener('DOMContentLoaded', () => {
    // Lock Screen Logic
    const unlockBtn = document.getElementById('unlock-btn');
    const pinInput = document.getElementById('pin-input');
    const errorMsg = document.getElementById('error-msg');
    const lockScreen = document.getElementById('lock-screen');
    const mainContent = document.getElementById('main-content');
    const floatingNav = document.getElementById('floating-nav');

    createLockHearts();

    unlockBtn.addEventListener('click', checkPin);
    pinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPin();
    });

    function checkPin() {
        if (pinInput.value === '1511') {
            lockScreen.style.opacity = '0';
            setTimeout(() => {
                lockScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                
                // Initialize after unlock
                createHeroParticles();
                initCursorSparkles();
                populateReasons();
                setupScrollAnimations();
                initFloatingNav();
                
                if (floatingNav) {
                    floatingNav.classList.remove('hidden');
                }
            }, 800);
        } else {
            errorMsg.textContent = 'Incorrect passcode. Hint: A special date...';
            pinInput.value = '';
            pinInput.classList.add('shake');
            setTimeout(() => pinInput.classList.remove('shake'), 500);
        }
    }

    // Envelope Interaction & Typewriter Effect
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    if (envelopeWrapper) {
        // Prepare typewriter text
        const typeLines = document.querySelectorAll('.typewriter-line');
        const lineTexts = [];
        typeLines.forEach(line => {
            if (!line.classList.contains('letter-sign')) {
                lineTexts.push(line.textContent);
                line.textContent = '';
            } else {
                lineTexts.push(null); // Keep array index aligned
                line.style.opacity = '0'; // Keep sign hidden initially
            }
        });

        envelopeWrapper.addEventListener('click', async function() {
            if (this.classList.contains('opened')) return;
            this.classList.add('opened');
            this.querySelector('.envelope').classList.add('open');
            this.nextElementSibling.style.opacity = '0'; // hide click hint
            
            // Trigger falling hearts
            createFallingHearts();

            // Reveal header first
            const header = this.querySelector('.letter-header');
            if (header) {
                setTimeout(() => header.classList.add('show'), 1000);
            }

            // Typewriter logic
            const typeText = async (element, text, speed = 30) => {
                element.classList.add('show');
                for (let i = 0; i < text.length; i++) {
                    element.textContent += text.charAt(i);
                    await new Promise(r => setTimeout(r, speed));
                }
            };

            // Wait for envelope to open
            await new Promise(r => setTimeout(r, 1200));

            // Type each line sequentially
            for (let i = 0; i < typeLines.length; i++) {
                const line = typeLines[i];
                if (!line.classList.contains('letter-sign')) {
                    await typeText(line, lineTexts[i]);
                    await new Promise(r => setTimeout(r, 300)); // pause between lines
                } else {
                    line.classList.add('show');
                    line.style.opacity = '1';
                }
            }
        });
    }

    // Falling Hearts Effect
    function createFallingHearts() {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'falling-hearts-container';
        document.body.appendChild(heartsContainer);

        const heartInterval = setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.textContent = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 2 + 's';
            heart.style.fontSize = Math.random() * 1.5 + 0.5 + 'rem';
            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 150);

        // Stop creating hearts after 15 seconds to prevent memory issues
        setTimeout(() => {
            clearInterval(heartInterval);
            setTimeout(() => heartsContainer.remove(), 5000);
        }, 15000);
    }

    // Timeline 3D Tilt Effect
    document.querySelectorAll('.timeline-card').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
});

function createLockHearts() {
    const container = document.getElementById('lock-hearts');
    if (!container) return;
    const hearts = ['❤️', '💕', '💗', '💖', '💓', '✨'];
    for (let i = 0; i < 18; i++) {
        const heart = document.createElement('span');
        heart.className = 'lock-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (4 + Math.random() * 6) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
        container.appendChild(heart);
    }
}

function createHeroParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    const emojis = ['💖', '✨', '🌸', '💫', '🦋', '🌺', '💝', '⭐'];
    for (let i = 0; i < 22; i++) {
        const p = document.createElement('span');
        p.className = 'hero-particle';
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
        p.style.setProperty('--dy', (Math.random() * 200 - 100) + 'px');
        p.style.animationDuration = (6 + Math.random() * 10) + 's';
        p.style.animationDelay = Math.random() * 8 + 's';
        p.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
        container.appendChild(p);
    }
}

function initCursorSparkles() {
    const container = document.getElementById('sparkle-container');
    if (!container) return;
    const sparkles = ['✨', '💖', '⭐', '💫', '🌸'];
    let lastTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 80) return; // throttle
        lastTime = now;
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    });
}

function populateReasons() {
    const track = document.getElementById('reasons-track');
    const dotsContainer = document.getElementById('reasons-dots');
    if (!track) return;
    
    reasons.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.style.animationDelay = (index * 0.08) + 's';
        card.innerHTML = `
            <div class="reason-num">#${index + 1}</div>
            <div class="reason-emoji">${reasonEmojis[index] || '💖'}</div>
            <p class="reason-text">${reason}</p>
        `;
        track.appendChild(card);
    });
    
    // Create dots
    if (dotsContainer) {
        reasons.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dotsContainer.appendChild(dot);
        });
        
        // Sync dots with scroll
        track.addEventListener('scroll', () => {
            const scrollLeft = track.scrollLeft;
            const cardWidth = track.querySelector('.reason-card')?.offsetWidth || 320;
            const gap = 24; // 1.5rem
            const activeIndex = Math.round(scrollLeft / (cardWidth + gap));
            dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === activeIndex);
            });
        });
    }
}

function initFloatingNav() {
    const nav = document.getElementById('floating-nav');
    if (!nav) return;
    const dots = nav.querySelectorAll('.nav-dot');
    const sections = ['hero', 'letter', 'journey', 'reasons', 'forever'];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                dots.forEach(dot => {
                    dot.classList.toggle('active', dot.dataset.section === id);
                });
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
}

function triggerConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container || container.dataset.fired) return;
    container.dataset.fired = 'true';
    const colors = ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#ffccd5', '#c9184a', '#ffd700', '#ff69b4'];
    for (let i = 0; i < 60; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (2 + Math.random() * 3) + 's';
        piece.style.animationDelay = Math.random() * 1.5 + 's';
        piece.style.width = (6 + Math.random() * 8) + 'px';
        piece.style.height = (6 + Math.random() * 8) + 'px';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        container.appendChild(piece);
    }
}

function setupScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(el => observer.observe(el));
    
    // Confetti trigger
    const foreverSection = document.getElementById('forever');
    if (foreverSection) {
        const confettiObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) triggerConfetti();
            });
        }, { threshold: 0.5 });
        confettiObserver.observe(foreverSection);
    }
}

// YouTube iframe API logic
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'rhP7QSWYY8c', // Video ID from https://youtu.be/rhP7QSWYY8c
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'showinfo': 0,
            'rel': 0,
            'loop': 1,
            'playlist': 'rhP7QSWYY8c' // Needed for loop to work
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    const playBtn = document.getElementById('playMusicBtn');
    const label = playBtn.querySelector('.music-label');
    playerReady = true;
    
    playBtn.addEventListener('click', () => {
        if (!playerReady) return;
        try {
            if (!isPlaying) {
                player.playVideo();
                if (label) label.textContent = 'Playing...';
                playBtn.classList.add('playing');
            } else {
                player.pauseVideo();
                if (label) label.textContent = 'Play Our Song';
                playBtn.classList.remove('playing');
            }
            isPlaying = !isPlaying;
        } catch(e) {
            console.warn('Player not ready yet');
        }
    });
}

function onPlayerStateChange(event) {
    // If video ends, it will loop automatically due to loop: 1 and playlist
}
