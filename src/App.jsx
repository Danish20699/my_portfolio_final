import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import CaseStudy from './pages/CaseStudy';
import Writing from './pages/Writing';
import Post from './pages/Post';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<CaseStudy />} />
        <Route path="writing" element={<Writing />} />
        <Route path="writing/:slug" element={<Post />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        {/* Old URLs — keep any existing links and shares working */}
        <Route path="projects" element={<Navigate to="/work" replace />} />
        <Route path="blog" element={<Navigate to="/writing" replace />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    <Analytics />
  </BrowserRouter>
);

export default App;
