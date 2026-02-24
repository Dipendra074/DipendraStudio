/**
 * Lenis Smooth Scroll Initialization
 * Provides global momentum-based smooth scrolling with ease-out
 */
let lenis;
if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2
    });

    // Lenis RAF loop — runs independently from other animation loops
    function lenisRaf(time) {
        lenis.raf(time);
        requestAnimationFrame(lenisRaf);
    }
    requestAnimationFrame(lenisRaf);
}

/**
 * Portfolio 3D Card Interaction
 * Creates a smooth, premium 3D tilt effect on the ID card
 * with global mouse tracking for edge-to-edge responsiveness
 */
document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('idCard');
    const cardWrapper = document.getElementById('cardWrapper');
    const cardContainer = document.querySelector('.card-container');

    if (!card || !cardContainer || !cardWrapper) return;

    // Configuration
    const config = {
        maxRotation: 20,        // Maximum rotation in degrees
        perspective: 1200,      // Perspective depth
        transitionDuration: 80, // ms for smooth follow
        resetDuration: 800,     // ms for reset animation
        shadowIntensity: 0.7,   // Shadow opacity multiplier
        liftAmount: 15,         // Z-axis lift in pixels
        edgeDepth: 12           // 3D edge depth in pixels
    };

    // State
    let isActive = true; // Always active for global tracking
    let animationFrame;

    // Calculate rotation based on mouse position relative to viewport center
    const calculateGlobalRotation = (e) => {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate mouse position relative to viewport center (-1 to 1)
        const offsetX = (e.clientX / viewportWidth - 0.5) * 2;
        const offsetY = (e.clientY / viewportHeight - 0.5) * 2;

        // Calculate rotation (inverted for natural feel)
        const rotateX = -offsetY * config.maxRotation;
        const rotateY = offsetX * config.maxRotation;

        return { rotateX, rotateY, offsetX, offsetY };
    };

    // Apply transform to card wrapper with 3D lift
    const applyTransform = (rotateX, rotateY) => {
        cardWrapper.style.transform = `
            perspective(${config.perspective}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(${config.liftAmount}px)
            scale3d(1.02, 1.02, 1.02)
        `;
    };

    // Apply dynamic shadow based on rotation (keep on card for visual correctness)
    const applyShadow = (rotateX, rotateY) => {
        const shadowX = rotateY * 3;
        const shadowY = -rotateX * 2 + 30;
        const blur = 60 + Math.abs(rotateX) + Math.abs(rotateY);
        const spread = 5 + Math.abs(rotateY) * 0.5;

        card.style.boxShadow = `
            ${shadowX}px ${shadowY}px ${blur}px -${spread}px rgba(0, 0, 0, ${config.shadowIntensity}),
            0 0 0 1px rgba(255, 255, 255, 0.08)
        `;
    };

    // Apply dynamic light effect based on rotation
    const applyLightEffect = (rotateX, rotateY, offsetX, offsetY) => {
        // Calculate light position (moves opposite to tilt direction)
        const lightX = 50 - offsetX * 50; // 0% to 100%
        const lightY = 50 - offsetY * 50; // 0% to 100%

        // Apply light gradient via CSS custom properties on card
        card.style.setProperty('--light-x', `${lightX}%`);
        card.style.setProperty('--light-y', `${lightY}%`);
        card.style.setProperty('--light-intensity', '1');

        // Calculate edge visibility based on rotation
        const leftEdgeOpacity = Math.max(0, rotateY / config.maxRotation);
        const rightEdgeOpacity = Math.max(0, -rotateY / config.maxRotation);
        const topEdgeOpacity = Math.max(0, -rotateX / config.maxRotation);
        const bottomEdgeOpacity = Math.max(0, rotateX / config.maxRotation);

        card.style.setProperty('--left-edge-opacity', leftEdgeOpacity);
        card.style.setProperty('--right-edge-opacity', rightEdgeOpacity);
        card.style.setProperty('--top-edge-opacity', topEdgeOpacity);
        card.style.setProperty('--bottom-edge-opacity', bottomEdgeOpacity);
    };

    // Reset card to neutral position
    const resetCard = () => {
        cardWrapper.style.transition = `
            transform ${config.resetDuration}ms cubic-bezier(0.23, 1, 0.32, 1)
        `;
        card.style.transition = `
           box-shadow ${config.resetDuration}ms ease-out
        `;

        cardWrapper.style.transform = `
            perspective(${config.perspective}px)
            rotateX(0deg)
            rotateY(0deg)
            translateZ(0px)
            scale3d(1, 1, 1)
        `;

        card.style.boxShadow = `
            0 25px 50px -12px rgba(0, 0, 0, ${config.shadowIntensity}),
            0 0 0 1px rgba(255, 255, 255, 0.05)
        `;

        card.style.setProperty('--light-intensity', '0');
        card.style.setProperty('--left-edge-opacity', '0');
        card.style.setProperty('--right-edge-opacity', '0');
        card.style.setProperty('--top-edge-opacity', '0');
        card.style.setProperty('--bottom-edge-opacity', '0');
    };

    // Global mouse move handler
    const handleGlobalMouseMove = (e) => {
        if (!isActive) return;

        // Cancel previous animation frame
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }

        const { rotateX, rotateY, offsetX, offsetY } = calculateGlobalRotation(e);

        // Use requestAnimationFrame for smooth performance
        animationFrame = requestAnimationFrame(() => {
            // Apply transitions for smooth follow
            cardWrapper.style.transition = `transform ${config.transitionDuration}ms ease-out`;
            card.style.transition = `box-shadow ${config.transitionDuration}ms ease-out`;

            applyTransform(rotateX, rotateY);
            applyShadow(rotateX, rotateY);
            applyLightEffect(rotateX, rotateY, offsetX, offsetY);
        });
    };

    // Mouse leave from document
    const handleMouseLeave = () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        resetCard();
    };

    // Attach global event listeners
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Update on window resize
    window.addEventListener('resize', () => {
        // Bounds will be recalculated on next mouse move
    });

    // Touch device detection - disable 3D effect
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        isActive = false;
        cardWrapper.style.transform = 'none';
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
    }
});

// Smooth scroll for in-page navigation links only
// Only intercepts links that start with # AND have a valid target element on this page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only handle in-page anchors (not just "#" alone)
        if (href && href.length > 1 && href.startsWith('#')) {
            const target = document.querySelector(href);
            // Only prevent default and smooth scroll if target exists on this page
            if (target) {
                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo(target, { offset: 0 });
                } else {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // If target doesn't exist, let the browser handle it normally
            // (will do nothing or show 404-like behavior for invalid anchors)
        }
    });
});

/**
 * Text Animation (ML11 Style)
 * Mimics the anime.js 'moving letters' effect using Web Animations API
 */
document.addEventListener('DOMContentLoaded', () => {
    const textWrapper = document.querySelector('.ml11 .letters');
    if (!textWrapper) return;

    // Wrap every letter in a span
    textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

    const line = document.querySelector('.ml11 .line');
    const letters = document.querySelectorAll('.ml11 .letter');

    // Animation Constants
    const duration = 1000; // Slower for smoother wipe
    const delay = 300;     // Start delay

    // Reset initial states
    if (line) {
        line.style.opacity = '1';
        line.style.transform = 'scaleY(0)';
        line.style.left = '0'; // Ensure it starts at left
    }
    letters.forEach(l => l.style.opacity = '0');

    // Sequence
    const startAnimation = async () => {
        // 1. Line appears (scales up)
        if (line) {
            line.style.transition = `transform 400ms cubic-bezier(0.5, 0, 0.1, 1)`;
            line.style.transform = 'scaleY(1)';
        }

        // Wait for line to appear
        await new Promise(r => setTimeout(r, 400));

        // 2. Line moves left to right AND letters fade in
        if (line) {
            // Get total width to move
            const totalWidth = textWrapper.offsetWidth;

            // Move line
            line.style.transition = `transform ${duration}ms cubic-bezier(0.25, 1, 0.5, 1)`;
            // Move using translateX. Note: line is absolute left:0.
            // visual move to right end.
            line.style.transform = `scaleY(1) translateX(${totalWidth}px)`;
        }

        // Synchronize letter fade in
        // We want letters to appear as the line passes them. 
        // Simple linear stagger works well for this "wipe" feel.
        const staggerTime = duration / letters.length;
        letters.forEach((letter, i) => {
            setTimeout(() => {
                letter.style.transition = 'opacity 200ms ease-out';
                letter.style.opacity = '1';
            }, i * staggerTime * 0.8); // 0.8 factor to trail slightly behind the leading edge
        });

        // Wait for wipe to complete
        await new Promise(r => setTimeout(r, duration + 100));

        // 3. Line fades out
        if (line) {
            line.style.transition = `opacity 400ms ease`;
            line.style.opacity = '0';
        }
    };

    // Start after small initial delay
    setTimeout(startAnimation, delay);
});

/**
 * Back to Top Button
 * - Fixed at bottom-right
 * - Fades in after scrolling past the hero
 * - Clicks to smooth-scroll to top
 */
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    const heroSection = document.querySelector('.hero');
    const scrollThreshold = heroSection ? heroSection.offsetHeight * 0.7 : 400;

    let ticking = false;

    const updateButton = () => {
        if (window.scrollY > scrollThreshold) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateButton);
            ticking = true;
        }
    });

    backToTopBtn.addEventListener('click', () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.2 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

/**
 * Scroll Reveal Animations
 * Adds 'revealed' class to .reveal elements when they enter viewport
 */
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the reveal for sibling elements
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
});

/**
 * Project Filter Tabs
 * Filters project cards by category when tabs are clicked
 */
document.addEventListener('DOMContentLoaded', () => {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterTabs.length === 0) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;

            // Filter cards
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    // Re-trigger reveal animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    requestAnimationFrame(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});

/**
 * Video Modal
 * Opens a YouTube embed modal when video cards are clicked
 */
document.addEventListener('DOMContentLoaded', () => {
    const videoCards = document.querySelectorAll('.video-card');
    const modal = document.getElementById('videoModal');
    const modalPlayer = document.getElementById('videoModalPlayer');
    const modalClose = document.getElementById('videoModalClose');

    if (!modal || videoCards.length === 0) return;

    const openModal = (videoId) => {
        modalPlayer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modalPlayer.innerHTML = '';
        document.body.style.overflow = '';
    };

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.dataset.videoId;
            if (videoId) openModal(videoId);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

/**
 * Skill Bar Animation
 * Animates the tool/skill progress bars when they scroll into view
 */
document.addEventListener('DOMContentLoaded', () => {
    const toolFills = document.querySelectorAll('.tool-fill');
    if (toolFills.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The width is already set via inline style
                // We just need to trigger the CSS transition by adding the class
                entry.target.style.width = entry.target.style.width || '0%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Store the target widths and reset to 0
    toolFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.dataset.targetWidth = targetWidth;
        fill.style.width = '0';

        observer.observe(fill);
    });

    // Re-observe with animation trigger
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                setTimeout(() => {
                    fill.style.width = fill.dataset.targetWidth;
                }, 200);
                animObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });

    toolFills.forEach(fill => animObserver.observe(fill));
});

/**
 * Smooth Scroll for Nav Links
 * Scrolls to sections smoothly when clicking nav links with # hrefs
 */
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], .nav-cta[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo(targetSection, { offset: 0 });
                } else {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
