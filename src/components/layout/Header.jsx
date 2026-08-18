import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { site } from '../../data/site';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu on navigation, and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const navClass = ({ isActive }) =>
    [
      'font-mono text-micro uppercase tracking-[0.16em] transition-colors duration-300',
      isActive ? 'text-clay' : 'text-ink-mute hover:text-ink',
    ].join(' ');

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-micro focus:uppercase focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-editorial',
          scrolled ? 'bg-paper/85 backdrop-blur-md' : 'bg-transparent',
        ].join(' ')}
      >
        <div
          className={[
            'shell flex items-center justify-between transition-all duration-500 ease-editorial',
            scrolled ? 'h-16' : 'h-24',
          ].join(' ')}
        >
          <Link
            to="/"
            className="group flex items-baseline gap-3"
            aria-label={`${site.name} — home`}
          >
            <span className="font-display text-[1.35rem] leading-none tracking-tighter text-ink">
              Danish Nazir
            </span>
            <span className="hidden font-mono text-micro uppercase tracking-[0.16em] text-ink-mute sm:block">
              {site.role}
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {site.nav.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-micro uppercase tracking-[0.16em] text-ink-mute transition-colors duration-300 hover:text-ink"
            >
              Résumé
            </a>
            <Link
              to="/contact"
              className="border-b border-ink pb-0.5 font-mono text-micro uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-clay hover:text-clay"
            >
              Get in touch
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2.5 font-mono text-micro uppercase tracking-[0.16em] text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? 'Close' : 'Menu'}
            <span className="flex h-3 w-4 flex-col justify-between" aria-hidden="true">
              <span
                className={[
                  'h-px w-full bg-ink transition-transform duration-300 ease-editorial',
                  open ? 'translate-y-[5.5px] rotate-45' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'h-px w-full bg-ink transition-opacity duration-200',
                  open ? 'opacity-0' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'h-px w-full bg-ink transition-transform duration-300 ease-editorial',
                  open ? '-translate-y-[5.5px] -rotate-45' : '',
                ].join(' ')}
              />
            </span>
          </button>
        </div>
        <div
          className={[
            'shell transition-opacity duration-500',
            scrolled ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        >
          <div className="rule" />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-paper px-gutter pb-12 pt-28 md:hidden"
            initial={reduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {[...site.nav, { label: 'Get in touch', to: '/contact' }].map((item, i) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'flex items-baseline justify-between border-b border-paper-edge py-5 font-display text-h2 tracking-tighter transition-colors',
                      isActive ? 'text-clay' : 'text-ink',
                    ].join(' ')
                  }
                >
                  {item.label}
                  <span className="font-mono text-micro text-ink-mute">
                    0{i + 1}
                  </span>
                </NavLink>
              ))}
            </nav>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-micro uppercase tracking-[0.16em] text-ink-mute"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
