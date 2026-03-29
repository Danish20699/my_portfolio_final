import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './components/ProjectCard';
import { projects } from './projectsData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Projects = () => {
  // Show remaining projects (excluding first 3)
  const remainingProjects = projects.slice(3);

  return (
    <>
      <Navbar />
      
      {/* Projects Section */}
      <section className="projects" style={{ paddingTop: '120px' }}>
        <div className="container">
          <h2 className="section-title">All Projects</h2>
          <div className="projects-grid">
            {remainingProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Projects;

