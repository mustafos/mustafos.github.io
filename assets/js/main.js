(function () {
    'use strict';

    document.documentElement.classList.add('js');

    var header = document.getElementById('header');
    var menuToggle = document.getElementById('menu-toggle');
    var mobileDrawer = document.getElementById('mobile-drawer');
    var yearEl = document.getElementById('year');
    var navSections = document.querySelectorAll('[data-nav-section]');
    var navLinks = document.querySelectorAll('[data-nav]');
    var mobileLinks = document.querySelectorAll('.mobile-drawer__link[href^="#"]');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* Header scroll */
    function onScroll() {
        if (header) {
            header.classList.toggle('is-scrolled', window.scrollY > 16);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Mobile menu */
    function openDrawer() {
        if (!menuToggle || !mobileDrawer) return;
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close menu');
        mobileDrawer.removeAttribute('hidden');
        document.body.classList.add('is-locked');
    }

    function closeDrawer() {
        if (!menuToggle || !mobileDrawer) return;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        mobileDrawer.setAttribute('hidden', '');
        document.body.classList.remove('is-locked');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            if (menuToggle.getAttribute('aria-expanded') === 'true') {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    mobileLinks.forEach(function (link) {
        link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menuToggle && menuToggle.getAttribute('aria-expanded') === 'true') {
            closeDrawer();
            menuToggle.focus();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 960) closeDrawer();
    });

    /* Active nav via IntersectionObserver */
    var navMap = {
        hero: null,
        about: 'about',
        expertise: 'expertise',
        stack: 'expertise',
        projects: 'projects',
        focus: 'projects',
        articles: 'articles',
        process: 'about',
        contact: 'contact'
    };

    function setActive(navId) {
        navLinks.forEach(function (link) {
            var active = link.getAttribute('data-nav') === navId;
            link.classList.toggle('is-active', active);
            if (active) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    if ('IntersectionObserver' in window && navSections.length) {
        var visible = new Map();

        var navObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
                });

                var bestId = null;
                var bestRatio = 0;

                visible.forEach(function (ratio, id) {
                    if (ratio > bestRatio) {
                        bestRatio = ratio;
                        bestId = id;
                    }
                });

                if (bestId && navMap[bestId]) {
                    setActive(navMap[bestId]);
                } else if (bestId === 'hero') {
                    setActive(null);
                }
            },
            { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.15, 0.35, 0.55] }
        );

        navSections.forEach(function (section) {
            navObserver.observe(section);
        });
    }

    /* Scroll reveal */
    var revealEls = document.querySelectorAll('.reveal');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function observeReveal(el) {
        if (!revealObserver || reducedMotion) {
            el.classList.add('is-visible');
            return;
        }
        revealObserver.observe(el);
    }

    var revealObserver = null;

    if ('IntersectionObserver' in window && !reducedMotion) {
        revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
        );
    }

    revealEls.forEach(observeReveal);
    window.__observeReveal = observeReveal;

    if (typeof window.renderSiteSections === 'function') {
        window.renderSiteSections();
        document.querySelectorAll('.reveal').forEach(function (el) {
            if (!el.classList.contains('is-visible')) {
                observeReveal(el);
            }
        });
    }
})();

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/';
    }
}
