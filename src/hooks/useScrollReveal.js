import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!els.length) return undefined;

    // Start hidden
    for (const el of els) el.classList.add('reveal');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            if (entry.target.hasAttribute('data-confetti')) {
              window.dispatchEvent(new Event('show-confetti'));
            }
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    for (const el of els) io.observe(el);

    return () => io.disconnect();
  }, []);
}

