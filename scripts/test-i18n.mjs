import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const LOCALES = ['en', 'cs', 'es', 'uk', 'sk'];
const EXPECTED = {
  en: {
    heroTitle: 'I build and ship native iOS products for startups and product teams.',
    profileRole: 'Mobile Product Engineer',
    profileText: 'Platform, fintech, and cross-platform delivery.',
    navAbout: 'About',
    floatLabel: 'Architecture',
    floatCategory: 'Structure',
    undefinedCount: 0
  },
  cs: {
    heroTitle: 'Vytvářím a vylepšuji nativní iOS produkty pro startupy a produktové týmy.',
    profileRole: 'iOS vývojář',
    profileText: 'Vytvářím a vydávám nativní iOS produkty pro startupy a produktové týmy.',
    navAbout: 'O mně',
    floatLabel: 'Architektura',
    floatCategory: 'Struktura',
    undefinedCount: 0
  },
  es: {
    heroTitle: 'Creo y mejoro productos iOS nativos para startups y equipos de producto.',
    profileRole: 'Desarrollador iOS',
    profileText: 'Creo y publico productos iOS nativos para startups y equipos de producto.',
    navAbout: 'Sobre mí',
    floatLabel: 'Arquitectura',
    floatCategory: 'Estructura',
    undefinedCount: 0
  },
  uk: {
    heroTitle: 'Створюю та вдосконалюю нативні iOS-продукти для стартапів і продуктових команд.',
    profileRole: 'iOS-розробник',
    profileText: 'Створюю та випускаю нативні iOS-продукти для стартапів і продуктових команд.',
    navAbout: 'Про мене',
    floatLabel: 'Архітектура',
    floatCategory: 'Структура',
    undefinedCount: 0
  },
  sk: {
    heroTitle: 'Vytváram a vylepšujem natívne iOS produkty pre startupy a produktové tímy.',
    profileRole: 'iOS vývojár',
    profileText: 'Vytváram a vydávam natívne iOS produkty pre startupy a produktové tímy.',
    navAbout: 'O mne',
    floatLabel: 'Architektúra',
    floatCategory: 'Štruktúra',
    undefinedCount: 0
  }
};

function createDom() {
  const store = {
    'iphone-slides': '',
    'iphone-dots': '',
    'hero-floats': '',
    'projects-grid': '',
    'archive-grid': '',
    'writing-featured': '',
    'writing-secondary': ''
  };

  const elements = new Map();

  function makeEl(id) {
    if (elements.has(id)) return elements.get(id);
    const el = {
      id,
      innerHTML: '',
      textContent: '',
      children: [],
      attributes: {},
      classList: {
        _set: new Set(),
        toggle(name, on) { if (on) this._set.add(name); else this._set.delete(name); },
        contains(name) { return this._set.has(name); },
        add(name) { this._set.add(name); }
      },
      setAttribute(name, value) { this.attributes[name] = value; },
      getAttribute(name) { return this.attributes[name]; },
      removeAttribute(name) { delete this.attributes[name]; },
      appendChild(node) {
        this.children.push(node);
        const html = node.outerHTML || node.innerHTML || '';
        this.innerHTML += html;
        store[id] = this.innerHTML;
      },
      querySelectorAll(sel) {
        if (sel === '.iphone__dot') {
          const count = (store['iphone-slides'].match(/iphone__slide/g) || []).length;
          return Array.from({ length: count }, (_, i) => makeEl(`dot-${i}`));
        }
        if (sel === '.hero-chip') {
          const count = (store['hero-floats'].match(/hero-chip/g) || []).length;
          return Array.from({ length: count }, (_, i) => makeEl(`chip-${i}`));
        }
        if (sel === '.reveal') return [];
        return [];
      },
      querySelector() { return null; }
    };
    Object.defineProperty(el, 'innerHTML', {
      get() { return store[id] || ''; },
      set(v) { store[id] = v; }
    });
    elements.set(id, el);
    return el;
  }

  return {
    store,
    document: {
      readyState: 'complete',
      title: '',
      documentElement: { lang: 'en' },
      head: { appendChild() {}, querySelector: () => null },
      body: { getAttribute: () => null },
      querySelector(sel) {
        if (sel === '[data-i18n-copyright]') return makeEl('copyright');
        if (sel === '#person-jsonld') return makeEl('jsonld');
        if (sel === '.hero__visual') return makeEl('hero-visual');
        return null;
      },
      querySelectorAll(sel) {
        if (sel === '[data-i18n]') {
          return [
            { getAttribute: () => 'hero.title', textContent: '', set textContent(v) { this._t = v; }, get textContent() { return this._t; } },
            { getAttribute: () => 'nav.about', textContent: '', set textContent(v) { this._t = v; }, get textContent() { return this._t; } }
          ];
        }
        if (sel === '[data-i18n-attr]') return [];
        if (sel === '[data-i18n-placeholder]') return [];
        if (sel === '[data-legal-link]') return [];
        if (sel === '[data-lang-switch]') return [];
        return [];
      },
      getElementById: (id) => makeEl(id),
      createElement(tag) {
        return {
          tagName: tag.toUpperCase(),
          attributes: {},
          setAttribute(name, value) { this.attributes[name] = value; },
          getAttribute(name) { return this.attributes[name]; }
        };
      },
      addEventListener() {},
      dispatchEvent() {}
    }
  };
}

async function runLocale(locale) {
  const dom = createDom();
  const ctx = {
    window: {},
    navigator: { language: 'en-US' },
    localStorage: { getItem: () => null, setItem() {} },
    URLSearchParams,
    CustomEvent: class CustomEvent { constructor(type, opts) { this.type = type; this.detail = opts?.detail; } },
    fetch: (url) => {
      const file = path.join(root, url.replace(/^\//, ''));
      const body = fs.readFileSync(file, 'utf8');
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(JSON.parse(body))
      });
    }
  };
  ctx.window = ctx;
  vm.createContext(ctx);

  ctx.window.location = { pathname: '/', search: locale === 'en' ? '' : `?lang=${locale}`, hash: '' };
  ctx.window.history = { replaceState() {} };
  ctx.window.initHeroDevice = () => {};
  ctx.window.matchMedia = () => ({ matches: false });
  ctx.window.addEventListener = () => {};
  ctx.window.dispatchEvent = () => {};
  ctx.window.__observeReveal = null;
  ctx.document = dom.document;
  ctx.window.document = dom.document;

  for (const file of [
    'assets/locales/en.js',
    'assets/js/icons.js',
    'assets/js/data.js',
    'assets/js/i18n.js',
    'assets/js/render.js'
  ]) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });
  }

  await ctx.window.I18n.init();
  ctx.window.renderSiteSections();

  const slides = dom.store['iphone-slides'];
  const floats = dom.store['hero-floats'];
  const exp = EXPECTED[locale];

  const checks = [
    ['locale', ctx.window.I18n.getLocale(), locale],
    ['hero.profile.role', ctx.window.I18n.t('hero.profile.role'), exp.profileRole],
    ['hero.profile.text', ctx.window.I18n.t('hero.profile.text'), exp.profileText],
    ['slide role in DOM', slides.includes(exp.profileRole), true],
    ['slide text in DOM', slides.includes(exp.profileText), true],
    ['no undefined in slides', !slides.includes('undefined'), true],
    ['float label translated', floats.includes(exp.floatLabel), true],
    ['float category in slides', slides.includes(exp.floatCategory), true]
  ];

  const failures = checks.filter(([, actual, expected]) => actual !== expected);
  return { locale, failures, slidesSnippet: slides.slice(0, 280) };
}

const results = [];
for (const locale of LOCALES) {
  results.push(await runLocale(locale));
}

let failed = 0;
for (const r of results) {
  if (r.failures.length) {
    failed += r.failures.length;
    console.log(`\n❌ ${r.locale.toUpperCase()}`);
    for (const [name, actual, expected] of r.failures) {
      console.log(`   ${name}: expected "${expected}", got "${actual}"`);
    }
  } else {
    console.log(`✅ ${r.locale.toUpperCase()} — all checks passed`);
  }
}

if (failed) {
  process.exit(1);
}

console.log(`\nAll ${LOCALES.length} locales passed.`);
