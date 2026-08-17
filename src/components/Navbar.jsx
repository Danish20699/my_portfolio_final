import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const logoUrl = `${import.meta.env.BASE_URL}danish-logo.png`;

const NAV_ITEMS = [
  { to: '#home', label: 'Home' },
  { to: '#about', label: 'About' },
  { to: '#tech', label: 'Stack' },
  { to: '#projects', label: 'Work' },
  { to: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <>
      <div className="mobile-logo-bar">
        <Link to="/" onClick={() => window.scrollTo(0, 0)} aria-label="Home">
          <img src={logoUrl} alt="Danish Nazir" className="nav-logo-img" width="40" height="40" />
        </Link>
      </div>

      <nav className="navbar" aria-label="Main">
        <div className="container">
          <div className="nav-brand">
            <Link to="/" className="brand-name-link" aria-label="Home">
              <img src={logoUrl} alt="Danish Nazir" className="nav-logo-img" width="40" height="40" />
            </Link>
          </div>

          <ul className="nav-links">
            {NAV_ITEMS.map(({ to, label }) => (
              <li key={to}>
                {/* On the home page these are in-page anchors; elsewhere they route home first. */}
                {onHome ? (
                  <a href={to} className="nav-link">{label}</a>
                ) : (
                  <Link to={`/${to}`} className="nav-link">{label}</Link>
                )}
              </li>
            ))}
          </ul>

          <div className="desktop-resume-btn">
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
