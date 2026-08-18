export const site = {
  name: 'Danish Nazir',
  // One title, used everywhere. Previously the site claimed four different ones.
  role: 'Software Engineer',
  location: 'Kashmir, India — working remotely',
  email: 'danishpersonal6@gmail.com',
  phone: '+91 70067 98511',
  resume: '/resume.html',

  // The positioning line. Concrete, first-person, no superlatives.
  statement:
    'I build the parts of a product that have to keep working — identity, payments, data pipelines, the things that page someone at 3am when they break.',

  intro: [
    'I work across the stack, mostly on systems that carry real traffic and real consequences: a digital identity platform, a travel booking engine, automation for an enterprise back office.',
    'The interesting problems are rarely the features. They are the retries, the migrations, the schema you chose eighteen months ago, and the failure mode nobody wrote down. That is the work I like.',
  ],

  availability: {
    open: true,
    label: 'Open to select projects',
  },

  socials: [
    { label: 'GitHub', href: 'https://github.com/Danish20699', handle: '@Danish20699' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/danish-nazir1', handle: 'danish-nazir1' },
    { label: 'Instagram', href: 'https://www.instagram.com/danishn.29/', handle: '@danishn.29' },
    { label: 'WhatsApp', href: 'https://wa.me/917006798511', handle: '+91 70067 98511' },
  ],

  nav: [
    { label: 'Work', to: '/work' },
    { label: 'About', to: '/about' },
    { label: 'Writing', to: '/writing' },
  ],
};

// Grouped for the About page capability table.
export const capabilities = [
  {
    title: 'Product engineering',
    body: 'End-to-end feature work on React and Next.js front ends backed by Node or Python services. Comfortable owning something from schema to ship.',
    tools: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Tailwind'],
  },
  {
    title: 'Systems & data',
    body: 'Relational schema design, caching, background jobs, and the API contracts between them. Most of my time goes here.',
    tools: ['PostgreSQL', 'MongoDB', 'Redis', 'REST', 'FastAPI', 'Django'],
  },
  {
    title: 'Applied AI',
    body: 'LLM features that survive contact with production — retrieval, evaluation, cost control, and graceful degradation when the model is wrong.',
    tools: ['OpenAI API', 'LangChain', 'PyTorch', 'Retrieval', 'Evals'],
  },
  {
    title: 'Delivery',
    body: 'Containerised deploys, preview environments, and the boring reliability work that keeps a launch from becoming an incident.',
    tools: ['Docker', 'AWS', 'Vercel', 'Git', 'Linux', 'CI/CD'],
  },
];

/**
 * Skills.
 *
 * Taken from RESUME_DRAFT.md, which deliberately separates what you work in
 * from what you are currently learning. That distinction is kept here — the
 * looping headline only cycles `core`, because claiming fluency in something
 * you are still picking up is the kind of thing that gets caught in an
 * interview.
 */
export const skills = [
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind', 'SASS', 'HTML & CSS'],
  },
  {
    group: 'Backend & data',
    items: ['Node.js', 'Python', 'Django', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'REST APIs'],
  },
  {
    group: 'Tooling',
    items: ['Docker', 'Git', 'Linux & CLI', 'Vercel', 'AWS', 'Postman'],
  },
  {
    group: 'Practice',
    items: ['API design', 'Database modelling', 'Performance tuning', 'Secure auth flows'],
  },
  {
    group: 'Currently learning',
    items: ['PyTorch', 'TensorFlow', 'OpenAI API', 'LangChain', 'CI/CD pipelines', 'Kubernetes'],
    learning: true,
  },
];

/** What the headline cycles through. Confident ground only. */
export const coreSkills = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Next.js',
  'AWS',
];

export const education = [
  {
    title: 'Bachelor of Computer Applications',
    org: 'University of Kashmir',
    detail: 'Data structures, algorithms, software engineering, database management.',
  },
  {
    title: 'Complete Frontend 2.0 · Introduction to Java',
    org: 'Skill-Lync',
    detail: 'Certification track, alongside self-directed work in JavaScript, React, and Python.',
  },
];

export const offDuty = [
  'Trekking the Kashmir valley, usually further than planned.',
  'Photography — the gallery below is mine, not stock.',
  'Strategy games, which are just systems design with a scoreboard.',
];
