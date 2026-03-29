import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProjectCard from './components/ProjectCard';
import { projects } from './projectsData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import TiltedCard from './components/TiltedCard/TiltedCard';
import ProfileCard from './components/ProfileCard';
import ScrollReveal from './components/ScrollReveal';
import BorderGlow from './components/BorderGlow';
import { blogPosts } from './blogData';

const Home = () => {
  const location = useLocation();

  // Handle initial hash scroll from other pages
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          const navbarHeight = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location]);

  // Setup click listeners and intersection observer
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navbarHeight = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update URL without jump
          window.history.pushState(null, '', href);
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Scroll Animation Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.animate-hidden');
    hiddenElements.forEach(el => observer.observe(el));

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      hiddenElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content animate-hidden">
            <div className="hero-grid">
              <div className="hero-text-content">
                <span className="hero-role">&lt;FullStack, AI & Machine Learning Engineer /&gt;</span>
                <ScrollReveal
                  baseOpacity={0.8}
                  enableBlur
                  baseRotation={1}
                  blurStrength={15}
                  containerClassName="hero-title"
                  wordAnimationEnd="top 40%"
                >
                  Building reliable systems for real business impact.
                </ScrollReveal>
                <ScrollReveal
                  baseOpacity={0.7}
                  enableBlur={false}
                  baseRotation={0}
                  blurStrength={0}
                  containerClassName="hero-subtitle"
                  wordAnimationEnd="top 20%"
                  textClassName="hero-subtitle-reveal"
                >
                  I don't just write code. I engineer scalable, production-grade solutions that solve actual problems. Efficiency, security, and maintainability are my defaults.
                </ScrollReveal>
                <div className="hero-btns">
                  <a href="#projects" className="btn btn-primary">View Deployed Systems</a>
                  <a href="#contact" className="btn btn-secondary">Discuss Engineering</a>
                </div>

                {/* Social Icons in Hero */}

              </div>

              <div className="hero-card-wrapper" style={{ width: '380px', margin: '0 0 0 auto' }}>
                <BorderGlow
                  glowColor="180 100 50"
                  backgroundColor="transparent"
                  borderRadius={24}
                  glowRadius={80}
                  glowIntensity={2.0}
                  animated={true}
                  colors={['#00FFFF', '#2D65FF', '#1A1A1A']}
                >
                  <ProfileCard 
                    name="Danish Nazir"
                    title="Software Engineer"
                    handle="javicodes"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl="/images/Profile_image.jpg.png"
                    showUserInfo={false}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => console.log('Contact clicked')}
                    behindGlowColor="rgba(125, 190, 255, 0.67)"
                    iconUrl="/assets/demo/iconpattern.png"
                    behindGlowEnabled
                    innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                  />
                </BorderGlow>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">01. PROFILE</span>
            <ScrollReveal
              containerClassName="section-title"
              wordAnimationEnd="top 30%"
            >
              Building The Future
            </ScrollReveal>
          </div>

          <div className="grid-2 animate-hidden">
            <div className="panel">
              <h3 className="project-title" style={{ marginBottom: '1rem' }}>System Mindset</h3>
              <p className="text-muted" style={{ marginBottom: '1rem' }}>
                In a world of quick demos and tutorials, I focus on the hard parts: error handling, state management, infrastructure, and deployment pipelines.
              </p>
              <p className="text-muted">
                My work bridges the gap between complex backend logic and intuitive frontend experiences. I build properly, so you don't have to rebuild later.
              </p>
            </div>

            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="stat-card panel animate-float" style={{ padding: '1.5rem' }}>
                <div className="text-cyan text-mono" style={{ fontSize: '2rem', fontWeight: '700' }}>2+</div>
                <div className="text-secondary text-mono" style={{ fontSize: '0.85rem' }}>YEARS PROD EXP</div>
              </div>
              <div className="stat-card panel animate-float-delay-1" style={{ padding: '1.5rem' }}>
                <div className="text-cyan text-mono" style={{ fontSize: '2rem', fontWeight: '700' }}>10+</div>
                <div className="text-secondary text-mono" style={{ fontSize: '0.85rem' }}>LIVE SYSTEMS</div>
              </div>
              <div className="stat-card panel animate-float-delay-2" style={{ padding: '1.5rem' }}>
                <div className="text-cyan text-mono" style={{ fontSize: '2rem', fontWeight: '700' }}>99%</div>
                <div className="text-secondary text-mono" style={{ fontSize: '0.85rem' }}>UPTIME FOCUS</div>
              </div>
              <div className="stat-card panel animate-float" style={{ padding: '1.5rem' }}>
                <div className="text-cyan text-mono" style={{ fontSize: '2rem', fontWeight: '700' }}>AI</div>
                <div className="text-secondary text-mono" style={{ fontSize: '0.85rem' }}>INTEGRATED</div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Tech Stack */}
      <section id="tech" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">02. ARSENAL</span>
            <ScrollReveal
              containerClassName="section-title"
              wordAnimationEnd="top 30%"
            >
              Technology Stack
            </ScrollReveal>
          </div>

          <div className="grid-2 animate-hidden">
            <div>
              <div className="tech-category">
                <h4>FRONTEND ARCHITECTURE</h4>
                <div className="tech-list">
                  {['React.js', 'Next.js', 'TypeScript', 'Tailwind', 'SASS', 'HTML5/CSS3'].map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="tech-category">
                <h4>BACKEND & DATA</h4>
                <div className="tech-list">
                  {['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'REST APIs'].map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="tech-category">
                <h4>INFRASTRUCTURE & TOOLS</h4>
                <div className="tech-list">
                  {['Docker', 'Git/GitHub', 'Linux/CLI', 'AWS', 'Vercel', 'Postman'].map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="tech-category">
                <h4>AI ENGINEERING</h4>
                <div className="tech-list">
                  {['OpenAI API', 'LangChain', 'Prompt Engineering', 'AI Code Integration', 'Model Tuning'].map(t => (
                    <span key={t} className="tech-tag" style={{ borderColor: 'var(--accent-blue)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Projects */}
      <section id="projects" className="section">
        <div className="container">
          <div className="section-header animate-hidden">
            <span className="section-label">03. EXECUTION</span>
            <ScrollReveal
              containerClassName="section-title"
              wordAnimationEnd="top 30%"
            >
              Deployed Systems
            </ScrollReveal>
          </div>

          <div className="grid-3 animate-hidden">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section >

      {/* Testimonials */}
      <Testimonials />

      {/* ML & AI */}
      <section id="ml" className="section">
        <div className="container">
          <div className="panel animate-hidden" style={{ borderLeft: '4px solid var(--accent-blue)' }}>
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div>
                <span className="section-label" style={{ color: 'var(--accent-blue)' }}>05. GROWTH</span>
                <ScrollReveal
                  containerClassName="section-title"
                  wordAnimationEnd="top 30%"
                >
                  Machine Learning & AI
                </ScrollReveal>
                <p className="text-muted" style={{ margin: '1rem 0' }}>
                  I'm currently expanding my capabilities into Deep Learning and Neural Networks.
                  The goal is not just to use AI APIs, but to understand and engineer the models that drive them.
                </p>
                <div className="tech-list">
                  <span className="tech-tag">PyTorch</span>
                  <span className="tech-tag">Neural Networks</span>
                  <span className="tech-tag">Data Pipelines</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', opacity: 0.5 }}>
                <div className="animate-pulse-slow glitch-effect" data-text="AI" style={{ fontSize: '10rem', lineHeight: 1, fontWeight: '700', fontFamily: 'var(--font-mono)' }}>AI</div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Services */}
      <section id="services" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">06. DELIVERABLES</span>
            <ScrollReveal
              containerClassName="section-title"
              wordAnimationEnd="top 30%"
            >
              My Services
            </ScrollReveal>
          </div>

          <div className="grid-3 animate-hidden">
            <div className="panel">
              <h3 className="project-title" style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>MVP Development</h3>
              <p className="text-muted">
                Rapidly turning ideas into production-ready prototypes. I handle the entire stack, from database design to UI implementation, ensuring you have a working product to show investors or users in weeks, not months.
              </p>
            </div>
            <div className="panel">
              <h3 className="project-title" style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>System Architecture</h3>
              <p className="text-muted">
                Designing robust, scalable backends that don't crash under load. I focus on database schema optimization, caching strategies (Redis), and secure API design to build foundations that last.
              </p>
            </div>
            <div className="panel">
              <h3 className="project-title" style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>Performance Tuning</h3>
              <p className="text-muted">
                Auditing and optimizing existing applications. Whether it's slow queries, memory leaks, or frontend lag, I diagnose the bottleneck and implement the fix to improve user retention and SEO.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Philosophy Section */}
      <section id="philosophy" className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', backgroundColor: '#080808' }}>
        <div className="container">
          <ScrollReveal
            baseOpacity={0.05}
            enableBlur
            baseRotation={2}
            blurStrength={12}
            wordAnimationEnd="bottom center"
          >
            "Engineering is the art of turning complexity into clarity. I don't just build software; I architect resilient digital engines that power progress. Because the systems that truly matter are the ones built on the foundations of reliability, security, and a deep understanding of the problem they solve."
          </ScrollReveal>
        </div>
      </section>

      {/* Writing / Insights */}
      <section id="insights" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">07. INSIGHTS</span>
            <ScrollReveal
              containerClassName="section-title"
              wordAnimationEnd="top 30%"
            >
              Latest Articles
            </ScrollReveal>
          </div>

          <div className="grid-2 animate-hidden">
            {blogPosts.slice(0, 2).map((post) => (
              <Link
                key={post.id}
                to={`/blog#post-${post.id}`}
                className="panel"
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div
                  className="text-mono"
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--accent-cyan)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {post.category.toUpperCase()}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                  {post.title}
                </h3>
                <p className="text-muted">{post.excerpt}</p>
                <div
                  style={{
                    marginTop: '1rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
            <Link to="/blog" className="btn btn-secondary">
              View All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Devuity Connection & Contact */}
      <section id="contact" className="section">
        <div className="container">
          <div className="devuity-connection animate-hidden">
            <p className="devuity-text animate-glow">
              Engineering excellence meets AI innovation—delivering systems that are as reliable as they are revolutionary.
            </p>
          </div>

          <div className="contact-cta animate-hidden" style={{ marginTop: '4rem' }}>
            <span className="section-label">08. CONNECT</span>
            <h2 className="hero-title" style={{ fontSize: '2.5rem' }}>Ready to build reliable systems?</h2>
            <a href="mailto:danishpersonal6@gmail.com" className="contact-email">danishpersonal6@gmail.com</a>

            <div className="social-links">
              <a href="https://github.com/Danish20699" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://linkedin.com/in/danish-nazir1" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://www.instagram.com/danishn.29/" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://wa.me/917006798511" target="_blank" rel="noopener noreferrer" className="social-icon" title="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.231-.298.347-.497.116-.198.058-.371-.029-.544-.087-.174-.787-1.996-.991-2.585-.27-.775-.463-.645-.63-.66-.16-.015-.347-.015-.534-.015-.187 0-.49.074-.746.357-.256.283-.993.971-.993 2.373 0 1.402 1.021 2.756 1.163 2.946.142.19 2.01 3.069 4.872 4.305.681.294 1.213.47 1.626.6.685.216 1.309.186 1.805.111.547-.082 1.758-.718 2.006-1.41.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section >

      <Footer />
    </>
  );
};

export default Home;
