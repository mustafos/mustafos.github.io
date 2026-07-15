import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(root, 'assets/locales/en.js'), 'utf8'), ctx);
const en = ctx.window.__LOCALE_FALLBACK;

const floatMap = {
  cs: ['SwiftUI', 'Architektura', 'Bezpečnost', 'CI/CD'],
  es: ['SwiftUI', 'Arquitectura', 'Seguridad', 'CI/CD'],
  uk: ['SwiftUI', 'Архітектура', 'Безпека', 'CI/CD'],
  sk: ['SwiftUI', 'Architektúra', 'Bezpečnosť', 'CI/CD']
};

for (const locale of ['cs', 'es', 'uk', 'sk']) {
  const file = path.join(root, 'assets/locales', `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const oldItems = data.projects?.items || [];
  const sourceFloats = data.hero?.floats || [];

  data.nav = {
    work: data.nav?.projects || data.nav?.work || en.nav.work,
    about: data.nav?.about || en.nav.about,
    articles: data.nav?.articles || en.nav.articles,
    contact: data.nav?.contact || en.nav.contact,
    downloadCv: data.nav?.downloadCv || en.nav.downloadCv
  };

  data.hero = Object.assign({}, data.hero, {
    proof: data.hero?.proof || en.hero.proof,
    lead: data.hero?.lead || en.hero.lead
  });
  data.hero.floats = floatMap[locale].map((label) => {
    return sourceFloats.find((f) => f.label === label) || en.hero.floats.find((f) => f.label === label.replace('Architektura', 'Architecture').replace('Arquitectura', 'Architecture').replace('Архітектура', 'Architecture').replace('Architektúra', 'Architecture').replace('Bezpečnost', 'Security').replace('Seguridad', 'Security').replace('Безпека', 'Security').replace('Bezpečnosť', 'Security'));
  }).filter(Boolean);

  if (data.about?.p2) delete data.about.p2;

  data.projects = Object.assign({}, data.projects, {
    eyebrow: data.projects?.eyebrow || en.projects.eyebrow,
    heading: data.projects?.heading || en.projects.heading,
    lead: data.projects?.lead || en.projects.lead,
    moreEyebrow: en.projects.moreEyebrow,
    moreHeading: en.projects.moreHeading,
    moreLead: en.projects.moreLead,
    flagship: en.projects.flagship.map((item, i) => {
      const old = oldItems[i] || {};
      return Object.assign({}, item, {
        alt: old.alt || item.alt,
        context: old.desc || item.context
      });
    }),
    archive: oldItems.slice(4).map((old) => ({ desc: old.desc, alt: old.alt }))
  });
  delete data.projects.items;

  data.writing = Object.assign({}, data.writing, {
    lead: data.writing?.lead || en.writing.lead,
    items: (data.writing?.items || []).slice(0, 3)
  });

  data.common = Object.assign({}, data.common, {
    slideOf: en.common.slideOf,
    caseContext: en.common.caseContext,
    caseRole: en.common.caseRole,
    caseOwned: en.common.caseOwned,
    caseProblem: en.common.caseProblem,
    caseSolution: en.common.caseSolution,
    caseOutcome: en.common.caseOutcome
  });

  delete data.expertise;
  delete data.stack;
  delete data.experience;
  delete data.process;

  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  console.log('Updated', locale);
}
