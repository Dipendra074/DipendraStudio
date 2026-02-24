/**
 * Floating Tools — Interactive Physics Engine
 * Premium spring-based floating system with drag, collision, and ripple effects
 */
(function () {
    'use strict';

    // ======== ICON SIZE (responsive: 40% smaller under 768px) ========
    const BASE_ICON_SIZE = 120;
    function getIconSize() {
        return window.innerWidth < 768
            ? Math.round(BASE_ICON_SIZE * 0.6)   // 40% reduction → 72px
            : BASE_ICON_SIZE;
    }
    let ICON_SIZE = getIconSize();

    // ======== TOOL DEFINITIONS ========
    const TOOLS = [
        { name: 'Canva', slug: 'canva', bg: '#00C4CC', size: ICON_SIZE, local: true },
        { name: 'Photoshop', slug: 'adobephotoshop', bg: '#001E36', size: ICON_SIZE, local: true },
        { name: 'After Effects', slug: 'adobeaftereffects', bg: '#00005B', size: ICON_SIZE, local: true },
        { name: 'Premiere Pro', slug: 'adobepremierepro', bg: '#300060', size: ICON_SIZE, local: true },
        { name: 'DaVinci Resolve', slug: 'davinciresolve', bg: null, size: ICON_SIZE, local: true },
        { name: 'Figma', slug: 'figma', bg: null, size: ICON_SIZE, local: true },
        { name: 'Framer', slug: 'framer', bg: '#000000', size: ICON_SIZE, local: true },
        { name: 'Cursor', slug: 'cursor', bg: null, size: ICON_SIZE, local: true },
        { name: 'Lightroom', slug: 'adobelightroom', bg: '#001D3F', size: ICON_SIZE, local: true },
        { name: 'Lovable', slug: 'lovable', bg: null, size: ICON_SIZE, local: true },
        { name: 'Antigravity', slug: 'antigravity', bg: '#6366F1', size: ICON_SIZE, local: true },
        { name: 'Ideogram', slug: 'ideogram', bg: null, size: ICON_SIZE, local: true },
        { name: 'Leonardo AI', slug: 'leonardoai', bg: null, size: ICON_SIZE, local: true },
        { name: 'Notion', slug: 'notion', bg: null, size: ICON_SIZE, local: true },
        { name: 'ChatGPT', slug: 'openai', bg: '#10A37F', size: ICON_SIZE, local: true },
        { name: 'Claude', slug: 'claude', bg: '#1A1110', size: ICON_SIZE, local: true },
        { name: 'Perplexity', slug: 'perplexity', bg: '#1FB8CD', size: ICON_SIZE, local: true },
        { name: 'Affinity', slug: 'affinity', bg: null, size: ICON_SIZE, local: true },
        { name: 'Grok', slug: 'grok', bg: '#000000', size: ICON_SIZE, local: true },
        { name: 'Krea AI', slug: 'kreaai', bg: null, size: ICON_SIZE, local: true },
        { name: 'Hailuo AI', slug: 'hailuoai', bg: null, size: ICON_SIZE, local: true },
        { name: 'Luma AI', slug: 'lumaai', bg: null, size: ICON_SIZE, local: true },
        { name: 'ElevenLabs', slug: 'elevenlabs', bg: '#000000', size: ICON_SIZE, local: true },
        { name: 'CapCut', slug: 'capcut', bg: null, size: ICON_SIZE, local: true },
    ];

    // ======== PHYSICS CONSTANTS ========
    const P = {
        damping: 0.93,
        springK: 0.010,
        springDamp: 0.13,
        collisionElastic: 0.45,
        mouseRadius: 160,
        mouseForce: 1.8,
        idleAmp: 10,
        parallaxStr: 6,
        boundBounce: 0.35,
        gap: 8
    };

    // ======== PARTICLE ========
    class Particle {
        constructor(tool, x, y) {
            this.tool = tool;
            this.x = x; this.y = y;
            this.homeX = x; this.homeY = y;
            this.vx = 0; this.vy = 0;
            this.radius = tool.size / 2;
            this.isDragged = false;
            this.phaseX = Math.random() * Math.PI * 2;
            this.phaseY = Math.random() * Math.PI * 2;
            this.speedX = 0.0015 + Math.random() * 0.001;
            this.speedY = 0.0012 + Math.random() * 0.0012;
            this.el = null;
        }
    }

    // ======== ENGINE ========
    class FloatingToolsEngine {
        constructor() {
            this.container = null;
            this.particles = [];
            this.mouse = { x: 0, y: 0, px: 0, py: 0, down: false, inCanvas: false };
            this.dragged = null;
            this.dragOff = { x: 0, y: 0 };
            this.raf = null;
            this.visible = false;
            this.time = 0;
            this.w = 0; this.h = 0;
            this.isTouch = false;
        }

        init() {
            this.container = document.getElementById('floatingToolsCanvas');
            if (!this.container) return;
            this.isTouch = window.matchMedia('(hover: none)').matches;
            this.measure();
            this.createParticles();
            this.setupEvents();
            this.setupObserver();
        }

        measure() {
            const r = this.container.getBoundingClientRect();
            this.w = r.width;
            this.h = r.height;
        }

        // ---- Create Particles ----
        createParticles() {
            const golden = Math.PI * (3 - Math.sqrt(5));
            const total = TOOLS.length;
            const cx = this.w / 2, cy = this.h / 2;
            const sx = this.w * 0.38, sy = this.h * 0.34;

            TOOLS.forEach((tool, i) => {
                const angle = i * golden;
                const r = Math.sqrt((i + 0.5) / total);
                let x = cx + r * sx * Math.cos(angle) + (Math.random() - 0.5) * 30;
                let y = cy + r * sy * Math.sin(angle) + (Math.random() - 0.5) * 30;
                const margin = tool.size / 2 + 15;
                x = Math.max(margin, Math.min(this.w - margin, x));
                y = Math.max(margin, Math.min(this.h - margin, y));

                const p = new Particle(tool, x, y);
                this.buildElement(p);
                this.particles.push(p);
            });
        }

        buildElement(p) {
            const el = document.createElement('div');
            el.className = 'tool-bubble';
            el.style.width = p.tool.size + 'px';
            el.style.height = p.tool.size + 'px';

            const hasColor = !!p.tool.bg;
            if (hasColor) el.classList.add('colored');

            const circle = document.createElement('div');
            circle.className = 'tool-bubble-circle';
            if (hasColor) circle.style.background = p.tool.bg;

            const img = document.createElement('img');
            img.src = `icons/${p.tool.slug}.svg`;
            img.alt = p.tool.name;
            img.draggable = false;
            img.loading = 'lazy';
            circle.appendChild(img);

            const label = document.createElement('span');
            label.className = 'tool-bubble-label';
            label.textContent = p.tool.name;

            el.appendChild(circle);
            el.appendChild(label);
            p.el = el;
            this.container.appendChild(el);

            // Pointer down on this bubble
            el.addEventListener('pointerdown', (e) => this.onDown(e, p));
        }

        // ---- Events ----
        setupEvents() {
            document.addEventListener('pointermove', (e) => this.onMove(e));
            document.addEventListener('pointerup', (e) => this.onUp(e));
            document.addEventListener('pointercancel', (e) => this.onUp(e));

            // Track mouse in canvas for parallax
            this.container.addEventListener('pointerenter', () => { this.mouse.inCanvas = true; });
            this.container.addEventListener('pointerleave', () => { this.mouse.inCanvas = false; });

            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => this.onResize(), 200);
            });
        }

        onDown(e, p) {
            e.preventDefault();
            const rect = this.container.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            this.dragged = p;
            p.isDragged = true;
            p.el.classList.add('dragging');
            p.el.setPointerCapture(e.pointerId);
            this.dragOff.x = p.x - mx;
            this.dragOff.y = p.y - my;
            this.mouse.px = mx;
            this.mouse.py = my;
            this.mouse.x = mx;
            this.mouse.y = my;
            this.mouse.down = true;
        }

        onMove(e) {
            const rect = this.container.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            this.mouse.px = this.mouse.x;
            this.mouse.py = this.mouse.y;
            this.mouse.x = mx;
            this.mouse.y = my;

            if (this.dragged) {
                const margin = this.dragged.radius;
                this.dragged.x = Math.max(margin, Math.min(this.w - margin, mx + this.dragOff.x));
                this.dragged.y = Math.max(margin, Math.min(this.h - margin, my + this.dragOff.y));
                this.dragged.vx = (this.mouse.x - this.mouse.px) * 0.4;
                this.dragged.vy = (this.mouse.y - this.mouse.py) * 0.4;
            }
        }

        onUp(e) {
            if (this.dragged) {
                this.dragged.isDragged = false;
                this.dragged.el.classList.remove('dragging');
                this.dragged = null;
            }
            this.mouse.down = false;
        }

        onResize() {
            const oldW = this.w, oldH = this.h;
            this.measure();
            if (oldW === 0 || oldH === 0) return;

            // Recalculate icon size for responsive breakpoints
            const newIconSize = getIconSize();
            if (newIconSize !== ICON_SIZE) {
                ICON_SIZE = newIconSize;
                // Update each tool definition and particle element
                TOOLS.forEach(t => t.size = ICON_SIZE);
                this.particles.forEach(p => {
                    p.tool.size = ICON_SIZE;
                    p.radius = ICON_SIZE / 2;
                    p.el.style.width = ICON_SIZE + 'px';
                    p.el.style.height = ICON_SIZE + 'px';
                });
            }

            const rx = this.w / oldW, ry = this.h / oldH;
            this.particles.forEach(p => {
                p.homeX *= rx; p.homeY *= ry;
                p.x *= rx; p.y *= ry;
                const m = p.radius + 10;
                p.homeX = Math.max(m, Math.min(this.w - m, p.homeX));
                p.homeY = Math.max(m, Math.min(this.h - m, p.homeY));
            });
        }

        // ---- Intersection Observer ----
        setupObserver() {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.visible) {
                        this.visible = true;
                        this.start();
                    } else if (!entry.isIntersecting && this.visible) {
                        this.visible = false;
                        this.stop();
                    }
                });
            }, { threshold: 0.05 });
            obs.observe(this.container);
        }

        start() {
            if (this.raf) return;
            const loop = () => {
                this.update();
                this.render();
                this.raf = requestAnimationFrame(loop);
            };
            this.raf = requestAnimationFrame(loop);
        }

        stop() {
            if (this.raf) {
                cancelAnimationFrame(this.raf);
                this.raf = null;
            }
        }

        // ---- Physics Update ----
        update() {
            this.time++;
            const particles = this.particles;

            // Drag ripple
            if (this.dragged) {
                const dp = this.dragged;
                const dragSpeed = Math.sqrt(
                    (this.mouse.x - this.mouse.px) ** 2 +
                    (this.mouse.y - this.mouse.py) ** 2
                );
                for (const p of particles) {
                    if (p === dp) continue;
                    const dx = p.x - dp.x, dy = p.y - dp.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < P.mouseRadius && dist > 1) {
                        const f = (1 - dist / P.mouseRadius) * P.mouseForce * Math.min(dragSpeed * 0.08, 1.5);
                        p.vx += (dx / dist) * f;
                        p.vy += (dy / dist) * f;
                    }
                }
            }

            // Per-particle physics
            for (const p of particles) {
                if (p.isDragged) continue;

                // Idle floating offset
                const idleX = Math.sin(this.time * p.speedX + p.phaseX) * P.idleAmp
                    + Math.sin(this.time * p.speedX * 0.7 + p.phaseX * 1.4) * P.idleAmp * 0.4;
                const idleY = Math.cos(this.time * p.speedY + p.phaseY) * P.idleAmp
                    + Math.cos(this.time * p.speedY * 0.6 + p.phaseY * 0.9) * P.idleAmp * 0.35;

                // Spring toward home + idle
                const tx = p.homeX + idleX;
                const ty = p.homeY + idleY;
                const fx = P.springK * (tx - p.x) - P.springDamp * p.vx;
                const fy = P.springK * (ty - p.y) - P.springDamp * p.vy;
                p.vx += fx;
                p.vy += fy;

                // Damping
                p.vx *= P.damping;
                p.vy *= P.damping;

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Boundary
                const m = p.radius + 5;
                if (p.x < m) { p.x = m; p.vx *= -P.boundBounce; }
                if (p.x > this.w - m) { p.x = this.w - m; p.vx *= -P.boundBounce; }
                if (p.y < m) { p.y = m; p.vy *= -P.boundBounce; }
                if (p.y > this.h - m) { p.y = this.h - m; p.vy *= -P.boundBounce; }
            }

            // Collision detection (O(n²), fine for 17)
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dx = b.x - a.x, dy = b.y - a.y;
                    const distSq = dx * dx + dy * dy;
                    const minD = a.radius + b.radius + P.gap;
                    if (distSq < minD * minD) {
                        const dist = Math.sqrt(distSq) || 1;
                        const overlap = minD - dist;
                        const nx = dx / dist, ny = dy / dist;

                        // Separate
                        const sep = overlap * 0.5;
                        if (!a.isDragged) { a.x -= nx * sep; a.y -= ny * sep; }
                        if (!b.isDragged) { b.x += nx * sep; b.y += ny * sep; }

                        // Elastic impulse
                        const rvn = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
                        if (rvn > 0) {
                            const imp = rvn * P.collisionElastic;
                            if (!a.isDragged) { a.vx -= nx * imp; a.vy -= ny * imp; }
                            if (!b.isDragged) { b.vx += nx * imp; b.vy += ny * imp; }
                        }
                    }
                }
            }
        }

        // ---- Render ----
        render() {
            const usePar = !this.isTouch && this.mouse.inCanvas;
            let parX = 0, parY = 0;
            if (usePar) {
                parX = ((this.mouse.x - this.w / 2) / (this.w / 2)) * P.parallaxStr;
                parY = ((this.mouse.y - this.h / 2) / (this.h / 2)) * P.parallaxStr;
            }

            for (const p of this.particles) {
                const vx = p.isDragged ? p.x : p.x + parX * (0.6 + Math.random() * 0);
                const vy = p.isDragged ? p.y : p.y + parY * (0.6 + Math.random() * 0);
                const tx = vx - p.radius;
                const ty = vy - p.radius;
                p.el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
            }
        }
    }

    // ======== BOOTSTRAP ========
    document.addEventListener('DOMContentLoaded', () => {
        const engine = new FloatingToolsEngine();
        engine.init();
    });
})();
