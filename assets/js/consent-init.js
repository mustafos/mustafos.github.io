(function () {
    'use strict';

    var STORAGE_KEY = 'portfolio-analytics-consent';
    var COOKIE_KEY = 'portfolio_analytics_consent';
    var value = null;

    try {
        value = localStorage.getItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }

    if (value !== 'granted' && value !== 'denied') {
        var match = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_KEY + '=([^;]+)'));
        if (match) value = decodeURIComponent(match[1]);
    }

    if (value === 'granted' || value === 'denied') {
        document.documentElement.setAttribute('data-consent', value);
    }
})();
