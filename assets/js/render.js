(function () {
    'use strict';

    var data = window.SITE_DATA;
    var icon = window.icon;
    if (!data) return;

    function el(tag, className, html) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (html) node.innerHTML = html;
        return node;
    }

    function observeNewReveal(root) {
        if (!window.__observeReveal || !root) return;
        root.querySelectorAll('.reveal').forEach(window.__observeReveal);
    }

    function renderHeroFloats() {
        var root = document.getElementById('hero-floats');
        if (!root) return;
        root.innerHTML = '';
        data.heroFloats.forEach(function (item, i) {
            var chip = el('button', 'hero-chip hero-chip--' + (i + 1), icon(item.icon) + '<span>' + item.label + '</span>');
            chip.type = 'button';
            chip.setAttribute('aria-label', item.title + ' — show details');
            chip.setAttribute('aria-pressed', 'false');
            chip.setAttribute('data-slide', String(i + 1));
            root.appendChild(chip);
        });
    }

    function renderIphoneSlides() {
        var slidesRoot = document.getElementById('iphone-slides');
        var dotsRoot = document.getElementById('iphone-dots');
        if (!slidesRoot || !dotsRoot) return;

        slidesRoot.innerHTML = '';
        dotsRoot.innerHTML = '';

        var allSlides = [{ type: 'profile' }].concat(data.heroFloats);

        allSlides.forEach(function (slide, i) {
            var isProfile = slide.type === 'profile';
            var profile = data.heroProfile;
            var tags = '';

            if (isProfile && profile.tags) {
                tags = '<ul class="iphone__tags">' + profile.tags.map(function (t) {
                    return '<li>' + t + '</li>';
                }).join('') + '</ul>';
            }

            var iconHtml = isProfile
                ? '<div class="iphone__slide-icon iphone__slide-icon--brand">' + (window.heroBrandMark || '') + '</div>'
                : '<div class="iphone__slide-icon">' + icon(slide.icon) + '</div>';

            slidesRoot.appendChild(el('article', 'iphone__slide' + (i === 0 ? ' is-active' : ''), ''
                + iconHtml
                + '<h3 class="iphone__slide-title">' + (isProfile ? profile.title : slide.title) + '</h3>'
                + '<p class="iphone__slide-role">' + (isProfile ? profile.role : slide.label) + '</p>'
                + '<p class="iphone__slide-text">' + (isProfile ? profile.text : slide.text) + '</p>'
                + (isProfile ? tags : '')
                + '<div class="iphone__slide-progress" aria-hidden="true"><span></span></div>'
            ));

            dotsRoot.appendChild(el('button', 'iphone__dot' + (i === 0 ? ' is-active' : ''), ''));
        });

        dotsRoot.querySelectorAll('.iphone__dot').forEach(function (dot) {
            dot.type = 'button';
            dot.setAttribute('aria-label', 'Show slide');
        });

        if (typeof window.initHeroDevice === 'function') {
            window.initHeroDevice();
        }
    }

    function renderExpertise() {
        var root = document.getElementById('expertise-grid');
        if (!root) return;
        root.innerHTML = '';
        data.expertise.forEach(function (item) {
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
        if (!root) return;
        root.innerHTML = '';
        data.tech.forEach(function (group) {
            var tags = group.items.map(function (t) {
                return '<li class="tag">' + t + '</li>';
            }).join('');
            root.appendChild(el('div', 'panel panel--flat', ''
                + '<h3 class="panel__label">' + group.title + '</h3>'
                + '<ul class="tag-list">' + tags + '</ul>'
            ));
        });
    }

    function renderProjects() {
        var root = document.getElementById('projects-grid');
        if (!root) return;
        root.innerHTML = '';
        data.projects.forEach(function (p) {
            var tags = p.tags.map(function (t) {
                return '<li class="tag">' + t + '</li>';
            }).join('');
            root.appendChild(el('article', 'panel panel--project reveal', ''
                + '<a href="' + p.url + '" class="panel__media" target="_blank" rel="noopener noreferrer" aria-label="' + p.title + ' — view project">'
                + '<img src="' + p.image + '" alt="' + p.alt + '" width="400" height="250" loading="lazy">'
                + '</a>'
                + '<div class="panel__body">'
                + '<div class="panel__head"><h3 class="panel__title">' + p.title + '</h3>'
                + '<ul class="tag-list tag-list--sm">' + tags + '</ul></div>'
                + '<p class="panel__text">' + p.desc + '</p>'
                + '<p class="panel__meta">iOS Developer · ' + p.scope + '</p>'
                + '<a href="' + p.url + '" class="text-link" target="_blank" rel="noopener noreferrer">'
                + 'View project ' + icon('external') + '</a>'
                + '</div>'
            ));
        });
        observeNewReveal(root);
    }

    function renderFocus() {
        var root = document.getElementById('focus-grid');
        if (!root) return;
        root.innerHTML = '';
        data.focus.forEach(function (item) {
            root.appendChild(el('li', 'focus-item', icon('check') + '<span>' + item + '</span>'));
        });
    }

    function renderArticles() {
        var root = document.getElementById('articles-grid');
        if (!root) return;
        root.innerHTML = '';
        data.articles.forEach(function (a) {
            root.appendChild(el('article', 'panel panel--article reveal', ''
                + '<a href="' + a.url + '" class="panel__article-link" target="_blank" rel="noopener noreferrer">'
                + '<div class="panel__media panel__media--wide">'
                + '<img src="' + a.image + '" alt="' + a.alt + '" width="400" height="220" loading="lazy">'
                + '</div>'
                + '<div class="panel__body">'
                + '<span class="eyebrow">' + a.category + '</span>'
                + '<h3 class="panel__title">' + a.title + '</h3>'
                + '<p class="panel__text">' + a.desc + '</p>'
                + '<span class="text-link">Read article ' + icon('arrow') + '</span>'
                + '</div></a>'
            ));
        });
        observeNewReveal(root);
    }

    function renderProcess() {
        var root = document.getElementById('process-track');
        if (!root) return;
        root.innerHTML = '';
        data.process.forEach(function (step) {
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
