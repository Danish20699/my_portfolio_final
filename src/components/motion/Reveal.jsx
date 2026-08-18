import { motion, useReducedMotion } from 'motion/react';

/**
 * Scroll-triggered reveal. Deliberately restrained: a short rise and a fade,
 * once, never replayed. No blur, no rotation, no per-word scrub — those read
 * as effects rather than as design.
 */
const Reveal = ({ children, as = 'div', delay = 0, y = 18, className = '', once = true }) => {
  const reduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
