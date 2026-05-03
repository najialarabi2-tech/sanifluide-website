# Sanifluide Maroc — Website Documentation

> Premium dark industrial website for Sanifluide Maroc, expert in HVAC and fire protection since 1996.

---

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Start dev server → http://localhost:5173
npm run build      # Production build → /dist
npm run preview    # Preview the production build
```

---

## Project Structure

```
Sanifluide Website/
├── public/
│   ├── Video1.mov              # Hero background video
│   └── images/
│       ├── logo.png            # Main logo (used in navbar + orbit)
│       ├── favicon.ico         # Browser tab icon
│       ├── og-preview.png      # ⚠️ MISSING — WhatsApp/social preview image (1200×630px)
│       └── sanifluide Tetouan (*.jpg)   # 62 real project photos
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Fixed top nav, mobile hamburger, Instagram link
│   │   ├── Hero.jsx            # Full-screen hero, orbital ring, floating cards, CTA
│   │   ├── Services.jsx        # 4 service cards (Ventilation, Clim, Chauffage, Incendie)
│   │   ├── Stats.jsx           # Animated counter bar (200 projets, 30 ans, etc.)
│   │   ├── WhyUs.jsx           # Slideshow + 4 feature grid
│   │   ├── Projects.jsx        # 4 project cards with real photos
│   │   ├── CtaBanner.jsx       # Split CTA card with phone link
│   │   └── Footer.jsx          # Contact form + footer grid + social links
│   │
│   ├── hooks/
│   │   └── useReveal.js        # IntersectionObserver scroll-reveal hook
│   │
│   ├── styles/
│   │   └── index.css           # All styles — design tokens + components + mobile
│   │
│   ├── App.jsx                 # Root component, section order
│   └── main.jsx                # React entry point
│
├── index.html                  # SEO meta tags, OG tags, fonts
├── vite.config.js
└── package.json
```

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| lucide-react | 1.14 | SVG icon library |
| Poppins (Google Fonts) | — | Typography |
| Plain CSS | — | All styles, no CSS modules |

---

## Design System

### Colors
```css
--orange:       #F26522   /* Primary brand orange */
--orange-dk:    #C94F12   /* Hover / darker orange */
--orange-glow:  rgba(242,101,34,.25)  /* Ambient glow */
--bg:           #0A0A0A   /* Main background */
--bg-2:         #111111   /* Alternate section bg */
--bg-3:         #181818   /* Tertiary bg */
--white:        #FFFFFF
--muted:        rgba(255,255,255,.45)
--muted-2:      rgba(255,255,255,.65)
--border:       rgba(255,255,255,.08)
```

### Typography
- Font: **Poppins** (weights 300–800)
- Section titles: `clamp(2rem, 5vw, 3rem)` / `font-weight: 800`
- Body: `1rem` / `line-height: 1.65`

### Spacing
- Container max-width: `1200px`
- Section padding: `5rem 0` (desktop) / `4rem 0` (mobile)
- Nav height: `80px`

---

## Page Sections (in order)

| # | Component | ID | Description |
|---|-----------|-----|-------------|
| 1 | Navbar | — | Fixed, scroll-aware, mobile hamburger |
| 2 | Hero | `#hero` | Full-screen video, orbital logo, 4 floating cards, CTA |
| 3 | Services | `#services` | 2×2 grid of main services |
| 4 | Stats | — | Animated counters: 200+ projets, 30 ans, 100% clients, 24h |
| 5 | WhyUs | `#why-us` | Slideshow + "Pourquoi Sanifluide?" feature grid |
| 6 | Projects | `#projects` | 4 real project showcase cards |
| 7 | CtaBanner | — | "Un projet en tête ? Parlons-en." |
| 8 | Footer | `#contact` | Contact form + info + footer grid |

---

## Content To Update

### ⚠️ Required before launch

| Item | Location | Status |
|------|----------|--------|
| `og-preview.png` | `public/images/` | ❌ Missing — create 1200×630px image for WhatsApp/social sharing |
| Domain live | `index.html` canonical + OG URLs | Set to `https://sanifluide.com/` — confirm when hosting is active |
| Contact form backend | `Footer.jsx` | Form has no real submission logic yet — needs email service (e.g. EmailJS, Formspree, or custom API) |

### 📸 Images already in project
62 professional photos are in `public/images/sanifluide Tetouan (*.jpg)` and are wired up in the WhyUs slideshow and Projects cards. Add more by following the pattern in those components.

### ✏️ Text to personalize (optional)
- `Footer.jsx` line ~120: Email address `contact@sanifluide.com` — confirm it's correct
- `Footer.jsx` line ~118: Address `Av. Al Hiwar, Tanger 90000` — confirm or update
- `Projects.jsx`: Project titles, locations, and descriptions are placeholders — update with real project details
- `Stats.jsx`: Numbers (200 projets, 30 ans, 100%, 24h) — confirm accuracy

---

## Social Links

| Platform | Link | Used in |
|----------|------|---------|
| Instagram | https://www.instagram.com/sanifluide.maroc/ | Navbar, Hero logo, Footer |
| Facebook | `#` placeholder | Footer only |
| LinkedIn | `#` placeholder | Footer only |

> Update Facebook and LinkedIn hrefs in `Footer.jsx` (lines ~150–155) when accounts are ready.

---

## SEO / Meta Tags

All set in `index.html`:
- ✅ `<title>` — French, keyword-rich
- ✅ `<meta name="description">`
- ✅ `<meta name="keywords">`
- ✅ Open Graph (`og:title`, `og:description`, `og:image`, `og:url`)
- ✅ Twitter Card (`summary_large_image`)
- ✅ `<link rel="canonical">`
- ✅ `lang="fr"` on `<html>`
- ⚠️ `og:image` points to `og-preview.png` — must exist at launch

---

## Deployment Checklist

- [ ] Run `npm run build` — check no errors
- [ ] Upload `/dist` folder contents to web host (not the dist folder itself, its contents)
- [ ] Add `og-preview.png` to `public/images/` before building
- [ ] Test WhatsApp link preview using https://developers.facebook.com/tools/debug/
- [ ] Wire up contact form backend (EmailJS / Formspree recommended)
- [ ] Update Facebook + LinkedIn social links in `Footer.jsx`
- [ ] Test on mobile (iOS Safari + Android Chrome)
- [ ] Test all smooth-scroll nav links work on production
- [ ] Confirm `Video1.mov` loads — consider adding a `.mp4` version for broader browser support

---

## Adding Real Project Photos

To add photos to the **Projects** section, edit `src/components/Projects.jsx`:

```jsx
// In the PROJECTS array, each card has a `thumbCls` for background.
// Instead of the gradient class, add an inline style:
<div
  className="project-card__thumb-bg"
  style={{ backgroundImage: 'url(/images/sanifluide Tetouan (3 of 62).jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
/>
```

For the **WhyUs slideshow**, edit `src/components/WhyUs.jsx`:
```jsx
const SLIDES = [
  { label: 'Installation VMC', img: '/images/sanifluide Tetouan (3 of 62).jpg' },
  // ...
]
// Then in JSX: <img src={s.img} alt={s.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
```
