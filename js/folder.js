class Folder {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.folder = this.container.querySelector('.folder');
        this.papers = this.container.querySelectorAll('.paper');
        this.isOpen = false;

        this.init();
    }

    init() {
        this.folder.addEventListener('click', (e) => {
            // Prevent toggling if clicking a paper while open
            if (this.isOpen && e.target.closest('.paper')) return;
            this.toggle();
        });

        this.papers.forEach((paper, index) => {
            paper.addEventListener('mousemove', (e) => this.handleMouseMove(e, paper));
            paper.addEventListener('mouseleave', () => this.handleMouseLeave(paper));
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.folder.classList.toggle('open', this.isOpen);

        if (!this.isOpen) {
            this.resetAllOffsets();
        }
    }

    handleMouseMove(e, paper) {
        if (!this.isOpen) return;

        const rect = paper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const offsetX = (e.clientX - centerX) * 0.15;
        const offsetY = (e.clientY - centerY) * 0.15;

        paper.style.setProperty('--magnet-x', `${offsetX}px`);
        paper.style.setProperty('--magnet-y', `${offsetY}px`);
    }

    handleMouseLeave(paper) {
        paper.style.setProperty('--magnet-x', `0px`);
        paper.style.setProperty('--magnet-y', `0px`);
    }

    resetAllOffsets() {
        this.papers.forEach(paper => {
            paper.style.setProperty('--magnet-x', `0px`);
            paper.style.setProperty('--magnet-y', `0px`);
        });
    }
}

// Global init helper
window.initFolder = (selector) => new Folder(selector);
