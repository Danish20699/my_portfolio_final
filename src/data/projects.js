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
    slug: 'eliigen',
    title: 'EliiGen',
    domain: 'Learning platform',
    // TODO: confirm the year — assumed from the current stack versions.
    year: '2026',
    status: 'live',
    // TODO: add the public URL and this page gains a "Visit the live site" button.
    link: null,
    role: 'Backend & infrastructure engineer',
    summary:
      'A learning platform carrying the whole student lifecycle — enrollment and payments, live lectures, study material, and real-time community — behind a Flutter app on a NestJS backend.',
    context: [
      'EliiGen exists to close the gap between students, educators, and genuinely interactive digital learning. It carries the full student lifecycle: discovering a course, enrolling in and paying for a batch, following a timetable, joining live lectures, reading study material, and taking part in the community around it.',
      'The product surface is wide — recorded and live classes, WebSocket chat and announcements, gamified daily quizzes with streaks and badges, an AI study assistant for doubt resolution, and Razorpay checkout that provisions enrollment the moment payment clears. My remit was the layer underneath all of it: the data model, the caching, the APIs the mobile client speaks to, and getting the whole thing into production.',
    ],
    approach: [
      'Designed normalised relational schemas in PostgreSQL 16 with TypeORM — automated migrations, custom seeds, connection pooling, and indexing on the entities that actually take traffic: users, batches, lectures, enrollments, quizzes.',
      'Put Redis 7 in front of hot reads and moved the heavy work — media uploads, push notifications, analytics — onto BullMQ background workers, so request latency stopped tracking the slowest task in the chain.',
      'Ran Socket.io through the Redis adapter, so live chat and announcements survive horizontal scaling rather than breaking the moment a second instance appears.',
      'Built the REST and WebSocket surface the Flutter client consumes via Dio and Riverpod, with typed models and error-handling interceptors instead of optimistic parsing.',
      'Hardened authentication: access JWT paired with Redis-stored refresh token rotation, role-based access control across student, teacher and admin, plus Helmet, bcrypt, CORS, and Throttler rate limiting against brute force.',
      'Dockerised the multi-service stack — API gateway, BullMQ worker, Redis, PostgreSQL, and an Nginx reverse proxy terminating SSL — and wired GitHub Actions to deploy to Google Cloud Run for zero-downtime releases.',
      'Added the things you only miss at 2am: /health diagnostics, global exception filters, connection pooling, and structured logging.',
    ],
    // TODO: add measured figures — API p95 before/after the queue work,
    // concurrent users during live lectures, deploy frequency.
    outcome: [
      'Running in production on Google Cloud Run, deployed continuously from GitHub Actions.',
      'Background work sits off the request path, so response times no longer degrade when uploads and notifications queue up.',
      'Sessions, rate limits, and real-time state all live in Redis, which is what lets the API scale sideways rather than vertically.',
    ],
    stack: ['NestJS', 'PostgreSQL 16', 'Redis 7', 'Flutter', 'Docker', 'Google Cloud Run'],
    stackDetail: [
      {
        group: 'Mobile app',
        items: ['Flutter', 'Dart', 'Riverpod', 'Dio', 'Chewie / Video Player', 'Syncfusion PDF', 'Shimmer', 'Flutter Animate'],
      },
      { group: 'Web portal', items: ['Next.js', 'TypeScript', 'Tailwind CSS'] },
      { group: 'Backend', items: ['NestJS', 'Node.js', 'Express', 'Domain-driven modules'] },
      { group: 'Data', items: ['PostgreSQL 16', 'TypeORM', 'Migrations & seeding', 'Connection pooling', 'Query indexing'] },
      { group: 'Caching & queues', items: ['Redis 7', 'BullMQ', 'Session management', 'Rate limiting'] },
      { group: 'Real-time', items: ['Socket.io', '@socket.io/redis-adapter'] },
      {
        group: 'Cloud & DevOps',
        items: ['Docker & Compose', 'Google Cloud Run', 'Nginx (proxy & SSL)', 'GitHub Actions CI/CD'],
      },
      {
        group: 'Third-party',
        items: ['Razorpay', 'Firebase (FCM, Auth, Crashlytics)', 'Google Cloud Storage', 'Resend', 'Swagger / OpenAPI'],
      },
      {
        group: 'Security',
        items: ['JWT with refresh rotation', 'Bcrypt', 'Helmet', 'Throttler', 'CORS', 'RBAC'],
      },
    ],
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
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const featured = projects.filter((p) => p.status === 'live');
