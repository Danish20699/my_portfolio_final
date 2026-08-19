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
 * Optional:
 *   stackDetail  [{ group, items }] — grouped stack table on the case study
 *   accessNote   one line shown in place of the live-site button, for work
 *                that is real but not publicly reachable
 *   cover        { src, alt } — full-width plate under the title
 *   gallery      [{ src, alt, caption }] — screenshot grid, opens a lightbox
 *
 * See public/work/README.md for how to add screenshots. Projects without
 * `cover` or `gallery` render exactly as they do now.
 *
 * NOTE: `outcome` entries are written from the original site copy. Where you
 * have real measurements (latency, conversion, verification time, cost),
 * replace these lines — specifics are the whole point of a case study.
 */

export const projects = [
  {
    slug: 'maktabah-maseehul-ummat',
    title: 'Maktabah Maseehul Ummat',
    domain: 'Point of sale & inventory',
    // TODO: confirm the year — assumed from the React 19 / Tailwind 4 stack.
    year: '2026',
    status: 'live',
    link: null,
    // Internal tool, so there is nothing to link. Saying that is better than
    // showing "In production" with no button and letting a reader wonder.
    accessNote: 'Internal system for the institution — not publicly reachable.',
    role: 'Full-stack engineer',
    summary:
      'A point-of-sale and stock system for an institutional bookstore, covering the till, the shelves, and the ledger that has to reconcile them.',
    context: [
      'Maktabah Maseehul Ummat is the bookstore and retail arm of Darul Uloom Bilaliya. The catalogue is an unusual mix: religious literature — Qurans, Hadith collections, Tafseer — alongside attars and stationery, each with its own turnover and reorder rhythm.',
      'The system had to do two jobs that normally live in separate products. It is a till at the counter, and it is the record of what is actually on the shelves behind it. Those two only stay in agreement if the same action does both.',
    ],
    approach: [
      'Billing decrements stock as part of completing a sale, not as a separate step someone has to remember. That single decision is what keeps the counter and the stock figure from drifting apart.',
      'Every movement lands on a ledger as IN, OUT or ADJUST. When a physical count disagrees with the system, the difference can be traced rather than argued about.',
      'Checkout is built for speed at a counter: search by SKU, name or category, per-item discounts, payment method, customer details, and a printable invoice.',
      'The product catalogue carries cost price and selling price separately, plus a minimum-stock threshold, so the dashboard can surface low stock and a real inventory valuation instead of just a count.',
      'CSV bulk import and export for the catalogue, because the opening stocktake for a bookshop is not something anyone should type in one row at a time.',
      'Reporting on Recharts — revenue, margin, and sales by category, filtered by day, week, month or a custom range, with CSV export for anything that needs to leave the system.',
      'Ships with an in-memory mock mode so it runs with no database configured at all, and switches to MySQL through a single DATABASE_URL. Setup at a place like this happens once; it should not require a database administrator.',
      'One-click JSON export plus scheduled daily or weekly local backups — the unglamorous feature that matters the first time a machine dies.',
    ],
    // TODO: add measured figures once you have them — items in the catalogue,
    // transactions per day, time saved on the monthly stocktake.
    outcome: [
      'Stock, sales and valuation come from one record instead of being reconciled between a till and a notebook.',
      'Discrepancies are explainable, because every adjustment is on the ledger with a reason attached.',
      'The system starts without configuration, which is what makes it usable by staff rather than only by whoever installed it.',
    ],
    stack: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'Express', 'MySQL', 'Recharts'],
    // Screens captured from the running system. Every shot carries the
    // mock-mode banner, which is left in deliberately -- it is evidence for
    // the in-memory mode described in Approach, not an apology.
    galleryStyle: 'accordion',
    cover: {
      src: '/work/maktabah-maseehul-ummat/dashboard.webp',
      alt: 'The Maktabah dashboard: product count, low-stock alerts, inventory value, monthly sales, restock list and recent transactions',
    },
    gallery: [
      {
        src: '/work/maktabah-maseehul-ummat/dashboard.webp',
        label: 'Dashboard',
        alt: 'Dashboard showing total products, low stock alerts, inventory value and sales for the month, with a restock list and recent transaction feed',
        caption:
          'The four numbers a shopkeeper opens the system for: what is in stock, what is about to run out, what it is all worth, and what sold this month. The yellow banner is the in-memory mode announcing itself — the system runs with no database configured at all.',
      },
      {
        src: '/work/maktabah-maseehul-ummat/billing-pos.webp',
        label: 'Billing / POS',
        alt: 'Point-of-sale screen with category filters, product cards showing price and stock, and a dark order panel with quantities, per-item discount, customer details and payment method',
        caption:
          'The till. Category filters and SKU search on the left, the running order on the right with per-item discounts, customer details, and cash or card in one tap.',
      },
      {
        src: '/work/maktabah-maseehul-ummat/receipt.webp',
        label: 'Receipt',
        alt: 'Completed sale receipt showing the institution header, invoice number, billed-to details, line items with SKUs, subtotal, discount and grand total',
        caption:
          'Completing a sale produces a printable receipt with an invoice number, and decrements stock at the same moment. One action, both records.',
      },
      {
        src: '/work/maktabah-maseehul-ummat/inventory.webp',
        label: 'Inventory',
        alt: 'Inventory table listing items with SKU, category, selling price, buy price, stock level and a low-stock warning, with CSV import and export controls',
        caption:
          'Cost price sits under selling price on every row, which is what lets the reports compute real margin rather than turnover. Bukhari Sharif is flagged in red — five in stock against a minimum of ten.',
      },
      {
        src: '/work/maktabah-maseehul-ummat/transactions.webp',
        label: 'Transactions',
        alt: 'Ledger of sales and purchases showing type, date, item, invoice number, customer, payment method, quantity, unit price and total',
        caption:
          'Every movement in one ledger — SALE, PURCHASE, ADJUST — with the invoice, the buyer, and the payment method attached. This is what makes a bad count traceable.',
      },
      {
        src: '/work/maktabah-maseehul-ummat/reports.webp',
        label: 'Reports',
        alt: 'Reports screen with date range and category filters, revenue, cost of goods, gross profit and margin figures, a revenue versus purchases chart and an inventory value doughnut',
        caption:
          'Revenue against cost of goods, so the headline is gross profit and a real 25.2% margin rather than turnover. Filter by range or category, then export exactly what is on screen.',
      },
      {
        src: '/work/maktabah-maseehul-ummat/categories.webp',
        label: 'Categories',
        alt: 'Category management table listing Holy Books, Hadith and Fragrance with item counts and creation dates',
        caption:
          'Categories are shared by the catalogue, the till filters, and the reports breakdown, so naming one thing renames it everywhere.',
      },
      {
        src: '/work/maktabah-maseehul-ummat/settings.webp',
        label: 'Settings',
        alt: 'Settings screen offering a one-click JSON database backup and a configurable automatic backup frequency',
        caption:
          'One-click JSON export plus scheduled local backups. Unglamorous, and the only feature that matters the first time a counter machine dies.',
      },
      {
        src: '/work/maktabah-maseehul-ummat/sign-in.webp',
        label: 'Sign in',
        alt: 'Sign-in screen with the institution name, a username and password form, and the note Authorized Personnel Only',
        caption:
          'Staff-only entry point. The system holds pricing, margin and takings, so it is not something to leave open on a shop counter.',
      },
    ],
    stackDetail: [
      {
        group: 'Frontend',
        items: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'Recharts', 'Lucide icons', 'react-to-print', 'PapaParse'],
      },
      { group: 'Backend', items: ['Node.js', 'Express', 'tsx runtime', 'Vite integration'] },
      { group: 'Data', items: ['MySQL', 'schema.sql', 'In-memory mock mode'] },
      {
        group: 'Modules',
        items: ['Dashboard', 'Billing & POS', 'Inventory', 'Categories', 'Ledger', 'Reports', 'Backups'],
      },
      { group: 'Data portability', items: ['CSV import & export', 'JSON database export', 'Scheduled local backups'] },
    ],
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
    link: 'https://eliigen-frontend-952243647103.us-central1.run.app',
    role: 'Backend & infrastructure engineer',
    summary:
      'A learning platform carrying the whole student lifecycle — enrollment and payments, live lectures, study material, and real-time community — behind a Flutter app on a NestJS backend.',
    context: [
      'EliiGen exists to close the gap between students, educators, and genuinely interactive digital learning. It carries the full student lifecycle: discovering a course, enrolling in and paying for a batch, following a timetable, joining live lectures, reading study material, and taking part in the community around it.',
      'It is aimed at competitive-exam preparation — students pick a study path such as JEE or NEET when they register, and the catalogue shapes itself around that. The product surface is wide: recorded and live classes, WebSocket chat and announcements, gamified daily quizzes with streaks and badges, an AI study assistant for doubt resolution, and Razorpay checkout that provisions enrollment the moment payment clears.',
      'My remit was the layer underneath all of it: the data model, the caching, the APIs the mobile client speaks to, and getting the whole thing into production.',
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
    // Captured from the live deployment. Everything past sign-in is gated, so
    // these are the public surface only — swap in product screens when you
    // have them (see public/work/README.md).
    cover: {
      src: '/work/eliigen/sign-in.webp',
      alt: 'The EliiGen sign-in screen: email or student ID, password, and a Google sign-in option',
    },
    gallery: [
      {
        src: '/work/eliigen/create-account.webp',
        alt: 'EliiGen registration form with name, email, password and a study-path selector',
        caption:
          'Registration captures the study path up front — JEE, NEET and similar — so a student lands in the right batches rather than an empty catalogue.',
      },
      {
        src: '/work/eliigen/sign-in-mobile.webp',
        alt: 'The EliiGen sign-in screen at phone width',
        caption:
          'The same entry point at phone width. Most of the traffic arrives through the Flutter client, so the web surface stays deliberately narrow.',
      },
    ],
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
