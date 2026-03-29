import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <a
      href={project.link || '#'}
      target={project.link ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="panel project-card"
      style={{ cursor: project.link ? 'pointer' : 'default', textDecoration: 'none' }}
      onClick={(e) => !project.link && e.preventDefault()}
    >
      <div className="section-label">{project.domain}</div>
      <h3 className="project-title">{project.title}</h3>
      <div className="project-meta text-muted" style={{ marginBottom: '1rem' }}>
        {project.role}
      </div>

      <div className="project-desc">
        <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Problem:</strong> {project.problem}
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Solution:</strong> {project.solution}
        </p>
      </div>

      <div className="tech-list" style={{ marginTop: 'auto' }}>
        {project.tech.map((tech, index) => (
          <span key={index} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>

      {project.link && project.link !== '#' ? (
        <div style={{ marginTop: '1rem', textAlign: 'right', fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
          View Live System &rarr;
        </div>
      ) : project.status ? (
        <div style={{ marginTop: '1rem', textAlign: 'right', fontSize: '0.85rem', color: 'var(--accent-blue)', opacity: 0.7 }}>
          {project.status}
        </div>
      ) : null}
    </a>
  );
};

export default ProjectCard;
