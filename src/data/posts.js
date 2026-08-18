export const posts = [
  {
    slug: 'building-scalable-enterprise-solutions',
    title: 'Building Scalable Enterprise Solutions',
    date: '2026-01-02',
    category: 'Engineering',
    excerpt:
      'Scalability is not about handling more users. It is about building systems that can still change after they are load-bearing.',
    content: `Scalability isn't just about handling more users — it's about building systems that can evolve with business needs. Here are the takeaways I keep returning to.

## The foundation: database design matters

When building for scale, your schema becomes your most critical asset. I've seen projects fail because they started with a schema that couldn't handle growth. The principles I follow:

- **Normalization vs performance**: finding the balance between data integrity and query speed
- **Indexing strategy**: knowing when and how to index for read/write performance
- **Migration planning**: designing schemas that can evolve without downtime

## Microservices vs monoliths

For most startups, a well-structured monolith will serve you better than premature microservices. The complexity of distributed systems outweighs the benefits until you have real scale. Consider splitting when:

- Different parts of the system have vastly different scaling requirements
- You need independent deployment cycles for different teams
- You're dealing with genuinely different stacks per domain

## Caching is your secret weapon

Redis isn't just for sessions. Strategic caching can cut database load dramatically. I implement it in layers:

- **Browser caching** for static assets
- **CDN caching** for global distribution
- **Application caching** for computed results
- **Query caching** for expensive operations

## Monitoring and observability

You can't scale what you can't measure. Comprehensive monitoring from day one has saved me countless hours of debugging. What I always track:

- Response times by endpoint
- Error rates and types
- Database connection pools
- Cache hit/miss ratios
- Infrastructure utilisation

Every decision should consider not just current needs, but how the system will grow. Scale comes from smart design, not heroic effort.`,
    tags: ['Architecture', 'Databases', 'Scale'],
  },
  {
    slug: 'my-journey-into-full-stack-development',
    title: 'My Journey into Full Stack Development',
    date: '2025-12-28',
    category: 'Personal',
    excerpt:
      'From curiosity about how websites work to building complete systems — the path, and what I would tell someone starting it.',
    content: `Every developer has a unique journey. Mine started with curiosity about how websites work and turned into a habit of building complete systems.

## The beginning: HTML and CSS

Like most people, I started with the basics. HTML and CSS seemed simple — just markup and styling. But building my first sites taught me how much sits beneath the surface. Positioning, responsive design, and cross-browser behaviour taught me attention to detail.

## JavaScript: the game changer

Adding interactivity opened a new world. jQuery made DOM manipulation accessible, but I moved to vanilla JavaScript to understand the fundamentals. Closures, prototypes, and asynchronous programming were hard and worth it.

## Backend: the other side

My first backend work was in PHP. Simple CRUD applications taught me server-side logic, databases, and security. Then Node.js changed everything — one language across the whole stack.

## The full stack mindset

Being full stack isn't about knowing every technology. It's about understanding the whole system. I learned to:

- Design APIs that frontend developers actually enjoy consuming
- Build UIs that respect backend constraints
- Optimise queries before optimising components
- Apply security practices across the stack, not at one layer

## Adding AI to the picture

The most interesting recent stretch has been integrating AI into real applications — from small assistive features to retrieval systems. Working with model APIs changed what I consider buildable.

## What I'd tell someone starting

1. **Start with fundamentals** — master the basics before chasing frameworks
2. **Build things** — theory is useful, shipping teaches faster
3. **Read other people's code** — open source is free mentorship
4. **Stay curious** — the stack will keep moving
5. **Focus on problem-solving** — the specific technology matters less than you think

Every project still teaches me something. The goal is keeping the original curiosity while building the depth that complex systems demand.`,
    tags: ['Career', 'Personal'],
  },
  {
    slug: 'the-future-of-ai-in-software-development',
    title: 'The Future of AI in Software Development',
    date: '2025-12-20',
    category: 'Engineering',
    excerpt:
      'Generative AI changed my workflow before it changed my architecture. Here is where it actually helps, and where it quietly costs you.',
    content: `Working on AI implementation, I've watched generative models move from novelty to daily tooling. Here is where they genuinely help — and where the cost shows up later.

## Code generation, beyond autocomplete

Modern models generate whole functions and scaffolds from a description. What it changed for me:

- **Rapid prototyping**: describe the shape, get something runnable
- **Learning acceleration**: explanations and examples on demand
- **Bug triage**: fast first hypotheses on common failures

## Testing

This is where the leverage is most underrated:

- **Test case generation** for the paths you didn't think to cover
- **Visual regression** catching UI drift humans skim past
- **Performance analysis** surfacing bottlenecks worth measuring properly
- **Security scanning** as a first pass, never the last word

## Architecture, with a caveat

Models are useful for enumerating options — patterns, trade-offs, technology comparisons. They are not useful for deciding, because they don't carry your constraints. The decision stays yours.

## The partnership

AI doesn't replace developers; it changes where your attention goes. The results come from knowing:

- How to specify a problem precisely
- When to verify rather than trust
- Which routine work to hand over so you can spend attention on the parts that need judgement

## The things worth worrying about

- **Ownership** of generated code
- **Bias** carried through suggestions
- **Security**: generated code can introduce vulnerabilities that look idiomatic
- **Skill atrophy**: the fundamentals still decide whether you can debug what you shipped

My working prediction: the developers who do best will be the ones who use these tools heavily while keeping the judgement that tells them when the output is wrong.`,
    tags: ['AI', 'Tooling', 'Practice'],
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const categories = ['All', ...new Set(posts.map((p) => p.category))];

/** ~200 wpm, rounded up. */
export const readingTime = (text) => `${Math.max(1, Math.ceil(text.split(/\s+/).length / 200))} min read`;

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
