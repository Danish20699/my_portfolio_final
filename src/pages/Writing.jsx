import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/motion/Reveal';
import { posts, categories, formatDate, readingTime } from '../data/posts';
import usePageMeta from '../hooks/usePageMeta';

const Writing = () => {
  const [filter, setFilter] = useState('All');

  usePageMeta({
    title: 'Writing — Danish Nazir',
    description: 'Notes on architecture, databases, applied AI, and the practice of building software.',
  });

  const visible = filter === 'All' ? posts : posts.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader
        eyebrow={`${posts.length} pieces`}
        title={['Notes on', 'building things.']}
        lead="Longer-form thinking about architecture, data, and where AI actually earns its place in a codebase."
        meta={
          <div className="flex flex-wrap gap-x-7 gap-y-2 border-t border-paper-edge pt-6">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={[
                  'font-mono text-micro uppercase tracking-[0.16em] transition-colors duration-300',
                  filter === c ? 'text-clay' : 'text-ink-mute hover:text-ink',
                ].join(' ')}
              >
                {c}
                <span className="ml-2 text-ink-mute/60">
                  {c === 'All' ? posts.length : posts.filter((p) => p.category === c).length}
                </span>
              </button>
            ))}
          </div>
        }
      />

      <section className="shell">
        <ul className="border-t border-ink">
          {visible.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 0.05}>
              <Link
                to={`/writing/${post.slug}`}
                className="group grid gap-3 border-b border-paper-edge py-9 md:grid-cols-12 md:gap-6 md:py-11"
              >
                <div className="flex gap-4 font-mono text-micro uppercase tracking-[0.14em] text-ink-mute md:col-span-3 md:flex-col md:gap-1.5">
                  <span>{formatDate(post.date)}</span>
                  <span>{readingTime(post.content)}</span>
                </div>

                <div className="md:col-span-8">
                  <h2 className="font-display text-h3 tracking-tighter text-ink transition-colors duration-300 group-hover:text-clay">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 max-w-measure text-body text-ink-soft">{post.excerpt}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                    {post.tags.map((t) => (
                      <li
                        key={t}
                        className="font-mono text-micro uppercase tracking-[0.1em] text-ink-mute"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <span
                  aria-hidden="true"
                  className="hidden text-ink opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:opacity-100 md:col-span-1 md:block md:text-right"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        {visible.length === 0 && (
          <p className="py-16 text-center text-body text-ink-mute">Nothing filed under {filter} yet.</p>
        )}
      </section>
    </>
  );
};

export default Writing;
