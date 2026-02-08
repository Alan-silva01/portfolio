/**
 * Vanilla JS LogoLoop
 * Handles smooth infinite scrolling of logos.
 */
class LogoLoop {
    constructor(container, options = {}) {
        this.container = container;
        this.track = container.querySelector('.logoloop__track');
        this.list = container.querySelector('.logoloop__list');

        this.speed = options.speed || 50; // pixels per second
        this.direction = options.direction || 'left';
        this.pauseOnHover = options.pauseOnHover !== false;

        this.offset = 0;
        this.isHovered = false;
        this.lastTimestamp = null;
        this.rafId = null;

        this.init();
    }

    init() {
        // Wait for dimensions if not ready
        if (this.list.offsetWidth === 0) {
            setTimeout(() => this.init(), 100);
            return;
        }

        // Clone the list to ensure we have enough items to loop
        const listWidth = this.list.offsetWidth;
        const containerWidth = this.container.offsetWidth;
        const copiesNeeded = Math.ceil(containerWidth / listWidth) + 1;

        // Clear existing clones if any (for re-init)
        const existingClones = this.track.querySelectorAll('.logoloop__list[aria-hidden="true"]');
        existingClones.forEach(el => el.remove());

        for (let i = 0; i < copiesNeeded; i++) {
            const clone = this.list.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            this.track.appendChild(clone);
        }

        if (this.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => this.isHovered = true);
            this.container.addEventListener('mouseleave', () => this.isHovered = false);
            // Also touch events for mobile
            this.container.addEventListener('touchstart', () => this.isHovered = true);
            this.container.addEventListener('touchend', () => this.isHovered = false);
        }

        this.start();
    }

    animate(timestamp) {
        if (!this.lastTimestamp) this.lastTimestamp = timestamp;
        const deltaTime = (timestamp - this.lastTimestamp) / 1000;
        this.lastTimestamp = timestamp;

        if (!this.isHovered) {
            const moveAmount = this.speed * deltaTime;
            this.offset += moveAmount;

            const listWidth = this.list.offsetWidth;
            if (this.offset >= listWidth) {
                this.offset %= listWidth;
            }

            const multiplier = this.direction === 'left' ? -1 : 1;
            this.track.style.transform = `translate3d(${this.offset * multiplier}px, 0, 0)`;
        }

        this.rafId = requestAnimationFrame((t) => this.animate(t));
    }

    start() {
        this.rafId = requestAnimationFrame((t) => this.animate(t));
    }

    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
    }
}

// Export for use
window.LogoLoop = LogoLoop;
