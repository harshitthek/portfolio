# Harshit Sharma — 3D Interactive WebGL Developer Portfolio

An ultra-modern, high-performance 3D developer portfolio website built with HTML5, Vanilla CSS3, Three.js WebGL physics engines, an interactive zsh Web Terminal, and a 5-in-1 Design Switcher aligned with **`design-taste-frontend`** anti-slop guidelines.

🌐 **Live Demo**: [https://harshitthek.github.io/portfolio/](https://harshitthek.github.io/portfolio/)

---

## 🌌 5 Live 3D WebGL Physics Design Modes

You can switch between **5 distinct high-impact 3D animation themes** live using the header selector (`🎨 Select 3D Design Theme`):

1. **🌌 Cyberpunk HUD (`cyberpunk`)**
   - **3D WebGL Engine**: 1,200 Particle spiral galaxy vortex with **3D Cursor Gravitational Attraction** + Double Gyroscope Rings spinning around a morphing wireframe Icosahedron core + Specular Point Light tracking cursor.
   - **Aesthetic**: Glassmorphism cards, glowing cyan (`#38BDF8`) & neon purple HUD borders.

2. **🏎️ Synthwave Tron Grid (`synthwave`)**
   - **3D WebGL Engine**: 2,200px Deforming Terrain Wave Grid (`z = sin(x * 0.015 + time * 2) * 25 + cos(...)`) + Glowing Retrowave Horizon Wireframe Sun + Floating Polyhedra.
   - **Aesthetic**: 80s Retro-futuristic Synthwave, Electric Pink (`#FF007F`) & Cyber Cyan (`#00F0FF`).

3. **⚛️ Quantum Constellation (`constellation`)**
   - **3D WebGL Engine**: 120 Floating quantum nodes with **Interactive Cursor Laser Beams** connecting your mouse position to nearest nodes + Kinetic Node Repulsion + Rotating Tech Cube.
   - **Aesthetic**: Deep Indigo (`#0B0F19`), Electric Emerald (`#10B981`) & Sapphire (`#3B82F6`).

4. **🚀 Hyperspace Warp Speed (`hyperspace`)**
   - **3D WebGL Engine**: 1,800 Star tunnel particles with **Dynamic Cursor Speed Acceleration** up to 25x velocity burst + Steering camera angles + Holographic Octahedron Prism.
   - **Aesthetic**: Deep Space Violet (`#0F051D`), Magenta (`#EC4899`) & Supernova Gold (`#F59E0B`).

5. **💻 Hacker Matrix Code Rain (`matrix`)**
   - **3D WebGL Engine**: 1,400 Falling green 3D code particles with **Interactive Cursor Kinetic Forcefield Repulsion** (particles deflect radially outward when cursor passes over) + Torus-Knot Matrix Core + Dodecahedron geometry.
   - **Aesthetic**: Deep Obsidian (`#020408`) & Matrix Cyber Green (`#00FF66`).

---

## ⚡ Key Architectural Features

- **🎨 5-in-1 Live Design Switcher**: Real-time theme switcher persisted in `localStorage`.
- **🎲 Interactive 3D Perspective Card Tilt**: Every card tilts dynamically in true 3D space (`perspective(1000px) rotateX(...) rotateY(...)`) on mouse move.
- **🔍 Spotlight Command Palette (`⌘K` / `Ctrl+K` / `/`)**: Modal keyboard navigation filtering pages, direct GitHub repositories, and clipboard email shortcuts.
- **💻 Interactive Lab Terminal (`harshit@usar ~ %`)**: Embedded zsh shell executing `help`, `neofetch`, `about`, `skills`, `projects`, `contact`, `sudo`, `clear`.
- **🚀 Featured Engineering Showcase**: Deep-dive cards for flagship open-source repositories including **Resilient** (Autonomous AI Benchmark).
- **🛠️ Filterable Tech Arsenal Matrix**: Categorized tech stack grid (*Languages*, *AI & Backend*, *Frontend & 3D*, *DevOps & Databases*).
- **📱 Fully Responsive & Touch-Enabled**: Touch event listeners (`touchmove`, `touchstart`) ensure smooth 3D physics on mobile smartphones & tablets.

---

## 🛠️ Tech Stack

- **Core**: HTML5, CSS3, Modern JavaScript (ES6+)
- **3D Graphics & Physics**: Three.js (`r128` WebGL)
- **Design Alignment**: `design-taste-frontend` (*Anti-slop guidelines, 3D motion dials, zero-shift borders*)
- **Typography**: Google Fonts (*Plus Jakarta Sans*, *Fira Code*)
- **Layout**: CSS Grid, Flexbox, Glassmorphism (`backdrop-filter`)

---

## 🚀 Quick Start (Local Run)

```bash
# Clone the repository
git clone https://github.com/harshitthek/portfolio.git

# Navigate to project folder
cd portfolio

# Run a local HTTP server
python -m http.server 3000
```

Open `http://localhost:3000` in your browser!

---

Created & Maintained with ❤️ by **Harshit Sharma** ([@harshitthek](https://github.com/harshitthek))
