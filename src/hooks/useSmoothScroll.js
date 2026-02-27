// simple hook returning an onClick handler to smooth-scroll to the given selector
import { useCallback } from 'react';

export default function useSmoothScroll(targetSelector) {
  return useCallback(() => {
    const el = document.querySelector(targetSelector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [targetSelector]);
}
