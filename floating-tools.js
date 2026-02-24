/**
 * Sine Wave Floating Tools — GSAP-Powered
 * Horizontal, infinitely looping, draggable sine wave layout
 * Uses gsap.ticker, gsap.set, and GSAP Draggable
 */
(function () {
    'use strict';

    // ======== TOOL DEFINITIONS ========
    const TOOLS = [
        { name: 'Canva', slug: 'canva', bg: '#00C4CC' },
        { name: 'Photoshop', slug: 'adobephotoshop', bg: '#001E36' },
        { name: 'After Effects', slug: 'adobeaftereffects', bg: '#00005B' },
        { name: 'Premiere Pro', slug: 'adobepremierepro', bg: '#300060' },
        { name: 'DaVinci Resolve', slug: 'davinciresolve', bg: null },
        { name: 'Figma', slug: 'figma', bg: null },
        { name: 'Framer', slug: 'framer', bg: '#000000' },
        { name: 'Cursor', slug: 'cursor', bg: null },
        { name: 'Lightroom', slug: 'adobelightroom', bg: '#001D3F' },
        { name: 'Lovable', slug: 'lovable', bg: null },
        { name: 'Antigravity', slug: 'antigravity', bg: '#6366F1' },
        { name: 'Ideogram', slug: 'ideogram', bg: null },
        { name: 'Leonardo AI', slug: 'leonardoai', bg: null },
        { name: 'Notion', slug: 'notion', bg: null },
        { name: 'ChatGPT', slug: 'openai', bg: '#10A37F' },
        { name: 'Claude', slug: 'claude', bg: '#1A1110' },
        { name: 'Perplexity', slug: 'perplexity', bg: '#1FB8CD' },
        { name: 'Affinity', slug: 'affinity', bg: null },
        { name: 'Grok', slug: 'grok', bg: '#000000' },
        { name: 'Krea AI', slug: 'kreaai', bg: null },
        { name: 'Hailuo AI', slug: 'hailuoai', bg: null },
        { name: 'Luma AI', slug: 'lumaai', bg: null },
        { name: 'ElevenLabs', slug: 'elevenlabs', bg: '#000000' },
        { name: 'CapCut', slug: 'capcut', bg: null },
    ];

    // ======== FISHER-YATES SHUFFLE ========
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // ======== RESPONSIVE CONFIG ========
    function getConfig() {
        const vw = window.innerWidth;
        const isMobile = vw < 768;
        const isTablet = vw >= 768 && vw < 1024;

        return {
            iconSize: isMobile ? 72 : 120,
            spacing: isMobile ? 105 : isTablet ? 135 : 160,
            amplitude: isMobile ? 35 : isTablet ? 48 : 60,
            scrollSpeed: isMobile ? 0.6 : 0.8,
            frequency: isMobile ? 0.02 : 0.015,
        };
    }

    // ======== MAIN ENGINE ========
    class SineWaveEngine {
        constructor() {
            this.container = null;
            this.items = [];         // { el, x }
            this.cfg = getConfig();
            this.totalWidth = 0;     // total virtual band width
            this.offset = 0;         // cumulative horizontal offset
            this.autoSpeed = this.cfg.scrollSpeed;
            this.isDragging = false;
            this.dragProxy = null;
            this.draggableInstance = null;
            this.lastDragX = 0;
            this.visible = false;
            this.resumeTween = null;
        }

        init() {
            this.container = document.getElementById('floatingToolsCanvas');
            if (!this.container) return;

            // Shuffle tool order on each load
            shuffle(TOOLS);

            this.cfg = getConfig();
            this.buildDOM();
            this.calcLayout();
            this.setupDraggable();
            this.setupObserver();
            this.setupResize();
        }

        // ---- Build DOM elements ----
        buildDOM() {
            // Clear any existing children
            this.container.innerHTML = '';
            this.items = [];

            TOOLS.forEach((tool) => {
                const el = document.createElement('div');
                el.className = 'tool-bubble';
                el.style.width = this.cfg.iconSize + 'px';
                el.style.height = this.cfg.iconSize + 'px';

                const hasColor = !!tool.bg;
                if (hasColor) el.classList.add('colored');

                const circle = document.createElement('div');
                circle.className = 'tool-bubble-circle';
                if (hasColor) circle.style.background = tool.bg;

                const img = document.createElement('img');
                img.src = `icons/${tool.slug}.svg`;
                img.alt = tool.name;
                img.draggable = false;
                img.loading = 'lazy';
                circle.appendChild(img);

                const label = document.createElement('span');
                label.className = 'tool-bubble-label';
                label.textContent = tool.name;

                el.appendChild(circle);
                el.appendChild(label);
                this.container.appendChild(el);

                this.items.push({ el, x: 0 });
            });

            // Create invisible drag proxy
            this.dragProxy = document.createElement('div');
            this.dragProxy.className = 'drag-proxy';
            this.container.appendChild(this.dragProxy);
        }

        // ---- Calculate layout ----
        calcLayout() {
            this.cfg = getConfig();
            const count = this.items.length;
            this.totalWidth = count * this.cfg.spacing;

            // Update icon sizes
            this.items.forEach((item, i) => {
                item.el.style.width = this.cfg.iconSize + 'px';
                item.el.style.height = this.cfg.iconSize + 'px';
                item.x = i * this.cfg.spacing;
            });

            this.autoSpeed = this.cfg.scrollSpeed;

            // Initial position render
            this.render();
        }

        // ---- Render: position each icon via gsap.set ----
        render() {
            const containerRect = this.container.getBoundingClientRect();
            const containerW = containerRect.width;
            const centerY = containerRect.height / 2 - this.cfg.iconSize / 2;
            const halfIcon = this.cfg.iconSize / 2;

            for (const item of this.items) {
                // Effective X = item.x + global offset, wrapped to totalWidth
                let ex = ((item.x + this.offset) % this.totalWidth);
                // Keep positive
                if (ex < -this.cfg.iconSize) ex += this.totalWidth;

                // Sine wave Y from the center of the icon
                const waveCenterX = ex + halfIcon;
                const sy = Math.sin(waveCenterX * this.cfg.frequency) * this.cfg.amplitude;

                gsap.set(item.el, {
                    x: ex,
                    y: centerY + sy,
                    force3D: true
                });
            }
        }

        // ---- Animation tick (called by gsap.ticker) ----
        tick() {
            if (!this.visible) return;

            // Auto-scroll: decrement offset (move left)
            if (!this.isDragging) {
                this.offset -= this.autoSpeed;
            }

            // Wrap offset to avoid floating point overflow
            if (Math.abs(this.offset) > this.totalWidth * 100) {
                this.offset = this.offset % this.totalWidth;
            }

            this.render();
        }

        // ---- GSAP Draggable ----
        setupDraggable() {
            const self = this;

            this.draggableInstance = Draggable.create(this.dragProxy, {
                type: 'x',
                trigger: this.container,
                inertia: true,
                cursor: 'grab',
                activeCursor: 'grabbing',

                onDragStart() {
                    self.isDragging = true;
                    self.lastDragX = this.x;

                    // Kill any resume tween
                    if (self.resumeTween) {
                        self.resumeTween.kill();
                        self.resumeTween = null;
                    }
                },

                onDrag() {
                    const dx = this.x - self.lastDragX;
                    self.offset += dx;
                    self.lastDragX = this.x;
                },

                onThrowUpdate() {
                    const dx = this.x - self.lastDragX;
                    self.offset += dx;
                    self.lastDragX = this.x;
                },

                onThrowComplete() {
                    self.isDragging = false;
                    // Reset proxy position so it doesn't accumulate
                    gsap.set(self.dragProxy, { x: 0 });
                    self.lastDragX = 0;

                    // Gently resume auto-scroll
                    const savedSpeed = self.cfg.scrollSpeed;
                    self.autoSpeed = 0;
                    self.resumeTween = gsap.to(self, {
                        autoSpeed: savedSpeed,
                        duration: 1.2,
                        ease: 'power2.out'
                    });
                },

                onRelease() {
                    // If inertia not available, handle release here
                    if (!Draggable.get(self.dragProxy)?.tween?.isActive()) {
                        self.isDragging = false;
                        gsap.set(self.dragProxy, { x: 0 });
                        self.lastDragX = 0;

                        const savedSpeed = self.cfg.scrollSpeed;
                        self.autoSpeed = 0;
                        self.resumeTween = gsap.to(self, {
                            autoSpeed: savedSpeed,
                            duration: 1.2,
                            ease: 'power2.out'
                        });
                    }
                }
            })[0];
        }

        // ---- Intersection Observer — start/stop ticker ----
        setupObserver() {
            const tickFn = () => this.tick();

            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.visible) {
                        this.visible = true;
                        gsap.ticker.add(tickFn);
                    } else if (!entry.isIntersecting && this.visible) {
                        this.visible = false;
                        gsap.ticker.remove(tickFn);
                    }
                });
            }, { threshold: 0.05 });

            obs.observe(this.container);
            this._tickFn = tickFn;
        }

        // ---- Resize handling ----
        setupResize() {
            let timer;
            window.addEventListener('resize', () => {
                clearTimeout(timer);
                timer = setTimeout(() => this.calcLayout(), 200);
            });
        }
    }

    // ======== BOOTSTRAP ========
    document.addEventListener('DOMContentLoaded', () => {
        const engine = new SineWaveEngine();
        engine.init();
    });
})();
