import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollObserver = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const observeNode = (node: Element) => {
      if (node.classList.contains('scroll-reveal')) {
        observer.observe(node);
      }
      // Also observe any matching descendants
      node.querySelectorAll?.('.scroll-reveal').forEach((el) => observer.observe(el));
    };

    // Observe initial nodes on this route
    document.querySelectorAll('.scroll-reveal').forEach((el) => observeNode(el));

    // Watch for newly-added nodes (async content) and observe them
    const mutation = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof Element) observeNode(node);
        });
      });
    });
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, [location.pathname]);

  return null;
};

export default ScrollObserver;
