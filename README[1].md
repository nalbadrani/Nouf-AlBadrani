# Nouf F. Albadrani — Executive Portfolio

A production-ready, bilingual (Arabic / English) executive portfolio for **Nouf F. Albadrani**, Compliance Officer & Governance Professional. Built as a dependency-free static site — pure HTML, CSS, and vanilla JavaScript — so it deploys directly to GitHub Pages with no build step.

All career content (experience, education, skills, certifications, volunteer work, internship) is sourced **exclusively** from the original CV. Nothing has been invented, embellished, or omitted — only presentation, layout, and interaction have been designed.

---

## Overview

- **Audience:** banks, government entities, Big Four firms, international law firms, and Vision 2030–aligned organizations.
- **Design language:** dark navy + gold, executive minimalism — quiet luxury rather than flashy animation.
- **Signature element:** a consistent, hand-illustrated mascot who accompanies the visitor through each section, changing pose (never identity) to match the content — waving in the hero, arms folded in About, holding a compliance folder in Experience, and so on.
- **Zero dependencies:** no framework, no npm, no build tools. Open `index.html` and it runs.

---

## Features

- **Bilingual, instant switching** — toggle English (LTR) / Arabic (RTL) with no reload; the choice is remembered on return visits.
- **Cinematic intro** — a navy loading screen with an animated gold monogram; the mascot greets the visitor, then steps into the page as the name reveals with a premium ink-draw animation.
- **Custom cursor & mouse glow** — subtle gold glow that follows the pointer on desktop (auto-disabled on touch devices).
- **Scroll-aware navigation** — shrinks on scroll, highlights the active section, and includes a scroll-progress indicator.
- **Premium card treatment** — frosted-glass cards with an animated gold border sweep on hover, used for Certifications and Contact.
- **Copy-to-clipboard email button** and an animated LinkedIn hover effect in the Contact section.
- **Back-to-top button**, appears after the hero.
- **Fully responsive** — verified from small mobile through ultra-wide desktop.
- **Accessible** — semantic landmarks, skip-to-content link, visible keyboard focus states, `aria-hidden`/`aria-label` on decorative and interactive elements, and full `prefers-reduced-motion` support.
- **SEO-complete** — meta description/keywords, canonical tag, Open Graph, Twitter Card, and JSON-LD (`Person`) structured data.
- **Downloadable résumé** — the original CV PDF, bundled at `assets/resume.pdf`.

---

## Folder Structure

```
├── index.html        All markup and bilingual content (EN + AR blocks)
├── style.css          Design tokens, layout, animation, responsive rules
├── script.js          Language toggle, mascot engine, scroll/pointer effects
├── robots.txt          Search-engine crawl rules
├── sitemap.xml         Sitemap for search engines
├── assets/
│   └── resume.pdf      Downloadable résumé (source CV)
└── README.md
```

---

## Deployment (GitHub Pages)

This project uses **only relative paths** (`style.css`, `script.js`, `assets/resume.pdf`), so it works correctly whether it's served from a root domain or a `/repository-name/` subpath — no edits required.

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose the `main` (or `master`) branch and the `/ (root)` folder.
5. Save. Your site will be live at:
   ```
   https://nalbadrani.github.io/Nouf-AlBadrani/
   ```
6. The canonical URL, Open Graph URL, Twitter metadata, JSON-LD `url`, `robots.txt`, and `sitemap.xml` are already configured for this address — no further edits needed before publishing.

No custom domain, server, or backend is required.

---

## Customization Guide

### Colors & fonts
All colors and font families are defined once as CSS custom properties at the top of `style.css`:
```css
:root{
  --navy-deep:   #0A1220;
  --gold:        #C6A455;
  --font-display-en: 'Cormorant Garamond', serif;
  --font-display-ar: 'Amiri', serif;
  /* ... */
}
```
Changing a value here updates it everywhere it's used.

### Sections
Each section in `index.html` is clearly commented (`<!-- ============ ABOUT ============ -->`, etc.) and self-contained — safe to reorder, restyle, or remove without touching the others.

### Mascot poses
The mascot is a single SVG (`#mascotStage` in `index.html`) with pose variants toggled purely by CSS classes (`style.css`, "MASCOT" section) driven by `data-pose` attribute changes in `script.js` (section 6, "MASCOT — pose engine"). To add or adjust a pose, add a new `<g class="m-arm-R-yourpose">` / `<g class="m-prop-yourprop">` group in the SVG, a matching `[data-pose="yourpose"]` CSS rule, and an entry in the `poseMap` object in `script.js`.

---

## Language Switching

- The toggle button (top-right of the nav) swaps every element carrying a `.lang-en` / `.lang-ar` class pair, and flips the page's `dir` attribute between `ltr` and `rtl`.
- The chosen language persists across visits via `localStorage`.
- To add a new bilingual string anywhere in the markup, add both spans side by side:
  ```html
  <span class="lang-en">English text</span><span class="lang-ar">النص العربي</span>
  ```

---

## CV Replacement Instructions

To update this site for a different CV or a revised version of the same one:

1. **Résumé file** — replace `assets/resume.pdf` with the new PDF (keep the same filename, or update the `href` in the "Download Résumé" button in `index.html`).
2. **Section content** — each section in `index.html` contains matching `.lang-en` / `.lang-ar` text pairs. Update both languages together so they stay in sync; nothing else needs to change.
3. **Adding a new section** — copy an existing `<section>` block (e.g. Certifications), update its `id`, content, and nav link, and — if you'd like the mascot to react to it — add a pose entry as described above.
4. **Name / title** — update the `<h1 class="hero-name">` text and the `.hero-title` spans in the Hero section; also update the `<title>`, meta tags, and JSON-LD block in `<head>` to match.

---

## Contact Information Placeholders

Current contact details are live in the Contact section and `<head>` metadata:

| Field | Current value |
|---|---|
| Email | `noufalbadrani3@gmail.com` |
| Phone | `+966 55 002 2916` |
| LinkedIn | `linkedin.com/in/nouf-albadrani-` |
| Location | Riyadh, Saudi Arabia |

**Still pending:** a profile photo. A placeholder monogram circle sits in the Hero section (`.hero-avatar` in `index.html`) with a comment showing exactly what to swap in once the photo is available:
```html
<img src="assets/profile.jpg" alt="Nouf F. Albadrani" class="hero-avatar-img">
```

---

## Final QA Checklist

| Area | Status |
|---|---|
| **Performance** — GPU-only animations (`transform`/`opacity`), rAF-throttled scroll handling, particles/cursor/glow auto-disabled on mobile & touch, single merged section observer | ✅ |
| **Accessibility** — skip link, `<main>`/`<header>`/`<footer>`/`<nav>` landmarks, `aria-label`/`aria-hidden`/`aria-expanded` wired up, visible `:focus-visible` outlines, verified WCAG AA color contrast, full `prefers-reduced-motion` support | ✅ |
| **Responsive** — tested from small mobile (< 480px) through tablet, laptop, desktop, and ultra-wide (> 1800px); no horizontal overflow at any breakpoint | ✅ |
| **SEO** — meta description/keywords, canonical tag, Open Graph, Twitter Card, JSON-LD structured data, `robots.txt`, `sitemap.xml` | ✅ |
| **Browser Compatibility** — modern evergreen browsers (Chrome, Safari, Firefox, Edge); graceful degradation where `IntersectionObserver`, `backdrop-filter`, or the Clipboard API are unavailable | ✅ |
| **GitHub Pages Compatibility** — relative paths only, no broken assets/links, works unmodified from a `/repo-name/` subpath | ✅ |
| **Production Ready** — duplicate CSS/JS removed, dead code cleared, single organized module per file | ✅ |

All URLs are configured for `https://nalbadrani.github.io/Nouf-AlBadrani/` — ready to publish as-is.
