# Danish Nazir — Portfolio

Personal site and case-study archive. React + Vite, deployed on Vercel.

Live: https://my-portfolio-final-wine.vercel.app/

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
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
│   └── PageHeader.jsx
└── hooks/usePageMeta.js      Per-route <title> and meta description

api/subscribe.js              Vercel function → Resend
public/                       Static assets, plus the standalone resume.html
```

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
| `ink-mute` | `#8B8378` | Metadata, captions |
| `clay` | `#B14A2C` | The single accent |

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

- **Images are heavy.** `public/gallery/` holds 2–5 MB originals and
  `og-image.png` / `Profile_image.jpg.png` are ~2.3 MB each. They should be
  converted to WebP at ~1600px and re-exported under 200 KB.
- **Case studies need numbers.** The `outcome` arrays in `src/data/projects.js`
  describe what changed qualitatively. Replace them with measured figures where
  you have them.
- **No project screenshots yet.** Case study pages are text-only.
- **Testimonials are empty by design.** Add real, attributable quotes to
  `src/data/testimonials.js` and the section appears automatically.
