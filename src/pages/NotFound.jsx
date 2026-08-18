import { Link } from 'react-router-dom';
import Headline from '../components/motion/Headline';
import Reveal from '../components/motion/Reveal';
import usePageMeta from '../hooks/usePageMeta';

const NotFound = () => {
  usePageMeta({ title: 'Not found — Danish Nazir', description: 'That page does not exist.' });

  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-band">
      <p className="eyebrow">Error 404</p>

      <Headline
        as="h1"
        className="font-display-tight mt-6 font-display text-display tracking-tightest text-ink"
        lines={['Nothing here.']}
      />

      <Reveal delay={0.3} className="mt-8 max-w-measure">
        <p className="text-lead text-ink-soft">
          The page moved, or it never existed. Both happen.
        </p>
      </Reveal>

      <Reveal delay={0.4} className="mt-10 flex flex-wrap gap-4">
        <Link to="/" className="btn">
          Back home
        </Link>
        <Link to="/work" className="btn-ghost">
          See the work
        </Link>
      </Reveal>
    </section>
  );
};

export default NotFound;
