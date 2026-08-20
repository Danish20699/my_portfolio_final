# Danish Nazir — Portfolio: Project Documentation

> Current as of 2026-08-20.

---

## 1. Overview

| Item | Value |
| --- | --- |
| Package | `danish-nazir-portfolio` v2.0.0 |
| Type | Client-rendered React SPA + one Vercel serverless function |
| Live URL | https://my-portfolio-final-wine.vercel.app/ |
| Repo | https://github.com/Danish20699/my_portfolio_final.git |
| Hosting | Vercel — SPA rewrites, Vercel Analytics, serverless `api/` |
| Build | Vite 5 · React 18 · Tailwind 3 |
| Bundle | 385 kB JS · 36 kB CSS · ~1.3 MB images (WebP, all under 200 KB each) |

**Design position:** a full-viewport ink hero opening onto a warm paper world. The contrast
between the two is where the impact is spent; everything after the hero is deliberately quiet.
Paper ground, near-black ink, one clay accent, typography carrying the hierarchy. Work is a
ruled index with hover previews rather than a card grid.

---

## 2. Stack

### Dependencies
| Package | Purpose |
| --- | --- |
| `react` / `react-dom` ^18.2 | UI runtime |
| `react-router-dom` ^6.20 | Routing, with v7 future flags enabled |
| `motion` ^12.38 | The only animation library — two primitives use it |
| `@vercel/analytics` ^2.0 | Page-view analytics |

### Dev dependencies
`vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`, `typescript`, `@types/*`.

Removed in v2 as unused: `gsap`, `@gsap/react`, `class-variance-authority`, `lucide-react`,
`react-day-picker`, `date-fns`, `clsx`, `tailwind-merge`.

### Scripts
```bash
npm run dev      # vite dev server
npm run build    # → dist/
npm run preview  # serve the production build
```
No lint, test, or typecheck script exists yet.

---

## 3. Layout

```
├── index.html                 Entry, SEO/OG/Twitter meta, JSON-LD Person, Google Fonts
├── vite.config.ts             React plugin, '@' → ./src
├── tailwind.config.ts         Editorial design tokens (colours, type scale, spacing, easing)
├── postcss.config.js
├── vercel.json                SPA rewrite: /(.*) → /index.html
├── .env.example               RESEND_API_KEY, MAIL_TO, MAIL_FROM
├── .gitattributes             eol=lf normalisation + binary asset rules
├── README.md                  Setup, structure, design tokens, contact-form config
├── RESUME_DRAFT.md            Markdown source behind public/resume.html
├── api/
│   └── subscribe.js           Vercel function → Resend. Validation + header-injection guard.
├── public/
│   ├── favicon-32.png         Browser tab icon (1.6 KB)
│   ├── apple-touch-icon.png   iOS home screen (9.6 KB)
│   ├── work/                  Case-study screenshots + how-to README
│   ├── resume.html            Standalone printable résumé (light theme, self-contained)
│   ├── images/                portrait.webp (77 KB), og-image.jpg (61 KB, 1200x630)
│   └── gallery/               6 personal photographs, WebP, 28–130 KB each
└── src/
    ├── main.jsx               createRoot + StrictMode + index.css
    ├── App.jsx                Routes + legacy redirects + <Analytics />
    ├── index.css              @layer base / components / utilities only
    ├── data/
    │   ├── site.js            Identity, statement, socials, capabilities, education, off-duty
    │   ├── projects.js        4 case studies
    │   ├── posts.js           3 articles + formatDate / readingTime / categories
    │   ├── testimonials.js    Empty array by default
    │   └── gallery.js         About-page photographs
    ├── pages/                 Home, Work, CaseStudy, Writing, Post, About, Contact, NotFound
    ├── components/
    │   ├── layout/            Header, Footer, Layout (+ ScrollToTop)
    │   ├── motion/            Reveal, Headline
    │   ├── WorkIndex.jsx      Ruled project index
    │   ├── Prose.jsx          Markdown-ish renderer (headings, lists, bold)
    │   ├── ContactForm.jsx    POSTs /api/subscribe, degrades to mailto
    │   ├── ProjectGallery.jsx Case-study screenshot grid
    │   ├── AccordionGallery.jsx Labelled horizontal accordion for screen sets
    │   ├── Lightbox.jsx       Modal viewer: focus trap, Esc, arrow keys
    │   ├── SocialIcon.jsx     Inline SVG marks, currentColor
    │   ├── TextLoop.jsx       Cycling word in the Skills headline
    │   ├── Testimonials.jsx   Renders null while data is empty
    │   └── PageHeader.jsx
    └── hooks/usePageMeta.js   Per-route title + description
```

---

## 4. Routes

| Path | Component | Notes |
| --- | --- | --- |
| `/` | `Home` | Full-height ink hero, selected work, testimonials (conditional), statement band, skills, capabilities, writing |
| `/work` | `Work` | All projects, split into live and in-progress |
| `/work/:slug` | `CaseStudy` | Context → Approach → Outcome, fact table, next-project link |
| `/writing` | `Writing` | Post index with category filter |
| `/writing/:slug` | `Post` | Full article with reading time |
| `/about` | `About` | Bio, capabilities, background, photographs |
| `/contact` | `Contact` | Form + direct channels |
| `/projects` | → `/work` | Redirect, preserves old links |
| `/blog` | → `/writing` | Redirect, preserves old links |
| `*` | `NotFound` | 404 |

All pages share `Layout`, which mounts `Header`, `Footer`, a skip link, and a scroll reset
on route change. Unknown `:slug` values redirect to the parent index rather than 404.

---

## 5. Design System

### Colour (`tailwind.config.ts`)
| Token | Value | Role |
| --- | --- | --- |
| `paper` | `#FAF7F2` | Page background |
| `paper-deep` | `#F1EBE1` | Image placeholders, alternating bands |
| `paper-edge` | `#E7DFD2` | Hairline rules |
| `ink` | `#191713` | Headings, contrast bands, primary buttons |
| `ink-soft` | `#4C463E` | Body copy |
| `ink-mute` | `#6E6760` | Metadata, captions — 5.21:1 on paper, 4.70:1 on paper-deep |
| `ink-edge` | `#2E2A23` | Hairlines on ink bands |
| `clay` | `#B14A2C` | The single accent |
| `clay-deep` | `#8A3620` | Accent, pressed/error |
| `clay-wash` | `#F3E3DA` | Hover wash on index rows |
| `clay-light` | `#D87B58` | Accent on ink bands — 5.88:1 |
| `paper-mute` | `#96918B` | Muted text on ink bands — 5.73:1 |
| `moss` | `#3B4A3F` | Reserved secondary |

### Typography
- **Fraunces** (variable: `opsz`, `wght`, `SOFT`, `WONK`) — display. `opsz 144, WONK 1` at hero sizes.
- **Instrument Sans** — body and UI.
- **JetBrains Mono** — eyebrows, metadata, buttons, numerals.

Fluid `clamp()` scale: `micro · meta · body · lead · h3 · h2 · h1 · display`.

### Structure
- `--max-width` equivalent: `max-w-shell` (80rem); reading column `max-w-measure` (38rem).
- Spacing rhythm: `px-gutter` (`clamp(1.25rem, 4vw, 4.5rem)`), `py-band` (`clamp(4.5rem, 9vw, 9rem)`).
- Easing: `ease-editorial` = `cubic-bezier(0.16, 1, 0.3, 1)` everywhere.
- Breakpoints: `sm 40rem · md 52rem · lg 68rem · xl 84rem`.

### Shared classes (`src/index.css`)
Only patterns used three or more times: `.shell`, `.eyebrow`, `.rule`, `.link`, `.btn`,
`.btn-ghost`, `.prose-editorial`, plus utilities `.band-ink`, `.band-paper`, `.grain`,
`.font-display-tight`.

`.btn-invert` / `.btn-ghost-invert` are the pair for buttons on an ink ground — the default
`.btn` is ink-on-paper and disappears there.

**Section grounds carry meaning, and are not decoration.** `.band-ink` is a statement —
one idea, large type, no list; it appears once, on the homepage. `.band-paper` is a
different register — secondary or personal rather than primary. A page with nothing to
say in either register keeps the default ground, which is why `/writing` has neither.
Everything else is Tailwind in the markup. No inline `style={{}}` objects remain.

### Motion
Two components, both no-ops under `prefers-reduced-motion`:
- `Reveal` — 18px rise + fade, 0.7s, fires once on scroll.
- `Headline` — line-by-line mask reveal, lines authored explicitly so breaks are a typographic choice.

`index.css` additionally zeroes all animation and transition durations under
`prefers-reduced-motion: reduce`.

---

## 6. Content Model

All copy lives in `src/data/`. Components contain no prose.

### `projects.js`
```js
{ slug, title, domain, year, status: 'live'|'building', link, role,
  summary, context: [], approach: [], outcome: [], stack: [],
  stackDetail?: [{ group, items: [] }], accessNote?,
  cover?: { src, alt }, gallery?: [{ src, alt, caption }] }
```
Maktabah Maseehul Ummat · EliiGen · One-Command Deploy (live) — Boost+ (building).

### `posts.js`
```js
{ slug, title, date, category, excerpt, content, tags: [] }
```
Plus `getPost`, `categories`, `readingTime` (~200 wpm), `formatDate`.

### `testimonials.js`
Exports an empty array. `Testimonials.jsx` returns `null` while it is empty, so the section
only appears once real, attributable quotes exist.

### `site.js`
Identity, statement, intro, availability, socials, nav, `capabilities`, `education`, `offDuty`.

---

## 7. Contact Form

`ContactForm.jsx` → `POST /api/subscribe` → Resend.

The function validates the address (RFC-length cap, pattern, explicit CRLF header-injection
guard), escapes HTML in the email body, caps the message at 2000 characters, and never leaks
configuration detail to the client. It returns 503 when `RESEND_API_KEY` is unset and 502 when
Resend rejects the request.

The client surfaces the error and offers a prefilled `mailto:` link on any failure, so an
enquiry is never silently dropped.

| Variable | Required | Default |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | — |
| `MAIL_TO` | No | `danishpersonal6@gmail.com` |
| `MAIL_FROM` | No | `Portfolio <onboarding@resend.dev>` |

Resend's shared sender can only deliver to the address the Resend account was registered with;
set `MAIL_FROM` to a verified domain to lift that.

---

## 8. SEO & Metadata

`index.html` carries title, description, canonical, `theme-color`, full Open Graph and Twitter
card metadata (all pointing at `my-portfolio-final-wine.vercel.app`), and JSON-LD `Person`.
`usePageMeta` rewrites title/description/OG/Twitter per route, since the app is client-rendered
and would otherwise share one set of tags across every page.

`scripts/build-seo.mjs` runs as `prebuild` and generates `public/sitemap.xml` and
`public/robots.txt` from `projects.js` and `posts.js`, so the sitemap cannot list a
removed project or miss a new one. `usePageMeta` also rewrites the canonical link and
`og:url` per route — without it every page claims to be the homepage.

---

## 9. Accessibility

- Skip link to `#main`, focus-visible outlines in clay at 2px/3px offset.
- Mobile menu is a real `<button>` with `aria-expanded` / `aria-controls`, closes on Escape
  and on navigation, and locks body scroll while open.
- Decorative marks carry `aria-hidden`; the filter buttons use `aria-pressed`.
- Form has labels, `aria-invalid`, and an `aria-describedby` error with `role="alert"`.
- `prefers-reduced-motion` respected in both CSS and JS.

Not yet verified: colour contrast measurement on `ink-mute` (`#8B8378`) at `micro` size, and a
full keyboard pass over the work index hover states.

---

## 10. Verification Performed

Chrome via Playwright, 1440×900 and 390×844, across all 8 routes:
- Correct `<h1>` on every route, both viewports.
- Zero console errors, zero page errors.
- Scroll-triggered sections confirmed reaching `opacity: 1`.
- Production build clean.

---

## 11. Outstanding Work

**Performance**
1. No `srcset` / responsive sources — a single WebP is served to every viewport. Worth adding
   if mobile traffic grows, but at 28–130 KB per image the gain is now small.

**Content**
3. `outcome` arrays in `projects.js` are qualitative. Replace with measured figures where they exist.
4. No project screenshots — case studies are text-only.
5. `testimonials.js` is empty by design; add real quotes to activate the section.
6. `RESUME_DRAFT.md` still lists `danishpersonal@gmail.com` (site uses `danishpersonal6@`) and a
   literal `[Your Portfolio URL]` placeholder.

**Engineering**
7. No test or lint tooling.
8. `tsconfig.json` and TypeScript are installed, but the app is `.jsx`; only `tailwind.config.ts`
   is TypeScript. Either convert or drop the TS dependency.

---

## 12. History

```
7ccd25c  feat: add personal portfolio pages and components   ← v2 redesign
4828e1d  Fix SPA rewrite that 404'd /projects and /blog       ┐
2265fe9  Fall back to mailto when the contact API returns 5xx │ merged in
abf7c38  Fix invalid vercel.json rejected by Vercel schema    │ from
716feb4  Fix share metadata pointing at a domain we no longer own │ origin/main
b8de6c2  Rework portfolio: honest content, a11y fixes, React Bits, contact API ┘
611f207  Fix/mobile responsiveness and clean up console warnings
```

The v2 redesign replaced the dark neon-cyber design and its ReactBits component set
(`ProfileCard`, `BorderGlow`, `ImageTrail`, `ScrollReveal`, `TiltedCard`, `SplitText`,
`MaskedHeading`, `DepthCarousel`, `CurvedInput`). Those files remain retrievable from
`origin/main` and `4828e1d` if any are wanted back.

Kept from the upstream branch: the contact API, `.env.example`, `.gitattributes`, the
`vercel.json` and OG-domain fixes, and the empty-by-default testimonials pattern.
