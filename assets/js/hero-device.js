(function () {
    'use strict';

    var BRAND_MARK = '<svg class="iphone__brand-mark" width="40" height="40" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M6 24V4h3.8l5.2 12.4L20.2 4H24v20h-4.2V11.6L14.4 24h-0.8L8.2 11.6V24H6z" fill="currentColor"/></svg>';

    var currentIndex = 0;
    var timer = null;
    var interval = 5000;
    var slides = [];
    var chips = [];
    var dots = [];
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var paused = false;

    function clearTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function startTimer() {
        if (reducedMotion || slides.length < 2 || paused) return;
        clearTimer();
        timer = setInterval(function () {
            goTo((currentIndex + 1) % slides.length);
        }, interval);
    }

    function resetProgress() {
        slides.forEach(function (slide) {
            var bar = slide.querySelector('.iphone__slide-progress span');
            if (!bar) return;
            bar.style.animation = 'none';
            void bar.offsetWidth;
            bar.style.animation = '';
        });
    }

    function goTo(index) {
        if (!slides.length) return;
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        if (index === currentIndex && slides[index].classList.contains('is-active')) return;

        currentIndex = index;

        slides.forEach(function (slide, i) {
            slide.classList.toggle('is-active', i === index);
        });

        chips.forEach(function (chip, i) {
            chip.classList.toggle('is-active', i + 1 === index);
            chip.setAttribute('aria-pressed', i + 1 === index ? 'true' : 'false');
        });

        dots.forEach(function (dot, i) {
            dot.classList.toggle('is-active', i === index);
        });

        resetProgress();
    }

    var visualBound = false;

    function bindChip(chip, index) {
        if (chip.dataset.heroBound === '1') return;
        chip.dataset.heroBound = '1';
        var slideIndex = index + 1;

        chip.addEventListener('click', function () {
            goTo(slideIndex);
            startTimer();
        });

        chip.addEventListener('mouseenter', function () {
            if (reducedMotion) return;
            paused = true;
            clearTimer();
            goTo(slideIndex);
        });

        chip.addEventListener('mouseleave', function () {
            if (reducedMotion) return;
            paused = false;
            startTimer();
        });

        chip.addEventListener('focus', function () {
            goTo(slideIndex);
        });
    }

    function bindDot(dot, index) {
        if (dot.dataset.heroBound === '1') return;
        dot.dataset.heroBound = '1';
        dot.addEventListener('click', function () {
            goTo(index);
            startTimer();
        });
    }

    window.initHeroDevice = function () {
        clearTimer();
        slides = Array.prototype.slice.call(document.querySelectorAll('.iphone__slide'));
        chips = Array.prototype.slice.call(document.querySelectorAll('.hero-chip'));
        dots = Array.prototype.slice.call(document.querySelectorAll('.iphone__dot'));

        if (!slides.length) return;

        chips.forEach(bindChip);
        dots.forEach(bindDot);

        var visual = document.querySelector('.hero__visual');
        if (visual && !visualBound) {
            visualBound = true;
            visual.addEventListener('mouseenter', function () {
                if (reducedMotion) return;
                paused = true;
                clearTimer();
            });
            visual.addEventListener('mouseleave', function () {
                if (reducedMotion) return;
                paused = false;
                startTimer();
            });
        }

        goTo(0);
        startTimer();
    };

    window.heroBrandMark = BRAND_MARK;
})();
