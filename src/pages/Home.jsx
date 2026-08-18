import { Link } from 'react-router-dom';
import Headline from '../components/motion/Headline';
import Reveal from '../components/motion/Reveal';
import WorkIndex from '../components/WorkIndex';
import Testimonials from '../components/Testimonials';
import { featured } from '../data/projects';
import { posts, formatDate } from '../data/posts';
import { site, capabilities } from '../data/site';

const Home = () => (
  <>
    {/* ---------------------------------------------------------------- *
     * Hero — asymmetric, type-led. No card, no glow, no tilt.
     * ---------------------------------------------------------------- */}
    <section className="shell pb-band pt-10 md:pt-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-gutter">
        <div className="lg:col-span-8">
          <Reveal className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.availability.open && (
              <span className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.18em] text-clay">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />
                {site.availability.label}
              </span>
            )}
            <span className="eyebrow">{site.location}</span>
          </Reveal>

          <Headline
            className="font-display-tight mt-8 font-display text-h1 tracking-tightest text-ink"
            lines={['Software that', 'holds up under', 'real traffic.']}
            delay={0.15}
          />

          <Reveal delay={0.5} className="mt-9 max-w-measure">
            <p className="text-lead text-ink-soft">{site.statement}</p>
          </Reveal>

          <Reveal delay={0.62} className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/work" className="btn">
              Selected work
            </Link>
            <Link to="/contact" className="btn-ghost">
              Get in touch
            </Link>
          </Reveal>
        </div>

        {/* Portrait — treated as an editorial plate, with a caption */}
        <Reveal delay={0.3} className="lg:col-span-4">
          <figure className="relative">
            <div className="aspect-[4/5] w-full overflow-hidden bg-paper-deep">
              <img
                src="/images/portrait.webp"
                alt={`${site.name}, ${site.role}`}
                width="1000"
                height="1250"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 h-16 w-16 border-b border-l border-clay"
            />
            <figcaption className="mt-4 flex items-baseline justify-between">
              <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink-mute">
                {site.name}
              </span>
              <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink-mute">
                {site.role}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>

    {/* ---------------------------------------------------------------- *
     * Selected work
     * ---------------------------------------------------------------- */}
    <section className="shell">
      <Reveal className="flex items-baseline justify-between border-b border-ink pb-5">
        <h2 className="font-display text-h2 tracking-tighter">Selected work</h2>
        <span className="eyebrow">In production</span>
      </Reveal>

      <div className="mt-2">
        <WorkIndex items={featured} />
      </div>

      <Reveal className="mt-10">
        <Link to="/work" className="link font-mono text-meta uppercase tracking-[0.12em]">
          All projects →
        </Link>
      </Reveal>
    </section>

    <Testimonials />

    {/* ---------------------------------------------------------------- *
     * Position statement — full-bleed ink band, one idea only
     * ---------------------------------------------------------------- */}
    <section className="band-ink grain mt-band">
      <div className="shell py-band">
        <Reveal>
          <p className="eyebrow text-paper/40">How I work</p>
          <blockquote className="mt-8 max-w-[22ch] font-display text-h1 leading-[1.02] tracking-tightest text-paper sm:max-w-[18ch]">
            Most systems don't fail at the feature. They fail at the edge nobody wrote down.
          </blockquote>
          <p className="mt-10 max-w-measure text-lead text-paper/65">
            So I spend my time on the unglamorous part — the retries, the migrations, the schema you
            have to live with two years later. It is slower at the start and much faster after that.
          </p>
        </Reveal>
      </div>
    </section>

    {/* ---------------------------------------------------------------- *
     * Capabilities — a table, not a badge cloud
     * ---------------------------------------------------------------- */}
    <section className="shell pt-band">
      <Reveal className="flex items-baseline justify-between border-b border-ink pb-5">
        <h2 className="font-display text-h2 tracking-tighter">What I do</h2>
        <span className="eyebrow">Capabilities</span>
      </Reveal>

      <dl className="border-t border-paper-edge">
        {capabilities.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <div className="grid gap-3 border-b border-paper-edge py-8 md:grid-cols-12 md:gap-6 md:py-10">
              <dt className="font-display text-h3 tracking-tighter text-ink md:col-span-4">
                <span className="mr-3 font-mono text-micro align-super text-ink-mute">
                  {String(i + 1).padStart(2, '0')}
                </span>
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

    {/* ---------------------------------------------------------------- *
     * Writing
     * ---------------------------------------------------------------- */}
    <section className="shell pt-band">
      <Reveal className="flex items-baseline justify-between border-b border-ink pb-5">
        <h2 className="font-display text-h2 tracking-tighter">Writing</h2>
        <span className="eyebrow">Notes</span>
      </Reveal>

      <ul className="border-t border-paper-edge">
        {posts.slice(0, 2).map((post, i) => (
          <Reveal as="li" key={post.slug} delay={i * 0.05}>
            <Link
              to={`/writing/${post.slug}`}
              className="group grid gap-3 border-b border-paper-edge py-8 md:grid-cols-12 md:gap-6"
            >
              <span className="font-mono text-micro uppercase tracking-[0.14em] text-ink-mute md:col-span-3">
                {formatDate(post.date)}
              </span>
              <div className="md:col-span-9">
                <h3 className="font-display text-h3 tracking-tighter text-ink transition-colors duration-300 group-hover:text-clay">
                  {post.title}
                </h3>
                <p className="mt-2 max-w-measure text-body text-ink-soft">{post.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10">
        <Link to="/writing" className="link font-mono text-meta uppercase tracking-[0.12em]">
          All writing →
        </Link>
      </Reveal>
    </section>
  </>
);

export default Home;
