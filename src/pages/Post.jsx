import { Link, Navigate, useParams } from 'react-router-dom';
import Headline from '../components/motion/Headline';
import Reveal from '../components/motion/Reveal';
import Prose from '../components/Prose';
import { getPost, posts, formatDate, readingTime } from '../data/posts';
import usePageMeta from '../hooks/usePageMeta';

const Post = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  usePageMeta({
    title: post ? `${post.title} — Danish Nazir` : 'Not found',
    description: post?.excerpt,
  });

  if (!post) return <Navigate to="/writing" replace />;

  const index = posts.findIndex((p) => p.slug === slug);
  const next = posts[(index + 1) % posts.length];

  return (
    <article>
      <header className="shell pb-12 pt-10 md:pt-16">
        <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link to="/writing" className="eyebrow transition-colors hover:text-ink">
            ← Writing
          </Link>
          <span className="eyebrow" aria-hidden="true">/</span>
          <span className="eyebrow">{post.category}</span>
        </Reveal>

        <Headline
          as="h1"
          className="font-display-tight mt-8 max-w-[16ch] font-display text-h1 tracking-tightest text-ink"
          lines={[post.title]}
          delay={0.1}
        />

        <Reveal delay={0.35} className="mt-8 flex flex-wrap gap-x-7 gap-y-2 border-t border-paper-edge pt-6">
          <span className="eyebrow">{formatDate(post.date)}</span>
          <span className="eyebrow">{readingTime(post.content)}</span>
          <span className="eyebrow">{post.tags.join(' · ')}</span>
        </Reveal>
      </header>

      <div className="shell">
        <Reveal>
          <Prose content={post.content} />
        </Reveal>
      </div>

      <section className="shell pt-band">
        <Link to={`/writing/${next.slug}`} className="group block border-t border-ink pt-10">
          <span className="eyebrow">Read next</span>
          <div className="mt-4 flex items-baseline justify-between gap-6">
            <h2 className="max-w-[18ch] font-display text-h2 tracking-tightest text-ink transition-transform duration-500 ease-editorial group-hover:translate-x-2">
              {next.title}
            </h2>
            <span
              aria-hidden="true"
              className="font-display text-h2 text-clay transition-transform duration-500 ease-editorial group-hover:translate-x-2"
            >
              →
            </span>
          </div>
        </Link>
      </section>
    </article>
  );
};

export default Post;
