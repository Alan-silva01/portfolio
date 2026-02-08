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
        this.init();
    }

    init() {
        // Wait for images and dimensions
        if (this.list.offsetWidth === 0) {
            setTimeout(() => this.init(), 100);
            return;
        }

        const listWidth = this.list.offsetWidth;

        // Ensure we have exactly 2 lists for a perfect loop
        // Clear any previous clones
        const existingClones = this.track.querySelectorAll('.logoloop__list[aria-hidden="true"]');
        existingClones.forEach(el => el.remove());

        // Add one clone
        const clone = this.list.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        this.track.appendChild(clone);

        // Force a reflow to ensure the animation picks up the new variables
        this.container.style.display = 'none';
        this.container.offsetHeight; // reflow
        this.container.style.display = 'block';

        // Calculate duration based on speed and width
        const duration = listWidth / this.speed;

        // Set CSS variables for the animation
        this.container.style.setProperty('--logoloop-duration', `${duration}s`);
        this.container.style.setProperty('--logoloop-translate-x', `-${listWidth}px`);

        // Add resize listener only once
        if (!this.resizeAttached) {
            window.addEventListener('resize', () => {
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => this.init(), 200);
            });
            this.resizeAttached = true;
        }
    }
}


// Export for use
window.LogoLoop = LogoLoop;
