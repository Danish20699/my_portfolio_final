import { Link } from 'react-router-dom';
import { site } from '../../data/site';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="band-ink grain mt-band">
      <div className="shell py-16 md:py-24">
        {/* Contact call — the footer is the last chance, so it gets weight */}
        <div className="border-b border-ink-edge pb-14">
          <p className="eyebrow text-paper/45">Currently</p>
          <Link
            to="/contact"
            className="group mt-5 block font-display text-h1 leading-[0.95] tracking-tightest text-paper"
          >
            <span className="inline-block transition-transform duration-500 ease-editorial group-hover:translate-x-2">
              Let's talk
            </span>
            <span className="ml-4 inline-block text-clay transition-transform duration-500 ease-editorial group-hover:translate-x-4">
              →
            </span>
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block border-b border-paper/25 pb-1 font-mono text-meta text-paper/70 transition-colors duration-300 hover:border-clay hover:text-clay"
          >
            {site.email}
          </a>
        </div>

        {/* Colophon */}
        <div className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="eyebrow text-paper/40">Index</p>
            <ul className="mt-4 space-y-2">
              {[{ label: 'Home', to: '/' }, ...site.nav, { label: 'Contact', to: '/contact' }].map(
                (item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-meta text-paper/70 transition-colors duration-300 hover:text-clay"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-paper/40">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-meta text-paper/70 transition-colors duration-300 hover:text-clay"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-paper/40">Location</p>
            <p className="mt-4 max-w-[22ch] text-meta text-paper/70">{site.location}</p>
            {site.availability.open && (
              <p className="mt-4 flex items-center gap-2 font-mono text-micro uppercase tracking-[0.16em] text-clay">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />
                {site.availability.label}
              </p>
            )}
          </div>

          <div>
            <p className="eyebrow text-paper/40">Colophon</p>
            <p className="mt-4 max-w-[26ch] text-meta text-paper/60">
              Set in Fraunces and Instrument Sans. Built with React and Vite, deployed on Vercel.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink-edge pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-micro uppercase tracking-[0.16em] text-paper/40">
            © {year} {site.name}
          </p>
          <p className="font-mono text-micro uppercase tracking-[0.16em] text-paper/40">
            Built to ship. Designed to last.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
