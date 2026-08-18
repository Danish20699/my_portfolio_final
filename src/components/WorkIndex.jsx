import { Link } from 'react-router-dom';
import Reveal from './motion/Reveal';

/**
 * The work list as an index rather than a card grid.
 *
 * Cards force every project into the same rectangle and make six projects look
 * like a template. A ruled index reads like a table of contents, gives the
 * titles real typographic size, and scales to thirty entries without changing.
 */
const WorkIndex = ({ items }) => (
  <ul className="border-t border-paper-edge">
    {items.map((project, i) => (
      <Reveal as="li" key={project.slug} delay={i * 0.05}>
        <Link
          to={`/work/${project.slug}`}
          className="group relative isolate flex flex-col gap-1 border-b border-paper-edge py-7 md:grid md:grid-cols-12 md:items-baseline md:gap-6 md:py-9"
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

          <span className="font-mono text-micro uppercase tracking-[0.14em] text-ink-mute md:col-span-2">
            {project.year}
          </span>

          <span className="flex items-center gap-3 font-mono text-micro uppercase tracking-[0.14em] md:col-span-1 md:justify-end">
            {project.status === 'live' ? (
              <span className="text-clay">Live</span>
            ) : (
              <span className="text-ink-mute">WIP</span>
            )}
            <span
              aria-hidden="true"
              className="hidden text-ink opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:opacity-100 md:inline"
            >
              →
            </span>
          </span>
        </Link>
      </Reveal>
    ))}
  </ul>
);

export default WorkIndex;
