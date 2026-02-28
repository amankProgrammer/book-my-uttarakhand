import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PENDING_SCROLL_KEY = 'pending-home-scroll-target';

export function scrollToSection(sectionId) {
  if (!sectionId) return;
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function consumePendingHomeScroll() {
  const target = window.sessionStorage.getItem(PENDING_SCROLL_KEY);
  if (!target) return;

  window.sessionStorage.removeItem(PENDING_SCROLL_KEY);
  requestAnimationFrame(() => scrollToSection(target));
}

export default function useHomeSectionNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (sectionId) => {
      if (!sectionId) return;
      if (location.pathname === '/') {
        scrollToSection(sectionId);
        return;
      }

      window.sessionStorage.setItem(PENDING_SCROLL_KEY, sectionId);
      navigate('/');
    },
    [location.pathname, navigate]
  );
}
