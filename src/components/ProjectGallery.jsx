import { useState } from 'react';
import Reveal from './motion/Reveal';
import Lightbox from './Lightbox';

/**
 * Screenshot grid for a case study. Renders nothing when a project has no
 * `gallery`, so the six existing case studies are unaffected until images
 * are added to `public/work/<slug>/`.
 */
const ProjectGallery = ({ items = [], title }) => {
  const [openIndex, setOpenIndex] = useState(null);

  if (!items.length) return null;

  return (
    <>
      <Reveal className="grid gap-4 border-t border-paper-edge py-10 md:grid-cols-12 md:gap-6 md:py-14">
        <h2 className="eyebrow md:col-span-3 md:pt-1.5">Screens</h2>

        <div className="md:col-span-9">
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((img, i) => (
              <li key={img.src} className={items.length % 2 === 1 && i === 0 ? 'sm:col-span-2' : ''}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="group block w-full text-left"
                  aria-label={`Open image ${i + 1}: ${img.alt}`}
                >
                  {/*
                    Fixed aspect with object-contain, so a portrait phone shot
                    and a wide dashboard shot sit in the same grid without one
                    of them running to 800px tall. The lightbox shows each image
                    whole and uncropped.
                  */}
                  <span className="flex aspect-[4/3] items-center justify-center overflow-hidden border border-paper-edge bg-paper-deep p-3">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.02]"
                    />
                  </span>
                  {img.caption && (
                    <span className="mt-2.5 block text-meta text-ink-mute transition-colors duration-300 group-hover:text-ink">
                      {img.caption}
                    </span>
                  )}
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
        title={title}
      />
    </>
  );
};

export default ProjectGallery;
