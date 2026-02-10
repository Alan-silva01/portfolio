import projectsData from './projectsData.js';

document.addEventListener('DOMContentLoaded', () => {
    // === HAMBURGER MENU ===
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('.nav');
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('open');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });
        // Close menu on nav link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

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
    const projectOrder = ['zapdin', 'upzy', 'rapidus', 'nero-crm', 'clinic-ai', 'rastrei-ai', 'convert-ai', 'imob-ai'];
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

            if (data.gallery && data.gallery.length > 0) {
                // Carousel Logic
                const carouselContainer = document.createElement('div');
                carouselContainer.className = 'carousel-container';

                const track = document.createElement('div');
                track.className = 'carousel-track';

                data.gallery.forEach((src, index) => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = `${data.title} - Preview ${index + 1}`;
                    img.className = index === 0 ? 'active' : '';
                    track.appendChild(img);
                });

                carouselContainer.appendChild(track);

                // Controls
                if (data.gallery.length > 1) {
                    const prevBtn = document.createElement('button');
                    prevBtn.className = 'carousel-prev';
                    prevBtn.innerHTML = '&#10094;'; // <

                    const nextBtn = document.createElement('button');
                    nextBtn.className = 'carousel-next';
                    nextBtn.innerHTML = '&#10095;'; // >

                    const dotsContainer = document.createElement('div');
                    dotsContainer.className = 'carousel-dots';

                    data.gallery.forEach((_, index) => {
                        const dot = document.createElement('span');
                        dot.className = index === 0 ? 'carousel-dot active' : 'carousel-dot';
                        dot.addEventListener('click', () => showSlide(index));
                        dotsContainer.appendChild(dot);
                    });

                    carouselContainer.appendChild(prevBtn);
                    carouselContainer.appendChild(nextBtn);
                    carouselContainer.appendChild(dotsContainer);

                    // Carousel State
                    let currentSlide = 0;
                    const dots = dotsContainer.querySelectorAll('.carousel-dot');
                    let autoPlayInterval;

                    const showSlide = (index) => {
                        dots[currentSlide].classList.remove('active');

                        currentSlide = (index + data.gallery.length) % data.gallery.length;

                        // Slide the track
                        track.style.transform = `translateX(-${currentSlide * 100}%)`;

                        dots[currentSlide].classList.add('active');
                    };

                    const nextSlide = () => showSlide(currentSlide + 1);
                    const prevSlide = () => showSlide(currentSlide - 1);

                    prevBtn.addEventListener('click', () => {
                        prevSlide();
                        resetAutoPlay();
                    });

                    nextBtn.addEventListener('click', () => {
                        nextSlide();
                        resetAutoPlay();
                    });

                    // Auto Play
                    const startAutoPlay = () => {
                        autoPlayInterval = setInterval(nextSlide, 6000); // 6 seconds per slide
                    };

                    const resetAutoPlay = () => {
                        clearInterval(autoPlayInterval);
                        startAutoPlay();
                    };

                    startAutoPlay();

                    // Stop on hover
                    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
                    carouselContainer.addEventListener('mouseleave', startAutoPlay);
                }

                modalMedia.appendChild(carouselContainer);

                // Preload first image to remove loading state
                const firstImg = track.querySelector('img');
                if (firstImg.complete) {
                    modalMedia.classList.remove('loading');
                    modalMedia.classList.add('loaded');
                } else {
                    firstImg.onload = () => {
                        modalMedia.classList.remove('loading');
                        modalMedia.classList.add('loaded');
                    };
                }

            } else if (data.type === 'video') {
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
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let delay = entry.target.dataset.delay || 0;
                // Clear any existing timeout to avoid overlaps
                clearTimeout(entry.target._revealTimeout);
                entry.target._revealTimeout = setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
            } else {
                clearTimeout(entry.target._revealTimeout);
                entry.target.classList.remove('active');
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
        const scrollPos = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Use a larger buffer for top-level sections
            if (scrollPos >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        // Special case for "Home" vs "Quem sou" inside the Hero Slider
        const slider = document.getElementById('hero-slider');
        if (slider) {
            const sliderTop = slider.offsetTop;
            const sliderHeight = window.innerHeight; // The pinned duration is set by end: "+=100%"

            // If we are at the very top or in the first half of the slider pin
            if (scrollPos < sliderTop + (sliderHeight * 0.5)) {
                current = 'home';
            }
            // If we are in the second half of the slider pin
            else if (scrollPos >= sliderTop + (sliderHeight * 0.5) && scrollPos < sliderTop + sliderHeight + 100) {
                current = 'about';
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1); // remove #
            if (href === current) {
                link.classList.add('active');
            }
        });
    });

    // Interactive Hero Slider (Home + About)
    const heroSlider = document.getElementById('hero-slider');
    if (heroSlider && typeof gsap !== 'undefined') {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSlider,
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: true,
                snap: {
                    snapTo: [0, 1],
                    duration: { min: 0.2, max: 0.5 },
                    delay: 0,
                    ease: "power1.inOut"
                },
                anticipatePin: 1
            }
        });

        // Step 1 fades out, Step 2 fades in
        tl.to('#hero-step-1', { autoAlpha: 0, duration: 0.5 }, 0)
            .to('.scroll-indicator', { autoAlpha: 0, duration: 0.3 }, 0)
            .fromTo('#hero-step-2',
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.5 }, 0.5)

            // Photo moves exactly to the left column (where name was)
            .to('#hero-photo-wrapper', {
                xPercent: -100,
                duration: 1,
                ease: "power2.inOut"
            }, 0)

            // Sidebar Bars transition
            .to('#bar-1', { backgroundColor: '#333333', duration: 0.3 }, 0)
            .to('#bar-2', { backgroundColor: '#ff6a00', duration: 0.3 }, 0.2);
    }

    // Fix Navigation for "Quem sou"
    const aboutNavLink = document.querySelector('a[href="#about"]');
    if (aboutNavLink) {
        aboutNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            const trigger = document.getElementById('hero-slider');
            if (trigger) {
                // Scroll to the end of the pin to show Step 2
                const scrollPos = trigger.offsetTop + window.innerHeight;
                window.scrollTo({
                    top: scrollPos,
                    behavior: 'smooth'
                });
            }
        });
    }
});
