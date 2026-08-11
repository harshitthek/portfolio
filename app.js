/* =====================================================================
   Harshit Sharma — Multi-Page SPA Application Router Engine
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    tryInit(initSPARouter, 'SPA Router');
    tryInit(initThreeJSBackground, 'Three.js Starfield');
    tryInit(initTypingEffect, 'Cyberpunk Typing');
    tryInit(initCommandPalette, 'Command Palette');
    tryInit(initCodeInspector, 'Code Inspector');
    tryInit(initArchitectureInspector, 'Architecture Inspector');
    tryInit(initSkillsMatrix, 'Skills Matrix');
    tryInit(initTerminal, 'Lab Terminal');
    tryInit(initContactForm, 'Contact Form');
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
function initThreeJSBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color('#38BDF8');
    const greenColor = new THREE.Color('#10B981');

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 1300;
        positions[i + 1] = (Math.random() - 0.5) * 1300;
        positions[i + 2] = (Math.random() - 0.5) * 1300;

        const mixedColor = Math.random() > 0.5 ? cyanColor : greenColor;
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
        opacity: 0.5,
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
        particleSystem.rotation.y += 0.0005;

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
