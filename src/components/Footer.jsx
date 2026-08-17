import React from 'react';
import { Link } from 'react-router-dom';
import DepthCarousel from './DepthCarousel/DepthCarousel';
import { galleryItems } from '../config/galleryConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
  ];

  const socialLinks = [
    { icon: 'github', href: 'https://github.com/Danish20699', label: 'GitHub' },
    { icon: 'linkedin', href: 'https://linkedin.com/in/danish-nazir1', label: 'LinkedIn' },
    { icon: 'instagram', href: 'https://www.instagram.com/danishn.29/', label: 'Instagram' },
    { icon: 'whatsapp', href: 'https://wa.me/917006798511', label: 'WhatsApp' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Footer Content Grid */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Danish Nazir</h4>
            <p className="footer-tagline">Full stack developer building production web applications—and learning AI/ML and DevOps to build them better.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Navigation</h4>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-section">
            <h4 className="footer-section-title">Connect</h4>
            <div className="footer-socials">
              <a href="mailto:danishpersonal6@gmail.com" className="footer-social-link" title="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-10 5L2 7"></path>
                </svg>
              </a>
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="footer-social-link" title={social.label}>
                  {social.icon === 'github' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {social.icon === 'linkedin' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                    </svg>
                  )}
                  {social.icon === 'instagram' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="#050608"></path>
                      <circle cx="17.5" cy="6.5" r="1.5" fill="#050608"></circle>
                    </svg>
                  )}
                  {social.icon === 'whatsapp' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.231-.298.347-.497.116-.198.058-.371-.029-.544-.087-.174-.787-1.996-.991-2.585-.27-.775-.463-.645-.63-.66-.16-.015-.347-.015-.534-.015-.187 0-.49.074-.746.357-.256.283-.993.971-.993 2.373 0 1.402 1.021 2.756 1.163 2.946.142.19 2.01 3.069 4.872 4.305.681.294 1.213.47 1.626.6.685.216 1.309.186 1.805.111.547-.082 1.758-.718 2.006-1.41.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Away From The Screen — its own column, sitting to the right of Connect */}
          <div className="footer-section">
            <h4 className="footer-section-title">Away From The Screen</h4>
            <div className="footer-gallery">
              <DepthCarousel
                items={galleryItems}
                cardWidth={132}
                cardHeight={172}
                radius={10}
                tint="#05060a"
                depth={110}
                spread={38}
                tilt={18}
                visibleCards={3}
                blur={3}
                perspective={900}
                autoplay
                autoplayDelay={3600}
                loop
                showControls={false}
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {currentYear} Danish Nazir. All rights reserved.</p>
          <p className="footer-credit text-mono">Built to ship. Designed to last.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
