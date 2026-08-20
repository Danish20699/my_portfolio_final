# Danish Nazir — Portfolio

Personal site and case-study archive. React + Vite, deployed on Vercel.

Live: https://my-portfolio-final-wine.vercel.app/

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/ (runs the SEO generator first)
npm run preview  # serve the production build
npm run seo      # regenerate sitemap.xml + robots.txt on their own
```

The contact form posts to a Vercel serverless function, so it only works in a
deployment or under `vercel dev`. Everywhere else it falls back to a `mailto:`
link — see [Contact form](#contact-form).

---

## Structure

```
src/
├── main.jsx                  React entry
├── App.jsx                   Routes (incl. redirects from the old /projects, /blog)
├── index.css                 Design tokens, base layer, shared component classes
├── data/                     All content lives here — no copy in components
│   ├── site.js               Name, role, statement, socials, capabilities, education
│   ├── projects.js           Case studies (context / approach / outcome)
│   ├── posts.js              Long-form writing
│   ├── testimonials.js       Empty by default; renders nothing until filled
│   └── gallery.js            Photographs for the About page
├── pages/                    One file per route
├── components/
│   ├── layout/               Header, Footer, Layout (shared shell + scroll reset)
│   ├── motion/               Reveal, Headline — the only two motion primitives
│   ├── WorkIndex.jsx         The ruled project index
│   ├── Prose.jsx             Minimal markdown renderer for posts
│   ├── ContactForm.jsx       Posts to /api/subscribe, degrades to mailto
│   ├── ProjectGallery.jsx    Case-study screenshot grid
│   ├── Lightbox.jsx          Accessible modal viewer (focus trap, Esc, arrows)
│   └── PageHeader.jsx
└── hooks/usePageMeta.js      Per-route <title> and meta description

api/subscribe.js              Vercel function → Resend
public/                       Static assets, plus the standalone resume.html
```

Every colour pair on the site is verified against WCAG AA. If you change a
token, re-check it — `ink-mute` originally shipped at 3.50:1 and failed.

**Content is data, not markup.** To add a project or a post, add an object to
`src/data/projects.js` or `src/data/posts.js` — the index pages, detail pages,
counts, and homepage previews all derive from it.

---

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/work` | All projects, split live / in progress |
| `/work/:slug` | Case study |
| `/writing` | Post index with category filter |
| `/writing/:slug` | Post |
| `/about` | Bio, capabilities, background, photographs |
| `/contact` | Contact form |
| `/projects`, `/blog` | Redirect to `/work`, `/writing` (old URLs) |

---

## Design

Light warm-paper base, one accent, typography doing the work.

| Token | Value | Role |
| --- | --- | --- |
| `paper` | `#FAF7F2` | Page |
| `paper-deep` | `#F1EBE1` | Alternating bands, image placeholders |
| `paper-edge` | `#E7DFD2` | Hairlines |
| `ink` | `#191713` | Headings, contrast bands, buttons |
| `ink-soft` | `#4C463E` | Body copy |
| `ink-mute` | `#6E6760` | Metadata, captions (5.21:1 paper, 4.70:1 recessed) |
| `clay` | `#B14A2C` | The single accent (5.06:1 on paper) |
| `clay-light` | `#D87B58` | The accent on ink bands (5.88:1) |
| `paper-mute` | `#96918B` | Muted text on ink bands (5.73:1) |

Type: **Fraunces** (display), **Instrument Sans** (body), **JetBrains Mono**
(metadata). All three from Google Fonts.

Everything is Tailwind, configured in `tailwind.config.ts` with a deliberately
narrow editorial scale. `src/index.css` holds only the base layer and the
handful of patterns used in three or more places (`.shell`, `.eyebrow`, `.btn`,
`.link`, `.prose-editorial`).

Motion is two components — `Reveal` (a short rise and fade, once) and
`Headline` (line-by-line mask reveal). Both no-op under
`prefers-reduced-motion`.

---

## Contact form

`api/subscribe.js` validates the address, guards against header injection, and
sends through [Resend](https://resend.com). Configure in the Vercel dashboard:

| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | From https://resend.com/api-keys |
| `MAIL_TO` | No | Defaults to `danishpersonal6@gmail.com` |
| `MAIL_FROM` | No | Resend's shared sender only delivers to your own registered address; set this once you verify a domain |

Copy `.env.example` to `.env.local` for local testing. If the endpoint is
missing or returns an error, the form shows the error and offers a prefilled
`mailto:` link — enquiries are never silently dropped.

---

## Known follow-ups

Everything here needs information only Danish has. Nothing is blocked on code.

- **No case study carries a measured number.** The `outcome` arrays say what
  changed, not how much. EliiGen's API p95 before and after the BullMQ work
  would be the single strongest addition to the site.
- **Boost+** has no link and no screenshots. Finish it or drop it.
- **Maktabah has no public URL** — it renders the `accessNote` line instead.
- **Testimonials are empty by design.** Add real, attributable quotes to
  `src/data/testimonials.js` and the section appears on its own.
- **Writing is three pre-redesign posts on generic topics, with no images.**
  One post about something actually debugged — the Socket.io Redis adapter, or
  the PostgreSQL schema/table/sequence grants — would beat all three.
- **Commit authorship.** Older commits carry a mistyped email. Rewriting it
  needs `git filter-branch` plus a force push, run locally.

Screenshot support is already built — see `public/work/README.md`. Drop images
in, add `cover` / `gallery`, and the case study picks them up with no code
change.
