import projectsData from './projectsData.js';

document.addEventListener('DOMContentLoaded', () => {
    const marqueeElement = document.getElementById('tech-marquee');

    // Initialize LogoLoop safely
    if (marqueeElement) {
        if (typeof LogoLoop !== 'undefined') {
            new LogoLoop(marqueeElement, {
                speed: 50,
                direction: 'left',
                pauseOnHover: true
            });
        } else {
            console.warn('LogoLoop not defined');
        }
    }

    // Initialize Projects Folders safely
    if (window.initFolder) {
        window.solucoesFolder = initFolder('#solucoes-container', {
            onOpen: () => window.agentesFolder && window.agentesFolder.close()
        });
        window.agentesFolder = initFolder('#agentes-container', {
            onOpen: () => window.solucoesFolder && window.solucoesFolder.close()
        });
    }

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalMedia = document.getElementById('modal-media');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalDescription = document.getElementById('modal-description');
    const modalFeatures = document.getElementById('modal-features');
    const modalGrid = document.querySelector('.modal-grid');
    const modalTag = document.querySelector('.modal-tag');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');

    // Projects Order for Navigation
    const projectOrder = ['zapdin', 'upzy', 'rapidus', 'nero-crm', 'agente-vendas', 'agente-suporte'];
    let currentProjectId = null;

    const updateModalContent = (projectId, direction = 'next') => {
        const data = projectsData[projectId];
        if (!data) return;

        currentProjectId = projectId;

        // Apply transition animation
        modalGrid.style.opacity = '0';
        modalGrid.style.transform = direction === 'next' ? 'translateX(20px)' : 'translateX(-20px)';

        setTimeout(() => {
            // Set layout type
            if (data.displayType === 'desktop') {
                modalGrid.classList.add('desktop-layout');
            } else {
                modalGrid.classList.remove('desktop-layout');
            }

            // Populate Content
            modalTitle.textContent = data.title;
            modalSubtitle.textContent = data.subtitle;
            modalDescription.textContent = data.description;
            modalTag.textContent = data.tag || 'PROJETO';

            modalFeatures.innerHTML = data.features
                .map(feature => `<li>${feature}</li>`)
                .join('');

            // Clear and set loading state
            modalMedia.innerHTML = '';
            modalMedia.classList.add('loading');
            modalMedia.classList.remove('loaded');

            if (data.type === 'video') {
                const video = document.createElement('video');
                video.src = data.mockup;
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;

                video.oncanplay = () => {
                    modalMedia.classList.remove('loading');
                    modalMedia.classList.add('loaded');
                };

                modalMedia.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = data.mockup;
                img.alt = data.title;

                img.onload = () => {
                    modalMedia.classList.remove('loading');
                    modalMedia.classList.add('loaded');
                };

                modalMedia.appendChild(img);
            }

            // Update Navigation Buttons visibility/state
            const currentIndex = projectOrder.indexOf(projectId);
            modalPrev.style.display = currentIndex > 0 ? 'flex' : 'none';
            modalNext.style.display = currentIndex < projectOrder.length - 1 ? 'flex' : 'none';

            // Reset animation
            modalGrid.style.opacity = '1';
            modalGrid.style.transform = 'translateX(0)';
        }, 300);
    };

    window.openProjectModal = (projectId) => {
        updateModalContent(projectId);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const navigate = (direction) => {
        const currentIndex = projectOrder.indexOf(currentProjectId);
        let nextIndex;

        if (direction === 'next' && currentIndex < projectOrder.length - 1) {
            nextIndex = currentIndex + 1;
        } else if (direction === 'prev' && currentIndex > 0) {
            nextIndex = currentIndex - 1;
        }

        if (nextIndex !== undefined) {
            updateModalContent(projectOrder[nextIndex], direction);
        }
    };

    modalPrev.addEventListener('click', () => navigate('prev'));
    modalNext.addEventListener('click', () => navigate('next'));

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (!modal.classList.contains('active')) {
                modalMedia.innerHTML = '';
            }
        }, 500);
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Keyboard Navigation for Modal
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'ArrowRight') {
            navigate('next');
        } else if (e.key === 'ArrowLeft') {
            navigate('prev');
        } else if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Intersection Observer for entrance animations
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el, index) => {
        if (el.closest('.hero-card') && !el.dataset.delay) {
            el.dataset.delay = index * 150;
        }
        revealObserver.observe(el);
    });

    // Fallback: Force reveal after 3 seconds if IntersectionObserver fails/is slow
    setTimeout(() => {
        revealElements.forEach(el => {
            if (!el.classList.contains('active')) {
                el.classList.add('active');
            }
        });
    }, 3000);

    // Active Navigation Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
