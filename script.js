document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navPanel = document.querySelector('.nav-panel');
  const yearEl = document.getElementById('year');
  const reveals = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-cta');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const updateHeaderState = () => {
    if (!header) return;
    const scrolled = window.scrollY > 24;
    header.classList.toggle('is-scrolled', scrolled);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  const setMenuState = (open) => {
    if (!navToggle || !navPanel) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navPanel.classList.toggle('is-open', open);
  };

  if (navToggle && navPanel) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 760) {
          setMenuState(false);
        }
      });
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!navPanel.contains(target) && !navToggle.contains(target)) {
        setMenuState(false);
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -5% 0px'
      }
    );

    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('visible'));
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
