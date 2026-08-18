import Reveal from './motion/Reveal';
import { testimonials } from '../data/testimonials';

const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

/**
 * Renders nothing while `testimonials` is empty — which is the default.
 * The previous version of this site shipped three invented people with stock
 * avatars; an absent section is better than a fabricated one.
 */
const Testimonials = () => {
  if (!testimonials.length) return null;

  return (
    <section className="shell pt-band">
      <Reveal className="flex items-baseline justify-between border-b border-ink pb-5">
        <h2 className="font-display text-h2 tracking-tighter">What people say</h2>
        <span className="eyebrow">{testimonials.length} quotes</span>
      </Reveal>

      <ul className="border-t border-paper-edge">
        {testimonials.map((t, i) => (
          <Reveal as="li" key={t.name} delay={i * 0.05}>
            <figure className="grid gap-5 border-b border-paper-edge py-10 md:grid-cols-12 md:gap-6">
              <figcaption className="flex items-center gap-4 md:col-span-4 md:flex-col md:items-start md:gap-3">
                {t.image ? (
                  <img
                    src={t.image}
                    alt=""
                    width="56"
                    height="56"
                    loading="lazy"
                    className="h-14 w-14 object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 items-center justify-center bg-clay-wash font-mono text-meta text-clay-deep"
                  >
                    {initials(t.name)}
                  </span>
                )}
                <span>
                  <span className="block font-display text-h3 tracking-tighter text-ink">
                    {t.source ? (
                      <a href={t.source} target="_blank" rel="noopener noreferrer" className="link">
                        {t.name}
                      </a>
                    ) : (
                      t.name
                    )}
                  </span>
                  <span className="mt-1 block font-mono text-micro uppercase tracking-[0.14em] text-ink-mute">
                    {t.role}
                  </span>
                </span>
              </figcaption>

              <blockquote className="md:col-span-8">
                <p className="max-w-measure text-lead text-ink-soft">“{t.text}”</p>
              </blockquote>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
};

export default Testimonials;
