# Harshit Sharma — 3D Interactive WebGL Developer Portfolio

An ultra-modern, high-performance 3D developer portfolio website built with HTML5, Vanilla CSS3, Three.js WebGL physics engines, an interactive zsh Web Terminal, and a 6-in-1 Design Switcher aligned with **`design-taste-frontend`** anti-slop guidelines.

🌐 **Live Demo**: [https://harshitthek.github.io/portfolio/](https://harshitthek.github.io/portfolio/)

---

## 🌌 6 Live 3D WebGL Physics Design Modes

You can switch between **6 distinct high-impact 3D animation themes** live using the header selector (`🎨 Select 3D Design Theme`):

1. **🌌 Cyberpunk HUD (`cyberpunk`) [CURSOR VORTEX GRAVITY ATTRACTOR]**
   - **3D WebGL Engine**: **ONLY THIS THEME** responds to mouse pointer movement! Features a 1,200 particle spiral galaxy vortex with **3D Cursor Gravitational Attraction**, camera steering, and Point Light tracking pointer + Double Gyroscope Rings spinning around a morphing core.
   - **Aesthetic**: Glassmorphism cards, glowing cyan (`#38BDF8`) & neon purple HUD borders.

2. **🏎️ Synthwave Tron Grid (`synthwave`) [RETROWAVE HIGHWAY WARP & NEON SUN]**
   - **3D WebGL Engine**: **Automated background animation (no pointer tracking)**. 2,200px wireframe terrain plane advancing in an infinite highway warp (`grid.position.z += 3.5`) with 3D wave noise + Glowing Retrowave Horizon Wireframe Sun + Dual-axis rotating polyhedra.
   - **Aesthetic**: 80s Retro-futuristic Synthwave, Electric Pink (`#FF007F`) & Cyber Cyan (`#00F0FF`).

3. **⚛️ Quantum Constellation (`constellation`) [3D DNA DOUBLE HELIX & ATOM CORE]**
   - **3D WebGL Engine**: **Automated background animation (no pointer tracking)**. 180 double-helix DNA strand nodes rotating in 3D space (`x = radius * cos(t + strand)`) with real-time hydrogen-bond connection lines + Central atomic nucleus + Rotating wireframe cube.
   - **Aesthetic**: Deep Indigo (`#0B0F19`), Electric Emerald (`#10B981`) & Sapphire (`#3B82F6`).

4. **🚀 Hyperspace Warp Speed (`hyperspace`) [3D HEXAGON WORMHOLE TUNNEL]**
   - **3D WebGL Engine**: **Automated background animation (no pointer tracking)**. 20 stacked concentric wireframe hexagon tunnel rings expanding continuously outward toward the camera in a mind-bending 3D wormhole depth effect + Holographic Octahedron Prism.
   - **Aesthetic**: Deep Space Violet (`#0F051D`), Magenta (`#EC4899`) & Supernova Gold (`#F59E0B`).

5. **💻 Hacker Matrix Code Rain (`matrix`) [3D PARTICLE TORUS DONUT & CODE RAIN]**
   - **3D WebGL Engine**: **Automated background animation (no pointer tracking)**. 1,200 particle 3D Torus Donut spinning on dual axes + Cascading vertical green code streams falling continuously in the background.
   - **Aesthetic**: Deep Obsidian (`#020408`) & Matrix Cyber Green (`#00FF66`).

6. **🍉 Watermelon UI (`watermelon`) [ELECTRIC LIME GLOW & FLOATING MESH]**
   - **3D WebGL Engine**: **Automated background animation (no pointer tracking)**. 1,000 particle floating electric crystal matrix + central wireframe crystal octahedron wrapped in a pink torus ring.
   - **Aesthetic**: Dark Glassmorphism, Electric Lime (`#A3E635`), Green (`#84CC16`) & Magenta (`#FF3B5C`).

---

## ⚡ Key Architectural Features

- **🎨 6-in-1 Live Design Switcher**: Real-time theme switcher persisted in `localStorage`.
- **🤖 Watermelon AI Assistant Component**: Interactive chatbot client populated with local LLM response maps to answers queries regarding project leaderboards, custom models, and resume credentials.
- **🎲 Interactive 3D Perspective Card Tilt & Glare**: Cards tilt dynamically in 3D space (`perspective(1000px)`) on mouse move while projecting a dynamic cursor-following light glare sheen.
- **✨ Premium Micro-Animations**: Native scroll reveals, automatic telemetry stat counters (counting up from 0), and magnetic physics for CTA buttons.
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

