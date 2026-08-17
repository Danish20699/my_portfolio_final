import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './components/ProjectCard';
import { projects } from './projectsData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const isLive = (p) => Boolean(p.link) && p.link !== '#';

const Projects = () => {
  // Shipped work first — this page is titled "All Projects", so it shows all of them.
  const liveProjects = projects.filter(isLive);
  const upcomingProjects = projects.filter((p) => !isLive(p));

  return (
    <>
      <Navbar />

      <main id="main" className="projects section projects-page">
        <div className="container">
          <div className="section-header">
            <span className="section-label">ARCHIVE</span>
            <h1 className="section-title">All Projects</h1>
          </div>

          <h2 className="projects-group-title text-mono">
            Live Systems <span className="projects-count">{liveProjects.length}</span>
          </h2>
          <div className="projects-grid grid-3">
            {liveProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {upcomingProjects.length > 0 && (
            <>
              <h2 className="projects-group-title text-mono">
                In Development <span className="projects-count">{upcomingProjects.length}</span>
              </h2>
              <div className="projects-grid grid-3">
                {upcomingProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          )}

          <div className="projects-back">
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Projects;
