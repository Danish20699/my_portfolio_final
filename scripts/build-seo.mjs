/**
 * Generates public/sitemap.xml and public/robots.txt from the content data.
 *
 * Runs as `prebuild`, so adding or removing a project or post updates the
 * sitemap automatically. A hand-maintained sitemap goes stale the first time
 * someone forgets — and a sitemap listing a removed URL is worse than none.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { projects } from '../src/data/projects.js';
import { posts } from '../src/data/posts.js';

const ORIGIN = 'https://my-portfolio-final-wine.vercel.app';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const today = new Date().toISOString().slice(0, 10);

// priority is a hint, not a ranking factor — kept simple and honest.
const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/work', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'yearly' },
  { path: '/writing', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'yearly' },
  ...projects.map((p) => ({ path: `/work/${p.slug}`, priority: '0.8', changefreq: 'yearly' })),
  ...posts.map((p) => ({ path: `/writing/${p.slug}`, priority: '0.6', changefreq: 'yearly' })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${ORIGIN}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = `# ${ORIGIN}
User-agent: *
Allow: /

# Developer notes, not content.
Disallow: /work/README.md

Sitemap: ${ORIGIN}/sitemap.xml
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap, 'utf8');
writeFileSync(resolve(root, 'public/robots.txt'), robots, 'utf8');

console.log(`seo: sitemap.xml (${routes.length} urls) + robots.txt`);
