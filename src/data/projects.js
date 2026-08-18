/**
 * Case-study schema.
 *
 *   slug      url segment for /work/:slug
 *   year      display string, used in the index column
 *   status    'live' | 'building'
 *   summary   one sentence, shown in the index
 *   context   why the work existed — the situation before
 *   approach  what was actually built, in order
 *   outcome   what changed. Keep this honest; add numbers only when measured.
 *   stack     technologies, shown as a plain list not badges
 *   role      your role and, where relevant, team shape
 *
 * NOTE: `outcome` entries are written from the original site copy. Where you
 * have real measurements (latency, conversion, verification time, cost),
 * replace these lines — specifics are the whole point of a case study.
 */

export const projects = [
  {
    slug: 'quantafons-hisaab',
    title: 'QuantaFONS Hisaab',
    domain: 'Expense management',
    year: '2026',
    // TODO: no public URL supplied yet. Add `link` and this page gains a
    // "Visit the live site" button automatically.
    status: 'live',
    link: null,
    role: 'Full-stack engineer',
    summary:
      'An enterprise expense platform with real-time budgeting, role-based dashboards, and approvals tracked as explicit state.',
    context: [
      'Expense management in most organisations is spread across spreadsheets, receipts, and email threads. The numbers only assemble themselves at month end — by which point the budget is already spent and a manager is reconciling history rather than making decisions.',
      'Hisaab was built so spending is visible while it is still happening, and so the people accountable for a budget can act on it in the same place they see it.',
    ],
    approach: [
      'Separate dashboards per role rather than one screen with permissions bolted on. An administrator, a manager, and someone filing a claim are asking genuinely different questions of the same data.',
      'Budget thresholds are adjustable at runtime, so a category can be tightened or loosened without waiting on a deploy.',
      'Approvals are modelled as explicit state, which means any expense can be traced from submission through to decision instead of ending in someone\'s inbox.',
      'Analytics built on Recharts — modular SVG charts rather than a canvas library, so figures stay legible, selectable, and exportable.',
      'Typed end to end under strict TypeScript. The shapes moving between budgets, expenses, and approvals are exactly where silent rounding and state bugs hide.',
    ],
    // TODO: replace with measured figures once you have them — approval
    // turnaround, time per reporting cycle, number of budgets tracked.
    outcome: [
      'Spending reads against budget in real time rather than at month end.',
      'Threshold changes and expense exports happen inside the product, not in a spreadsheet afterwards.',
    ],
    stack: ['React 19', 'TypeScript 5.8', 'Vite 6', 'Tailwind CSS 4', 'Recharts', 'Motion'],
  },
  {
    slug: 'travel-victor',
    title: 'Travel Victor',
    domain: 'Travel platform',
    year: '2025',
    status: 'live',
    link: 'https://travel-victor.vercel.app',
    role: 'Frontend architect',
    summary:
      'A booking flow rebuilt around the drop-off points, not the feature list.',
    context: [
      'The booking journey had too many steps and too little feedback. Users were leaving partway through — the expensive kind of loss, since they had already shown intent.',
      'The instinct in that situation is to redesign the pages. The more useful move was to find where people actually stopped.',
    ],
    approach: [
      'Collapsed the multi-step flow into a smaller number of decisions, deferring anything that did not block the booking.',
      'Made search and availability feel immediate — optimistic UI where safe, skeletons where not, and no unexplained spinners.',
      'Typed the API boundary end to end so malformed responses surface at build time rather than as a blank screen mid-booking.',
      'Treated mobile as the primary case rather than a breakpoint, because that is where the traffic was.',
    ],
    outcome: [
      'A discovery-to-booking path short enough to complete in one sitting.',
      'Interface state is now explicit at every step, so users always know whether the system is working or stuck.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'REST integrations'],
  },
  {
    slug: 'aabaliqa',
    title: 'Aabaliqa',
    domain: 'Enterprise automation',
    year: '2024',
    status: 'live',
    link: 'https://abaliqa.com/',
    role: 'Lead developer',
    summary:
      'Automation for back-office workflows that were blocking the business from scaling.',
    context: [
      'Core operations ran on manual handoffs — the kind of process that works at ten transactions a day and quietly breaks at a hundred. Growth was being limited by how fast people could re-key data.',
      'The constraint was that the existing process could not stop while it was being replaced.',
    ],
    approach: [
      'Mapped the manual workflow honestly first, including the undocumented exceptions people handled by memory. Those exceptions are usually the actual requirements.',
      'Automated the highest-volume, lowest-judgement steps first, leaving humans in the loop where judgement genuinely mattered.',
      'Built the automation as services behind a React operations console, so staff could see and override what the system decided.',
      'Rolled out per workflow rather than all at once, which kept every failure small.',
    ],
    outcome: [
      'Repetitive operational tasks now run without a person in the path.',
      'Staff moved from re-keying data to handling the exceptions the system flags.',
    ],
    stack: ['Python', 'FastAPI', 'TensorFlow', 'React'],
  },
  {
    slug: 'boost-plus',
    title: 'Boost+',
    domain: 'AI in education',
    year: '2026',
    status: 'building',
    link: null,
    role: 'AI engineer',
    summary:
      'An adaptive tutoring system that adjusts the curriculum to the student in real time.',
    context: [
      'Static course content treats every student identically, which means it is wrong for almost all of them — too slow for some, too fast for others, and unable to tell the difference.',
      'The goal is a system that notices where a specific student is struggling and changes what comes next.',
    ],
    approach: [
      'Modelling student state as something explicit and inspectable rather than hidden inside a prompt.',
      'Using the model for generation and explanation, but keeping progression logic in ordinary code where it can be tested.',
      'Caching aggressively — tutoring is repetitive by nature, and unbounded model calls are how these products die on cost.',
    ],
    outcome: [
      'In active development. This entry will get real numbers when there are real students behind them.',
    ],
    stack: ['OpenAI API', 'Python', 'Next.js', 'Redis'],
  },
  {
    slug: 'kvpda',
    title: 'KVPDA',
    domain: 'Data analytics',
    year: '2025',
    status: 'building',
    link: null,
    role: 'Data engineer',
    summary:
      'Turning unstructured petroleum data into something an analyst can actually read.',
    context: [
      'Insight generation was fully manual because the underlying data had no consistent shape. Every question meant starting from raw files again.',
    ],
    approach: [
      'Normalising the incoming data into a queryable schema before touching any visualisation.',
      'Building the dashboard against real analyst questions rather than a generic chart library tour.',
    ],
    outcome: ['In active development.'],
    stack: ['Python (pandas)', 'Django', 'D3.js', 'SQL'],
  },
  {
    slug: 'lily',
    title: 'Lily',
    domain: 'Healthcare',
    year: '2025',
    status: 'building',
    link: null,
    role: 'Backend engineer',
    summary:
      'A secure exchange layer for medical data between systems that were never designed to talk.',
    context: [
      'Patient data was moving between systems without consistent security or a shared format — the combination that turns an integration project into a compliance problem.',
    ],
    approach: [
      'Designing to a compliance baseline from the first commit rather than retrofitting it before launch.',
      'Containerised services with explicit boundaries, so access to patient records is auditable at the edges.',
    ],
    outcome: ['In active development.'],
    stack: ['Node.js', 'MongoDB', 'Docker', 'AWS'],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const featured = projects.filter((p) => p.status === 'live');
