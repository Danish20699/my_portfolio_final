import { Link } from 'react-router-dom';
import Headline from '../components/motion/Headline';
import Reveal from '../components/motion/Reveal';
import WorkIndex from '../components/WorkIndex';
import Testimonials from '../components/Testimonials';
import TextLoop from '../components/motion/TextLoop';
import { featured } from '../data/projects';
import { posts, formatDate } from '../data/posts';
import { site, capabilities, skills, coreSkills } from '../data/site';

const Home = () => (
  <>
    {/* ---------------------------------------------------------------- *
     * Hero — full-height ink. The site is a quiet paper world; this is the
     * one place it is allowed to be loud, and the step down into paper
     * immediately after is what gives the rest its calm.
     * ---------------------------------------------------------------- */}
    <section className="band-ink grain relative -mt-24 flex min-h-screen items-center overflow-hidden">
      {/* Portrait bleeds off the right edge, cropped to the face and faded
          into the ground so the headline keeps the left two-thirds clear. */}
      <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block" aria-hidden="true">
        <img
          src="/images/portrait.webp"
          alt=""
          className="h-full w-full object-cover object-[38%_30%] opacity-70"
          loading="eager"
          decoding="async"
        />
        <span className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="shell relative z-10 py-16">
        <div className="lg:max-w-[62%]">
          <Headline
            className="font-display-tight font-display text-display leading-[0.94] tracking-tightest text-paper"
            lines={['Software', 'that holds up', 'under real traffic.']}
            delay={0.15}
          />

          <Reveal delay={0.6} className="mt-10 max-w-measure">
            <p className="text-lead text-paper/75">{site.statement}</p>
          </Reveal>

          <Reveal delay={0.72} className="mt-11 flex flex-wrap items-center gap-4">
            <Link to="/work" className="btn-invert">
              Selected work
            </Link>
            <Link to="/contact" className="btn-ghost-invert">
              Get in touch
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue — the hero fills the screen, so the page needs to say
          there is more below it. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 flex justify-center font-mono text-micro uppercase tracking-[0.3em] text-paper-mute"
      >
        Scroll
      </span>
    </section>

    {/* ---------------------------------------------------------------- *
     * Selected work
     * ---------------------------------------------------------------- */}
    <section className="shell">
      <Reveal className="flex items-baseline justify-between border-b border-ink pb-5">
        <h2 className="font-display text-h2 tracking-tighter">Selected work</h2>
        <span className="eyebrow">In production</span>
      </Reveal>

      <div className="mt-6">
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
          <p className="eyebrow text-paper-mute">How I work</p>
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
     * Skills — a looping headline over the full, static list
     * ---------------------------------------------------------------- */}
    <section className="shell pt-band">
      <Reveal className="flex items-baseline justify-between border-b border-ink pb-5">
        <h2 className="font-display text-h2 tracking-tighter">Skills</h2>
        <span className="eyebrow">Toolkit</span>
      </Reveal>

      <Reveal className="mt-10">
        <p className="font-display text-h2 leading-[1.1] tracking-tightest text-ink">
          Mostly writing{' '}
          <TextLoop items={coreSkills} className="font-display text-clay" />
        </p>
      </Reveal>

      {/*
        Was four full-width ruled rows at 787px — the tallest block on the page,
        for the least persuasive content on it. Same information, three columns,
        roughly a third of the height, so the work outweighs the keyword list.
      */}
      <dl className="mt-12 grid gap-x-gutter gap-y-9 border-t border-paper-edge pt-9 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((row, i) => (
          <Reveal key={row.group} delay={i * 0.04}>
            <dt
              className={[
                'font-mono text-micro uppercase tracking-[0.14em]',
                row.learning ? 'text-clay' : 'text-ink-mute',
              ].join(' ')}
            >
              {row.group}
            </dt>
            <dd className="mt-2.5">
              <p
                className={[
                  'text-body',
                  row.learning ? 'text-ink-mute' : 'text-ink',
                ].join(' ')}
              >
                {row.items.join(' · ')}
              </p>
            </dd>
          </Reveal>
        ))}
      </dl>

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
              {/* Tools deliberately omitted here — the Skills section directly
                  above already lists them, and repeating them on the same
                  screen reads as padding. About still shows them per capability. */}
              <dd className="md:col-span-8">
                <p className="max-w-measure text-body text-ink-soft">{c.body}</p>
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
