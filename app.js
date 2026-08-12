/* =====================================================================
   Harshit Sharma — Multi-Page SPA Application Router Engine
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    tryInit(initThemeSwitcher, '3D Theme Switcher');
    tryInit(initSPARouter, 'SPA Router');
    tryInit(initThreeJSBackground, 'Three.js 3D Engine');
    tryInit(initCard3DTilt, '3D Card Tilt');
    tryInit(initTypingEffect, 'Cyberpunk Typing');
    tryInit(initCommandPalette, 'Command Palette');
    tryInit(initCodeInspector, 'Code Inspector');
    tryInit(initArchitectureInspector, 'Architecture Inspector');
    tryInit(initSkillsMatrix, 'Skills Matrix');
    tryInit(initTerminal, 'Lab Terminal');
    tryInit(initContactForm, 'Contact Form');
    tryInit(initWatermelonUIComponent, 'Watermelon UI AI Assistant');
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
    matrix: { name: 'Hacker Matrix Rain', icon: '💻' }
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
            // Mode 1: Quantum Vortex Gravity Attractor & Pulsing Morphing Sphere
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
                        // Return slowly to origin
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
            // Mode 2: Dynamic Deforming Terrain Wave Plane + Glowing Retrowave Sun
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
            const initZ = new Float32Array(posAttr.count);
            for (let i = 0; i < posAttr.count; i++) {
                initZ[i] = posAttr.getZ(i);
            }

            updateAnimationStep = (time) => {
                grid.position.z += 1.8;
                if (grid.position.z > 0) grid.position.z = -200;

                // Deform grid vertices dynamically like dynamic waves
                for (let i = 0; i < posAttr.count; i++) {
                    const x = posAttr.getX(i);
                    const y = posAttr.getY(i);
                    const z = Math.sin(x * 0.015 + time * 2) * 25 + Math.cos(y * 0.015 + time * 1.5) * 20;
                    posAttr.setZ(i, z);
                }
                posAttr.needsUpdate = true;

                sun.rotation.y = time * 0.05;
                poly.rotation.x = time * 0.5;
                poly.rotation.y = time * 0.7;
                knot.rotation.x = time * 0.6;
                knot.rotation.z = time * 0.4;
            };

        } else if (mode === 'constellation') {
            // Mode 3: Quantum Proximity Neural Web & Particle Repulsion
            mouseLight.color.setHex(0x10B981);

            const count = 120;
            const pPositions = new Float32Array(count * 3);
            const velocities = new Float32Array(count * 3);

            for (let i = 0; i < count; i++) {
                pPositions[i * 3] = (Math.random() - 0.5) * 950;
                pPositions[i * 3 + 1] = (Math.random() - 0.5) * 950;
                pPositions[i * 3 + 2] = (Math.random() - 0.5) * 650;

                velocities[i * 3] = (Math.random() - 0.5) * 1.2;
                velocities[i * 3 + 1] = (Math.random() - 0.5) * 1.2;
                velocities[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
            }

            const pGeo = new THREE.BufferGeometry();
            pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
            const pMat = new THREE.PointsMaterial({ color: 0x10B981, size: 6, transparent: true, opacity: 0.95 });
            const pDots = new THREE.Points(pGeo, pMat);
            activeMeshGroup.add(pDots);

            const lineGeo = new THREE.BufferGeometry();
            const lineMat = new THREE.LineBasicMaterial({ color: 0x3B82F6, transparent: true, opacity: 0.35 });
            const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
            activeMeshGroup.add(lineMesh);

            const cubeGeo = new THREE.BoxGeometry(120, 120, 120);
            const cubeMat = new THREE.MeshBasicMaterial({ color: 0x10B981, wireframe: true, transparent: true, opacity: 0.3 });
            const cube = new THREE.Mesh(cubeGeo, cubeMat);
            cube.position.set(280, 80, -100);
            activeMeshGroup.add(cube);

            updateAnimationStep = (time) => {
                const posArr = pGeo.attributes.position.array;

                for (let i = 0; i < count; i++) {
                    posArr[i * 3] += velocities[i * 3];
                    posArr[i * 3 + 1] += velocities[i * 3 + 1];
                    posArr[i * 3 + 2] += velocities[i * 3 + 2];

                    if (Math.abs(posArr[i * 3]) > 480) velocities[i * 3] *= -1;
                    if (Math.abs(posArr[i * 3 + 1]) > 480) velocities[i * 3 + 1] *= -1;
                    if (Math.abs(posArr[i * 3 + 2]) > 320) velocities[i * 3 + 2] *= -1;

                    // Repel nodes near mouse
                    const dx = posArr[i * 3] - currMouseX;
                    const dy = posArr[i * 3 + 1] - currMouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) {
                        posArr[i * 3] += (dx / dist) * 4;
                        posArr[i * 3 + 1] += (dy / dist) * 4;
                    }
                }
                pGeo.attributes.position.needsUpdate = true;

                // Build line connections including mouse laser connections!
                const linePositions = [];
                for (let i = 0; i < count; i++) {
                    // Connect to mouse
                    const mdx = posArr[i * 3] - currMouseX;
                    const mdy = posArr[i * 3 + 1] - currMouseY;
                    const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (mdist < 240) {
                        linePositions.push(posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2]);
                        linePositions.push(currMouseX, currMouseY, 0);
                    }

                    for (let j = i + 1; j < count; j++) {
                        const dx = posArr[i * 3] - posArr[j * 3];
                        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
                        const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
                        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                        if (dist < 160) {
                            linePositions.push(posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2]);
                            linePositions.push(posArr[j * 3], posArr[j * 3 + 1], posArr[j * 3 + 2]);
                        }
                    }
                }
                lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
                lineGeo.attributes.position.needsUpdate = true;

                cube.rotation.x = time * 0.4;
                cube.rotation.y = time * 0.5;
            };

        } else if (mode === 'hyperspace') {
            // Mode 4: Hyperdrive Warp Tunnel with Dynamic Mouse Acceleration Steering
            mouseLight.color.setHex(0xEC4899);

            const count = 1800;
            const geo = new THREE.BufferGeometry();
            const pos = new Float32Array(count * 3);
            for (let i = 0; i < count * 3; i += 3) {
                pos[i] = (Math.random() - 0.5) * 1100;
                pos[i + 1] = (Math.random() - 0.5) * 1100;
                pos[i + 2] = Math.random() * 1200 - 600;
            }
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            const pMat = new THREE.PointsMaterial({ color: 0xEC4899, size: 4.5, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending });
            const starTunnel = new THREE.Points(geo, pMat);
            activeMeshGroup.add(starTunnel);

            const prismGeo = new THREE.OctahedronGeometry(110, 0);
            const prismMat = new THREE.MeshBasicMaterial({ color: 0xF59E0B, wireframe: true, transparent: true, opacity: 0.35 });
            const prism = new THREE.Mesh(prismGeo, prismMat);
            prism.position.set(-300, 60, -100);
            activeMeshGroup.add(prism);

            updateAnimationStep = (time) => {
                const speed = 7.5 + (Math.abs(currMouseX) + Math.abs(currMouseY)) * 0.03;
                const posArr = geo.attributes.position.array;
                for (let i = 2; i < count * 3; i += 3) {
                    posArr[i] += speed;
                    if (posArr[i] > 600) posArr[i] = -600;
                }
                geo.attributes.position.needsUpdate = true;

                starTunnel.rotation.z = currMouseX * 0.001;
                prism.rotation.y = time * 0.8;
                prism.rotation.z = time * 0.5;
            };

        } else if (mode === 'matrix') {
            // Mode 5: 3D Matrix Waterfall & Kinetic Mouse Forcefield Repulsion
            mouseLight.color.setHex(0x00FF66);

            const count = 1400;
            const geo = new THREE.BufferGeometry();
            const pos = new Float32Array(count * 3);
            for (let i = 0; i < count * 3; i += 3) {
                pos[i] = (Math.random() - 0.5) * 1300;
                pos[i + 1] = Math.random() * 1200 - 600;
                pos[i + 2] = (Math.random() - 0.5) * 900;
            }
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            const pMat = new THREE.PointsMaterial({ color: 0x00FF66, size: 4.0, transparent: true, opacity: 0.9 });
            const rain = new THREE.Points(geo, pMat);
            activeMeshGroup.add(rain);

            // Matrix Torus Knot Core
            const torusGeo = new THREE.TorusKnotGeometry(95, 26, 100, 16);
            const torusMat = new THREE.MeshBasicMaterial({ color: 0x00FF66, wireframe: true, transparent: true, opacity: 0.3 });
            const torus = new THREE.Mesh(torusGeo, torusMat);
            torus.position.set(300, 40, -120);
            activeMeshGroup.add(torus);

            const dodecGeo = new THREE.DodecahedronGeometry(85);
            const dodecMat = new THREE.MeshBasicMaterial({ color: 0x10B981, wireframe: true, transparent: true, opacity: 0.25 });
            const dodec = new THREE.Mesh(dodecGeo, dodecMat);
            dodec.position.set(-320, -30, -150);
            activeMeshGroup.add(dodec);

            updateAnimationStep = (time) => {
                const posArr = geo.attributes.position.array;
                for (let i = 0; i < count * 3; i += 3) {
                    posArr[i + 1] -= 4.2;
                    if (posArr[i + 1] < -600) posArr[i + 1] = 600;

                    // Kinetic Forcefield Repulsion on Mouse
                    const dx = posArr[i] - currMouseX;
                    const dy = posArr[i + 1] - currMouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 160) {
                        posArr[i] += (dx / dist) * 8;
                    }
                }
                geo.attributes.position.needsUpdate = true;

                torus.rotation.x = time * 0.5;
                torus.rotation.y = time * 0.6;
                dodec.rotation.y = time * 0.4;
            };
        }
    }

    switchThreeJSScene = (newMode) => {
        buildScene(newMode);
    };

    buildScene(currentThemeMode);

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Smooth Mouse Inertia Interpolation
        currMouseX += (targetMouseX - currMouseX) * 0.08;
        currMouseY += (targetMouseY - currMouseY) * 0.08;

        // Position 3D Point Light to track mouse in 3D space
        mouseLight.position.set(currMouseX, currMouseY, 150);

        if (updateAnimationStep) updateAnimationStep(elapsedTime);

        // High-impact Camera Steering
        camera.position.x = currMouseX * 0.25;
        camera.position.y = currMouseY * 0.25;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();
}

function initCard3DTilt() {
    const cards = document.querySelectorAll('.glass-card, .project-card, .profile-card, .skill-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (-y / rect.height) * 12;
            const rotateY = (x / rect.width) * 12;

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

    body.addEventListener('click', () => {
        input.focus();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
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

function executeTerminalCommand(cmd) {
    switch (cmd) {
        case 'help':
            appendTerminalLine('Available Commands:', 't-info');
            appendTerminalLine('  neofetch    - Display system info & ASCII logo', 't-output');
            appendTerminalLine('  about       - Display Harshit\'s background & degree', 't-output');
            appendTerminalLine('  skills      - List technical stack & languages', 't-output');
            appendTerminalLine('  projects    - List all 4 featured engineering builds', 't-output');
            appendTerminalLine('  contact     - Display email & social links', 't-output');
            appendTerminalLine('  sudo        - Request root permissions', 't-output');
            appendTerminalLine('  clear       - Clear shell prompt', 't-output');
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

    if (!input || !sendBtn || !responseBox || !responseText) return;

    const knowledgeBase = {
        resilient: "🤖 <strong>Resilient AI Pipeline</strong><br>An autonomous multi-agent AI benchmark and stress-testing framework. Built with Python 3.11, FastAPI backends, and modular evaluation agents to test LLM robustness, hallucination resistance, and fault tolerance.<br><br><code>Repository: github.com/harshitthek/resilient</code>",
        bike: "🚲 <strong>Used Bike Price Predictor</strong><br>Machine learning valuation model trained on Indian used motorcycle market datasets. Built with Scikit-Learn (RandomForest & XGBoost), Flask REST APIs, and automated hyperparameter tuning to achieve a 98.4% R² valuation accuracy.<br><br><code>Repository: github.com/harshitthek/used-bike-price</code>",
        stack: "⚡ <strong>Primary Tech Stack</strong><br>• <strong>Languages</strong>: Python, JavaScript (ES6+), TypeScript, C++, SQL<br>• <strong>AI & Backend</strong>: FastAPI, Flask, PyTorch, Scikit-Learn, NumPy, PostgreSQL<br>• <strong>Frontend & 3D</strong>: HTML5, Vanilla CSS3, Three.js WebGL, React<br>• <strong>Tools & DevOps</strong>: Git, Linux, Docker, Bash Shell",
        contact: "📬 <strong>Contact & Social Connections</strong><br>• <strong>Email</strong>: codewithharshitsharma@gmail.com<br>• <strong>GitHub</strong>: github.com/harshitthek<br>• <strong>LinkedIn</strong>: linkedin.com/in/devharshitsharma<br>• <strong>University</strong>: USAR (GGSIPU), New Delhi"
    };

    function triggerAIResponse(queryKey, customQuery = '') {
        responseBox.classList.remove('hidden');
        
        let answer = knowledgeBase[queryKey];
        if (!answer) {
            answer = `⚡ <strong>AI Query Result for "${customQuery}"</strong><br>Harshit Sharma is an AI & ML student at USAR (GGSIPU), New Delhi specializing in Python machine learning pipelines, FastAPI REST APIs, and multi-agent AI systems. Explore the <strong>Projects</strong> and <strong>Skills</strong> sections above to view full source code!`;
        }

        responseText.innerHTML = answer;
    }

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const key = chip.getAttribute('data-prompt');
            triggerAIResponse(key);
        });
    });

    sendBtn.addEventListener('click', () => {
        const query = input.value.trim().toLowerCase();
        if (!query) return;

        let matchedKey = null;
        if (query.includes('resilient') || query.includes('agent') || query.includes('pipeline')) matchedKey = 'resilient';
        else if (query.includes('bike') || query.includes('price') || query.includes('model')) matchedKey = 'bike';
        else if (query.includes('stack') || query.includes('python') || query.includes('skills')) matchedKey = 'stack';
        else if (query.includes('contact') || query.includes('email') || query.includes('github')) matchedKey = 'contact';

        triggerAIResponse(matchedKey, input.value.trim());
        input.value = '';
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
