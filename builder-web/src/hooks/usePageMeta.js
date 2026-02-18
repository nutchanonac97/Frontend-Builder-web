import { useEffect } from 'react';

/**
 * Custom hook to set page title and meta description dynamically.
 * Works without react-helmet by directly manipulating the DOM.
 * 
 * @param {string} title - Page title
 * @param {string} description - Meta description
 */
const usePageMeta = (title, description) => {
  useEffect(() => {
    // Set title
    const suffix = 'Crystal Bridge';
    document.title = title ? `${title} | ${suffix}` : suffix;

    // Set meta description
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    // Set OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.content = document.title;
    }

    // Set OG description
    if (description) {
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.content = description;
      }
    }
  }, [title, description]);
};

export default usePageMeta;
