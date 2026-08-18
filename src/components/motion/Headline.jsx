import { motion, useReducedMotion } from 'motion/react';

/**
 * Display headline that rises line-by-line from behind a mask.
 *
 * Lines are authored explicitly (pass an array) rather than word-split, so the
 * line breaks are a typographic decision instead of whatever the viewport
 * happens to do. This is the one piece of showy motion on the site.
 */
const Headline = ({ lines, className = '', as: Tag = 'h1', delay = 0 }) => {
  const reduced = useReducedMotion();
  const items = Array.isArray(lines) ? lines : [lines];

  return (
    <Tag className={className}>
      {items.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          {reduced ? (
            <span className="block">{line}</span>
          ) : (
            <motion.span
              className="block will-change-transform"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.05,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * 0.09,
              }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
};

export default Headline;
