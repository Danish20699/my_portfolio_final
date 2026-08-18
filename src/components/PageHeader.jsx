import Headline from './motion/Headline';
import Reveal from './motion/Reveal';

const PageHeader = ({ eyebrow, title, lead, meta }) => (
  <header className="shell pb-14 pt-10 md:pb-20 md:pt-16">
    <Reveal>
      <p className="eyebrow">{eyebrow}</p>
    </Reveal>

    <Headline
      as="h1"
      className="font-display-tight mt-6 font-display text-h1 tracking-tightest text-ink"
      lines={Array.isArray(title) ? title : [title]}
      delay={0.1}
    />

    {lead && (
      <Reveal delay={0.35} className="mt-8 max-w-measure">
        <p className="text-lead text-ink-soft">{lead}</p>
      </Reveal>
    )}

    {meta && (
      <Reveal delay={0.45} className="mt-10">
        {meta}
      </Reveal>
    )}
  </header>
);

export default PageHeader;
