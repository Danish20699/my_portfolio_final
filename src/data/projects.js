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
 *   featured     set false to keep a project off the homepage while still
 *                listing it in full on /work
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
    role: 'Full-stack developer',
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
    // Screens from the running admin portal, captured against the live Cloud
    // Run deployment. Two of them carried real student names and
    // phone-number-derived emails; those regions are redacted in the files.
    galleryStyle: 'accordion',
    cover: {
      src: '/work/eliigen/admin-dashboard.webp',
      alt: 'EliiGen admin dashboard showing 15 students, 1 teacher, 1 program and 2 batches, with students-per-program and students-per-batch breakdowns',
    },
    gallery: [
      {
        src: '/work/eliigen/admin-dashboard.webp',
        label: 'Dashboard',
        alt: 'Admin dashboard with totals for students, teachers, programs and batches, plus per-program and per-batch distribution bars and quick actions',
        caption:
          'The operator view: who is enrolled, in which programme, on which batch. The distribution bars are the question an administrator actually asks — not how many students exist, but where they landed.',
      },
      {
        src: '/work/eliigen/manage-batches.webp',
        label: 'Batches',
        alt: 'Batch management table showing a paid Neet batch at ₹8,000 with a ₹1,500 discount and 30-day validity, and a free Neet batch with lifetime validity, both published',
        caption:
          'Pricing, discount, validity and publish state on one row. A paid batch at ₹8,000 less ₹1,500 sits beside a free one with lifetime access — the same enrollment path has to handle both, which is where the Razorpay flow either holds up or does not.',
      },
      {
        src: '/work/eliigen/manage-students.webp',
        label: 'Students',
        alt: 'Student management screen with a create-student form, a reassign panel for moving a student between programme and batch, and a list of active students',
        caption:
          'Creating a student and reassigning one are deliberately separate. Reassignment touches enrollment, access and billing state, so it is not something to bury inside an edit form. Student identities are redacted here.',
      },
      {
        src: '/work/eliigen/manage-teachers.webp',
        label: 'Teachers',
        alt: 'Teacher management with a create-teacher form and panels for assigning batches and subjects to a teacher',
        caption:
          'Teachers are scoped to batches and subjects rather than given blanket access. This is the role-based access control from the Approach section, seen from the side that administers it.',
      },
      {
        src: '/work/eliigen/manage-subjects.webp',
        label: 'Subjects',
        alt: 'Subject management screen for adding a subject to a programme and batch, with filters for reviewing existing subjects',
        caption:
          'Subjects hang off a programme and a batch, not off a global list. It is a more annoying schema to write and the only one that survives two programmes wanting a subject called Physics.',
      },
      {
        src: '/work/eliigen/notifications.webp',
        label: 'Broadcast',
        alt: 'Broadcast notification composer with an audience toggle for all students or all teachers, a title field and a message body with a character counter',
        caption:
          'Broadcasts go out through Firebase Cloud Messaging to the mobile client. The audience toggle is two options on purpose — a send-to-everyone button with fine-grained targeting is how an announcement reaches the wrong batch.',
      },
      {
        src: '/work/eliigen/app-banners.webp',
        label: 'Banners',
        alt: 'App banner manager with local upload or image URL, title and subtitle, an order index, and an optional batch link',
        caption:
          'Banners on the mobile home slider are content, not a deploy. Order index and an optional deep link to a batch mean marketing can run a promotion without an app release.',
      },
      {
        src: '/work/eliigen/admin-users.webp',
        label: 'Users & roles',
        alt: 'Admin user management table listing accounts with role and status, filters for role and status, and a deactivate action per row',
        caption:
          'Every account with its role and status, and deactivation rather than deletion — you cannot delete a user who has enrollments and payment history behind them. Names and emails are redacted.',
      },
      {
        src: '/work/eliigen/support.webp',
        label: 'Support',
        alt: 'Support ticket dashboard with filters for all, pending, in progress, resolved and closed tickets',
        caption:
          'Tickets move through an explicit lifecycle. Same instinct as the rest of the system: model the state, do not infer it from whether someone replied.',
      },
      {
        src: '/work/eliigen/manage-programs.webp',
        label: 'Programs',
        alt: 'Programme management screen listing NEET as a top-level learning programme',
        caption:
          'The top of the hierarchy — programme, then batch, then subject. NEET is the live one; the structure is what lets a second exam track be added without a migration.',
      },
      {
        src: '/work/eliigen/sign-in.webp',
        label: 'Sign in',
        alt: 'The EliiGen sign-in screen with email or student ID, password, and a Google sign-in option',
        caption:
          'The student-facing entry point. Everything past it is gated by the dual-token auth described above.',
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
    slug: 'one-command-deploy',
    title: 'One-Command Deploy',
    domain: 'Infrastructure automation',
    year: '2026',
    status: 'live',
    link: 'https://github.com/Danish20699/portfolio-shell-automation',
    role: 'Sole author',
    summary:
      'A shell script that provisions a fresh Ubuntu server over SSH and deploys a PostgreSQL-backed PHP site onto it, in one command.',
    context: [
      'Standing up a server for a PHP application by hand runs to roughly thirty steps: package installs, a database to create and seed, permissions to set at several levels, environment variables to write, a web server to restart. It is tolerable once and untenable by the third time, because the mistake always lives in step thirty.',
      'The target was a single command from a control machine, and a server that lands in a known state whether it is freshly imaged or already half-configured.',
    ],
    approach: [
      'SSH key-pair authentication (ed25519) between the control machine and each target, so a run is unattended. Targets are an array of addresses — adding a machine means adding a line.',
      'Passwordless sudo configured on the target through a drop-in under /etc/sudoers.d/ rather than piping a password over SSH. A piped SSH command gets no TTY, so interactive sudo simply hangs; the drop-in is also what production automation actually does.',
      'Instead of piping the script over SSH, the target runs its own local copy after a git pull. A piped script loses its working directory — $0 does not resolve — and pull-then-run is both idempotent and the shape CI/CD uses underneath.',
      'Everything written to be re-runnable: DROP IF EXISTS before create, installs that no-op when already satisfied. Running twice leaves the same machine as running once, which is the property that separates a provisioning script from a one-shot.',
      'Handled an apt failure honestly rather than hiding it: the VM clock sat behind the mirror metadata, producing "Release file is not valid yet". Made non-fatal, because a stale index should not abort a provision.',
      'PostgreSQL could not read init.sql out of a home directory, since Linux home directories are private to their owner. Staged the file through /tmp rather than loosening permissions on $HOME.',
      'Traced "permission denied for table" to PostgreSQL requiring grants at schema, table and sequence level separately — a database-level GRANT on its own is not enough.',
    ],
    outcome: [
      'One command takes a fresh Ubuntu machine to a serving site, replacing roughly thirty manual steps.',
      'Re-running is safe, so the script is a way to converge a server rather than something you only dare run once.',
      'Scaling to more machines is a line in an array, because the orchestration is one control host driving N targets.',
    ],
    stack: ['Bash', 'SSH', 'PostgreSQL', 'PHP', 'Apache', 'Ubuntu'],
    stackDetail: [
      { group: 'Automation', items: ['Bash', 'SSH (ed25519)', 'sudoers drop-ins', 'Idempotent scripts', 'Git'] },
      { group: 'Server', items: ['Ubuntu', 'Apache', 'systemd', 'PHP'] },
      { group: 'Data', items: ['PostgreSQL', 'Seeded init.sql', 'Schema / table / sequence grants'] },
      { group: 'Environment', items: ['VirtualBox', 'NAT + host-only networking'] },
    ],
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
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

// Homepage shows production work only. `featured: false` keeps a project
// off it without hiding it from /work.
export const featured = projects.filter((p) => p.status === 'live' && p.featured !== false);
