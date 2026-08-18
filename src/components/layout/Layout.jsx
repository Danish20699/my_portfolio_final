import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/** Resets scroll on route change — the old site kept the previous position. */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const Layout = () => (
  <>
    <ScrollToTop />
    <Header />
    <main id="main" className="grain min-h-[60vh] pt-24">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default Layout;
