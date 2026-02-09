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

            // If folder is already open and paper is clicked -> Open Modal immediately
            if (this.isOpen && paper) {
                const projectId = paper.getAttribute('data-project');
                if (window.openProjectModal) {
                    window.openProjectModal(projectId);
                }
                return;
            }

            // If folder is CLOSED but paper is clicked (during peek) -> Animate Open then Open Modal
            if (!this.isOpen && paper) {
                const projectId = paper.getAttribute('data-project');
                this.toggle(); // Start animation

                // Wait for animation (approx 500ms) then open modal
                setTimeout(() => {
                    if (window.openProjectModal) {
                        window.openProjectModal(projectId);
                    }
                }, 500);
                return;
            }

            // Otherwise just toggle folder
            this.toggle();
        });

        // Hover effect is now handled purely by CSS for the "peek" inside state.
        // Click triggers the "open" state which flies the papers out.

        // Close on scroll
        window.addEventListener('scroll', () => {
            if (this.isOpen) this.close();
        }, { passive: true });

        // Close when clicking outside or on another folder
        document.addEventListener('click', (e) => {
            if (!this.isOpen) return;

            // Allow clicks inside this folder container
            if (this.container.contains(e.target)) return;

            // Allow clicks on modal (don't close folder if modal is open/opening)
            if (document.querySelector('.project-modal.active')) return;

            this.close();
        });

        this.papers.forEach((paper, index) => {
            paper.addEventListener('mousemove', (e) => this.handleMouseMove(e, paper));
            paper.addEventListener('mouseleave', () => this.handleMouseLeave(paper));
        });

        // Close on backdrop click (already handled by document click above, but keeping for specific wrapper behavior if improved)
        this.container.closest('.folder-wrapper').addEventListener('click', (e) => {
            // This might be redundant with document click, but ensures wrapper clicks work
            if (this.isOpen && e.target === this.container.closest('.folder-wrapper')) {
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
