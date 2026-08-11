/* =====================================================================
   Harshit Sharma — Executive Portfolio Application Logic
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initSubtleThreeJSGrid();
    initShellConsole();
});

/* ---------------------------------------------------------------------
   1. Subtle Geometric Parallax Background (Three.js)
   --------------------------------------------------------------------- */
function initSubtleThreeJSGrid() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 300);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create subtle grid plane
    const size = 600;
    const divisions = 30;
    const gridHelper = new THREE.GridHelper(size, divisions, 0x00F0FF, 0x1E293B);
    gridHelper.rotation.x = Math.PI / 2.5;
    gridHelper.position.y = -80;
    scene.add(gridHelper);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.02;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.02;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
        requestAnimationFrame(animate);

        gridHelper.rotation.z += 0.0003;

        camera.position.x += (mouseX - camera.position.x) * 0.03;
        camera.position.y += (-mouseY - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();
}

/* ---------------------------------------------------------------------
   2. System Card Tab Switcher
   --------------------------------------------------------------------- */
function switchSysTab(projectId, tabName) {
    const card = document.querySelector('.system-card');
    if (!card) return;

    const tabs = card.querySelectorAll('.sys-tab');
    tabs.forEach(t => t.classList.remove('active'));

    const activeTab = Array.from(tabs).find(t => t.getAttribute('onclick').includes(tabName));
    if (activeTab) activeTab.classList.add('active');

    const contents = card.querySelectorAll('.sys-tab-content');
    contents.forEach(c => c.classList.add('hidden'));

    const targetContent = document.getElementById(`${projectId}-${tabName}`);
    if (targetContent) targetContent.classList.remove('hidden');
}

/* ---------------------------------------------------------------------
   3. Minimalist Lab Shell Engine
   --------------------------------------------------------------------- */
function initShellConsole() {
    const input = document.getElementById('shell-input');
    const output = document.getElementById('shell-output');
    if (!input || !output) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            if (cmd) {
                appendShellLine(`harshit@lab:~$ ${cmd}`, 'cmd');
                parseShellCmd(cmd);
                input.value = '';
                output.scrollTop = output.scrollHeight;
            }
        }
    });
}

function appendShellLine(text, className = '') {
    const output = document.getElementById('shell-output');
    if (!output) return;

    const line = document.createElement('div');
    line.className = `s-line ${className}`;
    line.textContent = text;

    const inputLine = output.querySelector('.s-input-line');
    output.insertBefore(line, inputLine);
}

function parseShellCmd(cmd) {
    switch (cmd) {
        case 'help':
            appendShellLine('Available Commands:', 'info');
            appendShellLine('  summary    - Academic background & engineering focus');
            appendShellLine('  stack      - Primary tech stack and frameworks');
            appendShellLine('  resilient  - Query live status of Resilient benchmark');
            appendShellLine('  contact    - Display direct communication channels');
            appendShellLine('  clear      - Reset console screen');
            break;

        case 'summary':
            appendShellLine('Harshit Sharma — AI & ML Student @ USAR (GGSIPU), Delhi', 'info');
            appendShellLine('Specializing in autonomous AI orchestration, backend APIs (FastAPI/Postgres), and system security.');
            break;

        case 'stack':
            appendShellLine('Languages: Python, JavaScript, TypeScript, C/C++, Bash');
            appendShellLine('Frameworks: FastAPI, Flask, Node.js, Express, React, Next.js');
            appendShellLine('Infra: PostgreSQL, MongoDB, Docker, GitHub Actions, Linux');
            break;

        case 'resilient':
            appendShellLine('[RESILIENT BENCHMARK STATUS]', 'info');
            appendShellLine('  - Repos Tracked: 47 open-source projects');
            appendShellLine('  - Dispatched Agents: Gemini 2.5, Qwen 2.5 Coder, Groq Llama 3.3');
            appendShellLine('  - Test Status: 47/47 unit tests passing (100% pass rate)');
            break;

        case 'contact':
            appendShellLine('Email: codewithharshitsharma@gmail.com', 'info');
            appendShellLine('GitHub: https://github.com/harshitthek');
            appendShellLine('LinkedIn: https://www.linkedin.com/in/devharshitsharma');
            break;

        case 'clear':
            const output = document.getElementById('shell-output');
            const lines = output.querySelectorAll('.s-line');
            lines.forEach(l => l.remove());
            break;

        default:
            appendShellLine(`zsh: command not found: ${cmd}. Type 'help' for available commands.`, 'err');
            break;
    }
}
