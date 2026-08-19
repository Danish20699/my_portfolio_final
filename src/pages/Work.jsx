import PageHeader from '../components/PageHeader';
import WorkIndex from '../components/WorkIndex';
import Reveal from '../components/motion/Reveal';
import { projects } from '../data/projects';
import usePageMeta from '../hooks/usePageMeta';

const Work = () => {
  usePageMeta({
    title: 'Work — Danish Nazir',
    description:
      'Case studies from production systems: point-of-sale and inventory, travel booking, learning platforms, and enterprise automation.',
  });

  const live = projects.filter((p) => p.status === 'live');
  const building = projects.filter((p) => p.status === 'building');

  return (
    <>
      <PageHeader
        eyebrow={`${projects.length} projects`}
        title={['Things I have', 'built and shipped.']}
        lead="Each entry covers the situation before the work, what was actually built, and what changed. Where a project is still in progress, it says so."
      />

      <section className="shell">
        <Reveal className="flex items-baseline justify-between border-b border-ink pb-5">
          <h2 className="font-display text-h3 tracking-tighter">In production</h2>
          <span className="eyebrow">{live.length} live</span>
        </Reveal>
        <div className="mt-2">
          <WorkIndex items={live} />
        </div>
      </section>

      <section className="shell pt-band">
        <Reveal className="flex items-baseline justify-between border-b border-ink pb-5">
          <h2 className="font-display text-h3 tracking-tighter">In progress</h2>
          <span className="eyebrow">{building.length} building</span>
        </Reveal>
        <div className="mt-2">
          <WorkIndex items={building} />
        </div>
      </section>
    </>
  );
};

export default Work;
