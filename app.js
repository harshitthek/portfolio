/* =====================================================================
   Harshit Sharma — Personal Portfolio Application Logic
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

    const particleCount = 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color('#00F0FF');
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
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.04;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.04;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
        requestAnimationFrame(animate);

        particleSystem.rotation.x += 0.0004;
        particleSystem.rotation.y += 0.0006;

        camera.position.x += (mouseX - camera.position.x) * 0.04;
        camera.position.y += (-mouseY - camera.position.y) * 0.04;
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
        "AI & ML Student @ USAR (GGSIPU)",
        "Machine Learning Model Developer",
        "Full-Stack Web & Backend Engineer",
        "Cybersecurity & Systems Explorer"
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

        let speed = isDeleting ? 35 : 75;

        if (!isDeleting && charIndex === currentTitle.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 350;
        }

        setTimeout(type, speed);
    }

    type();
}

/* ---------------------------------------------------------------------
   3. Skills Matrix & Categorized Filter
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
   4. Web Terminal Shell Engine
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
    
    const inputRow = body.querySelector('.t-input-row');
    body.insertBefore(line, inputRow);
}

function executeTerminalCommand(cmd) {
    switch (cmd) {
        case 'help':
            appendTerminalLine('Available Commands:', 't-info');
            appendTerminalLine('  about       - Display Harshit\'s background & education', 't-output');
            appendTerminalLine('  skills      - List technical stack & tools', 't-output');
            appendTerminalLine('  projects    - List all 4 featured projects', 't-output');
            appendTerminalLine('  contact     - Display social links & email', 't-output');
            appendTerminalLine('  clear       - Clear terminal screen', 't-output');
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
            appendTerminalLine('1. Used Bike Price Predictor (ML Valuation Model & Flask API)', 't-output');
            appendTerminalLine('2. Carbon Guardian AI (Sustainability & Energy Tracker)', 't-output');
            appendTerminalLine('3. Customizable Browser Startpage (Minimalist Web Utility)', 't-output');
            appendTerminalLine('4. Resilient (Autonomous AI Agent Benchmark & Pipeline)', 't-output');
            break;

        case 'contact':
            appendTerminalLine('Email: codewithharshitsharma@gmail.com', 't-output');
            appendTerminalLine('GitHub: https://github.com/harshitthek', 't-output');
            appendTerminalLine('LinkedIn: https://www.linkedin.com/in/devharshitsharma', 't-output');
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
