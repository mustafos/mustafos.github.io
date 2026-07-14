(function () {
    'use strict';

    var loaded = false;
    var scriptRequested = false;

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        window.dataLayer.push(arguments);
    }

    window.gtag = gtag;

    function getMeasurementId() {
        return (window.__SITE_CONFIG && window.__SITE_CONFIG.gaMeasurementId) || '';
    }

    function getLocale() {
        return window.I18n ? window.I18n.getLocale() : 'en';
    }

    function initConsentDefaults() {
        gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
        });
    }

    function loadScript(id) {
        if (scriptRequested || !id) return;
        scriptRequested = true;

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
        document.head.appendChild(script);
    }

    function configureAnalytics() {
        var id = getMeasurementId();
        if (!id || loaded) return;

        loadScript(id);
        gtag('js', new Date());
        gtag('config', id, {
            anonymize_ip: true,
            send_page_view: false,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
        });
        loaded = true;
    }

    function grantConsent() {
        gtag('consent', 'update', {
            analytics_storage: 'granted'
        });
        configureAnalytics();
    }

    function denyConsent() {
        gtag('consent', 'update', {
            analytics_storage: 'denied'
        });
    }

    function trackEvent(name, params) {
        if (!loaded || !getMeasurementId()) return;

        var payload = Object.assign({ locale: getLocale() }, params || {});
        gtag('event', name, payload);
    }

    function trackPageView() {
        if (!loaded || !getMeasurementId()) return;

        var pathKey = window.location.pathname + window.location.search + window.location.hash;
        if (window.__analyticsLastView === pathKey) return;
        window.__analyticsLastView = pathKey;

        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname + window.location.search + window.location.hash,
            locale: getLocale()
        });
    }

    function bindTracking() {
        if (window.__analyticsTrackingBound) return;
        window.__analyticsTrackingBound = true;

        document.addEventListener('click', function (event) {
            var target = event.target.closest('[data-track]');
            if (!target) return;

            trackEvent(target.getAttribute('data-track'), {
                destination: target.getAttribute('href') || '',
                cta_location: target.getAttribute('data-track-location') || '',
                project_name: target.getAttribute('data-project-name') || ''
            });
        }, true);
    }

    function init() {
        initConsentDefaults();
        bindTracking();

        if (location.hostname.indexOf('mustafabekirov.com') !== -1 && !getMeasurementId()) {
            console.warn('[Analytics] GA measurement ID is missing. Set GitHub secret GA_MEASUREMENT_ID and redeploy from master.');
        }
    }

    init();

    window.Analytics = {
        grantConsent: grantConsent,
        denyConsent: denyConsent,
        trackEvent: trackEvent,
        trackPageView: trackPageView,
        isEnabled: function () {
            return loaded && !!getMeasurementId();
        }
    };
})();
