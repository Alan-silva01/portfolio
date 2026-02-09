import projectsData from './projectsData.js';

document.addEventListener('DOMContentLoaded', () => {
    const marqueeElement = document.getElementById('tech-marquee');
    if (marqueeElement) {
        new LogoLoop(marqueeElement, {
            speed: 50,
            direction: 'left',
            pauseOnHover: true
        });
    }

    // Initialize Projects Folders
    if (window.initFolder) {
        window.solucoesFolder = initFolder('#solucoes-container', {
            onOpen: () => window.agentesFolder.close()
        });
        window.agentesFolder = initFolder('#agentes-container', {
            onOpen: () => window.solucoesFolder.close()
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

    window.openProjectModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

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

        // Show Modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Wait for animation to finish before clearing content
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
    document.querySelectorAll('.reveal').forEach((el, index) => {
        // Hero elements get staggered delay, others handle themselves or use default
        if (el.closest('.hero-card') && !el.dataset.delay) {
            el.dataset.delay = index * 150;
        }
        revealObserver.observe(el);
    });

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
