/* =====================================================================
   Harshit Sharma — Portfolio Application Logic & 3D Interactive Canvas
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initThreeJSBackground();
    initTypingEffect();
    renderSkillsGrid('all');
    initTerminal();
});

/* ---------------------------------------------------------------------
   1. Three.js Interactive 3D Cosmic Particle Background
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

    // Particle Geometry
    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color('#06B6D4');
    const indigoColor = new THREE.Color('#6366F1');

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 1200;
        positions[i + 1] = (Math.random() - 0.5) * 1200;
        positions[i + 2] = (Math.random() - 0.5) * 1200;

        const mixedColor = Math.random() > 0.5 ? cyanColor : indigoColor;
        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 3.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Mouse Interaction Tracking
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        particleSystem.rotation.x += 0.0005;
        particleSystem.rotation.y += 0.0008;

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();
}

/* ---------------------------------------------------------------------
   2. Cyberpunk Typing Effect
   --------------------------------------------------------------------- */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const titles = [
        "AI & ML Engineering Student @ USAR",
        "Autonomous Agent Systems Builder",
        "Full-Stack & Backend API Developer",
        "Cybersecurity & Linux Explorer",
        "Learning by Building, Breaking & Shipping"
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

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentTitle.length) {
            speed = 2200; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

/* ---------------------------------------------------------------------
   3. Tech Stack & Skills Data & Matrix Filter
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

function filterSkills(category) {
    const tabs = document.querySelectorAll('.skill-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    const activeTab = Array.from(tabs).find(t => t.getAttribute('onclick').includes(category));
    if (activeTab) activeTab.classList.add('active');

    renderSkillsGrid(category);
}

/* ---------------------------------------------------------------------
   4. Interactive Web Lab Terminal Engine
   --------------------------------------------------------------------- */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');
    if (!input || !body) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            if (command) {
                appendTerminalLine(`harshit@lab:~$ ${command}`, 't-cmd');
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
    
    // Insert before input row
    const inputRow = body.querySelector('.t-input-row');
    body.insertBefore(line, inputRow);
}

function executeTerminalCommand(cmd) {
    switch (cmd) {
        case 'help':
            appendTerminalLine('Available Commands:', 't-info');
            appendTerminalLine('  about       - Brief introduction and education background', 't-output');
            appendTerminalLine('  skills      - List core technical stack & tools', 't-output');
            appendTerminalLine('  projects    - List featured engineering builds', 't-output');
            appendTerminalLine('  resilient   - Run live demo of Resilient AI Benchmark', 't-output');
            appendTerminalLine('  contact     - Display email, LinkedIn, and social links', 't-output');
            appendTerminalLine('  clear       - Clear terminal screen', 't-output');
            break;

        case 'about':
            appendTerminalLine('Harshit Sharma — AI & ML Student @ USAR (GGSIPU), Delhi', 't-info');
            appendTerminalLine('Focus: Autonomous AI systems, full-stack web, backend APIs, and system security.', 't-output');
            break;

        case 'skills':
            appendTerminalLine('Core Stack: Python, JavaScript, TypeScript, FastAPI, Flask, Node, React, PostgreSQL, Docker, Linux', 't-output');
            break;

        case 'projects':
            appendTerminalLine('1. Resilient (Autonomous AI Agent Benchmark)', 't-cmd');
            appendTerminalLine('2. Used Bike Price Predictor (ML Valuation Engine)', 't-output');
            appendTerminalLine('3. Carbon Guardian AI (Sustainability Tracker)', 't-output');
            appendTerminalLine('4. Customizable Browser Startpage (Web Utility)', 't-output');
            break;

        case 'resilient':
            appendTerminalLine('[INITIATING RESILIENT BENCHMARK SIMULATION...]', 't-info');
            appendTerminalLine('  - Scanning 47 open-source repositories... [OK]', 't-output');
            appendTerminalLine('  - Evaluating 238 candidate issues... [OK]', 't-output');
            appendTerminalLine('  - Dispatched Agents: Gemini 2.5 Flash, Qwen 2.5 Coder, Groq Llama 3.3', 't-output');
            appendTerminalLine('  - Test Status: 47/47 tests passing (100% composite score)', 't-output');
            appendTerminalLine('⚡ Resilient AI Agent Benchmark is LIVE & READY!', 't-info');
            break;

        case 'contact':
            appendTerminalLine('Email: codewithharshitsharma@gmail.com', 't-output');
            appendTerminalLine('GitHub: https://github.com/harshitthek', 't-output');
            appendTerminalLine('LinkedIn: https://www.linkedin.com/in/devharshitsharma', 't-output');
            appendTerminalLine('Discord: harshit0', 't-output');
            break;

        case 'clear':
            const body = document.getElementById('terminal-body');
            const lines = body.querySelectorAll('.t-line');
            lines.forEach(l => l.remove());
            break;

        default:
            appendTerminalLine(`command not found: ${cmd}. Type 'help' for available commands.`, 't-error');
            break;
    }
}

function runTerminalCmd(cmd) {
    const input = document.getElementById('terminal-input');
    if (input) {
        input.value = cmd;
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        input.dispatchEvent(event);
    }
}

/* ---------------------------------------------------------------------
   5. Contact Form Simulator
   --------------------------------------------------------------------- */
function handleContactSubmit(e) {
    e.preventDefault();
    const status = document.getElementById('form-status');
    if (!status) return;

    status.classList.remove('hidden', 'success');
    status.className = 'form-status success';
    status.textContent = '⚡ Thank you! Your message has been received. Harshit will get back to you shortly.';
    
    document.getElementById('contact-form').reset();

    setTimeout(() => {
        status.classList.add('hidden');
    }, 5000);
}
