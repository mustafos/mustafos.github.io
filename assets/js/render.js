(function () {
    'use strict';

    var icon = window.icon;

    function el(tag, className, html) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (html) node.innerHTML = html;
        return node;
    }

    function t(key, vars) {
        return window.I18n ? window.I18n.t(key, vars) : key;
    }

    function data() {
        return (window.I18n && window.I18n.getSiteData()) || window.SITE_DATA;
    }

    function safe(value) {
        return value == null ? '' : String(value);
    }

    function profileContent(profile) {
        return {
            title: safe(t('hero.profile.title') || (profile && profile.title)),
            role: safe(t('hero.profile.role') || (profile && profile.role)),
            text: safe(t('hero.profile.text') || (profile && profile.text))
        };
    }

    function observeNewReveal(root) {
        if (!window.__observeReveal || !root) return;
        root.querySelectorAll('.reveal').forEach(window.__observeReveal);
    }

    function renderHeroFloats() {
        var root = document.getElementById('hero-floats');
        var siteData = data();
        if (!root || !siteData) return;
        root.innerHTML = '';
        siteData.heroFloats.forEach(function (item, i) {
            var label = safe(item.label || item.title);
            var chip = el('button', 'hero-chip hero-chip--' + (i + 1), icon(item.icon) + '<span>' + label + '</span>');
            chip.type = 'button';
            chip.setAttribute('aria-label', label + ' ' + t('common.capability'));
            chip.setAttribute('aria-pressed', 'false');
            chip.setAttribute('data-slide', String(i + 1));
            root.appendChild(chip);
        });
    }

    function renderIphoneSlides() {
        var slidesRoot = document.getElementById('iphone-slides');
        var dotsRoot = document.getElementById('iphone-dots');
        var siteData = data();
        if (!slidesRoot || !dotsRoot || !siteData) return;

        slidesRoot.innerHTML = '';
        dotsRoot.innerHTML = '';

        var allSlides = [{ type: 'profile' }].concat(siteData.heroFloats);

        allSlides.forEach(function (slide, i) {
            var isProfile = slide.type === 'profile';
            var profile = profileContent(isProfile ? siteData.heroProfile : null);
            var tags = '';

            if (isProfile && siteData.heroProfile && siteData.heroProfile.tags) {
                tags = '<ul class="iphone__tags">' + siteData.heroProfile.tags.map(function (tag) {
                    return '<li>' + tag + '</li>';
                }).join('') + '</ul>';
            }

            var avatar = siteData.heroProfile && siteData.heroProfile.avatar;
            var iconHtml = isProfile
                ? '<div class="iphone__slide-icon iphone__slide-icon--avatar">'
                    + '<img src="' + avatar + '" alt="' + t('common.portraitAlt') + '" width="72" height="72" decoding="async">'
                    + '</div>'
                : '<div class="iphone__slide-icon">' + icon(slide.icon) + '</div>';

            var metaHtml = isProfile
                ? '<p class="iphone__slide-role">' + profile.role + '</p>'
                : '<p class="iphone__slide-eyebrow">' + safe(slide.category) + '</p>';

            var slideTitle = isProfile ? profile.title : safe(slide.label || slide.title);
            var slideText = isProfile ? profile.text : safe(slide.text);

            slidesRoot.appendChild(el('article', 'iphone__slide' + (i === 0 ? ' is-active' : ''), ''
                + iconHtml
                + metaHtml
                + '<h3 class="iphone__slide-title">' + slideTitle + '</h3>'
                + '<p class="iphone__slide-text">' + slideText + '</p>'
                + (isProfile ? tags : '')
                + '<div class="iphone__slide-progress" aria-hidden="true"><span></span></div>'
            ));

            dotsRoot.appendChild(el('button', 'iphone__dot' + (i === 0 ? ' is-active' : ''), ''));
        });

        dotsRoot.querySelectorAll('.iphone__dot').forEach(function (dot) {
            dot.type = 'button';
            dot.setAttribute('aria-label', t('common.showSlide'));
        });

        if (typeof window.initHeroDevice === 'function') {
            window.initHeroDevice();
        }
    }

    function renderExpertise() {
        var root = document.getElementById('expertise-grid');
        var siteData = data();
        if (!root || !siteData) return;
        root.innerHTML = '';
        siteData.expertise.forEach(function (item) {
            root.appendChild(el('article', 'panel reveal', ''
                + '<div class="panel__icon">' + icon(item.icon) + '</div>'
                + '<h3 class="panel__title">' + item.title + '</h3>'
                + '<p class="panel__text">' + item.text + '</p>'
            ));
        });
        observeNewReveal(root);
    }

    function renderTech() {
        var root = document.getElementById('tech-grid');
        var siteData = data();
        if (!root || !siteData) return;
        root.innerHTML = '';
        siteData.tech.forEach(function (group) {
            var tags = group.items.map(function (tag) {
                return '<li class="tag">' + tag + '</li>';
            }).join('');
            root.appendChild(el('div', 'panel panel--flat panel--stack reveal', ''
                + '<h3 class="panel__label">' + group.title + '</h3>'
                + '<ul class="tag-list tag-list--sm">' + tags + '</ul>'
            ));
        });
        observeNewReveal(root);
    }

    function renderProjects() {
        var root = document.getElementById('projects-grid');
        var siteData = data();
        if (!root || !siteData) return;
        root.innerHTML = '';
        siteData.projects.forEach(function (p) {
            var tags = p.tags.map(function (tag) {
                return '<li class="tag">' + tag + '</li>';
            }).join('');
            root.appendChild(el('article', 'panel panel--project reveal', ''
                + '<a href="' + p.url + '" class="panel__media" target="_blank" rel="noopener noreferrer" aria-label="' + p.title + ' — ' + t('common.viewProject') + '" data-track="click_project" data-project-name="' + p.title + '" data-track-location="projects">'
                + '<img src="' + p.image + '" alt="' + p.alt + '" width="400" height="250" loading="lazy">'
                + '</a>'
                + '<div class="panel__body">'
                + '<div class="panel__head"><h3 class="panel__title">' + p.title + '</h3>'
                + '<ul class="tag-list tag-list--sm">' + tags + '</ul></div>'
                + '<p class="panel__text">' + p.desc + '</p>'
                + '<p class="panel__meta">' + t('common.projectRole') + ' · ' + p.scope + '</p>'
                + '<a href="' + p.url + '" class="text-link" target="_blank" rel="noopener noreferrer" data-track="click_project" data-project-name="' + p.title + '" data-track-location="projects">'
                + t('common.viewProject') + ' ' + icon('external') + '</a>'
                + '</div>'
            ));
        });
        observeNewReveal(root);
    }

    function renderFocus() {
        var root = document.getElementById('focus-grid');
        var siteData = data();
        if (!root || !siteData) return;
        root.innerHTML = '';
        siteData.focus.forEach(function (item) {
            root.appendChild(el('li', 'focus-item', icon('check') + '<span>' + item + '</span>'));
        });
    }

    function renderArticles() {
        var root = document.getElementById('articles-grid');
        var siteData = data();
        if (!root || !siteData) return;
        root.innerHTML = '';
        siteData.articles.forEach(function (a) {
            root.appendChild(el('article', 'panel panel--article reveal', ''
                + '<a href="' + a.url + '" class="panel__article-link" target="_blank" rel="noopener noreferrer">'
                + '<div class="panel__media panel__media--wide">'
                + '<img src="' + a.image + '" alt="' + a.alt + '" width="400" height="220" loading="lazy">'
                + '</div>'
                + '<div class="panel__body">'
                + '<span class="eyebrow">' + a.category + '</span>'
                + '<h3 class="panel__title">' + a.title + '</h3>'
                + '<p class="panel__text">' + a.desc + '</p>'
                + '<span class="text-link">' + t('common.readArticle') + ' ' + icon('arrow') + '</span>'
                + '</div></a>'
            ));
        });
        observeNewReveal(root);
    }

    function renderProcess() {
        var root = document.getElementById('process-track');
        var siteData = data();
        if (!root || !siteData) return;
        root.innerHTML = '';
        siteData.process.forEach(function (step) {
            root.appendChild(el('article', 'process-item reveal', ''
                + '<div class="process-item__marker"><span>' + step.step + '</span></div>'
                + '<div class="process-item__content">'
                + '<h3 class="panel__title">' + step.title + '</h3>'
                + '<p class="panel__text">' + step.text + '</p>'
                + '</div>'
            ));
        });
        observeNewReveal(root);
    }

    window.renderSiteSections = function () {
        renderHeroFloats();
        renderIphoneSlides();
        renderExpertise();
        renderTech();
        renderProjects();
        renderFocus();
        renderArticles();
        renderProcess();
    };
})();
