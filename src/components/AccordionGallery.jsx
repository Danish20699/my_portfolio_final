import { useState } from 'react';
import Reveal from './motion/Reveal';
import Lightbox from './Lightbox';

/**
 * Horizontal accordion for screenshots.
 *
 * A plain accordion collapses each item to a sliver, which is fine for
 * photographs and useless for admin UI — every collapsed panel of a dashboard
 * app shows the same strip of sidebar. Two changes make it work here:
 *
 *  - Collapsed panels carry a vertical LABEL, so you browse by screen name
 *    rather than by guessing at a 60px slice of pixels.
 *  - Clicking the already-open panel opens the lightbox, because a screenshot
 *    at half width is a preview, not something you can actually read.
 *
 * Below `md` the accordion is abandoned entirely for a stacked list. There is
 * no width to spend on a horizontal accordion on a phone.
 */
const AccordionGallery = ({ items = [], heading = 'Screens' }) => {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  if (!items.length) return null;

  const onPanelClick = (i) => {
    if (i === active) setOpenIndex(i);
    else setActive(i);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActive((v) => (v + 1) % items.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActive((v) => (v - 1 + items.length) % items.length);
    }
  };

  return (
    <>
      {/*
        Full width rather than the left-rail grid every other section uses.
        Inside the rail the open panel measured 464px, which is not enough to
        read an admin screen — and this is the one section on the site whose
        job is being looked at rather than read.
      */}
      <Reveal className="border-t border-paper-edge py-10 md:py-14">
        <h2 className="eyebrow mb-6">{heading}</h2>

        <div>
          {/* ---- desktop: labelled accordion ---- */}
          <div
            className="hidden gap-1.5 md:flex md:h-[26rem] lg:h-[30rem]"
            role="group"
            aria-label={`${heading}: use the arrow keys to move between screens`}
            onKeyDown={onKeyDown}
          >
            {items.map((img, i) => {
              const isActive = i === active;
              return (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => onPanelClick(i)}
                  aria-expanded={isActive}
                  aria-label={
                    isActive ? `${img.label}: open full size` : `Show ${img.label}`
                  }
                  className={[
                    'group relative overflow-hidden border border-paper-edge bg-paper-deep',
                    'transition-[flex-grow] duration-[700ms] ease-editorial',
                    isActive ? 'flex-[6] cursor-zoom-in' : 'flex-[0.55] cursor-pointer',
                  ].join(' ')}
                >
                  {/*
                    Open: object-contain, so the whole screen is legible rather
                    than centre-cropped.
                    Collapsed: cover, positioned into the CONTENT area. Anchored
                    left it showed the app's sidebar in every panel — eight
                    identical strips of navigation and no way to tell them apart.
                  */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className={[
                      'h-full w-full transition-opacity duration-500',
                      isActive
                        ? 'object-contain object-center opacity-100'
                        : 'object-cover object-[42%_top] opacity-40 group-hover:opacity-65',
                    ].join(' ')}
                  />

                  {/* Collapsed: vertical label. This is the whole point. */}
                  <span
                    className={[
                      'pointer-events-none absolute inset-0 flex items-end justify-center bg-ink/45 transition-opacity duration-500',
                      isActive ? 'opacity-0' : 'opacity-100',
                    ].join(' ')}
                  >
                    <span
                      className="mb-5 whitespace-nowrap font-mono text-micro uppercase tracking-[0.18em] text-paper"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      {img.label}
                    </span>
                  </span>

                  {/* Expanded: name plus an affordance for the lightbox */}
                  <span
                    className={[
                      'pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-3 pt-10 transition-opacity duration-500',
                      isActive ? 'opacity-100' : 'opacity-0',
                    ].join(' ')}
                  >
                    <span className="font-mono text-micro uppercase tracking-[0.16em] text-paper">
                      {img.label}
                    </span>
                    <span className="font-mono text-micro uppercase tracking-[0.16em] text-paper/70">
                      Click to enlarge
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Caption for the open panel, below the rail so it never covers the UI */}
          <p className="mt-5 hidden max-w-measure text-meta text-ink-soft md:block">
            {items[active].caption}
          </p>

          {/* ---- mobile: stacked, no accordion ---- */}
          <ul className="grid gap-8 md:hidden">
            {items.map((img, i) => (
              <li key={img.src}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="block w-full text-left"
                  aria-label={`${img.label}: open full size`}
                >
                  <span className="mb-2 block font-mono text-micro uppercase tracking-[0.16em] text-ink-mute">
                    {img.label}
                  </span>
                  <span className="block overflow-hidden border border-paper-edge bg-paper-deep">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="block w-full"
                    />
                  </span>
                  <span className="mt-2.5 block text-meta text-ink-soft">{img.caption}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
};

export default AccordionGallery;
