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

    function openDrawer() {
        if (!menuToggle || !mobileDrawer) return;
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', window.I18n ? window.I18n.t('common.closeMenu') : 'Close menu');
        mobileDrawer.removeAttribute('hidden');
        document.body.classList.add('is-locked');
    }

    function closeDrawer() {
        if (!menuToggle || !mobileDrawer) return;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', window.I18n ? window.I18n.t('common.openMenu') : 'Open menu');
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

    function onScroll() {
        if (header) {
            header.classList.toggle('is-scrolled', window.scrollY > 16);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var navMap = {
        hero: null,
        about: 'about',
        projects: 'projects',
        articles: 'articles',
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

    function boot() {
        if (typeof window.renderSiteSections === 'function') {
            window.renderSiteSections();
            document.querySelectorAll('.reveal').forEach(function (el) {
                if (!el.classList.contains('is-visible')) {
                    observeReveal(el);
                }
            });
        }
    }

    if (document.body && document.body.getAttribute('data-legal-title')) {
        initLegalPage();
    } else if (window.I18n) {
        window.I18n.init().then(function () {
            boot();
            if (window.Analytics) {
                window.Analytics.trackPageView();
            }
        });
        document.addEventListener('localechange', function () {
            if (typeof window.renderSiteSections === 'function') {
                window.renderSiteSections();
            }
            if (window.Analytics) {
                window.Analytics.trackPageView();
            }
            mobileLinks.forEach(function (link) {
                link.removeEventListener('click', closeDrawer);
                link.addEventListener('click', closeDrawer);
            });
        });
    } else {
        boot();
    }
})();

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        var locale = window.I18n ? window.I18n.getLocale() : 'en';
        window.location.href = locale === 'en' ? 'index.html' : 'index.html?lang=' + locale;
    }
}

function initLegalPage() {
    if (!window.I18n) return;
    window.I18n.init().then(function () {
        var titleKey = document.body.getAttribute('data-legal-title');
        if (titleKey) {
            document.title = window.I18n.t(titleKey) + ' — Mustafa Bekirov';
        }
        var locale = window.I18n.getLocale();
        var suffix = locale === 'en' ? '' : '?lang=' + locale;
        document.querySelectorAll('a[href="index.html"]').forEach(function (link) {
            link.setAttribute('href', 'index.html' + suffix);
        });
        var yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
        if (window.Analytics) {
            window.Analytics.trackPageView();
        }
    });
}
