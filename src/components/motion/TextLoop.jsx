import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

/**
 * Cycles through a list of words in place.
 *
 * Two things this deliberately does:
 *
 *  - Reserves the width of the longest item, so the surrounding sentence does
 *    not reflow on every tick. A headline that jitters is worse than no motion.
 *  - Hides itself from assistive tech (`aria-hidden`). The words are decorative
 *    here because the complete, unabridged list is rendered directly beneath
 *    it — a screen reader gets the real thing rather than one word at random.
 *
 * Under `prefers-reduced-motion` it renders the first item and stops.
 */
const TextLoop = ({ items, interval = 1900, className = '' }) => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || items.length < 2) return undefined;
    const id = setInterval(() => setIndex((v) => (v + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval, reduced]);

  if (reduced) {
    return <span className={className}>{items[0]}</span>;
  }

  return (
    <span
      aria-hidden="true"
      // The mask needs overflow:hidden, which crops descenders — the "j" in
      // "Next.js" lost its tail. Pad the box out and pull the same amount back
      // off the margin so the extra room does not disturb the baseline.
      className="relative inline-grid overflow-hidden pb-[0.18em] align-bottom"
      style={{ verticalAlign: 'bottom', marginBottom: '-0.18em' }}
    >
      {/*
        Invisible sizers: every item stacked in the same grid cell, so the cell
        is as wide as the widest RENDERED word. Picking the longest string by
        character count is not the same measurement — "TypeScript" and
        "PostgreSQL" are both ten characters and 50px apart in Fraunces, which
        made the headline jump on each tick.
      */}
      {items.map((item, i) => (
        <span
          key={`sizer-${i}`}
          className={`invisible col-start-1 row-start-1 whitespace-nowrap ${className}`}
        >
          {item}
        </span>
      ))}

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className={`col-start-1 row-start-1 whitespace-nowrap ${className}`}
          initial={{ y: '95%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-95%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default TextLoop;
