# Danish Nazir — Portfolio: Complete Project Documentation

> Snapshot date: 2026-08-18 · Branch: `main` · Last commit: `611f207 Fix/mobile responsiveness and clean up console warnings`
> This document is the full technical + content inventory of the repository as it exists today. It is the baseline reference for the planned redesign.

---

## 1. Overview

| Item | Value |
| --- | --- |
| Name (package.json) | `my-portfolio` v1.0.0 |
| Description | Danish Portfolio Website |
| Type | Single-page React app (client-side routed), no backend |
| Owner | Danish Nazir — Full-Stack, AI & Machine Learning Engineer |
| Live URL | https://danish-portfolio-eight.vercel.app/ |
| Repo (per README) | https://github.com/Danish2/my_portfolio_webiste.git |
| Hosting | Vercel (SPA rewrites + Vercel Analytics) |
| Module type | ESM (`"type": "module"`) |
| Package manager | npm (lockfiles are gitignored) |

**Positioning:** dark, "engineering-grade" personal brand site. Copy is deliberately systems-flavoured ("Deployed Systems", "Arsenal", "Execution"), with a neon cyan/blue accent on near-black, glassmorphism panels, and heavy scroll/tilt/glow animation.

---

## 2. Tech Stack

### Runtime dependencies

| Package | Version | Used for | Actually used? |
| --- | --- | --- | --- |
| `react` / `react-dom` | ^18.2.0 | UI runtime, `createRoot`, StrictMode | Yes |
| `react-router-dom` | ^6.20.0 | Client-side routing (`BrowserRouter`) with v7 future flags | Yes |
| `gsap` | ^3.12.2 | `ScrollTrigger` word reveal, ImageTrail physics | Yes |
| `motion` | ^12.38.0 | `motion/react` springs for ProfileCard / TiltedCard | Yes |
| `@vercel/analytics` | ^2.0.1 | `<Analytics />` page-view tracking | Yes |
| `tailwindcss` | ^3.3.6 | Directives present in `index.css`; theme mapped to CSS vars | Configured, barely used in markup |
| `clsx` + `tailwind-merge` | ^2.0.0 / ^2.2.0 | `cn()` helper in `src/lib/utils.ts` | Only consumed by unused shadcn components |
| `class-variance-authority` | ^0.7.0 | `ui/button.tsx` variants | Dead |
| `lucide-react` | ^0.263.1 | Icons in `ui/calendar.tsx` | Dead |
| `react-day-picker` | ^8.9.1 | `ui/calendar.tsx`, `calendar-07.tsx` | Dead |
| `date-fns` | ^3.0.0 | — | Not imported anywhere |

### Dev dependencies

`vite ^5.0.8`, `@vitejs/plugin-react ^4.2.1`, `typescript ^5.3.0`, `@types/node`, `@types/react`, `@types/react-dom`, `postcss ^8.4.32`, `autoprefixer ^10.4.16`.

### Scripts

```bash
npm run dev      # vite dev server -> http://localhost:5173
npm run build    # vite build -> dist/
npm run preview  # serve the production build locally
```

- There is **no** `lint`, `test`, `typecheck`, or `format` script, and no test framework in the repo.
- `node_modules/` is **not currently installed** in this working copy — run `npm install` before `npm run dev`.

---

## 3. Repository Layout

```
my_portfolio_final/
├── index.html                     # Vite HTML entry; all SEO/OG meta; Google Fonts; favicon
├── package.json
├── vite.config.ts                 # React plugin + '@' -> ./src alias
├── tailwind.config.ts             # Content globs + shadcn-style HSL colour tokens
├── postcss.config.js              # tailwindcss + autoprefixer
├── tsconfig.json / tsconfig.node.json
├── components.json                # shadcn/ui CLI config (style default, baseColor slate)
├── vercel.json                    # SPA rewrite: any extension-less path -> /index.html
├── .gitignore                     # node_modules, dist, .env*, .vercel, IDE/OS junk, lockfiles
├── README.md                      # Public-facing readme (partly out of date, see section 11)
├── RESUME_DRAFT.md                # Markdown source of the resume content
├── styles.css        (1517 LOC)   # DEAD - legacy pre-React stylesheet, referenced nowhere
├── script.js          (112 LOC)   # DEAD - legacy vanilla JS, referenced nowhere
├── public/
│   ├── danish-logo.png            # Favicon + navbar logo
│   ├── resume.html      (289 LOC) # Standalone printable resume page (light theme, self-contained CSS)
│   ├── images/
│   │   ├── Profile_image.jpg.png  # Hero ProfileCard avatar (2.3 MB)
│   │   └── og-image.png           # Social share card (2.3 MB)
│   └── gallery/                   # 6 photos consumed by the footer ImageTrail (~15 MB total)
│       ├── 1709304002393.jpg (2.0 MB)
│       ├── DSC_5035.JPG (2.9 MB)
│       ├── DSC_5035_clipdrop-relight.JPG (228 KB)
│       ├── DSC_5152.JPG (2.3 MB)
│       ├── IMG_20210821_110856.jpg (5.3 MB)
│       ├── Profile_image.jpg.png (2.3 MB)
│       └── README.md              # Guide for swapping gallery images
└── src/
    ├── main.jsx                   # ReactDOM.createRoot + StrictMode + './index.css'
    ├── App.jsx                    # Router, 4 routes, <Analytics />
    ├── index.css       (1270 LOC) # THE stylesheet: design tokens + every component style
    ├── Home.jsx         (471 LOC) # The whole landing page, 9 sections inline
    ├── Projects.jsx      (39 LOC) # "All Projects" archive page
    ├── Blog.jsx         (108 LOC) # Filterable, expandable article list
    ├── NotFound.jsx      (63 LOC) # 404 page (styles inline, not in index.css)
    ├── projectsData.js   (66 LOC) # 6 project records
    ├── blogData.js      (157 LOC) # 3 full articles
    ├── config/galleryConfig.js    # Footer gallery image paths + optional descriptions
    ├── lib/utils.ts               # cn() = twMerge(clsx(...))
    ├── assets/
    │   ├── danish-logo.png        # Unused (navbar loads /danish-logo.png from public)
    │   └── logo.png               # Unused
    └── components/
        ├── Navbar.jsx             # Fixed top bar (desktop) / bottom app bar (mobile)
        ├── Footer.jsx             # 4-column footer incl. ImageTrail gallery + socials
        ├── ProjectCard.jsx        # Problem/Solution project tile
        ├── Testimonials.jsx       # 3 hardcoded testimonials
        ├── ScrollReveal.jsx/.css  # GSAP per-word opacity/blur/rotate reveal
        ├── BorderGlow.jsx/.css    # Animated neon border wrapper (hero card)
        ├── ProfileCard.jsx/.css   # 3D tilt holographic profile card (391 LOC)
        ├── ImageTrail/            # Cursor-following image trail (GSAP, 303 LOC)
        ├── TiltedCard/            # Imported in Home.jsx but never rendered
        ├── ui/button.tsx          # Dead shadcn component
        ├── ui/calendar.tsx        # Dead shadcn component
        └── shadcn-studio/calendar/calendar-07.tsx  # Dead
```

---

## 4. Routing & Application Shell

`src/App.jsx`:

| Route | Component | Notes |
| --- | --- | --- |
| `/` | `Home` | Full landing page, all sections |
| `/projects` | `Projects` | Archive — renders `projects.slice(3)` only |
| `/blog` | `Blog` | Article list with category filter |
| `*` | `NotFound` | Custom 404 |

- Router is `BrowserRouter` with `future={{ v7_startTransition: true, v7_relativeSplatPath: true }}` (silences the React Router v7 deprecation warnings).
- `<Analytics />` from `@vercel/analytics/react` is mounted once inside the router.
- `vercel.json` rewrites all extension-less paths to `/index.html` so deep links work on Vercel. Paths **with** an extension (e.g. `/resume.html`) are served as static files.
- There is no shared layout component — every page imports `<Navbar />` and `<Footer />` itself.
- Scroll restoration is not implemented (navigating between routes keeps scroll position).

---

## 5. Design System (`src/index.css`)

### 5.1 Tokens

```css
/* Colour */
--bg-body:         #050608;   /* near-black page background */
--bg-surface:      #0E1218;   /* panels/cards */
--bg-surface-hover:#161b24;
--accent-cyan:     #00F0FF;   /* primary accent, links, stats, labels */
--accent-blue:     #2D65FF;   /* secondary accent, AI sections, buttons */
--text-primary:    #F0F4F8;
--text-secondary:  #94A3B8;
--text-tertiary:   #64748B;
--border-subtle:   rgba(255,255,255,0.08);
--border-accent:   rgba(0,240,255,0.2);
--glass-bg:        rgba(5,6,8,0.85);   /* backdrop-filter: blur(12px) navbar */

/* Type */
--font-main:    'Inter', sans-serif;         /* body */
--font-display: 'Outfit', sans-serif;        /* h1-h6 */
--font-mono:    'JetBrains Mono', monospace; /* labels, stats, nav */

/* Spacing */
--space-xs: .5rem;  --space-sm: 1rem;  --space-md: 1.5rem;  --space-lg: 2rem;  --space-xl: 4rem;

/* Layout */
--max-width: 1200px;  --header-height: 80px;  --radius-sm: 4px;  --radius-md: 8px;
```

Fonts load from Google Fonts in `index.html` (Inter 400–800, Outfit 500/700, JetBrains Mono 400/500) with `preconnect`.

A **second, conflicting token set** also lives in the same `:root` — the shadcn/Tailwind HSL variables (`--background: 0 0% 100%`, `--foreground: 222.2 84% 4.9%`, …). These are **light-mode** values on a dark site and are wired into `tailwind.config.ts`. Any Tailwind utility like `bg-background` would render white. Unused-but-loaded technical debt.

### 5.2 Stylesheet structure (`index.css`, 1270 lines, section-commented)

`Root variables` → `Reset & Base` → `Utilities` (`.container`, `.text-cyan`, `.text-mono`, `.text-muted`) → `Navbar` → `Hero` → `Layouts` (`.grid-2`, `.grid-3`, `.hero-grid`) → `Cards & Panels` (`.panel`) → `Section Common` (`.section`, `.section-header`, `.section-label`, `.section-title`) → `About/Tech` (`.tech-category`, `.tech-tag`) → `Projects` → `System Stats` → `Testimonials` → `Social Icons` → `Footer` → `Animations` (float, glow, shimmer, pulse, glitch, logo) → `Responsive` → `Contact` → `Devuity Connection` → `Blog Styles`.

### 5.3 Styling approach — the current reality

Styling is **three-and-a-half systems layered on top of each other**:

1. Hand-written CSS classes in `index.css` (the real system, ~95% of visuals).
2. Per-component CSS files (`ProfileCard.css`, `BorderGlow.css`, `ScrollReveal.css`, `ImageTrail.css`, `TiltedCard.css`).
3. Extensive **inline `style={{}}` objects** throughout `Home.jsx`, `NotFound.jsx`, `ProjectCard.jsx`.
4. A `<style>` tag injected inside `Navbar.jsx` for its own media queries.

Plus Tailwind, configured but effectively unused. This is the single biggest thing a redesign should collapse.

### 5.4 Responsive behaviour

One breakpoint: `@media (max-width: 768px)`.

- Navbar transforms from a fixed **top** glass bar into a fixed **bottom app bar** (60 px, `justify-content: space-around`); `body` gets `padding-bottom: 70px`, footer gets `padding-bottom: 80px`.
- A separate `.mobile-logo-bar` (defined in Navbar's inline `<style>`) becomes a fixed 60 px top bar showing just the logo.
- `.grid-2` / `.grid-3` collapse to one column; hero centres; buttons go full-width; hero title drops to 1.8rem.

---

## 6. Components Reference

### `Navbar.jsx`

Fixed navigation. Links: Home, About, Stack, Work, Contact — rendered as in-page anchors (`#home`…) when already on `/`, otherwise as `<Link to="/#…">`. Desktop shows a **Resume** button linking to `/resume.html` (new tab). Logo comes from `${import.meta.env.BASE_URL}danish-logo.png`.

`isMenuOpen` state and the `.nav-links.active` class exist, but **no hamburger button ever toggles them** — dead state left over from an earlier mobile menu; the bottom app bar replaced it.

### `Footer.jsx`

Four columns: brand + tagline · Navigation (Home/Projects/Blog) · **Gallery** (250 px `ImageTrail` canvas) · Connect (email + GitHub, LinkedIn, Instagram, WhatsApp inline SVGs). Bottom bar: dynamic `© {currentYear} Danish Nazir` + "Built to ship. Designed to last."

### `ProjectCard.jsx`

Renders a project as an `<a>` (`.panel .project-card`): domain label → title → role → **Problem:** / **Solution:** paragraphs → tech tags → footer line that reads "View Live System →" when `link` is real, or the `status` string ("Coming Soon") otherwise. Clicks are prevented when there is no link.

### `Testimonials.jsx`

Section `#testimonials` with three **hardcoded** testimonials (Sarah Chen / StartupCo, Marcus Rodriguez / ScaleTech, Priya Patel / PM) using avatars from `randomuser.me`. These are placeholder/fictional people on third-party avatar URLs — a credibility risk on a real personal site.

### `ScrollReveal.jsx` (+ `.css`)

GSAP `ScrollTrigger` text reveal. Splits a **string** child into `.word` spans and scrubs opacity, `filter: blur()`, and container rotation as the element crosses the viewport.

Props: `enableBlur` (true), `baseOpacity` (0.1), `baseRotation` (3), `blurStrength` (4), `containerClassName`, `textClassName`, `rotationEnd` ('bottom bottom'), `wordAnimationEnd` ('bottom bottom'), `scrollContainerRef`.

Only accepts plain-string children — any JSX child renders nothing.

### `BorderGlow.jsx` (+ `.css`)

Animated neon border/glow wrapper used around the hero ProfileCard. Parses an HSL triplet into 7 opacity steps (`--glow-color*`) and builds 7 radial-gradient CSS vars from a `colors` array; hand-rolled `requestAnimationFrame` easing (`easeOutCubic` / `easeInCubic`) drives the intro animation and pointer tracking.

Props (as used in Home): `glowColor="180 100 50"`, `backgroundColor`, `borderRadius={24}`, `glowRadius={80}`, `glowIntensity={2.0}`, `animated`, `colors={['#00FFFF','#2D65FF','#1A1A1A']}`.

Git history shows this component was removed and restored while debugging hero-card visibility (`e984f0e` → `b1c3e98`).

### `ProfileCard.jsx` (+ `.css`, 391 LOC)

The holographic 3D tilt card in the hero. Custom rAF tilt engine with spring smoothing (`DEFAULT_TAU 0.14`, `INITIAL_TAU 0.6`), optional device-orientation tilt on mobile, intro fly-in (1200 ms), gradient/glow layers.

Props: `avatarUrl`, `iconUrl`, `grainUrl`, `innerGradient`, `behindGlowEnabled/Color/Size`, `enableTilt`, `enableMobileTilt`, `mobileTiltSensitivity`, `miniAvatarUrl`, `name`, `title`, `handle`, `status`, `contactText`, `showUserInfo`, `onContactClick`.

In `Home.jsx` it is configured with `handle="javicodes"` (leftover from the source template), `showUserInfo={false}`, `iconUrl="/assets/demo/iconpattern.png"` (**file does not exist**), and `onContactClick` is a `console.log`.

### `ImageTrail/ImageTrail.jsx` (+ `.css`, 303 LOC)

Cursor-following image trail used in the footer gallery. Class-based `ImageItem` model, `lerp` smoothing, pointer/touch position tracking, GSAP timelines, `variant` prop (footer uses `variant="1"`), `items` = array of image URLs.

### `TiltedCard/TiltedCard.jsx`

Motion-based tilt card with spring config `{damping 30, stiffness 100, mass 2}` and props `imageSrc`, `altText`, `captionText`, `containerHeight/Width`, `imageHeight/Width`, `scaleOnHover`, `rotateAmplitude`, `showTooltip`, `overlayContent`, `displayOverlayContent`.

**Imported in `Home.jsx` but never rendered** — dead import shipping dead code.

### `ui/button.tsx`, `ui/calendar.tsx`, `shadcn-studio/calendar/calendar-07.tsx`

Untouched shadcn/ui scaffolding. Nothing imports them. They are the sole reason `class-variance-authority`, `lucide-react` and `react-day-picker` are in `package.json`.

---

## 7. Page-by-Page Content Inventory

### `/` — Home (`src/Home.jsx`)

Two `useEffect` hooks run on mount: one scrolls to `location.hash` (80 px navbar offset, 100 ms delay) when arriving from another route; the other attaches manual smooth-scroll listeners to every `a[href^="#"]` and sets up an `IntersectionObserver` (threshold 0.1, rootMargin `0px 0px -50px 0px`) that swaps `.animate-hidden` → `.animate-visible` once per element.

| # | Section id | Label | Heading | Content |
| --- | --- | --- | --- | --- |
| — | `#home` | `<FullStack, AI & Machine Learning Engineer />` | **"Building reliable systems for real business impact."** | Subtitle about production-grade solutions; CTAs "View Deployed Systems" / "Discuss Engineering"; hero ProfileCard inside BorderGlow |
| 01 | `#about` | PROFILE | Building The Future | "System Mindset" panel + 4 stat cards: **2+** years prod exp · **10+** live systems · **99%** uptime focus · **AI** integrated |
| 02 | `#tech` | ARSENAL | Technology Stack | 4 groups — Frontend (React, Next.js, TypeScript, Tailwind, SASS, HTML5/CSS3) · Backend & Data (Node.js, Python, PostgreSQL, MongoDB, Redis, REST APIs) · Infrastructure (Docker, Git/GitHub, Linux/CLI, AWS, Vercel, Postman) · AI Engineering (OpenAI API, LangChain, Prompt Engineering, AI Code Integration, Model Tuning) |
| 03 | `#projects` | EXECUTION | Deployed Systems | Grid of **all 6** projects from `projectsData.js` |
| 04 | `#testimonials` | SOCIAL PROOF | What Clients Say | 3 hardcoded testimonials |
| 05 | `#ml` | GROWTH | Machine Learning & AI | Deep-learning ambitions + tags PyTorch / Neural Networks / Data Pipelines + giant glitch-effect "AI" typographic mark |
| 06 | `#services` | DELIVERABLES | My Services | MVP Development · System Architecture · Performance Tuning |
| — | `#philosophy` | — | — | Full-bleed quote (`#080808`, 80vh) — "Engineering is the art of turning complexity into clarity…" |
| 07 | `#insights` | INSIGHTS | Latest Articles | First 2 posts from `blogData.js`, linking to `/blog#post-{id}` + "View All Articles →" |
| 08 | `#contact` | CONNECT | Ready to build reliable systems? | "Devuity Connection" glow line, `danishpersonal6@gmail.com` mailto, 4 social icons |

- Section numbering skips **04** in the visible labels (Testimonials uses "SOCIAL PROOF" instead of "04.").
- `/blog#post-{id}` anchors are dead — `Blog.jsx` renders no matching element ids and never reads the hash.

### `/projects` — Projects (`src/Projects.jsx`)

Title "All Projects", grid of `projects.slice(3)` — i.e. **only the last 3 projects** — plus a "Back to Home" link. Uses `.projects` / `.projects-grid` classes and a hardcoded `paddingTop: '120px'`.

The intent was clearly "featured on home, archive here", but Home renders **all 6**, so this page shows a strict subset of what the visitor already saw — and the three strongest projects are missing from the page named "All Projects".

### `/blog` — Blog (`src/Blog.jsx`)

Header "Blog" + subtitle referencing "Implementation Architect". Category filter buttons: **All / Tech / Life**. Each card shows category, formatted date, title, excerpt, tags, and a **Read More / Read Less** toggle (one post expanded at a time) that renders `post.content` with a tiny inline markdown parser: `##` → `h3.blog-section-title`, `#` → `h2.blog-main-title`, other non-empty lines → `p.blog-paragraph`. Empty state: "No posts found in this category." Staggered card animation via `animationDelay: index * 0.1s`.

### `*` — NotFound (`src/NotFound.jsx`)

Cyan mono "404", "Page Not Found", explanation, and a "Go Home" `<a>` with inline hover handlers. All styles inline; uses a raw `<a href="/">` (full page reload) rather than a router `<Link>`.

---

## 8. Data Models

### `src/projectsData.js` — `projects[]`

```js
{ id, title, domain, role, problem, solution, tech: string[], link, status? }
```

| id | Title | Domain | Role | Link |
| --- | --- | --- | --- | --- |
| 101 | Q-ID | Digital Identity | Full Stack Engineer | https://www.q-id.live/ |
| 9 | Travel Victor | Travel Platform | Frontend Architect | https://travel-victor.vercel.app |
| 2 | Aabaliqa | Enterprise Automation | Lead Developer | https://abaliqa.com/ |
| 7 | Boost+ | AI EdTech | AI Engineer | `#` — Coming Soon |
| 3 | KVPDA | Data Analytics | Data Engineer | `#` — Coming Soon |
| 4 | Lily | Healthcare | Backend Engineer | `#` — Coming Soon |

Ids are non-sequential (101, 9, 2, 7, 3, 4); array order is the display order.

### `src/blogData.js` — `blogPosts[]`

```js
{ id, title, date, category: 'Tech' | 'Life', excerpt, content /* markdown-ish string */, image: null, tags: string[] }
```

| id | Title | Date | Category | Tags |
| --- | --- | --- | --- | --- |
| 1 | Building Scalable Enterprise Solutions | 2026-01-02 | Tech | Architecture, Enterprise, Scalability |
| 2 | My Journey into Full Stack Development | 2025-12-28 | Life | Career, Personal, Development |
| 3 | The Future of AI in Software Development | 2025-12-20 | Tech | AI, Future, Innovation |

All three have `image: null`, so the `blog-card-image` block never renders.

### `src/config/galleryConfig.js`

`galleryImages[]` — 6 `/gallery/*` paths consumed by the footer ImageTrail. `galleryImageDescriptions{}` — a path→caption map that **nothing currently reads**.

---

## 9. Content Assets & SEO

**`index.html` meta:** title "Danish Nazir | Full-Stack & AI Engineer"; description about scalable systems / AI integration; full Open Graph (type, url, title, description, image) and Twitter `summary_large_image` card, both pointing at `https://danish-portfolio-eight.vercel.app/images/og-image.png`; favicon `/danish-logo.png`.

Missing: `robots.txt`, `sitemap.xml`, canonical link, JSON-LD `Person` schema, `theme-color`, apple-touch-icon.

**`public/resume.html`** — a standalone, self-contained resume page (light theme: `--primary #2D65FF`, `#F3F4F6` background, Inter only, print-oriented). Not part of the React app; linked from the desktop navbar. Its content mirrors `RESUME_DRAFT.md`.

**`RESUME_DRAFT.md`** — markdown resume source: summary (2+ yrs, 10+ live systems), skills, experience ("Full Stack Engineer / Implementation Architect"), 4 key projects with Problem/Solution/Impact, education (**BCA, University of Kashmir**), certifications (Complete Frontend 2.0 & Introduction to Java — Skill-Lync; JavaScript/React.js; Python), interests (Tech & AI, trekking/travel, gaming).

It contains `danishpersonal@gmail.com` while the site uses `danishpersonal6@gmail.com`, and a literal `[Your Portfolio URL]` placeholder.

**Contact / social identities used across the site**

- Email: `danishpersonal6@gmail.com`
- GitHub: `github.com/Danish20699` (README clone URL says `github.com/Danish2/…` — inconsistent)
- LinkedIn: `linkedin.com/in/danish-nazir1`
- Instagram: `instagram.com/danishn.29/`
- WhatsApp: `wa.me/917006798511`

---

## 10. Build, Deployment & Configuration

- **Vite** (`vite.config.ts`): React plugin, `@` → `./src` alias. No manual chunking, no image optimisation plugin, no bundle analyser.
- **PostCSS**: `tailwindcss` + `autoprefixer`.
- **TypeScript**: `tsconfig.json` present and TS is installed, but the app is written in `.jsx` — only `lib/utils.ts`, the config files, and the dead shadcn components are TypeScript. No typecheck step in CI or npm scripts.
- **Vercel**: `vercel.json` SPA rewrite; `@vercel/analytics` mounted in `App.jsx`; `.vercel` gitignored (listed twice).
- **No CI/CD config** in-repo (no `.github/workflows`), no environment variables, no `.env` usage.

---

## 11. Known Issues, Debt & Inconsistencies

**Dead code / dead weight**

1. `styles.css` (1517 LOC) and `script.js` (112 LOC) at the repo root are legacy pre-React files referenced by nothing.
2. `TiltedCard` is imported in `Home.jsx` but never rendered.
3. `src/components/ui/*` and `shadcn-studio/*` are unused, and drag in `class-variance-authority`, `lucide-react`, `react-day-picker`.
4. `date-fns` is not imported anywhere.
5. `src/assets/danish-logo.png` and `src/assets/logo.png` are unused (the navbar loads the copy in `public/`).
6. `Navbar`'s `isMenuOpen` state has no toggle.
7. `galleryImageDescriptions` is exported but never consumed.
8. Tailwind is configured and its base/components/utilities are injected, but essentially no Tailwind classes are used in the markup — and its colour tokens are **light-mode** values on a dark site.

**Performance**

9. `public/gallery/` ships ~15 MB of unoptimised full-resolution photos, all eagerly referenced by the footer trail; `og-image.png` and the hero avatar are 2.3 MB each. No WebP/AVIF, no responsive `srcset`, no lazy loading, no `width`/`height` on `<img>` (layout shift).
10. Three separate animation systems load on every page (GSAP + ScrollTrigger, Motion, and a hand-rolled rAF engine in BorderGlow/ProfileCard).
11. No `prefers-reduced-motion` handling anywhere despite very heavy motion.

**Correctness / UX**

12. `/projects` shows `slice(3)` while `/` shows all 6 — the archive page omits the flagship projects.
13. `/blog#post-{id}` deep links from the home "Insights" section resolve to nothing.
14. `ProfileCard` is configured with template leftovers: `handle="javicodes"` and `iconUrl="/assets/demo/iconpattern.png"` (missing file).
15. Testimonials are fictional, with `randomuser.me` stock avatars.
16. `NotFound` uses a raw `<a href="/">` (full reload) instead of `<Link>`; its styles are entirely inline.
17. Home's manual `document.querySelectorAll('a[href^="#"]')` listener setup runs once on mount and bypasses React — fragile against any conditionally rendered anchor.
18. No scroll restoration between routes.
19. Section labels skip "04."; the site mixes personas — "Software Engineer" (ProfileCard), "Full-Stack & AI Engineer" (meta), "Implementation Architect" (blog subtitle), "FullStack, AI & Machine Learning Engineer" (hero).

**Accessibility**

20. No skip link; the mobile bottom bar has no `aria-current` or landmark labelling; decorative SVGs lack `aria-hidden`; `title` attributes stand in for accessible names on social links; focus-visible styling is not defined; cyan-on-near-black needs contrast verification at small mono sizes.

**Docs**

21. `README.md` is out of date: it claims "Vanilla CSS" only (Tailwind is installed), names `vite.config.js` (it is `.ts`), describes an `images/` folder (it is `public/images` + `public/gallery`), omits `NotFound.jsx`, `components/`, `config/`, `lib/`, and gives a clone URL (`Danish2/my_portfolio_webiste`) that does not match the GitHub handle used on the site (`Danish20699`).

---

## 12. Git History

```
611f207  Fix/mobile responsiveness and clean up console warnings
b1c3e98  Final production build - restored neon BorderGlow
e984f0e  Debugging Hero card visibility - removed BorderGlow temporarily
c4fb2dc  UI refinement and Vercel Analytics integration
```

Working tree was clean at the time of writing.

---

## 13. Redesign Baseline — Keep / Fix / Decide

**Worth keeping (the genuinely distinctive parts)**

- The Problem → Solution → Tech framing of `ProjectCard`; it reads like an engineer, not a template.
- The dark + cyan/blue identity and the mono-label section system (`01. PROFILE`, `02. ARSENAL`…).
- `ProfileCard`, `BorderGlow`, `ImageTrail`, `ScrollReveal` — high-craft components, even if they should be used more sparingly.
- The data-driven content model (`projectsData.js`, `blogData.js`, `galleryConfig.js`) — easy to re-skin.
- The mobile bottom app bar — an unusual, genuinely mobile-native choice.

**Should be fixed regardless of visual direction**

- Collapse the four styling systems into one (pick: Tailwind properly, or plain CSS/CSS modules with tokens — not both).
- Delete `styles.css`, `script.js`, `ui/*`, `shadcn-studio/*`, unused assets, and the four dead dependencies.
- Compress/convert gallery + OG + avatar images (target < 200 KB each, WebP, with `srcset` and `loading="lazy"`).
- Extract a shared `<Layout>` so pages stop repeating Navbar/Footer.
- Replace or remove the fictional testimonials.
- Reconcile `/projects` vs `/` project sets and make the blog deep links work.
- Add `prefers-reduced-motion`, focus states, and accessible names.
- One consistent professional title across meta, hero, ProfileCard, blog, and resume.

**Open decisions for the redesign**

- Visual direction: evolve the current neon-cyber dark look, or move to something different (editorial/minimal, brutalist, warm light theme, terminal-inspired)?
- Scope: restyle in place, or restructure information architecture too (merge blog into home? separate case-study pages per project?)
- Motion budget: keep the heavy GSAP/tilt/glow layer, or go quieter and faster?
- Stack: stay on Vite + React 18 with plain CSS, or migrate (Tailwind-first, Next.js, TypeScript conversion)?
- Content: are the stats (2+ / 10+ / 99%) and testimonials staying, and should case studies get real depth (metrics, screenshots, architecture notes)?

---

*Generated from a full read of the repository at commit `611f207`.*
