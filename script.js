/* ============================================================
   PORTFOLIO — script.js
   ============================================================ */

/* ── 1. CUSTOM CURSOR ──────────────────────────────────────── */
(function initCursor() {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left  = mx + 'px';
        dot.style.top   = my + 'px';
    });

    // Ring follows with lerp
    function lerpRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(lerpRing);
    }
    lerpRing();

    // Expand on hoverable elements
    const hoverTargets = 'a, button, .skill-tag, .project-card, .info-card, .social-link';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
})();


/* ── 2. PARTICLE CANVAS ────────────────────────────────────── */
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles = [];
    const COUNT = 70;
    const COLORS = ['rgba(124,106,255,', 'rgba(255,106,176,', 'rgba(106,240,255,'];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(true); }
        reset(init) {
            this.x  = Math.random() * W;
            this.y  = init ? Math.random() * H : H + 10;
            this.r  = Math.random() * 1.8 + 0.4;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = -(Math.random() * 0.5 + 0.15);
            this.alpha = Math.random() * 0.5 + 0.15;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.y < -10) this.reset(false);
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ')';
            ctx.fill();
        }
    }

    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
})();


/* ── 3. TYPEWRITER HERO ────────────────────────────────────── */
(function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const words = ['bold digital', 'unforgettable', 'pixel-perfect', 'human-first', 'blazing-fast'];
    let wi = 0, ci = 0, deleting = false;

    function tick() {
        const word = words[wi];
        el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

        let delay = deleting ? 60 : 100;
        if (!deleting && ci > word.length) { delay = 1800; deleting = true; }
        if (deleting && ci < 0)            { deleting = false; wi = (wi + 1) % words.length; delay = 400; }

        setTimeout(tick, delay);
    }
    setTimeout(tick, 600);
})();


/* ── 4. STICKY NAV ─────────────────────────────────────────── */
(function initNav() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
})();


/* ── 5. HAMBURGER / MOBILE MENU ────────────────────────────── */
(function initHamburger() {
    const btn  = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    function toggle(open) {
        menu.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open);
        menu.setAttribute('aria-hidden', !open);
        document.body.style.overflow = open ? 'hidden' : '';

        const spans = btn.querySelectorAll('span');
        if (open) {
            spans[0].style.transform = 'translateY(7px) rotate(45deg)';
            spans[1].style.opacity   = '0';
            spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    }

    btn.addEventListener('click', () => toggle(!menu.classList.contains('open')));

    // Close on link click
    menu.querySelectorAll('.mobile-link').forEach(a => {
        a.addEventListener('click', () => toggle(false));
    });
})();


/* ── 6. SCROLL REVEAL (IntersectionObserver) ───────────────── */
(function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    els.forEach(el => observer.observe(el));
})();


/* ── 7. ANIMATED COUNTERS ──────────────────────────────────── */
(function initCounters() {
    const nums = document.querySelectorAll('.stat-num[data-count]');
    if (!nums.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el  = entry.target;
            const end = parseInt(el.dataset.count, 10);
            let  cur  = 0;
            const step = Math.ceil(end / 40);
            const timer = setInterval(() => {
                cur = Math.min(cur + step, end);
                el.textContent = cur;
                if (cur >= end) clearInterval(timer);
            }, 30);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    nums.forEach(n => observer.observe(n));
})();


/* ── 8. SKILL BAR ANIMATION ────────────────────────────────── */
(function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill[data-width]');
    if (!bars.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const bar = entry.target;
            // Small delay so reveal animation finishes first
            setTimeout(() => {
                bar.style.width = bar.dataset.width + '%';
            }, 200);
            observer.unobserve(bar);
        });
    }, { threshold: 0.3 });

    bars.forEach(b => observer.observe(b));
})();


/* ── 9. SMOOTH ANCHOR SCROLL ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const offset = document.getElementById('navbar')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});


/* ── 10. SKILL-TAG RANDOM ACCENT COLOR ON HOVER ────────────── */
(function initTagColors() {
    const palette = [
        'rgba(124,106,255,0.12)', 'rgba(255,106,176,0.12)',
        'rgba(106,240,255,0.12)', 'rgba(255,180,100,0.1)'
    ];
    document.querySelectorAll('.skill-tag').forEach(tag => {
        const color = palette[Math.floor(Math.random() * palette.length)];
        tag.addEventListener('mouseenter', () => { tag.style.background = color; });
        tag.addEventListener('mouseleave', () => { tag.style.background = ''; });
    });
})();
