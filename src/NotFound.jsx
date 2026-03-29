import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{
          fontSize: '6rem',
          fontWeight: '700',
          color: 'var(--accent-cyan)',
          marginBottom: '1rem',
          fontFamily: 'var(--font-mono)'
        }}>
          404
        </h1>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '1rem',
          color: 'var(--text-primary)'
        }}>
          Page Not Found
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          maxWidth: '500px',
          lineHeight: '1.6'
        }}>
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <a
          href="/"
          style={{
            padding: '0.8rem 1.5rem',
            background: 'var(--accent-blue)',
            color: 'white',
            borderRadius: 'var(--radius-sm)',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.background = '#1a50e0'}
          onMouseOut={(e) => e.target.style.background = 'var(--accent-blue)'}
        >
          Go Home
        </a>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;