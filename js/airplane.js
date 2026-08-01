// Airplane Scene Management
class AirplaneScene {
    constructor(model) {
        this.views = [
            { bottom: 0, height: 1 },
            { bottom: 0, height: 0 }
        ];

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        const isMobile = window.innerWidth < 768;
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Optimize for mobile: Disable shadows and cap pixel ratio
        if (!isMobile) {
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        } else {
            this.renderer.shadowMap.enabled = false;
        }

        const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 2 : 3);
        this.renderer.setPixelRatio(pixelRatio);

        // Append to the experience container
        const container = document.querySelector('#airplane-experience');
        if (!container) return;

        this.renderer.domElement.style.position = 'fixed';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.zIndex = '2';
        this.renderer.domElement.style.pointerEvents = 'none';
        this.renderer.domElement.style.visibility = 'hidden';
        this.renderer.domElement.style.opacity = '0';
        container.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();

        for (let ii = 0; ii < this.views.length; ++ii) {
            let view = this.views[ii];
            let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
            camera.position.fromArray([0, 0, 180]);
            camera.layers.disableAll();
            camera.layers.enable(ii);
            view.camera = camera;
            camera.lookAt(new THREE.Vector3(0, 5, 0));
        }

        this.light = new THREE.PointLight(0xffffff, 0.75);
        this.light.position.set(70, -20, 150);
        this.scene.add(this.light);

        this.softLight = new THREE.AmbientLight(0xffffff, 1.5);
        this.scene.add(this.softLight);

        this.onResize();
        window.addEventListener('resize', () => this.onResize(), false);

        if (model && model.children && model.children[0]) {
            let edges = new THREE.EdgesGeometry(model.children[0].geometry);
            let line = new THREE.LineSegments(edges);
            line.material.depthTest = false;
            line.material.opacity = 0.5;
            line.material.transparent = true;
            line.position.set(0.5, 0.2, -1);

            this.modelGroup = new THREE.Group();

            model.layers.set(0);
            line.layers.set(1);

            this.modelGroup.add(model);
            this.modelGroup.add(line);
            this.scene.add(this.modelGroup);
        }
    }

    render = () => {
        if (!this.renderer) return;
        for (let ii = 0; ii < this.views.length; ++ii) {
            let view = this.views[ii];
            let camera = view.camera;

            let bottom = Math.floor(this.h * view.bottom);
            let height = Math.floor(this.h * view.height);

            this.renderer.setViewport(0, 0, this.w, this.h);
            this.renderer.setScissor(0, bottom, this.w, height);
            this.renderer.setScissorTest(true);

            camera.aspect = this.w / this.h;
            this.renderer.render(this.scene, camera);
        }
    }

    onResize = () => {
        this.w = window.innerWidth;
        this.h = window.innerHeight;

        if (this.views) {
            for (let ii = 0; ii < this.views.length; ++ii) {
                let view = this.views[ii];
                let camera = view.camera;
                camera.aspect = this.w / this.h;
                let camZ = (screen.width - (this.w * 1)) / 3;
                let minZ = this.w < 768 ? 280 : 180;
                camera.position.z = camZ < minZ ? minZ : camZ;
                camera.updateProjectionMatrix();
            }
        }

        if (this.renderer) {
            this.renderer.setSize(this.w, this.h);
            this.render();
        }
    }
}

// Procedural 3D Paper Airplane generator as absolute last resort
function createPaperAirplaneMesh() {
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
        0, 0, 50,
        -48, 2, -30,
        48, 2, -30,
        0, 3, -35,
        0, -12, -25,
        -10, 1, -32,
        10, 1, -32,
        -3, -10, -28,
        3, -10, -28
    ]);

    const indices = [
        0, 1, 5,
        0, 6, 2,
        0, 5, 3,
        0, 3, 6,
        0, 3, 7,
        0, 8, 3,
        0, 7, 4,
        0, 4, 8,
        5, 1, 3,
        6, 3, 2,
        7, 3, 4,
        8, 4, 3
    ];

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
        color: 0x171511,
        specular: 0xD0CBC7,
        shininess: 5,
        flatShading: true,
        side: THREE.DoubleSide
    }));

    const group = new THREE.Group();
    group.add(mesh);
    return group;
}

function initAirplaneExperience() {
    console.log("Initializing Airplane Experience...");

    if (typeof gsap === 'undefined' || typeof THREE === 'undefined') {
        console.error("GSAP or Three.js not loaded!");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Ensure section text visibility works GUARANTEED
    ScrollTrigger.batch("#airplane-experience .section", {
        onEnter: (elements) => elements.forEach(el => el.classList.add('is-visible')),
        onLeaveBack: (elements) => elements.forEach(el => el.classList.remove('is-visible')),
        start: "top 75%"
    });

    // Initial SVG states
    gsap.set('#line-length, #line-wingspan, #circle-phalange', { opacity: 0 });

    let animationInitialized = false;

    function handleModelReady(modelObj) {
        if (animationInitialized) return;
        animationInitialized = true;
        console.log("Original 1405 Plane model loaded successfully.");

        try {
            modelObj.traverse(function (child) {
                if (child.isMesh) {
                    child.material = new THREE.MeshPhongMaterial({
                        color: 0x171511,
                        specular: 0xD0CBC7,
                        shininess: 5,
                        flatShading: true
                    });
                }
            });
            setupAirplaneAnimation(modelObj);
        } catch (e) {
            console.error("Error setting up animation with loaded model:", e);
        }
    }

    try {
        const LoaderClass = THREE.OBJLoader || window.OBJLoader;
        if (typeof LoaderClass === 'function') {
            const manager = new THREE.LoadingManager(() => { });
            manager.onError = (err) => {
                console.warn("LoadingManager error:", err);
            };

            const loader = new LoaderClass(manager);

            // Candidate paths for Vercel/production resolution
            const candidatePaths = [
                'assets/plane.obj',
                './assets/plane.obj',
                '/assets/plane.obj'
            ];

            function tryLoadPath(index) {
                if (animationInitialized) return;
                if (index >= candidatePaths.length) {
                    console.warn("All candidate OBJ paths failed. Executing fallback mesh.");
                    setupAirplaneAnimation(createPaperAirplaneMesh());
                    return;
                }

                const path = candidatePaths[index];
                console.log(`Attempting to load plane model from path: ${path}`);
                loader.load(
                    path,
                    (obj) => handleModelReady(obj),
                    (xhr) => { if (xhr.total > 0) console.log((xhr.loaded / xhr.total * 100) + '% loaded'); },
                    (error) => {
                        console.warn(`Path ${path} failed to load, trying next candidate path...`, error);
                        tryLoadPath(index + 1);
                    }
                );
            }

            tryLoadPath(0);
        } else {
            console.error("OBJLoader not available.");
        }
    } catch (e) {
        console.error("Critical error in initAirplaneExperience:", e);
    }
}

function setupAirplaneAnimation(model) {
    const scene = new AirplaneScene(model);
    if (!scene.modelGroup) return;

    const plane = scene.modelGroup;
    const canvas = scene.renderer.domElement;

    const loadingEl = document.querySelector('#airplane-experience .loading');
    if (loadingEl) {
        gsap.to(loadingEl, { autoAlpha: 0, duration: 0.5 });
    }

    gsap.to('#airplane-experience .scroll-cta', { opacity: 1 });
    gsap.set(canvas, { visibility: 'visible', autoAlpha: 0 });

    ScrollTrigger.create({
        trigger: "#airplane-experience",
        start: "top center",
        onEnter: () => gsap.to(canvas, { autoAlpha: 1 }),
        onLeaveBack: () => gsap.to(canvas, { autoAlpha: 0 })
    });

    const tau = Math.PI * 2;
    gsap.set(plane.rotation, { y: tau * -.25 });
    gsap.set(plane.position, { x: 80, y: -32, z: -60 });

    scene.render();

    const isMobile = window.innerWidth < 768;
    const sectionDuration = isMobile ? 0.6 : 1;

    gsap.to('.ground', {
        y: isMobile ? "15%" : "30%",
        scrollTrigger: {
            trigger: ".ground-container",
            scrub: true,
            start: "top bottom",
            end: "bottom top"
        }
    });

    gsap.from('.clouds', {
        y: isMobile ? "10%" : "25%",
        scrollTrigger: {
            trigger: ".ground-container",
            scrub: true,
            start: "top bottom",
            end: "bottom top"
        }
    });

    const tl = gsap.timeline({
        onUpdate: scene.render,
        scrollTrigger: {
            trigger: "#airplane-experience .airplane-content",
            scrub: true,
            start: "top top",
            end: "bottom bottom"
        },
        defaults: { duration: sectionDuration, ease: 'power2.inOut' }
    });

    // Wireframe reveal logic (blueprint scanner)
    gsap.fromTo(scene.views[1],
        { height: 1, bottom: 0 },
        {
            height: 0, bottom: 1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
                trigger: "#airplane-experience .blueprint",
                scrub: true,
                start: "bottom bottom",
                end: "bottom top"
            },
            onUpdate: scene.render
        }
    );

    gsap.fromTo(scene.views[1],
        { height: 0, bottom: 0 },
        {
            height: 1, bottom: 0,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
                trigger: "#airplane-experience .blueprint",
                scrub: true,
                start: "top bottom",
                end: "top top"
            },
            onUpdate: scene.render
        }
    );

    let delay = 0;
    tl.to('#airplane-experience .scroll-cta', { duration: 0.25, opacity: 0 }, delay);
    tl.to(plane.position, { x: -10, ease: 'power1.in' }, delay);

    delay += sectionDuration;
    tl.to(plane.rotation, { x: tau * .25, y: 0, z: -tau * 0.05, ease: 'power1.inOut' }, delay);
    tl.to(plane.position, { x: -40, y: 0, z: -60, ease: 'power1.inOut' }, delay);

    delay += sectionDuration;
    tl.to(plane.rotation, { x: tau * .25, y: 0, z: tau * 0.05, ease: 'power3.inOut' }, delay);
    tl.to(plane.position, { x: 40, y: 0, z: -60, ease: 'power2.inOut' }, delay);

    delay += sectionDuration;
    tl.to(plane.rotation, { x: tau * .2, y: 0, z: -tau * 0.1, ease: 'power3.inOut' }, delay);
    tl.to(plane.position, { x: -40, y: 0, z: -30, ease: 'power2.inOut' }, delay);

    delay += sectionDuration;
    tl.to(plane.rotation, { x: 0, z: 0, y: tau * .25 }, delay);
    tl.to(plane.position, { x: 0, y: -10, z: 50 }, delay);

    delay += sectionDuration * 2;
    tl.to(plane.rotation, { x: tau * 0.25, y: tau * .5, z: 0, ease: 'power4.inOut' }, delay);
    tl.to(plane.position, { z: 30, ease: 'power4.inOut' }, delay);

    delay += sectionDuration;
    tl.to(plane.position, { z: 60, x: 30, ease: 'power4.inOut' }, delay);

    delay += sectionDuration;
    tl.to(plane.rotation, { x: tau * 0.35, y: tau * .75, z: tau * 0.6, ease: 'power4.inOut' }, delay);
    tl.to(plane.position, { z: 100, x: 20, y: 0, ease: 'power4.inOut' }, delay);

    delay += sectionDuration;
    tl.to(plane.rotation, { x: tau * 0.15, y: tau * .85, z: 0, ease: 'power1.in' }, delay);
    tl.to(plane.position, { z: -150, x: 0, y: 0, ease: 'power1.inOut' }, delay);

    delay += sectionDuration;
    tl.to(plane.rotation, { x: -tau * 0.05, y: tau, z: -tau * 0.1, ease: 'none' }, delay);
    tl.to(plane.position, { x: 0, y: 30, z: 320, ease: 'power1.in' }, delay);
    tl.to(scene.light.position, { x: 0, y: 0, z: 0 }, delay);

    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        scene.render();
    });
}

// Start immediately or on load
if (document.readyState === 'complete') {
    initAirplaneExperience();
} else {
    window.addEventListener('load', initAirplaneExperience);
}
