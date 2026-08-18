import { Link, Navigate, useParams } from 'react-router-dom';
import Headline from '../components/motion/Headline';
import Reveal from '../components/motion/Reveal';
import { getProject, projects } from '../data/projects';
import usePageMeta from '../hooks/usePageMeta';

const Section = ({ label, children }) => (
  <Reveal className="grid gap-4 border-t border-paper-edge py-10 md:grid-cols-12 md:gap-6 md:py-14">
    <h2 className="eyebrow md:col-span-3 md:pt-1.5">{label}</h2>
    <div className="space-y-5 md:col-span-8 lg:col-span-7">{children}</div>
  </Reveal>
);

const CaseStudy = () => {
  const { slug } = useParams();
  const project = getProject(slug);

  usePageMeta({
    title: project ? `${project.title} — Danish Nazir` : 'Not found',
    description: project?.summary,
  });

  if (!project) return <Navigate to="/work" replace />;

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <header className="shell pb-12 pt-10 md:pt-16">
        <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link to="/work" className="eyebrow transition-colors hover:text-ink">
            ← Work
          </Link>
          <span className="eyebrow text-paper-edge">/</span>
          <span className="eyebrow">{project.domain}</span>
        </Reveal>

        <Headline
          as="h1"
          className="font-display-tight mt-8 font-display text-display tracking-tightest text-ink"
          lines={[project.title]}
          delay={0.1}
        />

        <Reveal delay={0.35} className="mt-8 max-w-measure">
          <p className="text-lead text-ink-soft">{project.summary}</p>
        </Reveal>

        {/* Fact table — the details a reader scans for first */}
        <Reveal delay={0.45}>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-ink pt-8 sm:grid-cols-4">
            {[
              { k: 'Role', v: project.role },
              { k: 'Year', v: project.year },
              { k: 'Status', v: project.status === 'live' ? 'In production' : 'In development' },
              { k: 'Stack', v: project.stack.join(', ') },
            ].map(({ k, v }) => (
              <div key={k}>
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-2 text-meta text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {project.link && (
          <Reveal delay={0.55} className="mt-10">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn">
              Visit the live site
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        )}
      </header>

      <div className="shell">
        <Section label="Context">
          {project.context.map((p, i) => (
            <p key={i} className="text-body text-ink-soft">
              {p}
            </p>
          ))}
        </Section>

        <Section label="Approach">
          <ol className="space-y-6">
            {project.approach.map((p, i) => (
              <li key={i} className="flex gap-5">
                <span className="mt-1 shrink-0 font-mono text-micro text-clay">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-body text-ink-soft">{p}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section label="Outcome">
          {project.outcome.map((p, i) => (
            <p key={i} className="text-body text-ink-soft">
              {p}
            </p>
          ))}
        </Section>

        {/* Only projects that supply a grouped breakdown get this — the fact
            table above already carries the headline stack for the rest. */}
        {project.stackDetail && (
          <Reveal className="grid gap-4 border-t border-paper-edge py-10 md:grid-cols-12 md:gap-6 md:py-14">
            <h2 className="eyebrow md:col-span-3 md:pt-1.5">Full stack</h2>
            <dl className="md:col-span-9">
              {project.stackDetail.map((row) => (
                <div
                  key={row.group}
                  className="grid gap-1 border-b border-paper-edge py-4 last:border-b-0 sm:grid-cols-12 sm:gap-5"
                >
                  <dt className="font-mono text-micro uppercase tracking-[0.14em] text-ink-mute sm:col-span-4 sm:pt-1">
                    {row.group}
                  </dt>
                  <dd className="sm:col-span-8">
                    <ul className="flex flex-wrap gap-x-4 gap-y-1">
                      {row.items.map((item) => (
                        <li key={item} className="text-meta text-ink">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>

      {/* Next project */}
      <section className="shell pt-band">
        <Link
          to={`/work/${next.slug}`}
          className="group block border-t border-ink pt-10"
        >
          <span className="eyebrow">Next project</span>
          <div className="mt-4 flex items-baseline justify-between gap-6">
            <h2 className="font-display text-h2 tracking-tightest text-ink transition-transform duration-500 ease-editorial group-hover:translate-x-2">
              {next.title}
            </h2>
            <span
              aria-hidden="true"
              className="font-display text-h2 text-clay transition-transform duration-500 ease-editorial group-hover:translate-x-2"
            >
              →
            </span>
          </div>
          <p className="mt-2 max-w-measure text-body text-ink-soft">{next.summary}</p>
        </Link>
      </section>
    </article>
  );
};

export default CaseStudy;
