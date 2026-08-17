import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const NotFound = () => {
  return (
    <>
      <Navbar />

      <main id="main" className="notfound">
        <div className="container">
          <p className="notfound-code text-mono" aria-hidden="true">404</p>
          <h1 className="notfound-title">Page Not Found</h1>
          <p className="notfound-text">
            The page you're looking for doesn't exist. It might have been moved,
            deleted, or you entered the wrong URL.
          </p>
          <div className="notfound-actions">
            <Link to="/" className="btn btn-primary">Go Home</Link>
            <Link to="/projects" className="btn btn-secondary">View Projects</Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default NotFound;
