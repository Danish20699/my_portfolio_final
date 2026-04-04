import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const logoUrl = `${import.meta.env.BASE_URL}danish-logo.png`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const NavItem = ({ to, label, isAnchor }) => (
    <li>
      {isAnchor && location.pathname === '/' ? (
        <a href={to} className="nav-link" onClick={handleLinkClick}>{label}</a>
      ) : (
        <Link to={isAnchor ? `/${to}` : to} className="nav-link" onClick={handleLinkClick}>
          {label}
        </Link>
      )}
    </li>
  );

  return (
    <>
      <div className="mobile-logo-bar">
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          <img src={logoUrl} alt="Danish Portfolio Logo" className="nav-logo-img" />
        </Link>
      </div>

      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <Link to="/" className="brand-name-link" style={{ textDecoration: 'none' }}>
              <img src={logoUrl} alt="Danish Portfolio Logo" className="nav-logo-img" />
            </Link>
          </div>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <NavItem to="#home" label="Home" isAnchor={true} />
            <NavItem to="#about" label="About" isAnchor={true} />
            <NavItem to="#tech" label="Stack" isAnchor={true} />
            <NavItem to="#projects" label="Work" isAnchor={true} />
            <NavItem to="#contact" label="Contact" isAnchor={true} />
          </ul>
          <div style={{ marginLeft: '2rem', display: 'none' }} className="desktop-resume-btn">
            <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              Resume
            </a>
          </div>
          <style>{`
          @media (min-width: 769px) {
            .desktop-resume-btn { display: block !important; }
            .mobile-logo-bar { display: none; }
          }
          @media (max-width: 768px) {
            .mobile-logo-bar {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              height: 60px;
              display: flex;
              align-items: center;
              padding: 0 1rem;
              background: rgba(5, 6, 8, 0.85);
              backdrop-filter: blur(12px);
              z-index: 1000;
              border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }
          }
        `}</style>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
