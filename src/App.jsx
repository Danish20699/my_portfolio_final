import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Projects from './Projects';
import Blog from './Blog';
import NotFound from './NotFound';

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
