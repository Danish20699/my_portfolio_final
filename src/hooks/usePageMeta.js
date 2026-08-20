import { useEffect } from 'react';

import { ORIGIN } from '../config';

const DEFAULTS = {
  title: 'Danish Nazir — Full-Stack Engineer',
  description:
    'Danish Nazir is a full-stack engineer building production systems for retail, education, and infrastructure automation.',
};

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/**
 * Per-route title and description. The app is client-rendered, so without this
 * every page shares the index.html metadata — bad for sharing and for search.
 */
const usePageMeta = ({ title, description } = {}) => {
  useEffect(() => {
    const t = title || DEFAULTS.title;
    const d = description || DEFAULTS.description;

    document.title = t;
    setMeta('meta[name="description"]', 'content', d);
    setMeta('meta[property="og:title"]', 'content', t);
    setMeta('meta[property="og:description"]', 'content', d);
    setMeta('meta[name="twitter:title"]', 'content', t);
    setMeta('meta[name="twitter:description"]', 'content', d);

    // Canonical and og:url have to track the route too — index.html ships a
    // single pair pointing at the homepage, so without this every page claims
    // to be the homepage.
    const url = ORIGIN + window.location.pathname;
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);

    return () => {
      document.title = DEFAULTS.title;
      setMeta('meta[name="description"]', 'content', DEFAULTS.description);
      setMeta('link[rel="canonical"]', 'href', ORIGIN + '/');
      setMeta('meta[property="og:url"]', 'content', ORIGIN + '/');
    };
  }, [title, description]);
};

export default usePageMeta;
