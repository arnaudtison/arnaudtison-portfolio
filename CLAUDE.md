# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start Vite dev server with HMR
yarn build      # Production build
yarn preview    # Preview built output locally
yarn lint       # ESLint check
```

Use **yarn** (not npm). No test suite exists.

## Stack

React 18 + Vite (SWC) single-page portfolio with scroll-based navigation. SCSS for styling. Three.js / React Three Fiber for 3D. GSAP + Lenis for smooth scroll animations. EmailJS for the contact form.

## Architecture

The entire site is a single route (`/`) rendered in `Home.jsx`, which composes four stacked sections: landing, About, Work, and Contact. React Router is wired up but has only one route.

**Scroll-based navigation** (`App.jsx`): `navigateToSection()` uses `gsap.to(window, { scrollTo })` to jump to hardcoded Y positions (Home: 0, About: 910, Technologies: 1600, Work: 2350, Contact: document.scrollHeight). When adding or resizing sections, these values must be updated manually.

**Smooth scroll**: `LenisProvider.jsx` wraps the app and runs a RAF loop. The Lenis singleton lives in `src/lib/lenis.js`. GSAP's ScrollTrigger is synced to Lenis so the two scroll systems don't conflict.

**3D keycaps** (`TechKeycaps3D.jsx`): An interactive mechanical keyboard rendered with React Three Fiber. Keycaps use custom rounded-rectangle geometry and press down on hover via lerp. Tech icons are applied as Three.js Decals. Hover state is lifted to `About.jsx` via a callback to display the hovered tech name.

**Custom cursor** (`OutlineFollower.jsx`): An `<svg>` circle follows the mouse via `mousemove` in a RAF loop. `cursorEnabled` state flows down from `App.jsx` to disable it during 3D interaction.

**Progressive blur bar** (`ProgressiveBlurBar.jsx`): Multiple stacked `<div>`s with increasing `backdrop-filter: blur()` and a CSS mask, creating a fade-to-blur at the bottom of the viewport.

**Contact form**: EmailJS (`@emailjs/browser`) with client-side validation. Service/template IDs live in the component; keep them out of version control.

## Style Conventions

ESLint enforces: single quotes, 2-space indentation, semicolons, trailing commas (multiline), arrow-function parens always required. Max line length is 400 chars (effectively unenforced). SCSS files are per-page in `src/css/`.

## Assets

Static images live in `src/assets/`. Work project thumbnails are in `src/assets/work/`. Tech icon PNGs (e.g. `react1.png`, `ts1.png`) are imported directly into `TechKeycaps3D.jsx` and used as Decal textures — adding a new tech icon requires adding the PNG and wiring it into the keycap data array in that file.
