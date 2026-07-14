(function () {
    'use strict';

    var STORAGE_KEY = 'portfolio-analytics-consent';
    var COOKIE_KEY = 'portfolio_analytics_consent';
    var COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

    function readCookie() {
        var match = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_KEY + '=([^;]+)'));
        return match ? decodeURIComponent(match[1]) : null;
    }

    function writeCookie(value) {
        var secure = location.protocol === 'https:' ? '; Secure' : '';
        var cookie = COOKIE_KEY + '=' + encodeURIComponent(value)
            + '; Path=/'
            + '; Max-Age=' + COOKIE_MAX_AGE
            + '; SameSite=Lax'
            + secure;

        if (location.hostname.indexOf('.') !== -1 && location.hostname !== 'localhost') {
            var rootDomain = location.hostname.replace(/^www\./, '');
            cookie += '; Domain=.' + rootDomain;
        }

        document.cookie = cookie;
    }

    function readConsent() {
        var value = null;

        try {
            value = localStorage.getItem(STORAGE_KEY);
        } catch (e) { /* ignore */ }

        if (value !== 'granted' && value !== 'denied') {
            value = readCookie();
            if (value === 'granted' || value === 'denied') {
                try {
                    localStorage.setItem(STORAGE_KEY, value);
                } catch (e) { /* ignore */ }
            }
        }

        return value === 'granted' || value === 'denied' ? value : null;
    }

    function writeConsent(value) {
        var stored = false;

        try {
            localStorage.setItem(STORAGE_KEY, value);
            stored = localStorage.getItem(STORAGE_KEY) === value;
        } catch (e) { /* ignore */ }

        try {
            writeCookie(value);
        } catch (e) { /* ignore */ }

        if (stored || readCookie() === value) {
            document.documentElement.setAttribute('data-consent', value);
        }

        return stored || readCookie() === value;
    }

    function bannerEl() {
        return document.getElementById('consent-banner');
    }

    function showBanner() {
        var banner = bannerEl();
        if (!banner) return;
        banner.hidden = false;
        document.body.classList.add('has-consent-banner');
    }

    function hideBanner() {
        var banner = bannerEl();
        if (!banner) return;
        banner.hidden = true;
        document.body.classList.remove('has-consent-banner');
    }

    function applyConsent(value) {
        if (!window.Analytics) return;

        if (value === 'granted') {
            window.Analytics.grantConsent();
        } else if (value === 'denied') {
            window.Analytics.denyConsent();
        }
    }

    function bindBanner() {
        document.querySelectorAll('[data-consent]').forEach(function (button) {
            button.addEventListener('click', function () {
                var action = button.getAttribute('data-consent');
                var value = action === 'accept' ? 'granted' : 'denied';

                if (!writeConsent(value)) return;

                applyConsent(value);
                if (value === 'granted' && window.Analytics) {
                    window.Analytics.trackPageView();
                }
                hideBanner();
            });
        });
    }

    function init() {
        bindBanner();

        var stored = readConsent();
        if (stored) {
            document.documentElement.setAttribute('data-consent', stored);
            applyConsent(stored);
            hideBanner();
            return;
        }

        document.documentElement.removeAttribute('data-consent');
        showBanner();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.Consent = {
        getChoice: readConsent
    };
})();
