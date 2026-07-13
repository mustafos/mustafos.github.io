(function () {
    'use strict';

    document.documentElement.classList.add('js');

    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const yearEl = document.getElementById('year');
    const navLinks = document.querySelectorAll('[data-nav]');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[href^="#"]');

    /* Footer year */
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* Header scroll state */
    function updateHeader() {
        if (!header) return;
        header.classList.toggle('is-scrolled', window.scrollY > 20);
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    /* Mobile menu */
    function openMenu() {
        if (!menuToggle || !mobileNav) return;
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close menu');
        mobileNav.removeAttribute('hidden');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        if (!menuToggle || !mobileNav) return;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        mobileNav.setAttribute('hidden', '');
        document.body.classList.remove('menu-open');
    }

    function toggleMenu() {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    mobileNavLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menuToggle && menuToggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            menuToggle.focus();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 900) {
            closeMenu();
        }
    });

    /* Active navigation */
    const sections = document.querySelectorAll('section[id]');

    function setActiveNav() {
        const scrollY = window.scrollY + 120;

        sections.forEach(function (section) {
            const id = section.getAttribute('id');
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(function (link) {
                    const isMatch = link.getAttribute('data-nav') === id ||
                        (id === 'hero' && link.getAttribute('data-nav') === 'about' && scrollY < top + 100);
                    link.classList.toggle('is-active', link.getAttribute('data-nav') === id);
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav, { passive: true });
    setActiveNav();

    /* Scroll reveal */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealElements.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }
})();

/* Legal pages — back navigation */
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/';
    }
}
