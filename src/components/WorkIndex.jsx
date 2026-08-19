import { Link } from 'react-router-dom';
import Reveal from './motion/Reveal';

/**
 * The work list as an index rather than a card grid.
 *
 * Cards force every project into the same rectangle and make six projects look
 * like a template. A ruled index reads like a table of contents, gives the
 * titles real typographic size, and scales to thirty entries without changing.
 *
 * Rows whose project has a `cover` fade that screenshot in on hover. The
 * homepage otherwise carried a single photograph across 5,000px of scroll —
 * all the evidence sat two clicks away on the case studies. The preview is
 * pointer-only and decorative: it is aria-hidden, it never appears on touch
 * (there is no hover), and the row's own text is what the link announces.
 */
const WorkIndex = ({ items }) => (
  <ul className="border-t border-paper-edge">
    {items.map((project, i) => (
      <Reveal as="li" key={project.slug} delay={i * 0.05}>
        <Link
          to={`/work/${project.slug}`}
          className="group relative isolate flex flex-col gap-1 border-b border-paper-edge py-7 hover:z-30 md:grid md:grid-cols-12 md:items-baseline md:gap-6 md:py-9"
        >
          {/* hover wash, drawn behind the text */}
          <span
            aria-hidden="true"
            className="absolute inset-x-[-1rem] inset-y-0 -z-10 origin-left scale-x-0 bg-clay-wash transition-transform duration-[600ms] ease-editorial group-hover:scale-x-100"
          />

          <span className="font-mono text-micro text-ink-mute md:col-span-1">
            {String(i + 1).padStart(2, '0')}
          </span>

          <h3 className="font-display text-h3 tracking-tighter text-ink transition-transform duration-500 ease-editorial md:col-span-4 md:group-hover:translate-x-2">
            {project.title}
          </h3>

          <p className="text-meta text-ink-soft md:col-span-4">{project.domain}</p>

          {/* Year and status step aside so the preview has somewhere to land */}
          <span className="font-mono text-micro uppercase tracking-[0.14em] text-ink-mute transition-opacity duration-300 md:col-span-2 md:group-hover:opacity-0">
            {project.year}
          </span>

          <span className="flex items-center gap-3 font-mono text-micro uppercase tracking-[0.14em] transition-opacity duration-300 md:col-span-1 md:justify-end md:group-hover:opacity-0">
            {project.status === 'live' ? (
              <span className="text-clay">Live</span>
            ) : (
              <span className="text-ink-mute">WIP</span>
            )}
          </span>

          {/* Arrow persists — it is the affordance, so it must not fade */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 text-ink opacity-0 transition-all duration-500 ease-editorial group-hover:opacity-100 md:block"
          >
            →
          </span>

          {project.cover && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-12 top-1/2 z-20 hidden w-[17rem] -translate-y-1/2 translate-x-4 overflow-hidden border border-paper-edge bg-paper-deep opacity-0 shadow-[0_24px_48px_-24px_rgba(25,23,19,0.45)] transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:opacity-100 lg:block"
            >
              <img
                src={project.cover.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="block w-full"
              />
            </span>
          )}
        </Link>
      </Reveal>
    ))}
  </ul>
);

export default WorkIndex;
