import { useEffect } from 'react';

// useAutoScroll: auto-scrolls a horizontal container ref smoothly
// rowRef: React ref pointing to the scroll container
// speedPxPerSec: scrolling speed in pixels per second
export default function useAutoScroll(rowRef, speedPxPerSec = 60) {
  useEffect(() => {
    const row = rowRef && rowRef.current;
    if (!row) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let running = true;
    let rafId = null;
    let lastTime = null;

    function step(time) {
      if (!lastTime) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      if (running) {
        row.classList.add('no-snap');
        row.scrollLeft += (speedPxPerSec * dt) / 1000;
        if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 1) {
          row.scrollLeft = 0;
        }
      } else {
        row.classList.remove('no-snap');
      }

      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);

    const onEnter = () => { running = false; };
    const onLeave = () => { running = true; lastTime = null; };
    const onFocusIn = () => { running = false; };
    const onFocusOut = () => { running = true; lastTime = null; };

    row.addEventListener('mouseenter', onEnter);
    row.addEventListener('mouseleave', onLeave);
    row.addEventListener('focusin', onFocusIn);
    row.addEventListener('focusout', onFocusOut);

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = null;
        lastTime = null;
      } else if (!rafId) {
        rafId = requestAnimationFrame(step);
      }
    }

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      row.removeEventListener('mouseenter', onEnter);
      row.removeEventListener('mouseleave', onLeave);
      row.removeEventListener('focusin', onFocusIn);
      row.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [rowRef, speedPxPerSec]);
}
