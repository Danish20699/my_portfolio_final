import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/motion/Reveal';
import DepthCarousel from '../components/DepthCarousel/DepthCarousel';
import { site, capabilities, education, offDuty } from '../data/site';
import { galleryImages } from '../data/gallery';
import usePageMeta from '../hooks/usePageMeta';

const About = () => {
  // DepthCarousel takes { image, alt }; the gallery data uses { src, alt }.
  const carouselItems = useMemo(
    () => galleryImages.map(({ src, alt }) => ({ image: src, alt })),
    []
  );

  usePageMeta({
    title: 'About — Danish Nazir',
    description:
      'Full-stack engineer based in Kashmir, working on production systems across retail, education, and infrastructure automation.',
  });

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={['I build the parts', 'that have to work.']}
        lead={site.intro[0]}
      />

      <section className="shell">
        <div className="grid gap-12 border-t border-ink pt-12 lg:grid-cols-12 lg:gap-gutter">
          <Reveal className="lg:col-span-7">
            <div className="prose-editorial">
              <p>{site.intro[1]}</p>
              <p>
                Before a line of code, I want to know what breaks and who it hurts. That framing
                decides the schema, the error handling, and how much of the system a person needs to
                understand before they can safely change it.
              </p>
              <p>
                I work well with small teams and founders who need someone to own a problem end to
                end rather than take a ticket. If that is the shape of what you need,{' '}
                <Link to="/contact" className="link">
                  say hello
                </Link>
                .
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn">
                Read the résumé
                <span aria-hidden="true">↗</span>
              </a>
              <Link to="/work" className="btn-ghost">
                See the work
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5">
            <figure>
              <div className="aspect-[4/5] w-full overflow-hidden bg-paper-deep">
                <img
                  src="/images/portrait.webp"
                  alt={site.name}
                  width="1000"
                  height="1250"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 font-mono text-micro uppercase tracking-[0.16em] text-ink-mute">
                {site.location}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="shell pt-band">
        <Reveal className="flex items-baseline justify-between border-b border-ink pb-5">
          <h2 className="font-display text-h2 tracking-tighter">Capabilities</h2>
          <span className="eyebrow">Where I'm useful</span>
        </Reveal>

        <dl className="border-t border-paper-edge">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="grid gap-3 border-b border-paper-edge py-8 md:grid-cols-12 md:gap-6">
                <dt className="font-display text-h3 tracking-tighter text-ink md:col-span-4">
                  {c.title}
                </dt>
                <dd className="md:col-span-5">
                  <p className="text-body text-ink-soft">{c.body}</p>
                </dd>
                <dd className="md:col-span-3">
                  <ul className="flex flex-wrap gap-x-3 gap-y-1.5 md:justify-end">
                    {c.tools.map((t) => (
                      <li
                        key={t}
                        className="font-mono text-micro uppercase tracking-[0.1em] text-ink-mute"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Education */}
      <section className="shell pt-band">
        <Reveal className="flex items-baseline justify-between border-b border-ink pb-5">
          <h2 className="font-display text-h2 tracking-tighter">Background</h2>
          <span className="eyebrow">Education</span>
        </Reveal>

        <ul className="border-t border-paper-edge">
          {education.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 0.05}>
              <div className="grid gap-2 border-b border-paper-edge py-8 md:grid-cols-12 md:gap-6">
                <p className="font-mono text-micro uppercase tracking-[0.14em] text-ink-mute md:col-span-3">
                  {e.org}
                </p>
                <div className="md:col-span-9">
                  <h3 className="font-display text-h3 tracking-tighter text-ink">{e.title}</h3>
                  <p className="mt-2 max-w-measure text-body text-ink-soft">{e.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Off duty — real photographs, not stock.
          Recessed ground because this is the one section that is not about
          work. The register change is the point; it is not decoration. */}
      <section className="band-paper mt-band">
        <div className="shell py-band">
        <Reveal className="flex items-baseline justify-between border-b border-ink pb-5">
          <h2 className="font-display text-h2 tracking-tighter">Off duty</h2>
          <span className="eyebrow">Photographs</span>
        </Reveal>

        <Reveal className="mt-8 max-w-measure">
          <ul className="space-y-2">
            {offDuty.map((line) => (
              <li key={line} className="flex gap-4 text-body text-ink-soft">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-clay" />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Width is capped so the arrows sit beside the stack rather than out
            at the page gutters, where they read as unrelated to it. */}
        <Reveal className="mx-auto mt-10 max-w-[46rem]">
          {/* Clip on the wrapper, not on .depth-carousel — overflow on the
              element that owns `perspective` flattens the 3D stack. */}
          <div className="h-[22rem] overflow-hidden sm:h-[25rem] md:h-[27rem]">
            <DepthCarousel
              items={carouselItems}
              cardWidth={270}
              cardHeight={338}
              radius={0}
              tint="#191713"
              depth={190}
              spread={74}
              tilt={20}
              blur={5}
              falloff={0.18}
              visibleCards={4}
              autoplay
              autoplayDelay={5000}
            />
          </div>
          <p className="mt-7 text-center font-mono text-micro uppercase tracking-[0.16em] text-ink-mute">
            Drag, swipe, or use the arrow keys
          </p>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default About;
