# Kayra Ecrin Küçük — Personal Website Template

A modern, responsive personal website and academic portfolio template for **Kayra Ecrin Küçük** ([kucuk.github.io](https://kucuk.github.io)).

Built using vanilla **HTML5**, **CSS3**, and **JavaScript (ES6+)** with a dark **Purple & Velvet Obsidian** theme inspired by [nuzkeser.github.io](https://nuzkeser.github.io), replacing black & blue tones with glowing violet, fuchsia accents, and deep obsidian black.

---

## ✨ Features

- **Obsidian & Luminous Purple Theme**: Built with CSS variables (`--primary: #c084fc`, `--primary-glow: #e879f9`, `--background: #07040d`).
- **Dynamic Atmospheric Mesh**: Floating, GPU-accelerated aurora mesh gradients in violet, purple, and fuchsia.
- **Micro-Interactions**:
  - Interactive 3D mouse parallax tilt on the hero portrait.
  - Interactive spotlight card lighting tracking mouse coordinates (`--spot-x`, `--spot-y`).
  - Smooth trailing purple cursor glow on desktop browsers.
  - Top scroll reading progress indicator.
  - Animated numeric counters for academic/project metrics.
- **Pages**:
  - `index.html`: Hero banner, impact metrics, "Who I Am" about story, selected projects, contact card, and responsive navigation drawer.
  - `projects.html`: Portfolio showcase with interactive category filter tabs (All, Web Apps, STEM & Science, Tools & Utilities, Creative Tech).
  - `resume.html`: Complete curriculum vitae and academic profile with single-click A4 print-ready PDF styling (`@media print`).
- **Zero Heavy Dependencies**: Pure native web standards for maximum speed, security, and effortless deployment to GitHub Pages.

---

## 📁 Project Structure

```
kucuk.github.io/
├── index.html            # Main landing page (Hero, About, Featured, Contact)
├── projects.html         # Projects showcase with interactive category filters
├── resume.html           # Interactive & printable Curriculum Vitae / Resume
├── css/
│   └── style.css         # Complete design system tokens, aurora mesh & components
├── scripts/
│   └── main.js           # Progress bar, header scroll blur, 3D tilt, spotlight & counters
├── src/
│   ├── Avatar.png        # 3D character portrait avatar
│   ├── Avatar.jpg        # High-resolution backup portrait
│   └── favicon.svg       # Glowing purple initial badge icon
└── README.md             # Documentation & customization guide
```

---

## 🎨 Customizing the Website

### 1. Modifying Personal Information
- **Name & Title**: Search and replace `Kayra Ecrin Küçük` in `index.html`, `projects.html`, and `resume.html`.
- **Contact Email**: Update `kayraecrinkucuk@gmail.com` to your preferred email address.
- **Social Links**: Update `https://github.com/kkucuk32` to your active GitHub or LinkedIn handle.

### 2. Changing Theme Colors
All colors are configured in `css/style.css` under the `:root` pseudo-class:
```css
:root {
    --background: #07040d;          /* Main dark background */
    --surface: rgba(20, 11, 36, 0.6);/* Glassmorphism surface */
    --primary: #c084fc;             /* Primary accent purple */
    --primary-glow: #e879f9;        /* Secondary vibrant glow */
    --primary-subtle: rgba(192, 132, 252, 0.12);
}
```

### 3. Updating Academic Resume & Projects
- Open `resume.html` to update your GPA, standardized test scores, coursework subjects, and research investigations.
- Open `projects.html` to add new project cards with custom tags, links, and descriptions.

---

## 🚀 Running Locally & Publishing to GitHub Pages

### Running Locally
You can run any local static file server or simply open `index.html` in your web browser:

**Python**:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

**Node.js / npx**:
```bash
npx serve .
```

### Publishing to GitHub Pages
1. Push this repository to `https://github.com/kkucuk32/kucuk.github.io`.
2. In GitHub, navigate to **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
4. Your website will be live at `https://kucuk.github.io` within minutes!
