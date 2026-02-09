class Folder {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.folder = this.container.querySelector('.folder');
        this.papers = this.container.querySelectorAll('.paper');
        this.isOpen = false;
        this.onOpen = options.onOpen || null;

        this.init();
    }

    init() {
        this.folder.addEventListener('click', (e) => {
            const paper = e.target.closest('.paper');
            if (this.isOpen && paper) {
                const projectId = paper.getAttribute('data-project');

                // Add fly-out animation (dramatic extract)
                paper.classList.add('fly-out');

                // Wait for animation to finish before opening modal
                setTimeout(() => {
                    if (window.openProjectModal) {
                        window.openProjectModal(projectId);
                    }
                    // Remove class after modal is triggered so it's ready for next time
                    setTimeout(() => paper.classList.remove('fly-out'), 500);
                }, 500);

                return;
            }
            this.toggle();
        });

        // Hover to open
        this.folder.addEventListener('mouseenter', () => {
            if (!this.isOpen) this.toggle();
        });

        this.container.addEventListener('mouseleave', () => {
            if (this.isOpen) this.close();
        });

        this.papers.forEach((paper, index) => {
            paper.addEventListener('mousemove', (e) => this.handleMouseMove(e, paper));
            paper.addEventListener('mouseleave', () => this.handleMouseLeave(paper));
        });

        // Close on backdrop click
        this.container.closest('.folder-wrapper').addEventListener('click', (e) => {
            if (this.isOpen && e.target.classList.contains('folder-wrapper')) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.folder.classList.toggle('open', this.isOpen);

        // Toggle active class on the parent wrapper to manage z-index
        const wrapper = this.container.closest('.folder-wrapper');
        if (wrapper) {
            wrapper.classList.toggle('active', this.isOpen);
        }

        if (this.isOpen && this.onOpen) {
            this.onOpen(this);
        }

        if (!this.isOpen) {
            this.resetAllOffsets();
        }
    }

    close() {
        if (this.isOpen) {
            this.isOpen = false;
            this.folder.classList.remove('open');
            const wrapper = this.container.closest('.folder-wrapper');
            if (wrapper) {
                wrapper.classList.remove('active');
            }
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

window.initFolder = (selector, options) => new Folder(selector, options);
