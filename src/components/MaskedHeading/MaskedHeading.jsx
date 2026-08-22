import { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

import './MaskedHeading.css';

/**
 * MaskedHeading — from React Bits (reactbits.dev), with four changes made for
 * this site. Each is noted at the code that implements it:
 *
 *   1. `lines`         authored line breaks, because the upstream component
 *                      splits on whitespace and cannot be told where to wrap.
 *   2. `fallbackColor` keeps solid text under the media, so the headline
 *                      survives the video failing, 404ing, or loading slowly.
 *   3. textScale = 0   hands font sizing back to CSS, so the Tailwind fluid
 *                      clamp() scale still drives the size.
 *   4. reduced motion  also silences the idle drift loop, not just the
 *                      entrance. Upstream leaves a rAF running forever.
 */

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const MaskedHeading = ({
  text = 'Designed in the details',
  lines = null,
  tag = 'h2',
  mediaType = 'image',
  src = '',
  poster = '',
  fillScale = 1.25,
  parallax = 26,
  drift = 18,
  brightness = 1,
  saturation = 1,
  grayscale = false,
  reveal = 'rise',
  duration = 1.1,
  stagger = 0.09,
  trigger = 'view',
  align = 'center',
  weight = 700,
  tracking = -0.03,
  lineHeight = 1.06,
  textScale = 0.115,
  fallbackColor = 'transparent',
  className = '',
  style,
  ...rest
}) => {
  const rootRef = useRef(null);
  const measureRef = useRef(null);
  const revealRef = useRef(null);
  const mediaRef = useRef(null);
  const wordRefs = useRef([]);
  const baseRefs = useRef([]);
  const glyphRefs = useRef([]);
  const tweenRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const clipId = `mh-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  /*
   * CHANGE 1 — authored line breaks.
   *
   * Upstream does `text.split(/\s+/)` and lets the container decide where to
   * wrap. This site's headline is three deliberate lines, and the component
   * it replaces says so in its own comment: line breaks are a typographic
   * decision, not whatever the viewport happens to do.
   *
   * `rows` is the render structure; `flat` is the positioning order. The word,
   * baseline and glyph refs are all indexed against `flat`, so a word's SVG
   * <text> stays paired with the DOM span it is measured from.
   */
  const rows = useMemo(() => {
    const source = Array.isArray(lines) && lines.length ? lines : [text];
    return source.map((line) => String(line).split(/\s+/).filter(Boolean));
  }, [lines, text]);

  const flat = useMemo(() => rows.flat(), [rows]);

  const settingsRef = useRef({});
  settingsRef.current = { fillScale, parallax, drift, brightness, saturation, grayscale, textScale };

  const place = useCallback(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!root || !media) return;
    const s = settingsRef.current;
    const W = root.clientWidth;
    const H = root.clientHeight;
    const off = offsetRef.current;

    const maxX = Math.max(0, ((s.fillScale - 1) / 2) * W);
    const maxY = Math.max(0, ((s.fillScale - 1) / 2) * H);

    media.style.transform = `translate3d(${clamp(off.x, -maxX, maxX).toFixed(2)}px, ${clamp(off.y, -maxY, maxY).toFixed(2)}px, 0) scale(${s.fillScale})`;
    media.style.filter = `brightness(${s.brightness}) saturate(${s.saturation})${s.grayscale ? ' grayscale(1)' : ''}`;
  }, []);

  const sync = useCallback(() => {
    const root = rootRef.current;
    const measure = measureRef.current;
    if (!root || !measure) return;
    const s = settingsRef.current;

    /*
     * CHANGE 3 — textScale of 0 means "leave the type size alone".
     *
     * Upstream always writes an inline font-size derived from container
     * width, which silently overrides the fluid clamp() scale the rest of
     * this site is set in. The hero has to stay on that scale to match the
     * other pages, so 0 opts out.
     */
    if (s.textScale > 0) {
      root.style.fontSize = `${clamp(root.clientWidth * s.textScale, 20, 200).toFixed(1)}px`;
    }

    const cs = window.getComputedStyle(measure);
    for (let i = 0; i < wordRefs.current.length; i += 1) {
      const box = wordRefs.current[i];
      const base = baseRefs.current[i];
      const glyph = glyphRefs.current[i];
      if (!box || !base || !glyph) continue;
      // offsetLeft/offsetTop resolve against the nearest positioned ancestor.
      // The root is position:relative and the line wrappers are static, so
      // these stay in root space even with the extra element per line.
      glyph.setAttribute('x', `${box.offsetLeft}`);
      glyph.setAttribute('y', `${base.offsetTop}`);
      glyph.style.fontFamily = cs.fontFamily;
      glyph.style.fontSize = cs.fontSize;
      glyph.style.fontWeight = cs.fontWeight;
      glyph.style.fontStyle = cs.fontStyle;
      glyph.style.letterSpacing = cs.letterSpacing;
    }
    place();
  }, [place]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(root);
    if (document.fonts?.ready) document.fonts.ready.then(sync).catch(() => {});

    /*
     * CHANGE 4 — reduced motion stops the idle loop too.
     *
     * Upstream only checks the preference for the entrance, and leaves a
     * requestAnimationFrame running for the lifetime of the page driving the
     * drift and parallax. On a hero that is the whole session. Everything
     * else on this site honours the preference, so this does too: no rAF, no
     * pointer tracking, one static placement.
     */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      place();
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = performance.now();
    let clock = 0;

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock += dt;
      const s = settingsRef.current;
      const off = offsetRef.current;

      const dx = Math.sin(clock * 0.21) * s.drift;
      const dy = Math.cos(clock * 0.17) * s.drift * 0.6;

      const ease = 1 - Math.exp(-dt / 0.18);
      off.x += (off.tx + dx - off.x) * ease;
      off.y += (off.ty + dy - off.y) * ease;

      place();
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      const s = settingsRef.current;
      if (s.parallax <= 0) return;
      const r = root.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / (r.width || 1)) * 2 - 1;
      const ny = ((e.clientY - r.top) / (r.height || 1)) * 2 - 1;
      offsetRef.current.tx = clamp(nx, -1, 1) * -s.parallax;
      offsetRef.current.ty = clamp(ny, -1, 1) * -s.parallax;
    };

    const onLeave = () => {
      offsetRef.current.tx = 0;
      offsetRef.current.ty = 0;
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, [place, sync]);

  useEffect(() => {
    sync();
  }, [sync, flat, tag, align, weight, tracking, lineHeight, textScale]);

  useEffect(() => {
    const root = rootRef.current;
    const layer = revealRef.current;
    if (!root || !layer) return;
    const glyphs = glyphRefs.current.filter(Boolean);
    if (!glyphs.length) return;

    const riseDistance = () => (parseFloat(window.getComputedStyle(root).fontSize) || 48) * 1.15;

    const settle = () => {
      gsap.set(glyphs, { y: 0 });
      gsap.set(layer, { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' });
    };

    const rest = () => {
      if (reveal === 'rise') {
        gsap.set(glyphs, { y: riseDistance() });
      } else if (reveal === 'wipe') {
        gsap.set(layer, { clipPath: 'inset(0% 100% 0% 0%)' });
      } else if (reveal === 'fade') {
        gsap.set(layer, { opacity: 0, scale: 1.08 });
      }
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reveal === 'none' || reduce) {
      settle();
      return;
    }

    const play = () => {
      tweenRef.current?.kill();
      if (reveal === 'rise') {
        gsap.set(layer, { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' });
        tweenRef.current = gsap.fromTo(
          glyphs,
          { y: riseDistance() },
          { y: 0, duration, stagger, ease: 'power4.out', overwrite: 'auto' }
        );
      } else if (reveal === 'wipe') {
        gsap.set(glyphs, { y: 0 });
        const state = { p: 100 };
        tweenRef.current = gsap.to(state, {
          p: 0,
          duration,
          ease: 'power3.inOut',
          overwrite: 'auto',
          onUpdate: () => {
            layer.style.clipPath = `inset(0% ${state.p}% 0% 0%)`;
          },
        });
      } else {
        gsap.set(glyphs, { y: 0 });
        tweenRef.current = gsap.fromTo(
          layer,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration, ease: 'power3.out', overwrite: 'auto' }
        );
      }
    };

    if (trigger === 'hover') {
      settle();
      root.addEventListener('pointerenter', play);
      return () => {
        root.removeEventListener('pointerenter', play);
        tweenRef.current?.kill();
      };
    }

    if (trigger === 'view') {
      settle();
      rest();
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            io.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      io.observe(root);
      return () => {
        io.disconnect();
        tweenRef.current?.kill();
      };
    }

    play();
    return () => tweenRef.current?.kill();
  }, [reveal, trigger, duration, stagger, flat]);

  const Tag = tag;

  // Flat index shared by the measure spans and the SVG glyphs, so row
  // structure never desynchronises the two.
  let cursor = -1;

  return (
    <Tag
      ref={rootRef}
      className={`masked-heading ${className}`.trim()}
      style={{
        textAlign: align,
        fontWeight: weight,
        letterSpacing: `${tracking}em`,
        lineHeight,
        ...style,
      }}
      {...rest}
    >
      {/*
        CHANGE 2 — the measure is not transparent here.

        Upstream paints it transparent, which means the media clipped to the
        letterforms IS the text. If the video 404s, is still downloading, or
        the codec is unsupported, the heading renders as nothing at all. That
        is an acceptable risk for a decorative section heading and not for the
        first line of the homepage, so solid text sits underneath and the
        media covers it exactly.
      */}
      <span ref={measureRef} className="masked-heading__measure" style={{ color: fallbackColor }}>
        {rows.map((row, r) => (
          <span key={`row-${r}`} className="masked-heading__line">
            {row.map((word) => {
              cursor += 1;
              const i = cursor;
              return (
                <span
                  key={`${word}-${i}`}
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  className="masked-heading__word"
                >
                  {word}
                  <i
                    ref={(el) => {
                      baseRefs.current[i] = el;
                    }}
                    className="masked-heading__baseline"
                  />
                </span>
              );
            })}
          </span>
        ))}
      </span>

      <svg className="masked-heading__defs" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            {flat.map((word, i) => (
              <text
                key={`${word}-${i}`}
                ref={(el) => {
                  glyphRefs.current[i] = el;
                }}
              >
                {word}
              </text>
            ))}
          </clipPath>
        </defs>
      </svg>

      <span ref={revealRef} className="masked-heading__reveal" aria-hidden="true">
        <span className="masked-heading__clip" style={{ clipPath: `url(#${clipId})` }}>
          <span ref={mediaRef} className="masked-heading__media">
            {mediaType === 'video' ? (
              <video
                className="masked-heading__source"
                src={src}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              <img className="masked-heading__source" src={src} alt="" draggable={false} />
            )}
          </span>
        </span>
      </span>
    </Tag>
  );
};

export default MaskedHeading;
