import { useEffect } from 'react';

const DEFAULTS = {
  title: 'Danish Nazir — Software Engineer',
  description:
    'Danish Nazir is a software engineer building production systems for identity, travel, and enterprise automation.',
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

    return () => {
      document.title = DEFAULTS.title;
      setMeta('meta[name="description"]', 'content', DEFAULTS.description);
    };
  }, [title, description]);
};

export default usePageMeta;
