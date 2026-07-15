(function () {
    'use strict';

    var DEFAULT_LOCALE = 'en';
    var SUPPORTED_LOCALES = ['en', 'cs', 'es', 'uk', 'sk'];
    var STORAGE_KEY = 'portfolio-locale';
    var SITE_URL = 'https://www.mustafabekirov.com';

    var LOCALE_CODES = { en: 'EN', cs: 'CS', es: 'ES', uk: 'UK', sk: 'SK' };
    var switcherBound = false;
    var messages = {};
    var currentLocale = DEFAULT_LOCALE;
    var ready = false;
    var readyQueue = [];
    var initPromise = null;

    function resolvePath(obj, path) {
        if (!obj || !path) return undefined;
        var keys = path.split('.');
        var value = obj;
        for (var i = 0; i < keys.length; i++) {
            if (value == null || typeof value !== 'object') return undefined;
            value = value[keys[i]];
        }
        return value;
    }

    function getFallback() {
        return window.__LOCALE_FALLBACK || {};
    }

    function t(path, vars) {
        var value = resolvePath(messages, path);
        if (value === undefined) {
            value = resolvePath(getFallback(), path);
        }
        if (value === undefined || value === null) return undefined;
        if (typeof value !== 'string') return value;
        if (!vars) return value;
        return value.replace(/\{(\w+)\}/g, function (_, key) {
            return vars[key] != null ? String(vars[key]) : '';
        });
    }

    function detectLocale() {
        var params = new URLSearchParams(window.location.search);
        var queryLocale = params.get('lang');
        if (queryLocale && SUPPORTED_LOCALES.indexOf(queryLocale) !== -1) {
            return queryLocale;
        }

        var pathMatch = window.location.pathname.match(/^\/(cs|es|uk|sk)\/?$/);
        if (pathMatch) return pathMatch[1];

        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED_LOCALES.indexOf(stored) !== -1) return stored;
        } catch (e) { /* ignore */ }

        var browser = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (browser.indexOf('cs') === 0) return 'cs';
        if (browser.indexOf('sk') === 0) return 'sk';
        if (browser.indexOf('uk') === 0) return 'uk';
        if (browser.indexOf('es') === 0) return 'es';

        return DEFAULT_LOCALE;
    }

    function localeUrl(locale) {
        var hash = window.location.hash || '';
        if (locale === DEFAULT_LOCALE) {
            return SITE_URL + '/' + hash;
        }
        return SITE_URL + '/?lang=' + locale + hash;
    }

    function getLocaleBasePath() {
        var path = window.location.pathname || '/';
        if (path.indexOf('/assets/') !== -1 || path.slice(-4) === '.html') {
            return path.replace(/[^/]+$/, '');
        }
        return path.endsWith('/') ? path : path + '/';
    }

    function loadLocale(locale) {
        var fallback = getFallback();

        if (locale === DEFAULT_LOCALE) {
            messages = fallback;
            return Promise.resolve(DEFAULT_LOCALE);
        }

        if (!Object.keys(fallback).length) {
            messages = {};
            return Promise.resolve(DEFAULT_LOCALE);
        }

        return fetch(getLocaleBasePath() + 'assets/locales/' + locale + '.json')
            .then(function (res) {
                if (!res.ok) throw new Error('Locale not found: ' + locale);
                return res.json();
            })
            .then(function (data) {
                messages = data;
                return locale;
            })
            .catch(function () {
                messages = fallback;
                return DEFAULT_LOCALE;
            });
    }

    function applyDomTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var value = t(key);
            if (typeof value === 'string') el.textContent = value;
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            var value = t(key);
            if (typeof value === 'string') el.setAttribute('placeholder', value);
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
            el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
                var parts = pair.split(':').map(function (s) { return s.trim(); });
                if (parts.length !== 2) return;
                var value = t(parts[1]);
                if (typeof value === 'string') el.setAttribute(parts[0], value);
            });
        });

        var copyright = document.querySelector('[data-i18n-copyright]');
        if (copyright) {
            var copy = t('footer.copyright', { year: new Date().getFullYear() });
            if (copy) copyright.textContent = copy;
        }

        updateLegalLinks();
    }

    function isLegalPage() {
        return !!(document.body && document.body.getAttribute('data-legal-title'));
    }

    function updateSeo() {
        document.documentElement.lang = (messages.meta && messages.meta.lang) || currentLocale;
        if (isLegalPage()) return;

        var meta = messages.meta || getFallback().meta || {};
        var title = meta.title || t('meta.title') || document.title;
        var description = meta.description || t('meta.description') || '';
        var ogTitle = meta.ogTitle || title;
        var ogDescription = meta.ogDescription || description;
        var canonical = currentLocale === DEFAULT_LOCALE ? SITE_URL + '/' : localeUrl(currentLocale);

        document.documentElement.lang = meta.lang || currentLocale;
        document.title = title;

        if (description) setMeta('description', description);
        setMeta('og:title', ogTitle, 'property');
        setMeta('og:description', ogDescription, 'property');
        setMeta('og:url', canonical, 'property');
        setMeta('og:locale', getOgLocale(currentLocale), 'property');
        setMeta('twitter:title', ogTitle);
        setMeta('twitter:description', ogDescription);

        var canonicalEl = document.querySelector('link[rel="canonical"]');
        if (canonicalEl) canonicalEl.setAttribute('href', canonical);

        updateHreflang();
        updateJsonLd();
    }

    function getOgLocale(locale) {
        var map = { en: 'en_US', cs: 'cs_CZ', es: 'es_ES', uk: 'uk_UA', sk: 'sk_SK' };
        return map[locale] || 'en_US';
    }

    function setMeta(name, content, attr) {
        attr = attr || 'name';
        var selector = 'meta[' + attr + '="' + name + '"]';
        var el = document.querySelector(selector);
        if (!el) {
            el = document.createElement('meta');
            el.setAttribute(attr, name);
            document.head.appendChild(el);
        }
        el.setAttribute('content', content);
    }

    function updateHreflang() {
        document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function (el) {
            el.parentNode.removeChild(el);
        });

        SUPPORTED_LOCALES.forEach(function (locale) {
            var link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = locale;
            link.href = localeUrl(locale);
            document.head.appendChild(link);
        });

        var xDefault = document.createElement('link');
        xDefault.rel = 'alternate';
        xDefault.hreflang = 'x-default';
        xDefault.href = SITE_URL + '/';
        document.head.appendChild(xDefault);
    }

    function updateJsonLd() {
        var script = document.getElementById('person-jsonld');
        if (script) {
            try {
                var data = JSON.parse(script.textContent);
                var jobTitle = t('meta.jobTitle');
                if (jobTitle) data.jobTitle = jobTitle;
                script.textContent = JSON.stringify(data);
            } catch (e) { /* ignore */ }
        }

        var websiteScript = document.getElementById('website-jsonld');
        if (websiteScript) {
            try {
                var website = JSON.parse(websiteScript.textContent);
                var description = t('meta.description');
                if (description) website.description = description;
                websiteScript.textContent = JSON.stringify(website);
            } catch (e) { /* ignore */ }
        }
    }

    function localizedSlice(collection, path, index) {
        var localized = resolvePath(messages, path);
        var fallback = resolvePath(getFallback(), path);
        return (localized && localized[index]) || (fallback && fallback[index]) || {};
    }

    function mergeSiteData() {
        var base = window.SITE_DATA;
        var fallback = getFallback();
        if (!base) return null;

        function mergeList(baseList, path) {
            if (!baseList) return [];
            return baseList.map(function (item, i) {
                return Object.assign({}, item, localizedSlice(null, path, i));
            });
        }

        return {
            flagshipProjects: mergeList(base.flagshipProjects, 'projects.flagship'),
            archiveProjects: mergeList(base.archiveProjects, 'projects.archive'),
            featuredArticle: Object.assign(
                {},
                base.featuredArticle,
                (getFallback().writing && getFallback().writing.featured) || {},
                (messages.writing && messages.writing.featured) || {}
            ),
            moreArticles: mergeList(base.moreArticles, 'writing.more'),
            heroProfile: Object.assign(
                {},
                base.heroProfile,
                (fallback.hero && fallback.hero.profile) || {},
                (messages.hero && messages.hero.profile) || {}
            ),
            heroFloats: mergeList(base.heroFloats, 'hero.floats')
        };
    }

    function closeLanguageMenu(menu, trigger) {
        if (!menu) return;
        menu.hidden = true;
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }

    function openLanguageMenu(menu, trigger) {
        if (!menu || !trigger) return;
        menu.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
    }

    function bindLanguageSwitcher() {
        if (switcherBound) return;

        document.querySelectorAll('[data-lang-switch]').forEach(function (root) {
            var trigger = root.querySelector('[data-lang-switch-trigger]');
            var menu = root.querySelector('.lang-switch__menu');
            if (!trigger || !menu) return;

            trigger.addEventListener('click', function (event) {
                event.stopPropagation();
                if (menu.hidden) {
                    openLanguageMenu(menu, trigger);
                } else {
                    closeLanguageMenu(menu, trigger);
                }
            });

            menu.querySelectorAll('[data-locale]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var locale = button.getAttribute('data-locale');
                    closeLanguageMenu(menu, trigger);
                    if (!locale || locale === currentLocale) return;
                    if (window.Analytics) {
                        window.Analytics.trackEvent('language_switch', {
                            locale: locale,
                            previous_locale: currentLocale
                        });
                    }
                    setLocale(locale, true);
                });
            });
        });

        document.addEventListener('click', function () {
            document.querySelectorAll('[data-lang-switch]').forEach(function (root) {
                closeLanguageMenu(
                    root.querySelector('.lang-switch__menu'),
                    root.querySelector('[data-lang-switch-trigger]')
                );
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key !== 'Escape') return;
            document.querySelectorAll('[data-lang-switch]').forEach(function (root) {
                closeLanguageMenu(
                    root.querySelector('.lang-switch__menu'),
                    root.querySelector('[data-lang-switch-trigger]')
                );
            });
        });

        switcherBound = true;
    }

    function syncLanguageSwitcher() {
        document.querySelectorAll('[data-lang-switch]').forEach(function (root) {
            root.querySelectorAll('[data-locale]').forEach(function (button) {
                var active = button.getAttribute('data-locale') === currentLocale;
                button.classList.toggle('is-active', active);
                button.setAttribute('aria-selected', active ? 'true' : 'false');
            });
        });
    }

    function renderLanguageSwitcher() {
        bindLanguageSwitcher();
        syncLanguageSwitcher();

        document.querySelectorAll('[data-lang-switch]').forEach(function (root) {
            var trigger = root.querySelector('[data-lang-switch-trigger]');
            var languageLabel = t('common.language') || 'Language';
            var currentLabel = t('languages.' + currentLocale);

            root.querySelectorAll('[data-locale]').forEach(function (button) {
                var locale = button.getAttribute('data-locale');
                var label = t('languages.' + locale);
                button.textContent = typeof label === 'string' ? label : (LOCALE_CODES[locale] || locale.toUpperCase());
            });

            if (trigger && typeof currentLabel === 'string') {
                trigger.setAttribute('aria-label', languageLabel + ': ' + currentLabel);
            }
        });
    }

    function updateLegalLinks() {
        var suffix = currentLocale === DEFAULT_LOCALE ? '' : '?lang=' + currentLocale;
        document.querySelectorAll('[data-legal-link]').forEach(function (link) {
            var base = link.getAttribute('data-legal-link');
            link.setAttribute('href', base + suffix);
        });
    }

    function applyLocale(resolvedLocale) {
        currentLocale = resolvedLocale;
        window.SITE_DATA_LOCALIZED = mergeSiteData();
        applyDomTranslations();
        updateSeo();
        renderLanguageSwitcher();

        if (typeof window.renderSiteSections === 'function') {
            window.renderSiteSections();
        }

        document.dispatchEvent(new CustomEvent('localechange', { detail: { locale: resolvedLocale } }));
    }

    function setLocale(locale, persist) {
        if (SUPPORTED_LOCALES.indexOf(locale) === -1) locale = DEFAULT_LOCALE;

        var run = function () {
            return loadLocale(locale).then(function (resolvedLocale) {
                if (persist !== false) {
                    try { localStorage.setItem(STORAGE_KEY, resolvedLocale); } catch (e) { /* ignore */ }
                }

                var params = new URLSearchParams(window.location.search);
                if (resolvedLocale === DEFAULT_LOCALE) {
                    params.delete('lang');
                } else {
                    params.set('lang', resolvedLocale);
                }
                var query = params.toString();
                var nextUrl = window.location.pathname + (query ? '?' + query : '') + window.location.hash;
                window.history.replaceState({ locale: resolvedLocale }, '', nextUrl);

                applyLocale(resolvedLocale);
                return resolvedLocale;
            });
        };

        if (initPromise) return initPromise.then(run);
        return run();
    }

    function whenReady(fn) {
        if (ready) fn();
        else readyQueue.push(fn);
    }

    function init() {
        if (initPromise) return initPromise;

        currentLocale = detectLocale();
        messages = getFallback();
        bindLanguageSwitcher();
        syncLanguageSwitcher();

        initPromise = loadLocale(currentLocale).then(function (resolvedLocale) {
            applyLocale(resolvedLocale);
            ready = true;
            readyQueue.forEach(function (fn) { fn(); });
            readyQueue = [];
            return resolvedLocale;
        });

        return initPromise;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindLanguageSwitcher);
    } else {
        bindLanguageSwitcher();
    }

    window.I18n = {
        init: init,
        t: t,
        setLocale: setLocale,
        getLocale: function () { return currentLocale; },
        whenReady: whenReady,
        getSiteData: function () { return window.SITE_DATA_LOCALIZED || mergeSiteData(); },
        supportedLocales: SUPPORTED_LOCALES
    };
})();
