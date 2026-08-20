/**
 * The one place the deployed origin is written down.
 *
 * It used to be hardcoded in eight places across index.html, usePageMeta.js
 * and build-seo.mjs — canonical tag, OG and Twitter URLs, both social image
 * URLs, JSON-LD, and every entry in the sitemap. Changing domains meant
 * finding all eight, and missing one meant search engines and link previews
 * kept pointing at the old address without anything visibly breaking.
 *
 * Imported by:
 *   - vite.config.js   substitutes %SITE_ORIGIN% into index.html at build time
 *   - src/hooks/usePageMeta.js   per-route canonical and og:url
 *   - scripts/build-seo.mjs      sitemap.xml and robots.txt
 *
 * Deliberately a committed module rather than an env var: .env* is
 * gitignored, so an env var would be absent on Vercel and the placeholder
 * would ship to production as literal text.
 *
 * No trailing slash — every consumer appends its own path.
 */
export const ORIGIN = 'https://danishnazir.vercel.app';
