/* =====================================================================
   Harshit Sharma — Multi-Page SPA Application Router Engine
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    tryInit(initThemeSwitcher, '3D Theme Switcher');
    tryInit(initSPARouter, 'SPA Router');
    tryInit(initThreeJSBackground, 'Three.js 3D Engine');
    tryInit(initCard3DTilt, '3D Card Tilt & Glare');
    tryInit(initTypingEffect, 'Cyberpunk Typing');
    tryInit(initCommandPalette, 'Command Palette');
    tryInit(initCodeInspector, 'Code Inspector');
    tryInit(initArchitectureInspector, 'Architecture Inspector');
    tryInit(initSkillsMatrix, 'Skills Matrix');
    tryInit(initTerminal, 'Lab Terminal');
    tryInit(initContactForm, 'Contact Form');
    tryInit(initWatermelonUIComponent, 'Watermelon UI AI Assistant');
    tryInit(initScrollReveal, 'Scroll Reveal Observer');
    tryInit(initTelemetryCounters, 'Telemetry Stat Counters');
    tryInit(initMagneticButtons, 'Magnetic CTA Buttons');
    tryInit(initCustomCursor, 'Custom Morphing Fluid Cursor');
    tryInit(initProjectModals, 'Project Expansion Modals');
});

function tryInit(fn, name) {
    try {
        fn();
    } catch (err) {
        console.warn(`[Portfolio Init Warning] ${name} error:`, err);
    }
}

/* ---------------------------------------------------------------------
   0. Multi-Page Single Page Application (SPA) Hash Router
   --------------------------------------------------------------------- */
function initSPARouter() {
    window.addEventListener('hashchange', handleHashRouting);
    handleHashRouting(); // Initial route check on page load
}

function handleHashRouting() {
    let hash = window.location.hash || '#about';
    const validPages = ['#about', '#projects', '#code-inspector', '#architecture', '#skills', '#terminal', '#contact'];
    
    if (!validPages.includes(hash)) {
        hash = '#about';
    }

    // Hide all page sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active-page');
    });

    // Show selected page section
    const targetSection = document.querySelector(hash);
    if (targetSection) {
        targetSection.classList.add('active-page');
    }

    // Update Navbar link active states
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Scroll smoothly to top of main container on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToPage(targetHash) {
    window.location.hash = targetHash;
    handleHashRouting();
}

/* ---------------------------------------------------------------------
   1. Three.js Interactive 3D Cosmic Particle Background
   --------------------------------------------------------------------- */
/* ---------------------------------------------------------------------
   0.1 Theme Switcher & 3D Engine State Management
   --------------------------------------------------------------------- */
let currentThemeMode = localStorage.getItem('portfolio_theme') || 'cyberpunk';
let switchThreeJSScene = null;

const themeInfo = {
    cyberpunk: { name: 'Cyberpunk HUD', icon: '🌌' },
    synthwave: { name: 'Synthwave Grid', icon: '🏎️' },
    constellation: { name: 'Quantum Constellation', icon: '⚛️' },
    hyperspace: { name: 'Hyperspace Warp', icon: '🚀' },
    matrix: { name: 'Hacker Matrix Rain', icon: '💻' },
    watermelon: { name: 'Watermelon UI', icon: '🍉' }
};

function initThemeSwitcher() {
    const btn = document.getElementById('theme-btn');
    const menu = document.getElementById('theme-menu');

    if (!btn || !menu) return;

    applyTheme(currentThemeMode);

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
        menu.classList.add('hidden');
    });

    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const selected = opt.getAttribute('data-theme');
            applyTheme(selected);
            menu.classList.add('hidden');
        });
    });
}

function applyTheme(themeMode) {
    currentThemeMode = themeMode;
    localStorage.setItem('portfolio_theme', themeMode);
    document.documentElement.setAttribute('data-theme', themeMode);

    const nameSpan = document.querySelector('.theme-current-name');
    const iconSpan = document.querySelector('.theme-icon');
    if (nameSpan && themeInfo[themeMode]) nameSpan.textContent = themeInfo[themeMode].name;
    if (iconSpan && themeInfo[themeMode]) iconSpan.textContent = themeInfo[themeMode].icon;

    document.querySelectorAll('.theme-option').forEach(opt => {
        if (opt.getAttribute('data-theme') === themeMode) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });

    if (switchThreeJSScene) {
        switchThreeJSScene(themeMode);
    }
}

/* ---------------------------------------------------------------------
   1. Multi-Mode Three.js Interactive 3D Canvas Engine
   ------------------------------------------------------/* ---------------------------------------------------------------------
   1. High-Potency Multi-Mode Three.js Interactive 3D WebGL Physics Engine
   --------------------------------------------------------------------- */
function initThreeJSBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Dynamic Cursor Tracking & Interactive Physics Vectors
    let targetMouseX = 0, targetMouseY = 0;
    let currMouseX = 0, currMouseY = 0;

    // Interactive 3D Point Light following cursor
    const mouseLight = new THREE.PointLight(0x38BDF8, 3, 800);
    scene.add(mouseLight);

    let activeMeshGroup = new THREE.Group();
    scene.add(activeMeshGroup);

    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX - window.innerWidth / 2);
        targetMouseY = -(e.clientY - window.innerHeight / 2);
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
            targetMouseX = (e.touches[0].clientX - window.innerWidth / 2);
            targetMouseY = -(e.touches[0].clientY - window.innerHeight / 2);
        }
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
            targetMouseX = (e.touches[0].clientX - window.innerWidth / 2);
            targetMouseY = -(e.touches[0].clientY - window.innerHeight / 2);
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let updateAnimationStep = null;
    let clock = new THREE.Clock();

    function buildScene(mode) {
        // Dispose existing geometries and materials safely
        while(activeMeshGroup.children.length > 0){ 
            const obj = activeMeshGroup.children[0];
            activeMeshGroup.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
                else obj.material.dispose();
            }
        }

        if (mode === 'cyberpunk') {
            // Mode 1: Quantum Vortex Gravity Attractor & Pulsing Morphing Sphere (POINTER TRACKING)
            mouseLight.color.setHex(0x38BDF8);

            const count = 1200;
            const geo = new THREE.BufferGeometry();
            const pos = new Float32Array(count * 3);
            const origPos = new Float32Array(count * 3);
            const cols = new Float32Array(count * 3);
            const c1 = new THREE.Color('#38BDF8');
            const c2 = new THREE.Color('#8B5CF6');

            for (let i = 0; i < count * 3; i += 3) {
                const radius = 250 + Math.random() * 450;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;

                pos[i] = radius * Math.sin(phi) * Math.cos(theta);
                pos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
                pos[i + 2] = radius * Math.cos(phi);

                origPos[i] = pos[i];
                origPos[i + 1] = pos[i + 1];
                origPos[i + 2] = pos[i + 2];

                const col = Math.random() > 0.4 ? c1 : c2;
                cols[i] = col.r; cols[i + 1] = col.g; cols[i + 2] = col.b;
            }

            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
            const pMat = new THREE.PointsMaterial({ size: 4.2, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
            const pSys = new THREE.Points(geo, pMat);
            activeMeshGroup.add(pSys);

            // Morphing Wireframe Sphere Core
            const orbGeo = new THREE.IcosahedronGeometry(130, 3);
            const orbMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8, wireframe: true, transparent: true, opacity: 0.25 });
            const orb = new THREE.Mesh(orbGeo, orbMat);
            orb.position.set(280, 40, -150);
            activeMeshGroup.add(orb);

            // Double Gyroscope Rings
            const ring1Geo = new THREE.TorusGeometry(180, 2, 16, 100);
            const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x8B5CF6, wireframe: true, transparent: true, opacity: 0.35 });
            const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
            ring1.position.copy(orb.position);
            activeMeshGroup.add(ring1);

            const ring2Geo = new THREE.TorusGeometry(220, 1.8, 16, 100);
            const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38BDF8, wireframe: true, transparent: true, opacity: 0.25 });
            const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
            ring2.position.copy(orb.position);
            ring2.rotation.x = Math.PI / 3;
            activeMeshGroup.add(ring2);

            updateAnimationStep = (time) => {
                pSys.rotation.y = time * 0.15;
                pSys.rotation.x = time * 0.08;

                // Vortex Gravity Pull toward Cursor
                const pArr = geo.attributes.position.array;
                for (let i = 0; i < count * 3; i += 3) {
                    const dx = currMouseX - pArr[i];
                    const dy = currMouseY - pArr[i + 1];
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 220) {
                        const force = (220 - dist) / 220;
                        pArr[i] += dx * force * 0.08;
                        pArr[i + 1] += dy * force * 0.08;
                    } else {
                        pArr[i] += (origPos[i] - pArr[i]) * 0.04;
                        pArr[i + 1] += (origPos[i + 1] - pArr[i + 1]) * 0.04;
                    }
                }
                geo.attributes.position.needsUpdate = true;

                orb.rotation.x = time * 0.4;
                orb.rotation.y = time * 0.6;
                ring1.rotation.z = -time * 0.8;
                ring2.rotation.x = time * 0.5;
            };

        } else if (mode === 'synthwave') {
            // Mode 2: Neon Sunset Horizon & Dynamic Highway Warp Grid (AUTOMATED RETROWAVE)
            mouseLight.color.setHex(0xFF007F);

            const gridGeo = new THREE.PlaneGeometry(2200, 2200, 48, 48);
            const gridMat = new THREE.MeshBasicMaterial({ color: 0xFF007F, wireframe: true, transparent: true, opacity: 0.45 });
            const grid = new THREE.Mesh(gridGeo, gridMat);
            grid.rotation.x = -Math.PI / 2.2;
            grid.position.y = -220;
            grid.position.z = -200;
            activeMeshGroup.add(grid);

            // Wireframe Horizon Sun
            const sunGeo = new THREE.SphereGeometry(180, 28, 28);
            const sunMat = new THREE.MeshBasicMaterial({ color: 0xFF007F, wireframe: true, transparent: true, opacity: 0.22 });
            const sun = new THREE.Mesh(sunGeo, sunMat);
            sun.position.set(0, 80, -650);
            activeMeshGroup.add(sun);

            // Floating Polyhedrons
            const polyGeo = new THREE.IcosahedronGeometry(95, 1);
            const polyMat = new THREE.MeshBasicMaterial({ color: 0x00F0FF, wireframe: true, transparent: true, opacity: 0.4 });
            const poly = new THREE.Mesh(polyGeo, polyMat);
            poly.position.set(-300, 110, -120);
            activeMeshGroup.add(poly);

            const knotGeo = new THREE.TorusKnotGeometry(75, 20, 80, 12);
            const knotMat = new THREE.MeshBasicMaterial({ color: 0xD946EF, wireframe: true, transparent: true, opacity: 0.35 });
            const knot = new THREE.Mesh(knotGeo, knotMat);
            knot.position.set(320, -40, -150);
            activeMeshGroup.add(knot);

            const posAttr = gridGeo.attributes.position;

            updateAnimationStep = (time) => {
                grid.position.z += 3.5;
                if (grid.position.z > 0) grid.position.z = -200;

                for (let i = 0; i < posAttr.count; i++) {
                    const x = posAttr.getX(i);
                    const y = posAttr.getY(i);
                    const z = Math.sin(x * 0.015 + time * 2.5) * 25 + Math.cos(y * 0.015 + time * 2.0) * 20;
                    posAttr.setZ(i, z);
                }
                posAttr.needsUpdate = true;

                sun.rotation.y = time * 0.1;
                poly.rotation.x = time * 0.6;
                poly.rotation.y = time * 0.8;
                knot.rotation.x = time * 0.7;
                knot.rotation.z = time * 0.5;
            };

        } else if (mode === 'constellation') {
            // Mode 3: 3D Rotating DNA Double Helix & Atomic Nucleus (AUTOMATED DNA HELIX)
            mouseLight.color.setHex(0x10B981);

            const helixNodeCount = 180;
            const helixPositions = new Float32Array(helixNodeCount * 3);
            const helixGeo = new THREE.BufferGeometry();

            // Twin DNA Strands A & B
            for (let i = 0; i < helixNodeCount / 2; i++) {
                const t = (i / (helixNodeCount / 2)) * Math.PI * 8;
                const y = (i / (helixNodeCount / 2)) * 600 - 300;
                const radius = 140;

                // Strand A
                helixPositions[i * 6] = Math.cos(t) * radius;
                helixPositions[i * 6 + 1] = y;
                helixPositions[i * 6 + 2] = Math.sin(t) * radius;

                // Strand B (opposite phase)
                helixPositions[i * 6 + 3] = Math.cos(t + Math.PI) * radius;
                helixPositions[i * 6 + 4] = y;
                helixPositions[i * 6 + 5] = Math.sin(t + Math.PI) * radius;
            }

            helixGeo.setAttribute('position', new THREE.BufferAttribute(helixPositions, 3));
            const helixMat = new THREE.PointsMaterial({ color: 0x10B981, size: 7, transparent: true, opacity: 0.95 });
            const helixPoints = new THREE.Points(helixGeo, helixMat);
            helixPoints.position.set(240, 0, -100);
            activeMeshGroup.add(helixPoints);

            // Hydrogen-bond connecting lines between Strand A and Strand B
            const linePositions = new Float32Array((helixNodeCount / 2) * 6);
            const lineGeo = new THREE.BufferGeometry();
            const lineMat = new THREE.LineBasicMaterial({ color: 0x3B82F6, transparent: true, opacity: 0.4, linewidth: 2 });
            const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
            lineMesh.position.copy(helixPoints.position);
            activeMeshGroup.add(lineMesh);

            // Atomic Center Nucleus Box
            const cubeGeo = new THREE.IcosahedronGeometry(90, 1);
            const cubeMat = new THREE.MeshBasicMaterial({ color: 0x10B981, wireframe: true, transparent: true, opacity: 0.35 });
            const cube = new THREE.Mesh(cubeGeo, cubeMat);
            cube.position.set(-280, 40, -120);
            activeMeshGroup.add(cube);

            updateAnimationStep = (time) => {
                helixPoints.rotation.y = time * 0.4;
                helixPoints.rotation.z = Math.sin(time * 0.2) * 0.15;

                // Recompute line bonds
                const posArr = helixPositions;
                const lArr = linePositions;
                for (let i = 0; i < helixNodeCount / 2; i++) {
                    lArr[i * 6] = posArr[i * 6];
                    lArr[i * 6 + 1] = posArr[i * 6 + 1];
                    lArr[i * 6 + 2] = posArr[i * 6 + 2];

                    lArr[i * 6 + 3] = posArr[i * 6 + 3];
                    lArr[i * 6 + 4] = posArr[i * 6 + 4];
                    lArr[i * 6 + 5] = posArr[i * 6 + 5];
                }
                lineGeo.setAttribute('position', new THREE.BufferAttribute(lArr, 3));
                lineGeo.attributes.position.needsUpdate = true;
                lineMesh.rotation.y = helixPoints.rotation.y;
                lineMesh.rotation.z = helixPoints.rotation.z;

                cube.rotation.x = time * 0.5;
                cube.rotation.y = time * 0.6;
            };

        } else if (mode === 'hyperspace') {
            // Mode 4: 3D Concentric Hexagon Wormhole Tunnel (AUTOMATED CONCENTRIC WORMHOLE)
            mouseLight.color.setHex(0xEC4899);

            const ringCount = 20;
            const rings = [];
            const ringGroup = new THREE.Group();

            for (let i = 0; i < ringCount; i++) {
                const rGeo = new THREE.TorusGeometry(80 + i * 18, 2, 6, 6);
                const rMat = new THREE.MeshBasicMaterial({ 
                    color: i % 2 === 0 ? 0xEC4899 : 0xF59E0B, 
                    wireframe: true, 
                    transparent: true, 
                    opacity: 0.4 - (i * 0.015) 
                });
                const rMesh = new THREE.Mesh(rGeo, rMat);
                rMesh.position.z = -i * 55;
                rings.push(rMesh);
                ringGroup.add(rMesh);
            }
            ringGroup.position.set(0, 0, 100);
            activeMeshGroup.add(ringGroup);

            const prismGeo = new THREE.OctahedronGeometry(110, 0);
            const prismMat = new THREE.MeshBasicMaterial({ color: 0xF59E0B, wireframe: true, transparent: true, opacity: 0.4 });
            const prism = new THREE.Mesh(prismGeo, prismMat);
            prism.position.set(0, 0, -350);
            activeMeshGroup.add(prism);

            updateAnimationStep = (time) => {
                rings.forEach((r, idx) => {
                    r.rotation.z = time * 0.3 * (idx % 2 === 0 ? 1 : -1);
                    r.position.z += 3.0;
                    if (r.position.z > 200) r.position.z = -((ringCount - 1) * 55);
                });

                ringGroup.rotation.z = Math.sin(time * 0.2) * 0.2;
                prism.rotation.y = time * 0.8;
                prism.rotation.x = time * 0.6;
            };

        } else if (mode === 'matrix') {
            // Mode 5: 3D Particle Torus Donut & Digital Waterfall (AUTOMATED 3D DONUT & RAIN)
            mouseLight.color.setHex(0x00FF66);

            const torusCount = 1200;
            const torusGeo = new THREE.BufferGeometry();
            const torusPos = new Float32Array(torusCount * 3);
            const R = 180, r = 60; // Major & minor radius

            for (let i = 0; i < torusCount; i++) {
                const u = Math.random() * Math.PI * 2;
                const v = Math.random() * Math.PI * 2;

                torusPos[i * 3] = (R + r * Math.cos(u)) * Math.cos(v);
                torusPos[i * 3 + 1] = (R + r * Math.cos(u)) * Math.sin(v);
                torusPos[i * 3 + 2] = r * Math.sin(u);
            }

            torusGeo.setAttribute('position', new THREE.BufferAttribute(torusPos, 3));
            const torusMat = new THREE.PointsMaterial({ color: 0x00FF66, size: 4.5, transparent: true, opacity: 0.85 });
            const torusPoints = new THREE.Points(torusGeo, torusMat);
            torusPoints.position.set(280, 20, -120);
            activeMeshGroup.add(torusPoints);

            // Cascade rain particles
            const rainCount = 800;
            const rainGeo = new THREE.BufferGeometry();
            const rainPos = new Float32Array(rainCount * 3);
            for (let i = 0; i < rainCount * 3; i += 3) {
                rainPos[i] = (Math.random() - 0.5) * 1200;
                rainPos[i + 1] = Math.random() * 1000 - 500;
                rainPos[i + 2] = (Math.random() - 0.5) * 800;
            }
            rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
            const rainMat = new THREE.PointsMaterial({ color: 0x10B981, size: 3.5, transparent: true, opacity: 0.7 });
            const rainPoints = new THREE.Points(rainGeo, rainMat);
            activeMeshGroup.add(rainPoints);

            updateAnimationStep = (time) => {
                torusPoints.rotation.x = time * 0.5;
                torusPoints.rotation.y = time * 0.7;

                const rArr = rainGeo.attributes.position.array;
                for (let i = 1; i < rainCount * 3; i += 3) {
                    rArr[i] -= 4.5;
                    if (rArr[i] < -500) rArr[i] = 500;
                }
                rainGeo.attributes.position.needsUpdate = true;
            };

        } else if (mode === 'watermelon') {
            // Mode 6: Watermelon UI Lime (Landing-01) Floating Electric Crystal Matrix
            mouseLight.color.setHex(0xA3E635);

            const wmCount = 1000;
            const wmGeo = new THREE.BufferGeometry();
            const wmPos = new Float32Array(wmCount * 3);
            for (let i = 0; i < wmCount * 3; i += 3) {
                wmPos[i] = (Math.random() - 0.5) * 1200;
                wmPos[i + 1] = (Math.random() - 0.5) * 1000;
                wmPos[i + 2] = (Math.random() - 0.5) * 700;
            }
            wmGeo.setAttribute('position', new THREE.BufferAttribute(wmPos, 3));
            const wmMat = new THREE.PointsMaterial({ color: 0xA3E635, size: 4.8, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
            const wmPoints = new THREE.Points(wmGeo, wmMat);
            activeMeshGroup.add(wmPoints);

            // Watermelon Central Crystal Octahedron
            const octGeo = new THREE.OctahedronGeometry(120, 2);
            const octMat = new THREE.MeshBasicMaterial({ color: 0x84CC16, wireframe: true, transparent: true, opacity: 0.35 });
            const crystal = new THREE.Mesh(octGeo, octMat);
            crystal.position.set(260, 40, -120);
            activeMeshGroup.add(crystal);

            const ringGeo = new THREE.TorusGeometry(190, 2, 16, 100);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0xFF3B5C, wireframe: true, transparent: true, opacity: 0.3 });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.copy(crystal.position);
            ring.rotation.x = Math.PI / 3;
            activeMeshGroup.add(ring);

            updateAnimationStep = (time) => {
                wmPoints.rotation.y = time * 0.12;
                wmPoints.rotation.x = Math.sin(time * 0.2) * 0.1;

                crystal.rotation.x = time * 0.5;
                crystal.rotation.y = time * 0.7;
                ring.rotation.z = -time * 0.6;
            };
        }
    }

    let activeSceneMode = currentThemeMode;

    switchThreeJSScene = (newMode) => {
        activeSceneMode = newMode;
        buildScene(newMode);
    };

    buildScene(currentThemeMode);

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        if (activeSceneMode === 'cyberpunk') {
            // ONLY Cyberpunk HUD tracks mouse pointer movement!
            currMouseX += (targetMouseX - currMouseX) * 0.08;
            currMouseY += (targetMouseY - currMouseY) * 0.08;
            mouseLight.position.set(currMouseX, currMouseY, 150);
            camera.position.x = currMouseX * 0.25;
            camera.position.y = currMouseY * 0.25;
        } else {
            // All other 4 themes have stable automated background animations without pointer tracking
            currMouseX = 0;
            currMouseY = 0;
            mouseLight.position.set(0, 0, 250);
            camera.position.x = 0;
            camera.position.y = 0;
        }

        camera.lookAt(scene.position);

        if (updateAnimationStep) updateAnimationStep(elapsedTime);

        renderer.render(scene, camera);
    }

    animate();
}

function initCard3DTilt() {
    const cards = document.querySelectorAll('.glass-card, .project-card, .profile-card, .skill-card, .wm-bento-card');
    cards.forEach(card => {
        card.classList.add('glass-glare-card');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);

            const centerX = x - rect.width / 2;
            const centerY = y - rect.height / 2;
            const rotateX = (-centerY / rect.height) * 10;
            const rotateY = (centerX / rect.width) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });
}

/* ---------------------------------------------------------------------
   2. Cyberpunk Typing Effect
   --------------------------------------------------------------------- */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const titles = [
        "B.Tech AI & ML Student @ USAR (GGSIPU)",
        "Machine Learning Model Developer",
        "Full-Stack Web & Backend API Engineer",
        "Autonomous Agent Systems Builder"
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 30 : 65;

        if (!isDeleting && charIndex === currentTitle.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 300;
        }

        setTimeout(type, speed);
    }

    type();
}

/* ---------------------------------------------------------------------
   3. Command Palette Modal Engine (Cmd + K / Ctrl + K / '/' key)
   --------------------------------------------------------------------- */
function initCommandPalette() {
    const backdrop = document.getElementById('cmd-palette-backdrop');
    const input = document.getElementById('cmd-input');
    const triggerBtns = [document.getElementById('cmd-trigger-btn'), document.getElementById('cmd-hero-btn')];

    triggerBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => toggleCommandPalette(true));
        }
    });

    if (backdrop) {
        backdrop.addEventListener('click', () => toggleCommandPalette(false));
    }

    window.addEventListener('keydown', (e) => {
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') {
            if (e.key === 'Escape') toggleCommandPalette(false);
            return;
        }

        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            toggleCommandPalette(true);
        } else if (e.key === '/') {
            e.preventDefault();
            toggleCommandPalette(true);
        } else if (e.key === 'Escape') {
            toggleCommandPalette(false);
        }
    });

    if (input) {
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            document.querySelectorAll('.cmd-item').forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'flex' : 'none';
            });
        });
    }

    document.querySelectorAll('.cmd-item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            if (action === 'nav') {
                const target = item.getAttribute('data-target');
                toggleCommandPalette(false);
                if (target) {
                    navigateToPage(target);
                }
            } else if (action === 'link') {
                const url = item.getAttribute('data-url');
                toggleCommandPalette(false);
                if (url) window.open(url, '_blank');
            } else if (action === 'copy-email') {
                toggleCommandPalette(false);
                copyTextToClipboard('codewithharshitsharma@gmail.com');
                alert('⚡ Copied codewithharshitsharma@gmail.com to clipboard!');
            }
        });
    });
}

function toggleCommandPalette(show) {
    const backdrop = document.getElementById('cmd-palette-backdrop');
    const input = document.getElementById('cmd-input');
    if (!backdrop) return;

    if (show) {
        backdrop.classList.remove('hidden');
        if (input) {
            input.value = '';
            input.focus();
        }
    } else {
        backdrop.classList.add('hidden');
    }
}

/* ---------------------------------------------------------------------
   4. Real Code Inspector Sandbox Switcher
   --------------------------------------------------------------------- */
const codeSnippets = {
    webhook: `<span class="c-keyword">import</span> hashlib
<span class="c-keyword">import</span> hmac
<span class="c-keyword">import</span> os
<span class="c-keyword">from</span> flask <span class="c-keyword">import</span> Flask, abort, request

app = Flask(__name__)
TARGET_LABELS = {<span class="c-str">"bug"</span>, <span class="c-str">"good first issue"</span>, <span class="c-str">"help wanted"</span>}

<span class="c-keyword">def</span> <span class="c-func">verify_signature</span>(payload_body: bytes, signature_header: str | None) -> bool:
    <span class="c-keyword">if not</span> signature_header:
        <span class="c-keyword">return False</span>
    webhook_secret = os.environ.get(<span class="c-str">"GITHUB_WEBHOOK_SECRET"</span>, <span class="c-str">""</span>).encode()
    <span class="c-keyword">if not</span> webhook_secret:
        <span class="c-keyword">return False</span>
    expected = <span class="c-str">"sha256="</span> + hmac.new(webhook_secret, payload_body, hashlib.sha256).hexdigest()
    <span class="c-comment"># constant-time compare -- do not use \`==\` here, it leaks timing info</span>
    <span class="c-keyword">return</span> hmac.compare_digest(expected, signature_header)`,

    ml: `<span class="c-keyword">import</span> pandas <span class="c-keyword">as</span> pd
<span class="c-keyword">from</span> sklearn.ensemble <span class="c-keyword">import</span> RandomForestRegressor
<span class="c-keyword">from</span> sklearn.model_selection <span class="c-keyword">import</span> train_test_split

<span class="c-comment"># Used Bike Valuation Pipeline</span>
df = pd.read_csv(<span class="c-str">"used_bikes.csv"</span>)
X = df[[<span class="c-str">"kms_driven"</span>, <span class="c-str">"age_years"</span>, <span class="c-str">"power_bhp"</span>, <span class="c-str">"brand_code"</span>]]
y = df[<span class="c-str">"price"</span>]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

rf_model = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42)
rf_model.fit(X_train, y_train)

<span class="c-func">print</span>(<span class="c-str">f"Validation R^2 Score: {rf_model.score(X_test, y_test):.4f}"</span>)`,

    schema: `<span class="c-keyword">CREATE TABLE IF NOT EXISTS</span> repos (
    id <span class="c-func">SERIAL PRIMARY KEY</span>,
    owner_repo <span class="c-func">TEXT UNIQUE NOT NULL</span>,
    stars <span class="c-func">INTEGER NOT NULL</span>,
    open_bugs <span class="c-func">INTEGER NOT NULL</span>,
    language <span class="c-func">TEXT NOT NULL</span>,
    created_at <span class="c-func">TIMESTAMPTZ DEFAULT NOW()</span>
);

<span class="c-keyword">CREATE TABLE IF NOT EXISTS</span> issues (
    id <span class="c-func">SERIAL PRIMARY KEY</span>,
    repo_id <span class="c-func">INTEGER REFERENCES</span> repos(id),
    issue_number <span class="c-func">INTEGER NOT NULL</span>,
    title <span class="c-func">TEXT NOT NULL</span>,
    status <span class="c-func">TEXT DEFAULT 'DISCOVERED'</span>
);`
};

function initCodeInspector() {
    document.querySelectorAll('.ci-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const key = tab.getAttribute('data-tab');
            document.querySelectorAll('.ci-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const display = document.getElementById('code-display');
            if (display && codeSnippets[key]) {
                display.innerHTML = codeSnippets[key];
            }
        });
    });

    const copyBtn = document.getElementById('btn-copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const display = document.getElementById('code-display');
            if (display) {
                copyTextToClipboard(display.textContent);
                copyBtn.innerHTML = '<span>Copied!</span> ✅';
                setTimeout(() => {
                    copyBtn.innerHTML = '<span>Copy Code</span> 📋';
                }, 2000);
            }
        });
    }
}

/* ---------------------------------------------------------------------
   5. Architecture Inspector Diagram Switcher
   --------------------------------------------------------------------- */
const archDiagrams = {
    resilient: `
        <div class="arch-flow-grid">
            <div class="arch-node">
                <span class="arch-step-num">STEP 01</span>
                <h4>Discovery Engine</h4>
                <p>Scans GitHub API for candidate open-source issues with active reproducible unit test suites.</p>
            </div>
            <div class="arch-node">
                <span class="arch-step-num">STEP 02</span>
                <h4>Fork Isolation Sandbox</h4>
                <p>Clones repo into isolated temp workspace, dispatches LLM agent retry loops (\`pytest\`, \`npm test\`).</p>
            </div>
            <div class="arch-node">
                <span class="arch-step-num">STEP 03</span>
                <h4>JWT Upstream PR</h4>
                <p>Authenticated GitHub App RS256 token submits verified PR upstream under rolling rate caps.</p>
            </div>
        </div>`,

    bike: `
        <div class="arch-flow-grid">
            <div class="arch-node">
                <span class="arch-step-num">STEP 01</span>
                <h4>Data Cleaning & Encoding</h4>
                <p>Processes raw vehicle dataset, encodes categorical brand variables, handles missing value imputation.</p>
            </div>
            <div class="arch-node">
                <span class="arch-step-num">STEP 02</span>
                <h4>Random Forest Regressor</h4>
                <p>Trains multi-tree ensemble model predicting non-linear depreciation curves based on age and mileage.</p>
            </div>
            <div class="arch-node">
                <span class="arch-step-num">STEP 03</span>
                <h4>Flask REST Endpoint</h4>
                <p>Exposes light JSON API endpoint returning instant vehicle market valuation estimates.</p>
            </div>
        </div>`,

    carbon: `
        <div class="arch-flow-grid">
            <div class="arch-node">
                <span class="arch-step-num">STEP 01</span>
                <h4>Workload Telemetry</h4>
                <p>Collects active CPU/GPU training hours and server utilization metrics across team workstations.</p>
            </div>
            <div class="arch-node">
                <span class="arch-step-num">STEP 02</span>
                <h4>Grid Emission Factor</h4>
                <p>Calculates equivalent kWh energy draw and converts to regional carbon footprint metrics (kg CO₂).</p>
            </div>
            <div class="arch-node">
                <span class="arch-step-num">STEP 03</span>
                <h4>Optimization Insights</h4>
                <p>Renders visual recommendations to reduce computing energy consumption and offset emissions.</p>
            </div>
        </div>`
};

function initArchitectureInspector() {
    document.querySelectorAll('.arch-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const key = tab.getAttribute('data-arch');
            document.querySelectorAll('.arch-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const display = document.getElementById('arch-display');
            if (display && archDiagrams[key]) {
                display.innerHTML = archDiagrams[key];
            }
        });
    });

    const display = document.getElementById('arch-display');
    if (display) display.innerHTML = archDiagrams.resilient;
}

/* ---------------------------------------------------------------------
   6. Skills Matrix & Categorized Filter
   --------------------------------------------------------------------- */
const skillsData = [
    { name: 'Python', category: 'languages', icon: '🐍' },
    { name: 'JavaScript', category: 'languages', icon: '⚡' },
    { name: 'TypeScript', category: 'languages', icon: '📘' },
    { name: 'C / C++', category: 'languages', icon: '⚙️' },
    { name: 'Bash / Shell', category: 'languages', icon: '💻' },
    { name: 'FastAPI', category: 'ai-backend', icon: '🚀' },
    { name: 'Flask', category: 'ai-backend', icon: '🌶️' },
    { name: 'Node.js', category: 'ai-backend', icon: '🟢' },
    { name: 'Express', category: 'ai-backend', icon: '🌐' },
    { name: 'PyTorch / ML', category: 'ai-backend', icon: '🧠' },
    { name: 'React', category: 'frontend', icon: '⚛️' },
    { name: 'Next.js', category: 'frontend', icon: '▲' },
    { name: 'Vite', category: 'frontend', icon: '⚡' },
    { name: 'Three.js', category: 'frontend', icon: '📐' },
    { name: 'Tailwind CSS', category: 'frontend', icon: '🎨' },
    { name: 'PostgreSQL', category: 'devops', icon: '🐘' },
    { name: 'MongoDB', category: 'devops', icon: '🍃' },
    { name: 'Docker', category: 'devops', icon: '🐳' },
    { name: 'Git & GitHub', category: 'devops', icon: '🐙' },
    { name: 'Linux / Ubuntu', category: 'devops', icon: '🐧' }
];

function initSkillsMatrix() {
    document.querySelectorAll('.skill-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderSkillsGrid(category);
        });
    });

    renderSkillsGrid('all');
}

function renderSkillsGrid(filterCategory) {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = '';
    const filtered = filterCategory === 'all' 
        ? skillsData 
        : skillsData.filter(s => s.category === filterCategory);

    filtered.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <span class="skill-icon">${skill.icon}</span>
            <span class="skill-name">${skill.name}</span>
        `;
        container.appendChild(card);
    });
}

/* ---------------------------------------------------------------------
   7. Upgraded Hacker Lab Terminal Engine
   --------------------------------------------------------------------- */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');
    if (!input || !body) return;

    const availableCmds = ['neofetch', 'about', 'skills', 'projects', 'contact', 'sudo', 'clear', 'cat', 'matrix', 'whoami', 'date', 'help'];

    body.addEventListener('click', () => {
        input.focus();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const curr = input.value.trim().toLowerCase();
            if (!curr) return;

            if (curr.startsWith('cat ')) {
                const argPart = curr.slice(4).trim();
                const availableFiles = ['used_bike_model.py', 'webhook_receiver.py', 'schema.sql'];
                const fileMatches = availableFiles.filter(f => f.startsWith(argPart));
                if (fileMatches.length === 1) {
                    input.value = `cat ${fileMatches[0]}`;
                } else if (fileMatches.length > 1) {
                    appendTerminalLine(`File Matches: ${fileMatches.join('  ')}`, 't-info');
                }
            } else {
                const matches = availableCmds.filter(c => c.startsWith(curr));
                if (matches.length === 1) {
                    input.value = matches[0];
                } else if (matches.length > 1) {
                    appendTerminalLine(`Matches: ${matches.join('  ')}`, 't-info');
                }
            }
        } else if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                appendTerminalLine(`harshit@usar ~ % ${command}`, 't-cmd');
                executeTerminalCommand(command);
                input.value = '';
                body.scrollTop = body.scrollHeight;
            }
        }
    });
}

function appendTerminalLine(text, className = 't-output') {
    const body = document.getElementById('terminal-body');
    if (!body) return;

    const line = document.createElement('div');
    line.className = `t-line ${className}`;
    line.innerHTML = text;
    
    const inputRow = body.querySelector('.t-input-row');
    body.insertBefore(line, inputRow);
}

function executeTerminalCommand(fullCmd) {
    const parts = fullCmd.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts[1] ? parts[1].toLowerCase() : '';

    switch (cmd) {
        case 'help':
            appendTerminalLine('Available Commands:', 't-info');
            appendTerminalLine('  neofetch      - Display system info & ASCII logo', 't-output');
            appendTerminalLine('  about         - Display Harshit\'s background & degree', 't-output');
            appendTerminalLine('  skills        - List technical stack & languages', 't-output');
            appendTerminalLine('  projects      - List all 4 featured engineering builds', 't-output');
            appendTerminalLine('  contact       - Display email & social links', 't-output');
            appendTerminalLine('  cat <file>    - Inspect file code (e.g., cat used_bike_model.py, cat schema.sql)', 't-output');
            appendTerminalLine('  matrix        - Trigger falling hacker matrix code stream', 't-output');
            appendTerminalLine('  whoami        - Display active user session identity', 't-output');
            appendTerminalLine('  date          - Display current system time', 't-output');
            appendTerminalLine('  sudo          - Request root permissions', 't-output');
            appendTerminalLine('  clear         - Clear shell prompt', 't-output');
            break;

        case 'cat':
            if (!arg) {
                appendTerminalLine('Usage: cat <filename> (Try: cat used_bike_model.py, cat webhook_receiver.py, cat schema.sql)', 't-info');
            } else if (arg.includes('bike') || arg.includes('ml')) {
                appendTerminalLine(`
<span class="c-comment"># used_bike_model.py</span>
<span class="c-keyword">import</span> pandas <span class="c-keyword">as</span> pd
<span class="c-keyword">from</span> sklearn.ensemble <span class="c-keyword">import</span> RandomForestRegressor

df = pd.read_csv(<span class="c-str">"used_bikes.csv"</span>)
X = df[[<span class="c-str">"kms_driven"</span>, <span class="c-str">"age_years"</span>, <span class="c-str">"power_bhp"</span>, <span class="c-str">"brand_code"</span>]]
y = df[<span class="c-str">"price"</span>]

rf_model = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42)
rf_model.fit(X, y)
<span class="c-func">print</span>(<span class="c-str">"Model Accuracy: 98.4% R^2 Score"</span>)
                `, 't-output');
            } else if (arg.includes('webhook') || arg.includes('py')) {
                appendTerminalLine(`
<span class="c-comment"># webhook_receiver.py</span>
<span class="c-keyword">import</span> hashlib, hmac, os
<span class="c-keyword">def</span> <span class="c-func">verify_signature</span>(payload_body: bytes, signature_header: str) -> bool:
    secret = os.environ.get(<span class="c-str">"GITHUB_WEBHOOK_SECRET"</span>, <span class="c-str">""</span>).encode()
    expected = <span class="c-str">"sha256="</span> + hmac.new(secret, payload_body, hashlib.sha256).hexdigest()
    <span class="c-keyword">return</span> hmac.compare_digest(expected, signature_header)
                `, 't-output');
            } else if (arg.includes('sql') || arg.includes('schema')) {
                appendTerminalLine(`
<span class="c-comment">-- schema.sql</span>
<span class="c-keyword">CREATE TABLE</span> repos (id <span class="c-func">SERIAL PRIMARY KEY</span>, owner_repo <span class="c-func">TEXT UNIQUE</span>, stars <span class="c-func">INT</span>);
<span class="c-keyword">CREATE TABLE</span> issues (id <span class="c-func">SERIAL PRIMARY KEY</span>, repo_id <span class="c-func">INT REFERENCES</span> repos(id), status <span class="c-func">TEXT</span>);
                `, 't-output');
            } else {
                appendTerminalLine(`cat: ${arg}: No such file. Try: cat used_bike_model.py, cat schema.sql`, 't-error');
            }
            break;

        case 'matrix':
            appendTerminalLine('Initiating Hacker Matrix Code Rain...', 't-cmd');
            let count = 0;
            const matrixInterval = setInterval(() => {
                const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';
                let str = '';
                for (let i = 0; i < 45; i++) {
                    str += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                appendTerminalLine(str, 't-output');
                count++;
                if (count > 8) clearInterval(matrixInterval);
            }, 120);
            break;

        case 'whoami':
            appendTerminalLine('harshit_sharma (B.Tech AI & ML Student @ USAR GGSIPU)', 't-output');
            break;

        case 'date':
            appendTerminalLine(new Date().toString(), 't-output');
            break;

        case 'neofetch':
            appendTerminalLine(`
<span class="t-cmd">      .---.      </span>  <strong style="color:#00F0FF">harshit@usar-server</strong>
<span class="t-cmd">     /     \\     </span>  -------------------
<span class="t-cmd">    |  () () |   </span>  <strong>Degree</strong>: B.Tech AI & ML @ USAR (GGSIPU)
<span class="t-cmd">     \\  ==  /    </span>  <strong>Location</strong>: New Delhi, India 🇮🇳
<span class="t-cmd">      \`---'      </span>  <strong>GitHub Repos</strong>: harshitthek/resilient, used-bike-price, carbon-guardian-ai, Customizable-Browser-Startpage
                   <strong>Primary Stack</strong>: Python, FastAPI, Flask, React, PostgreSQL, Linux
            `, 't-system');
            break;

        case 'about':
            appendTerminalLine('Harshit Sharma — B.Tech AI & ML Student @ USAR (GGSIPU), New Delhi', 't-info');
            appendTerminalLine('Building ML valuation models, full-stack applications, and backend systems.', 't-output');
            break;

        case 'skills':
            appendTerminalLine('Languages: Python, JavaScript, TypeScript, C/C++, Bash', 't-output');
            appendTerminalLine('Stack: FastAPI, Flask, Node, React, PostgreSQL, Scikit-Learn, Docker, Linux', 't-output');
            break;

        case 'projects':
            appendTerminalLine('1. Resilient -> https://github.com/harshitthek/resilient', 't-output');
            appendTerminalLine('2. Used Bike Price Predictor -> https://github.com/harshitthek/used-bike-price', 't-output');
            appendTerminalLine('3. Carbon Guardian AI -> https://github.com/harshitthek/carbon-guardian-ai', 't-output');
            appendTerminalLine('4. Customizable Browser Startpage -> https://github.com/harshitthek/Customizable-Browser-Startpage', 't-output');
            break;

        case 'contact':
            appendTerminalLine('Email: codewithharshitsharma@gmail.com', 't-output');
            appendTerminalLine('GitHub: https://github.com/harshitthek', 't-output');
            appendTerminalLine('LinkedIn: https://www.linkedin.com/in/devharshitsharma', 't-output');
            break;

        case 'sudo':
            appendTerminalLine('harshit is not in the sudoers file. This incident will be reported.', 't-error');
            break;

        case 'clear':
            const body = document.getElementById('terminal-body');
            if (body) {
                const lines = body.querySelectorAll('.t-line');
                lines.forEach(l => l.remove());
            }
            break;

        default:
            appendTerminalLine(`zsh: command not found: ${cmd}. Type 'help' for commands.`, 't-error');
            break;
    }
}

/* ---------------------------------------------------------------------
   8. Contact Form Simulator & Utility Copy Fallback
   --------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        if (!status) return;

        status.classList.remove('hidden');
        status.className = 'form-status success';
        status.textContent = '⚡ Thank you! Your message has been received. Harshit will get back to you shortly.';
        
        form.reset();

        setTimeout(() => {
            status.classList.add('hidden');
        }, 5000);
    });
}

function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {
            fallbackCopyText(text);
        });
    } else {
        fallbackCopyText(text);
    }
}

function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.warn('Fallback copy failed', err);
    }
    document.body.removeChild(textarea);
}

/* ---------------------------------------------------------------------
   9. Watermelon UI Interactive AI Assistant Component
   --------------------------------------------------------------------- */
function initWatermelonUIComponent() {
    const input = document.getElementById('wm-ai-input');
    const sendBtn = document.getElementById('wm-ai-send');
    const chips = document.querySelectorAll('.wm-chip');
    const responseBox = document.getElementById('wm-ai-response');
    const responseText = document.getElementById('wm-response-text');
    const copyBtn = document.getElementById('wm-copy-response');
    const statusBadge = document.querySelector('.wm-badge span:last-child');

    if (!input || !sendBtn || !responseBox || !responseText) return;

    // Full pre-trained Knowledge Base indexing harshitthek's GitHub Profile
    const knowledgeBase = {
        resilient: "🤖 <strong>Resilient AI Leaderboard & Pipeline</strong><br>An autonomous multi-agent AI benchmark and stress-testing framework. Built with <strong>Python 3.12</strong>, <strong>FastAPI</strong>, and modular evaluation agents to test LLM code generation robustness in isolated git sandboxes.<br><br><code>🔗 Repository: github.com/harshitthek/resilient</code>",
        
        bike: "🚲 <strong>Used Bike Price Predictor</strong><br>Machine learning valuation engine trained on Indian motorcycle market datasets. Implements <strong>Scikit-Learn (RandomForest & XGBoost)</strong> regression with custom feature scaling and a <strong>Flask REST API</strong> (98.4% R² accuracy).<br><br><code>🔗 Repository: github.com/harshitthek/used-bike-price</code>",
        
        carbon: "🌱 <strong>Carbon Guardian AI</strong><br>Carbon footprint analytics engine calculating cloud compute GPU/CPU energy draw and outputting actionable CO₂ offset recommendations. Built with <strong>React</strong>, <strong>FastAPI</strong>, <strong>SQLite</strong>, and <strong>TensorFlow Recommenders</strong>.<br><br><code>🔗 Repository: github.com/harshitthek/carbon-guardian-ai</code>",
        
        startpage: "💻 <strong>Customizable Browser Startpage</strong><br>Ultra-fast minimalist browser new-tab replacement featuring live <strong>OpenWeather API sync</strong>, custom search provider toggles, and keyboard bookmarking. Zero external framework dependencies.<br><br><code>🔗 Repository: github.com/harshitthek/Customizable-Browser-Startpage</code>",

        openclaw: "🦞 <strong>openclaw</strong><br>Personal AI assistant framework designed to run across any OS and platform with modular agent skills. Built with <strong>TypeScript</strong>.<br><br><code>🔗 Repository: github.com/harshitthek/openclaw</code>",

        ecc: "⚡ <strong>ECC (Agent Harness Optimization System)</strong><br>Agent harness performance optimization system incorporating skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor, and agentic workflows.<br><br><code>🔗 Repository: github.com/harshitthek/ECC</code>",

        ticket: "🎫 <strong>Customer Support Ticket Dispatcher ML</strong><br>Machine learning NLP ticket classification system that automatically categorizes and routes customer support requests to designated support queues. Built with <strong>Python & Jupyter Notebooks</strong>.<br><br><code>🔗 Repository: github.com/harshitthek/Customer-Support-Ticket-Dispatcher-ML</code>",

        cake: "🎂 <strong>cake-blow (Interactive Birthday Cake)</strong><br>Interactive web application where users can add digital birthday candles and blow them out using their device microphone input! Built with <strong>HTML5, CSS3, and JavaScript</strong>.<br><br><code>🔗 Repository: github.com/harshitthek/cake-blow</code>",

        letter: "🔤 <strong>Letter Guessing Sim</strong><br>Python-based algorithmic simulation environment for testing letter and string guessing probability distributions.<br><br><code>🔗 Repository: github.com/harshitthek/LetterGuesingSim</code>",
        
        stack: "⚡ <strong>Primary Technical Stack</strong><br>• <strong>Languages</strong>: Python, JavaScript (ES6+), TypeScript, C/C++, SQL, Bash<br>• <strong>AI & ML</strong>: PyTorch, Scikit-Learn, TensorFlow, NumPy, Pandas<br>• <strong>Backend & APIs</strong>: FastAPI, Flask, Node.js, Express, PostgreSQL, SQLite<br>• <strong>Frontend & UI</strong>: HTML5, CSS3, Three.js WebGL, React<br>• <strong>DevOps & Tools</strong>: Git, Linux, Docker, Webpack, Vercel",
        
        education: "🎓 <strong>Education & Credentials</strong><br>• <strong>Degree</strong>: B.Tech in Artificial Intelligence & Machine Learning<br>• <strong>University</strong>: USAR (University School of Automation & Robotics), GGSIPU, New Delhi<br>• <strong>Focus Areas</strong>: Machine Learning Systems, Neural Networks, Full-Stack Web Architecture, Autonomous Agents",
        
        projects: "🚀 <strong>Featured Engineering Projects</strong><br>1. <strong>Resilient</strong>: Autonomous AI Agent Pipeline<br>2. <strong>Used Bike Price Predictor</strong>: ML Valuation Engine (98.4% R²)<br>3. <strong>Carbon Guardian AI</strong>: Cloud Compute Carbon Telemetry<br>4. <strong>Customizable Startpage</strong>: High-speed Web Browser Dashboard<br>5. <strong>openclaw</strong>: Cross-platform Personal AI Assistant<br>6. <strong>ECC</strong>: Agent Harness Optimization System<br><br><em>Explore all repositories on <a href='https://github.com/harshitthek' target='_blank' style='color:var(--cyan-primary)'>github.com/harshitthek</a>!</em>",
        
        contact: "📬 <strong>Contact & Social Profiles</strong><br>• <strong>Email</strong>: codewithharshitsharma@gmail.com<br>• <strong>GitHub</strong>: <a href='https://github.com/harshitthek' target='_blank' style='color:var(--cyan-primary)'>github.com/harshitthek</a><br>• <strong>LinkedIn</strong>: <a href='https://www.linkedin.com/in/devharshitsharma' target='_blank' style='color:var(--cyan-primary)'>linkedin.com/in/devharshitsharma</a><br>• <strong>Location</strong>: New Delhi, India 🇮🇳",
        
        bio: "👨‍💻 <strong>About Harshit Sharma</strong><br>AI & Machine Learning engineer pursuing B.Tech at USAR (GGSIPU), New Delhi. Specializing in Python ML models, high-concurrency FastAPI backends, WebGL 3D interfaces, and autonomous agent pipelines.",
        
        terminal: "🖥️ <strong>Interactive Lab Terminal</strong><br>Try out shell commands in the terminal window above! Supported commands: <code>neofetch</code>, <code>matrix</code>, <code>cat used_bike_model.py</code>, <code>cat webhook_receiver.py</code>, <code>cat schema.sql</code>, <code>whoami</code>, <code>date</code>, <code>skills</code>, <code>projects</code>, and <code>clear</code>."
    };

    // Live GitHub API repository indexer
    let dynamicRepos = [];
    async function syncGitHubProfile() {
        try {
            const res = await fetch('https://api.github.com/users/harshitthek/repos?sort=updated&per_page=30');
            if (res.ok) {
                dynamicRepos = await res.json();
                if (statusBadge) {
                    statusBadge.textContent = `GITHUB LIVE SYNCED (${dynamicRepos.length} REPOS)`;
                }
                
                // Dynamically ingest repositories into knowledgeBase
                dynamicRepos.forEach(repo => {
                    const key = repo.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                    if (!knowledgeBase[key]) {
                        knowledgeBase[key] = `📦 <strong>${repo.name}</strong><br>${repo.description || 'Public GitHub repository by Harshit Sharma.'}<br><br>• <strong>Language</strong>: ${repo.language || 'Code'}<br>• <strong>Stars</strong>: ⭐ ${repo.stargazers_count} | <strong>Forks</strong>: 🍴 ${repo.forks_count}<br><br><code>🔗 Repository: ${repo.html_url.replace('https://', '')}</code>`;
                    }
                });
            }
        } catch (err) {
            console.log('GitHub API live sync fallback to static profile knowledge base.');
        }
    }
    syncGitHubProfile();

    function matchQueryIntent(rawQuery) {
        const q = rawQuery.toLowerCase();
        
        if (/resilient|agent|pipeline|benchmark|sandbox|eval|leaderboard|llm/.test(q)) return 'resilient';
        if (/bike|price|motorcycle|valuation|regressor|sklearn|xgboost/.test(q)) return 'bike';
        if (/carbon|guardian|co2|sustainability|footprint|green|energy|telemetry/.test(q)) return 'carbon';
        if (/startpage|browser|newtab|weather|dashboard|shortcut/.test(q)) return 'startpage';
        if (/openclaw|claw|lobster/.test(q)) return 'openclaw';
        if (/ecc|harness|instinct|claude|codex/.test(q)) return 'ecc';
        if (/ticket|support|dispatcher/.test(q)) return 'ticket';
        if (/cake|blow|candle|birthday/.test(q)) return 'cake';
        if (/letter|guessing|sim/.test(q)) return 'letter';
        if (/stack|python|javascript|typescript|cpp|c\+\+|fastapi|flask|react|docker|skills|technology|technologies|tools/.test(q)) return 'stack';
        if (/education|college|usar|ggsipu|degree|university|btech|study|student|academics/.test(q)) return 'education';
        if (/project|projects|repo|repository|repositories|portfolio|work|built|apps/.test(q)) return 'projects';
        if (/contact|email|linkedin|github|social|reach|message|hire|connect/.test(q)) return 'contact';
        if (/who|about|harshit|bio|background|location|delhi|experience/.test(q)) return 'bio';
        if (/terminal|cmd|shell|matrix|command|neofetch|cat/.test(q)) return 'terminal';

        // Direct search match against dynamic GitHub repos
        const cleanedQuery = q.replace(/[^a-z0-9]/g, '');
        for (const key of Object.keys(knowledgeBase)) {
            if (cleanedQuery.includes(key) || key.includes(cleanedQuery)) {
                return key;
            }
        }

        return null;
    }

    function triggerAIResponse(queryKey, customQuery = '') {
        responseBox.classList.remove('hidden');

        let fullAnswer = knowledgeBase[queryKey];

        if (!fullAnswer) {
            const isML = /model|ai|ml|learning|data|train|python/i.test(customQuery);
            const isWeb = /web|site|css|html|js|frontend|ui/i.test(customQuery);

            fullAnswer = `⚡ <strong>AI Query Result for "${customQuery}"</strong><br>Harshit Sharma is an AI & Machine Learning engineer at USAR (GGSIPU), New Delhi.${
                isML ? ' He specializes in Scikit-Learn valuation models, PyTorch pipelines, and FastAPI REST backends.' : ''
            }${
                isWeb ? ' He builds responsive 3D WebGL interfaces, interactive dashboards, and modern UI components.' : ''
            }<br><br>Explore the <strong>Projects</strong>, <strong>Skills</strong>, and <strong>Interactive Terminal</strong> sections on this page for complete source code and technical breakdowns!`;
        }

        responseText.innerHTML = fullAnswer;
        responseText.style.opacity = '0';
        responseText.style.transform = 'translateY(6px)';
        responseText.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        
        requestAnimationFrame(() => {
            responseText.style.opacity = '1';
            responseText.style.transform = 'translateY(0px)';
        });
    }

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const key = chip.getAttribute('data-prompt');
            const chipText = chip.textContent.replace(/^[^\s]+\s*/, '');
            input.value = chipText;
            triggerAIResponse(key, chipText);
        });
    });

    sendBtn.addEventListener('click', () => {
        const query = input.value.trim();
        if (!query) return;

        const matchedKey = matchQueryIntent(query);
        triggerAIResponse(matchedKey, query);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = responseText.innerText;
            copyTextToClipboard(textToCopy);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
            }, 2000);
        });
    }
}

/* ---------------------------------------------------------------------
   10. Scroll Reveal Observer Engine
   --------------------------------------------------------------------- */
function initScrollReveal() {
    const targets = document.querySelectorAll('.wm-bento-card, .project-card, .skill-card, .arch-node, .wm-stat-item, .contact-container, .watermelon-ui-component');
    targets.forEach(el => el.classList.add('reveal-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach(el => observer.observe(el));
}

/* ---------------------------------------------------------------------
   11. Animated Telemetry Stat Counters
   --------------------------------------------------------------------- */
function initTelemetryCounters() {
    const statsContainer = document.querySelector('.wm-telemetry-strip');
    if (!statsContainer) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
            hasAnimated = true;
            document.querySelectorAll('.wm-stat-val').forEach(el => {
                const text = el.textContent.trim();
                const match = text.match(/^([\d.]+)(.*)$/);
                if (!match) return;

                const targetVal = parseFloat(match[1]);
                const suffix = match[2];
                const isFloat = match[1].includes('.');
                let startVal = 0;
                const duration = 1600;
                const startTime = performance.now();

                function updateCounter(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    const current = startVal + (targetVal - startVal) * easeProgress;

                    el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = text;
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }, { threshold: 0.3 });

    observer.observe(statsContainer);
}

/* ---------------------------------------------------------------------
   12. Magnetic Physics CTA Buttons
   --------------------------------------------------------------------- */
function initMagneticButtons() {
    const btns = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-nav, .wm-send-btn');
    btns.forEach(btn => {
        btn.classList.add('btn-magnetic');
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });
}

/* ---------------------------------------------------------------------
   13. Custom Morphing Fluid Cursor Engine
   --------------------------------------------------------------------- */
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const dot = document.getElementById('custom-cursor-dot');
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverables = document.querySelectorAll('a, button, .project-card, .wm-bento-card, .skill-card, .ci-tab, .arch-tab, .cmd-item');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}

/* ---------------------------------------------------------------------
   14. Interactive Project Expansion Modals Engine
   --------------------------------------------------------------------- */
const projectDetailsMap = {
    'used-bike-price': {
        category: 'MACHINE LEARNING // RESALE VALUATION',
        title: 'Used Bike Price Predictor',
        description: 'Trained multi-brand vehicle valuation engine. Features categorical brand code encoders, mileage depreciation polynomial transformations, and a Flask REST API microservice.',
        stat1: 'Python 3.11', stat1Lbl: 'LANGUAGE',
        stat2: '98.4% R²', stat2Lbl: 'ACCURACY',
        stat3: 'MIT', stat3Lbl: 'LICENSE',
        highlights: [
            'RandomForest & XGBoost regression ensemble model built with Scikit-Learn.',
            'Flask REST API endpoint serving instant real-time vehicle valuation estimates.',
            'Dataset preprocessing pipeline with automated outlier rejection and scaling.'
        ],
        stack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Flask', 'REST API'],
        url: 'https://github.com/harshitthek/used-bike-price'
    },
    'carbon-guardian-ai': {
        category: 'AI SUSTAINABILITY // TELEMETRY',
        title: 'Carbon Guardian AI',
        description: 'Carbon footprint analytics dashboard calculating cloud compute resource energy draw and converting raw GPU/CPU training metrics into kg CO₂ offset recommendations.',
        stat1: 'JavaScript', stat1Lbl: 'LANGUAGE',
        stat2: '< 50ms', stat2Lbl: 'LATENCY',
        stat3: 'MIT', stat3Lbl: 'LICENSE',
        highlights: [
            'Real-time workload server telemetry processing engine.',
            'Interactive React dashboard UI with visual carbon emission charts.',
            'Algorithmic recommendations to schedule ML training in low-carbon grid windows.'
        ],
        stack: ['React', 'Node.js', 'Express', 'CSS3', 'Chart.js', 'REST API'],
        url: 'https://github.com/harshitthek/carbon-guardian-ai'
    },
    'customizable-browser-startpage': {
        category: 'WEB UTILITY // DASHBOARD',
        title: 'Customizable Browser Startpage',
        description: 'High-speed minimalist browser new-tab replacement featuring live weather API sync, keyboard bookmark shortcuts, search provider toggles, and zero external framework dependencies.',
        stat1: 'Vanilla JS', stat1Lbl: 'STACK',
        stat2: '100 / 100', stat2Lbl: 'LIGHTHOUSE',
        stat3: 'MIT', stat3Lbl: 'LICENSE',
        highlights: [
            'Zero dependencies built in pure Vanilla JS and CSS custom properties.',
            'OpenWeatherMap API integration displaying local forecast telemetry.',
            'Keyboard bookmark shortcuts and instant quick-search provider switching.'
        ],
        stack: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'OpenWeather API', 'LocalStorage'],
        url: 'https://github.com/harshitthek/Customizable-Browser-Startpage'
    },
    'resilient': {
        category: 'AUTONOMOUS AI AGENT PIPELINE',
        title: 'Resilient AI Leaderboard Framework',
        description: 'Autonomous multi-model AI coding agent benchmark & evaluation pipeline. Dispatches LLMs inside isolated git sandboxes to solve open-source issue tickets and validates PR fixes against test suites.',
        stat1: 'Python 3.12', stat1Lbl: 'LANGUAGE',
        stat2: 'FastAPI', stat2Lbl: 'BACKEND',
        stat3: 'MIT', stat3Lbl: 'LICENSE',
        highlights: [
            'Isolated temporary git sandbox workspace cloning and test suite runner.',
            'Constant-time HMAC RS256 webhook signature verifier for GitHub App events.',
            'PostgreSQL database tracking multi-agent leaderboard benchmark metrics.'
        ],
        stack: ['Python 3.12', 'FastAPI', 'PostgreSQL', 'Docker', 'Pytest', 'GitHub Webhooks'],
        url: 'https://github.com/harshitthek/resilient'
    }
};

function initProjectModals() {
    const backdrop = document.getElementById('project-modal-backdrop');
    const closeBtn = document.getElementById('pm-close-btn');
    if (!backdrop || !closeBtn) return;

    closeBtn.addEventListener('click', () => backdrop.classList.add('hidden'));
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.add('hidden');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') backdrop.classList.add('hidden');
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return; // Don't intercept direct repo link click
            
            const matchedKey = card.dataset.projectId || 'resilient';

            const details = projectDetailsMap[matchedKey];
            if (!details) return;

            document.getElementById('pm-category').textContent = details.category;
            document.getElementById('pm-title').textContent = details.title;
            document.getElementById('pm-description').textContent = details.description;
            
            document.getElementById('pm-stat1').textContent = details.stat1;
            document.querySelectorAll('.pm-stat-lbl')[0].textContent = details.stat1Lbl;
            document.getElementById('pm-stat2').textContent = details.stat2;
            document.querySelectorAll('.pm-stat-lbl')[1].textContent = details.stat2Lbl;
            document.getElementById('pm-stat3').textContent = details.stat3;
            document.querySelectorAll('.pm-stat-lbl')[2].textContent = details.stat3Lbl;

            const highlightsList = document.getElementById('pm-highlights');
            highlightsList.innerHTML = details.highlights.map(h => `<li>${h}</li>`).join('');

            const stackContainer = document.getElementById('pm-stack');
            stackContainer.innerHTML = details.stack.map(s => `<span>${s}</span>`).join('');

            const githubBtn = document.getElementById('pm-github-link');
            githubBtn.setAttribute('href', details.url);

            backdrop.classList.remove('hidden');
        });
    });
}


