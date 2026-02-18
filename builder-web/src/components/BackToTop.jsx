import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Global back-to-top floating button.
 * Supports both normal window scroll AND container-based scroll
 * (e.g. ServicesPage uses h-dvh overflow-auto snap container).
 */
const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let scrollContainer = null;

    const update = (scrollTop) => setShow(scrollTop > 500);

    const handleWindowScroll = () => update(window.scrollY);

    // Also listen to container scroll inside snap-y pages (ServicesPage)
    const handleContainerScroll = (e) => update(e.detail?.scrollTop || 0);

    // Find a scrollable snap container if it exists
    const findContainer = () => {
      const el = document.querySelector('.snap-y');
      if (el && el.scrollHeight > el.clientHeight) {
        scrollContainer = el;
        scrollContainer.addEventListener('scroll', () => update(scrollContainer.scrollTop), { passive: true });
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    window.addEventListener('containerscroll', handleContainerScroll);

    // Delay container search to ensure DOM is ready
    const timer = setTimeout(findContainer, 500);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('containerscroll', handleContainerScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    // Try scrolling the snap container first (ServicesPage)
    const snapContainer = document.querySelector('.snap-y');
    if (snapContainer && snapContainer.scrollTop > 0) {
      snapContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!show) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-4 z-40 w-12 h-12 rounded-full bg-slate-800/90 backdrop-blur-sm text-white shadow-lg shadow-black/20 flex items-center justify-center hover:bg-slate-700 hover:scale-110 transition-all"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default BackToTop;
