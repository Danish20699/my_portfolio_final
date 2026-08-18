import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

/**
 * Modal image viewer.
 *
 * Accessibility is the whole reason this is a component rather than a div with
 * a click handler: focus moves in on open and returns to the thumbnail that
 * opened it, Tab is trapped inside, Escape closes, and the arrow keys move
 * between images. Background scroll is locked while it is open.
 */
const Lightbox = ({ items, index, onClose, onIndexChange }) => {
  const open = index !== null;
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const reduced = useReducedMotion();

  const count = items.length;
  const go = useCallback(
    (step) => onIndexChange((index + step + count) % count),
    [index, count, onIndexChange]
  );

  // Remember what had focus, restore it on close.
  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement;
      closeRef.current?.focus();
    } else if (returnFocusRef.current instanceof HTMLElement) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && count > 1) {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' && count > 1) {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'Tab') {
        // Trap focus inside the panel.
        const focusables = panelRef.current?.querySelectorAll(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, go, count]);

  const item = open ? items[index] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 px-gutter py-6"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index + 1} of ${count}`}
          ref={panelRef}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-micro uppercase tracking-[0.16em] text-paper-mute">
              {index + 1} / {count}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="border border-paper/25 px-4 py-2 font-mono text-micro uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:border-clay-light hover:text-clay-light"
            >
              Close
            </button>
          </div>

          <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 py-5">
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-full min-h-0 w-auto max-w-full object-contain"
            />
            {item.caption && (
              <figcaption className="max-w-measure text-center text-meta text-paper/70">
                {item.caption}
              </figcaption>
            )}
          </figure>

          {count > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="border border-paper/25 px-5 py-2 font-mono text-micro uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:border-clay-light hover:text-clay-light"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="border border-paper/25 px-5 py-2 font-mono text-micro uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:border-clay-light hover:text-clay-light"
              >
                Next →
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
