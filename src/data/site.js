export const site = {
  name: 'Danish Nazir',
  // Positioning title, used for header, meta, JSON-LD and image alt. This is
  // deliberately NOT the same string as the QuantaFONS job title in
  // `experience` below -- that one is the actual role on the resume, this one
  // is how the site introduces him. Changing either does not imply the other.
  role: 'Full-Stack Engineer',
  location: 'Kashmir, India — working remotely',
  email: 'danishpersonal6@gmail.com',
  phone: '+91 70067 98511',
  resume: '/resume.html',

  // The positioning line. Names only domains that appear in projects.js --
  // re-check this whenever a project is added or removed.
  statement:
    'Full-stack engineer in Kashmir, working on point-of-sale, learning, and infrastructure systems. I build things properly the first time.',

  intro: [
    'I work across the stack, mostly on systems that carry real traffic and real consequences: a point-of-sale and stock system for an institutional bookstore, a learning platform serving exam-prep students, and the automation that puts them on a server.',
    'The interesting problems are rarely the features. They are the retries, the migrations, the schema you chose eighteen months ago, and the failure mode nobody wrote down. That is the work I like.',
  ],

  // Shown in the footer and as the /contact eyebrow. The QuantaFONS role
  // ended in July 2026, so this reads as a job search rather than freelance
  // availability. Flip `open` to false to hide the badge entirely.
  availability: {
    open: true,
    label: 'Open to full-time roles',
  },

  socials: [
    { label: 'GitHub', icon: 'github', href: 'https://github.com/Danish20699', handle: '@Danish20699' },
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com/in/danish-nazir1', handle: 'danish-nazir1' },
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/danishn.29/', handle: '@danishn.29' },
    { label: 'WhatsApp', icon: 'whatsapp', href: 'https://wa.me/917006798511', handle: '+91 70067 98511' },
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
    items: [
      'Machine learning',
      'Deep learning',
      'PyTorch',
      'TensorFlow',
      'MLOps',
      'Kubernetes',
      'Terraform',
      'Observability',
    ],
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

/*
 * Employment. Separate from `projects` on purpose: a project says what was
 * built, this says who was paying and for how long, and a reader looking to
 * hire wants both. The site had the first and none of the second.
 *
 * `roles` is an array because the QuantaFONS run was two titles, not one:
 * a six-month internship that converted to a full-time position. That
 * conversion is the most persuasive fact in the entry, so it is modelled
 * explicitly rather than flattened into a single date range. Newest first,
 * the way a reader scans it.
 *
 * The role ended in July 2026 -- past tense throughout, and no `worksFor`
 * in the JSON-LD, which would assert current employment.
 */
export const experience = [
  {
    company: 'QuantaFONS',
    period: 'Apr 2025 — Jul 2026',
    roles: [
      { title: 'Full-Stack Developer', period: 'Oct 2025 — Jul 2026' },
      { title: 'Full-Stack Developer, Intern', period: 'Apr 2025 — Sep 2025' },
    ],
    summary:
      'Joined as an intern, converted to full-time after six months. Built and shipped production web applications end to end, and stayed responsible for them after release.',
    points: [
      'Built web applications end to end — database schema, API layer, and frontend implementation.',
      'Integrated LLM APIs into existing applications to automate workflows that had been manual.',
      'Optimised existing codebases for performance: page load times and Core Web Vitals.',
      'Owned deployment and uptime for the systems I shipped, not just the code.',
    ],
  },
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
