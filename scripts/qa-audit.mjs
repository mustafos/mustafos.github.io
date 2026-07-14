import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const results = { pass: [], issues: [], fixes: [] };

function pass(msg) { results.pass.push(msg); }
function issue(severity, msg) { results.issues.push({ severity, msg }); }

function loadScripts(ctx, files) {
  for (const file of files) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });
  }
}

function createHomeContext(locale = 'en', consent = null) {
  const hreflangLinks = [
    { rel: 'alternate', hreflang: 'en', href: 'https://www.mustafabekirov.com/' },
    { rel: 'alternate', hreflang: 'cs', href: 'https://www.mustafabekirov.com/?lang=cs' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://www.mustafabekirov.com/' }
  ];
  const metas = new Map([
    ['description', 'static description'],
    ['og:title', 'static og title']
  ]);
  const canonical = { href: 'https://www.mustafabekirov.com/', setAttribute(n, v) { if (n === 'href') this.href = v; } };

  const ctx = {
    window: {},
    navigator: { language: 'en-US' },
    localStorage: {
      _data: { 'portfolio-locale': locale, 'portfolio-analytics-consent': consent },
      getItem(k) { return this._data[k] ?? null; },
      setItem(k, v) { this._data[k] = v; }
    },
    document: {
      cookie: consent ? `portfolio_analytics_consent=${consent}` : '',
      readyState: 'complete',
      title: 'Home',
      documentElement: { lang: 'en', setAttribute() {}, removeAttribute() {}, getAttribute: () => null },
      head: {
        appendChild(el) {
          if (el.hreflang) hreflangLinks.push(el);
        }
      },
      body: { getAttribute: () => null, classList: { add() {}, remove() {} } },
      querySelector(sel) {
        if (sel === 'link[rel="canonical"]') return canonical;
        if (sel === 'meta[name="description"]') return { setAttribute(n, v) { metas.set('description', v); }, getAttribute: () => metas.get('description') };
        if (sel === 'meta[property="og:title"]') return { setAttribute(n, v) { metas.set('og:title', v); }, getAttribute: () => metas.get('og:title') };
        if (sel === '#consent-banner') return { hidden: true, setAttribute() {} };
        if (sel === '#person-jsonld') return { textContent: fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/id="person-jsonld"[\s\S]*?>([\s\S]*?)<\/script>/)[1] };
        if (sel === '#website-jsonld') return { textContent: fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/id="website-jsonld"[\s\S]*?>([\s\S]*?)<\/script>/)[1] };
        return null;
      },
      querySelectorAll(sel) {
        if (sel === '[data-i18n]') return [];
        if (sel === '[data-i18n-attr]') return [];
        if (sel === '[data-i18n-placeholder]') return [];
        if (sel === '[data-legal-link]') return [];
        if (sel === '[data-lang-switch]') return [];
        if (sel === '[data-consent]') return [];
        if (sel === 'link[rel="alternate"][hreflang]') {
          return hreflangLinks.map((link) => ({
            hreflang: link.hreflang,
            parentNode: {
              removeChild(el) {
                const idx = hreflangLinks.indexOf(el);
                if (idx >= 0) hreflangLinks.splice(idx, 1);
              }
            }
          }));
        }
        return [];
      },
      getElementById(id) {
        if (id === 'consent-banner') return { hidden: true };
        return null;
      },
      createElement(tag) {
        const el = { tagName: tag.toUpperCase(), attributes: {} };
        el.setAttribute = (n, v) => { el[n] = v; el.attributes[n] = v; };
        el.getAttribute = (n) => el.attributes[n];
        return el;
      },
      addEventListener() {},
      dispatchEvent() {}
    },
    URLSearchParams,
    CustomEvent: class CustomEvent { constructor(type, opts) { this.type = type; this.detail = opts?.detail; } },
    fetch: (url) => {
      const file = path.join(root, String(url).replace(/^\//, ''));
      return Promise.resolve({ ok: true, json: () => Promise.resolve(JSON.parse(fs.readFileSync(file, 'utf8'))) });
    },
    location: { protocol: 'http:', hostname: 'localhost', pathname: '/', search: locale === 'en' ? '' : `?lang=${locale}`, hash: '' },
    history: { replaceState() {} },
    matchMedia: () => ({ matches: false }),
    dataLayer: [],
    __analyticsLastView: null
  };

  ctx.window = ctx;
  ctx.window.document = ctx.document;
  ctx.window.location = ctx.location;
  ctx.window.history = ctx.history;
  ctx.window.localStorage = ctx.localStorage;
  ctx.window.dataLayer = ctx.dataLayer;
  ctx.gtag = function () { ctx.dataLayer.push(Array.from(arguments)); };
  ctx.window.gtag = ctx.gtag;

  return { ctx, hreflangLinks, canonical, metas };
}

function createLegalContext() {
  const canonical = { href: 'https://www.mustafabekirov.com/privacy.html' };
  const hreflangLinks = [];
  const ctx = {
    window: {},
    navigator: { language: 'en-US' },
    localStorage: { getItem: () => null, setItem() {} },
    document: {
      cookie: '',
      readyState: 'complete',
      title: 'Privacy Policy — Mustafa Bekirov',
      documentElement: { lang: 'en', setAttribute() {}, removeAttribute() {}, getAttribute: () => null },
      head: { appendChild(el) { if (el.hreflang) hreflangLinks.push(el); } },
      body: { getAttribute: (k) => (k === 'data-legal-title' ? 'legal.privacyTitle' : null), classList: { add() {}, remove() {} } },
      querySelector(sel) {
        if (sel === 'link[rel="canonical"]') return canonical;
        if (sel === '#consent-banner') return { hidden: true };
        return null;
      },
      querySelectorAll(sel) {
        if (sel === '[data-i18n]') return [];
        if (sel === '[data-i18n-attr]') return [];
        if (sel === '[data-i18n-placeholder]') return [];
        if (sel === '[data-legal-link]') return [];
        if (sel === '[data-lang-switch]') return [];
        if (sel === '[data-consent]') return [];
        if (sel === 'link[rel="alternate"][hreflang]') return hreflangLinks.map((link) => ({ hreflang: link.hreflang, parentNode: { removeChild() {} } }));
        return [];
      },
      getElementById: () => ({ hidden: true }),
      createElement: () => ({ setAttribute() {}, getAttribute() {} }),
      addEventListener() {},
      dispatchEvent() {}
    },
    URLSearchParams,
    CustomEvent: class CustomEvent {},
    fetch: (url) => Promise.resolve({ ok: true, json: () => Promise.resolve(JSON.parse(fs.readFileSync(path.join(root, String(url).replace(/^\//, '')), 'utf8'))) }),
    location: { protocol: 'http:', hostname: 'localhost', pathname: '/privacy.html', search: '', hash: '' },
    history: { replaceState() {} },
    dataLayer: []
  };
  ctx.window = ctx;
  ctx.window.document = ctx.document;
  ctx.window.location = ctx.location;
  ctx.window.history = ctx.history;
  ctx.gtag = function () { ctx.dataLayer.push(Array.from(arguments)); };
  ctx.window.gtag = ctx.gtag;
  return { ctx, canonical, hreflangLinks };
}

// Static file checks
for (const file of ['robots.txt', 'sitemap.xml', 'assets/js/config.js', 'assets/js/analytics.js', 'assets/js/consent.js', 'assets/js/consent-init.js']) {
  if (fs.existsSync(path.join(root, file))) pass(`File exists: ${file}`);
  else issue('Critical', `Missing file: ${file}`);
}

const config = fs.readFileSync(path.join(root, 'assets/js/config.js'), 'utf8');
if (config.includes("gaMeasurementId: ''")) pass('GA measurement ID intentionally empty in local config');
else pass('GA measurement ID present in config');

// JSON-LD validity
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const block of indexHtml.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
  JSON.parse(block[1]);
}
pass('JSON-LD blocks in index.html parse as valid JSON');

// Legal noindex
for (const legal of ['privacy.html', 'terms.html']) {
  const html = fs.readFileSync(path.join(root, legal), 'utf8');
  if (html.includes('content="noindex, follow"')) pass(`${legal} has noindex`);
  else issue('Medium', `${legal} missing noindex`);
}

// Runtime: homepage hreflang count
{
  const { ctx, hreflangLinks } = createHomeContext('cs');
  vm.createContext(ctx);
  loadScripts(ctx, ['assets/locales/en.js', 'assets/js/i18n.js']);
  await ctx.window.I18n.init();
  const count = hreflangLinks.filter((l) => l.hreflang).length;
  if (count === 6) pass('Homepage hreflang count is 6 (5 locales + x-default) after i18n init');
  else issue('Critical', `Homepage hreflang count is ${count}, expected 6`);
}

// Runtime: legal page canonical preserved
{
  const { ctx, canonical, hreflangLinks } = createLegalContext();
  vm.createContext(ctx);
  loadScripts(ctx, ['assets/locales/en.js', 'assets/js/i18n.js']);
  await ctx.window.I18n.init();
  if (canonical.href.includes('privacy.html')) pass('Legal page canonical preserved after i18n init');
  else issue('Critical', `Legal page canonical overwritten to ${canonical.href}`);
  if (hreflangLinks.length === 0) pass('Legal page does not inject homepage hreflang links');
  else issue('Medium', `Legal page injected ${hreflangLinks.length} hreflang links`);
}

// Analytics without GA ID
{
  const { ctx } = createHomeContext('en', null);
  vm.createContext(ctx);
  loadScripts(ctx, ['assets/js/config.js', 'assets/js/analytics.js']);
  if (!ctx.window.Analytics.isEnabled()) pass('Analytics disabled when GA ID is empty');
  else issue('Critical', 'Analytics enabled without GA ID');
  const before = ctx.dataLayer.length;
  ctx.window.Analytics.trackEvent('click_email', { destination: 'mailto:test@example.com' });
  if (ctx.dataLayer.length === before) pass('Custom events no-op without GA ID / consent');
  else issue('Medium', 'Custom events fired without GA ID');
}

// Analytics consent defaults
{
  const { ctx } = createHomeContext('en', null);
  vm.createContext(ctx);
  loadScripts(ctx, ['assets/js/config.js', 'assets/js/analytics.js']);
  const consentDefault = ctx.dataLayer.find((entry) => entry[0] === 'consent' && entry[1] === 'default');
  if (consentDefault && consentDefault[2].analytics_storage === 'denied') pass('Consent Mode default denies analytics_storage');
  else issue('Critical', 'Consent Mode default not denying analytics');
}

// Duplicate pageview guard with mocked GA ID
{
  const { ctx } = createHomeContext('en', 'granted');
  ctx.window.__SITE_CONFIG = { gaMeasurementId: 'G-TEST123' };
  vm.createContext(ctx);
  loadScripts(ctx, ['assets/js/config.js', 'assets/js/analytics.js', 'assets/js/consent.js']);
  ctx.document.querySelectorAll = (sel) => {
    if (sel === '[data-consent]') return [];
    if (sel === '#consent-banner') return { hidden: true };
    return [];
  };
  await new Promise((r) => setTimeout(r, 0));
  ctx.window.Analytics.grantConsent();
  ctx.window.Analytics.trackPageView();
  ctx.window.Analytics.trackPageView();
  const pageViews = ctx.dataLayer.filter((entry) => entry[0] === 'event' && entry[1] === 'page_view');
  if (pageViews.length === 1) pass('Duplicate page_view suppressed for same path');
  else issue('Medium', `Expected 1 page_view event, got ${pageViews.length}`);
}

console.log('\n=== QA AUDIT SUMMARY ===');
console.log(`Passed: ${results.pass.length}`);
console.log(`Issues: ${results.issues.length}`);
for (const p of results.pass) console.log('✅', p);
for (const i of results.issues) console.log(`${i.severity === 'Critical' ? '🔴' : i.severity === 'Medium' ? '🟡' : '⚪'} [${i.severity}]`, i.msg);

if (results.issues.some((i) => i.severity === 'Critical')) process.exit(1);
