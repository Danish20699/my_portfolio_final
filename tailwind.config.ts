import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Deliberately narrow, editorial scale — not the default Tailwind ramp.
    screens: {
      sm: '40rem',
      md: '52rem',
      lg: '68rem',
      xl: '84rem',
    },
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF7F2', // page
          deep: '#F1EBE1', // alternating bands
          edge: '#E7DFD2', // hairlines on paper
          // Muted text ON an ink band. paper/40 measured 3.23:1 and failed
          // WCAG AA at the 11px sizes it was used for; this is 5.73:1.
          mute: '#96918B',
        },
        ink: {
          DEFAULT: '#191713', // headings, contrast bands
          soft: '#4C463E', // body copy
          // Was #8B8378 — 3.50:1 on paper, which failed AA for the 11px
          // eyebrows, dates, tags and nav links that all use it. Now 4.98:1.
          mute: '#726A60', // metadata, captions
          edge: '#2E2A23', // hairlines on ink
        },
        clay: {
          DEFAULT: '#B14A2C', // the one accent — 5.06:1 on paper
          deep: '#8A3620',
          wash: '#F3E3DA',
          // The accent only reaches 3.31:1 against ink, so dark bands use a
          // lifted tint instead. 5.88:1.
          light: '#D87B58',
        },
        moss: '#3B4A3F',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Editorial scale, clamped for fluid type
        micro: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        meta: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        lead: ['clamp(1.15rem, 0.9rem + 1vw, 1.5rem)', { lineHeight: '1.5' }],
        h3: ['clamp(1.35rem, 1.1rem + 1vw, 1.75rem)', { lineHeight: '1.25' }],
        h2: ['clamp(1.9rem, 1.4rem + 2.2vw, 3rem)', { lineHeight: '1.12' }],
        h1: ['clamp(2.6rem, 1.6rem + 4.6vw, 5.5rem)', { lineHeight: '0.98' }],
        display: ['clamp(3.2rem, 1.5rem + 7vw, 8rem)', { lineHeight: '0.92' }],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.03em',
      },
      maxWidth: {
        measure: '38rem', // reading width
        shell: '80rem',
      },
      spacing: {
        gutter: 'clamp(1.25rem, 4vw, 4.5rem)',
        band: 'clamp(4.5rem, 9vw, 9rem)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'rule-in': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'rule-in': 'rule-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
