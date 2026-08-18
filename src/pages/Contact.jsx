import PageHeader from '../components/PageHeader';
import Reveal from '../components/motion/Reveal';
import ContactForm from '../components/ContactForm';
import { site } from '../data/site';
import usePageMeta from '../hooks/usePageMeta';

const Contact = () => {
  usePageMeta({
    title: 'Contact — Danish Nazir',
    description: 'Get in touch about a project, a role, or a system that needs untangling.',
  });

  return (
    <>
      <PageHeader
        eyebrow={site.availability.open ? site.availability.label : 'Contact'}
        title={['Tell me what', 'is breaking.']}
        lead="Or what you want to build. Either way — a short note about the problem, the constraints, and the timeline is enough to start."
      />

      <section className="shell">
        <div className="grid gap-12 border-t border-ink pt-12 lg:grid-cols-12 lg:gap-gutter">
          <Reveal className="lg:col-span-7">
            <a
              href={`mailto:${site.email}`}
              className="group block font-display text-h2 tracking-tightest text-ink transition-colors duration-300 hover:text-clay"
            >
              {site.email}
              <span
                aria-hidden="true"
                className="ml-3 inline-block text-clay transition-transform duration-500 ease-editorial group-hover:translate-x-2"
              >
                →
              </span>
            </a>

            <p className="mt-8 max-w-measure text-body text-ink-soft">
              I read everything and reply to anything with a real project behind it, usually within a
              couple of days. For anything faster, WhatsApp is the better channel.
            </p>

            <div className="mt-12 border-t border-paper-edge pt-12">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5">
            <dl className="space-y-8">
              <div>
                <dt className="eyebrow">Elsewhere</dt>
                <dd className="mt-4 space-y-2.5">
                  {site.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-baseline justify-between gap-6 border-b border-paper-edge pb-2.5 text-meta text-ink transition-colors duration-300 hover:text-clay"
                    >
                      <span>{s.label}</span>
                      <span className="font-mono text-micro text-ink-mute">{s.handle}</span>
                    </a>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="eyebrow">Based in</dt>
                <dd className="mt-3 text-meta text-ink-soft">{site.location}</dd>
              </div>

              <div>
                <dt className="eyebrow">Background</dt>
                <dd className="mt-3">
                  <a
                    href={site.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-meta"
                  >
                    Read the résumé ↗
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
