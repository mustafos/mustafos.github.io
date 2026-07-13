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
            root.appendChild(el('div', 'hero-chip hero-chip--' + (i + 1), icon(item.icon) + '<span>' + item.label + '</span>'));
        });
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
                + '<a href="' + p.url + '" class="panel__media" target="_blank" rel="noopener noreferrer">'
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
        data.process.forEach(function (step, i) {
            var isLast = i === data.process.length - 1;
            root.appendChild(el('article', 'process-item reveal', ''
                + '<div class="process-item__marker"><span>' + step.step + '</span></div>'
                + '<div class="process-item__content">'
                + '<h3 class="panel__title">' + step.title + '</h3>'
                + '<p class="panel__text">' + step.text + '</p>'
                + '</div>'
                + (isLast ? '' : '<div class="process-item__line" aria-hidden="true"></div>')
            ));
        });
        observeNewReveal(root);
    }

    window.renderSiteSections = function () {
        renderHeroFloats();
        renderExpertise();
        renderTech();
        renderProjects();
        renderFocus();
        renderArticles();
        renderProcess();
    };
})();
