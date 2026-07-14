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

    function escapeHtml(value) {
        return safe(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
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

    function renderListItems(items) {
        if (!items || !items.length) return '';
        return '<ul class="case-study__list">' + items.map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
        }).join('') + '</ul>';
    }

    function limitTags(tags, max) {
        return (tags || []).slice(0, max);
    }

    function renderCaseStudyField(label, content, modifier) {
        if (!content) return '';
        var mod = modifier ? ' case-study__field--' + modifier : '';
        return ''
            + '<div class="case-study__field' + mod + '">'
            + '<dt class="case-study__label">' + escapeHtml(label) + '</dt>'
            + '<dd class="case-study__value">' + content + '</dd>'
            + '</div>';
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
        var slideCount = allSlides.length;

        allSlides.forEach(function (slide, i) {
            var isProfile = slide.type === 'profile';
            var profile = profileContent(isProfile ? siteData.heroProfile : null);
            var tags = '';

            if (isProfile && siteData.heroProfile && siteData.heroProfile.tags) {
                tags = '<ul class="iphone__tags">' + siteData.heroProfile.tags.map(function (tag) {
                    return '<li>' + escapeHtml(tag) + '</li>';
                }).join('') + '</ul>';
            }

            var avatar = siteData.heroProfile && siteData.heroProfile.avatar;
            var iconHtml = isProfile
                ? '<div class="iphone__slide-icon iphone__slide-icon--avatar">'
                    + '<img src="' + avatar + '" alt="' + escapeHtml(t('common.portraitAlt')) + '" width="72" height="72" decoding="async">'
                    + '</div>'
                : '<div class="iphone__slide-icon">' + icon(slide.icon) + '</div>';

            var metaHtml = isProfile
                ? '<p class="iphone__slide-role">' + escapeHtml(profile.role) + '</p>'
                : '<p class="iphone__slide-eyebrow">' + escapeHtml(safe(slide.category)) + '</p>';

            var slideTitle = isProfile ? profile.title : safe(slide.label || slide.title);
            var slideText = isProfile ? profile.text : safe(slide.text);

            slidesRoot.appendChild(el('article', 'iphone__slide' + (i === 0 ? ' is-active' : ''), ''
                + iconHtml
                + metaHtml
                + '<h3 class="iphone__slide-title">' + escapeHtml(slideTitle) + '</h3>'
                + '<p class="iphone__slide-text">' + escapeHtml(slideText) + '</p>'
                + (isProfile ? tags : '')
                + '<div class="iphone__slide-progress" aria-hidden="true"><span></span></div>'
            ));

            var dot = el('button', 'iphone__dot' + (i === 0 ? ' is-active' : ''), '');
            dot.type = 'button';
            dot.setAttribute('aria-label', t('common.showSlide') + ' ' + (i + 1) + ' ' + t('common.slideOf') + ' ' + slideCount);
            dotsRoot.appendChild(dot);
        });

        if (typeof window.initHeroDevice === 'function') {
            window.initHeroDevice();
        }
    }

    function renderFlagshipProjects() {
        var root = document.getElementById('projects-grid');
        var siteData = data();
        if (!root || !siteData) return;
        root.innerHTML = '';

        siteData.flagshipProjects.forEach(function (p) {
            var tags = (p.tags || []).map(function (tag) {
                return '<li class="tag">' + escapeHtml(tag) + '</li>';
            }).join('');

            var owned = Array.isArray(p.owned) ? p.owned : [];
            var solution = Array.isArray(p.solution) ? p.solution : [];

            var details = ''
                + renderCaseStudyField(t('common.caseContext'), '<p>' + escapeHtml(p.context) + '</p>', 'compact')
                + renderCaseStudyField(t('common.caseRole'), '<p>' + escapeHtml(p.role) + '</p>', 'compact')
                + renderCaseStudyField(t('common.caseOwned'), renderListItems(owned), 'wide')
                + renderCaseStudyField(t('common.caseProblem'), '<p>' + escapeHtml(p.problem) + '</p>', 'wide')
                + renderCaseStudyField(t('common.caseSolution'), renderListItems(solution), 'wide')
                + renderCaseStudyField(t('common.caseOutcome'), '<p>' + escapeHtml(p.outcome) + '</p>', 'wide');

            root.appendChild(el('article', 'panel panel--case-study reveal', ''
                + '<div class="panel__media">'
                + '<img src="' + safe(p.image) + '" alt="' + escapeHtml(p.alt) + '" width="400" height="250" loading="lazy">'
                + '</div>'
                + '<div class="panel__body">'
                + '<div class="panel__head"><h3 class="panel__title">' + escapeHtml(p.title) + '</h3>'
                + '<ul class="tag-list tag-list--sm">' + tags + '</ul></div>'
                + '<p class="case-study__positioning">' + escapeHtml(p.positioning) + '</p>'
                + '<dl class="case-study__details">' + details + '</dl>'
                + '<a href="' + safe(p.url) + '" class="text-link case-study__link" target="_blank" rel="noopener noreferrer" data-track="click_project" data-project-name="' + escapeHtml(p.title) + '" data-track-location="projects">'
                + escapeHtml(t('common.viewProject')) + ' ' + icon('external') + '</a>'
                + '</div>'
            ));
        });

        observeNewReveal(root);
    }

    function renderArchiveProjects() {
        var root = document.getElementById('archive-grid');
        var siteData = data();
        if (!root || !siteData) return;
        root.innerHTML = '';

        siteData.archiveProjects.forEach(function (p) {
            var tags = limitTags(p.tags, 3).map(function (tag) {
                return '<li class="tag tag--rail">' + escapeHtml(tag) + '</li>';
            }).join('');

            var card = el('article', 'work-rail__card reveal', ''
                + '<a href="' + safe(p.url) + '" class="work-rail__link" target="_blank" rel="noopener noreferrer" data-track="click_project" data-project-name="' + escapeHtml(p.title) + '" data-track-location="archive">'
                + '<div class="work-rail__media">'
                + '<img src="' + safe(p.image) + '" alt="' + escapeHtml(p.alt) + '" width="260" height="146" loading="lazy" decoding="async">'
                + '</div>'
                + '<div class="work-rail__body">'
                + '<h4 class="work-rail__name">' + escapeHtml(p.title) + '</h4>'
                + '<ul class="tag-list tag-list--sm work-rail__tags">' + tags + '</ul>'
                + '<p class="work-rail__desc">' + escapeHtml(p.desc) + '</p>'
                + '</div>'
                + '</a>'
            );
            card.setAttribute('role', 'listitem');
            root.appendChild(card);
        });

        observeNewReveal(root);
    }

    function renderFeaturedArticle() {
        var root = document.getElementById('writing-featured');
        var siteData = data();
        if (!root || !siteData || !siteData.featuredArticle) return;

        var a = siteData.featuredArticle;
        root.innerHTML = '';
        root.appendChild(el('article', 'writing-featured reveal', ''
            + '<a href="' + safe(a.url) + '" class="writing-featured__link" target="_blank" rel="noopener noreferrer" data-track="click_article" data-article-name="' + escapeHtml(a.title) + '" data-track-location="writing-featured">'
            + '<div class="writing-featured__media">'
            + '<img src="' + safe(a.image) + '" alt="' + escapeHtml(a.alt) + '" width="480" height="270" loading="lazy" decoding="async">'
            + '</div>'
            + '<div class="writing-featured__body">'
            + '<span class="eyebrow">' + escapeHtml(a.category) + '</span>'
            + '<h3 class="writing-featured__title">' + escapeHtml(a.title) + '</h3>'
            + '<p class="writing-featured__desc">' + escapeHtml(a.desc) + '</p>'
            + '<span class="text-link writing-featured__cta">' + escapeHtml(t('common.readArticle')) + ' ' + icon('arrow') + '</span>'
            + '</div>'
            + '</a>'
        ));
        observeNewReveal(root);
    }

    function renderMoreArticles() {
        var root = document.getElementById('writing-rail');
        var siteData = data();
        if (!root || !siteData) return;
        root.innerHTML = '';

        siteData.moreArticles.forEach(function (a) {
            var card = el('article', 'writing-rail__card reveal', ''
                + '<a href="' + safe(a.url) + '" class="writing-rail__link" target="_blank" rel="noopener noreferrer" data-track="click_article" data-article-name="' + escapeHtml(a.title) + '" data-track-location="writing-rail">'
                + '<span class="writing-rail__category">' + escapeHtml(a.category) + '</span>'
                + '<h4 class="writing-rail__title">' + escapeHtml(a.title) + '</h4>'
                + '<p class="writing-rail__desc">' + escapeHtml(a.desc) + '</p>'
                + '</a>'
            );
            card.setAttribute('role', 'listitem');
            root.appendChild(card);
        });

        observeNewReveal(root);
    }

    window.renderSiteSections = function () {
        renderHeroFloats();
        renderIphoneSlides();
        renderFlagshipProjects();
        renderArchiveProjects();
        renderFeaturedArticle();
        renderMoreArticles();
    };
})();
