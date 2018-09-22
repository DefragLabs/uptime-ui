import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
.use(XHR)
.use(LanguageDetector)
.init({
  preload: ['en'],
  supportedLngs: ['en'],
  fallbackLng: 'en',
  debug: true,
  ns: ['translations'],
  defaultNS: 'translations',
  backend: {
    loadPath: '/locale/en/translations.json'
  },
  getAsync:false,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  // react i18next special options (optional)
  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default'
  }
});

/**
 * The 'wait' option tells the translate(...) method not to actually build the component until the language
 * pack is loaded which eliminates the flicker we were seeing.
 * @type {{wait: boolean}}
 */
export const translateOptions = {
  wait: true
};

export default i18n;