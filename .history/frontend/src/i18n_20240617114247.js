import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../src/locales/en/translation.json';
import translationIS from '../src/locales/is/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  is: {
    translation: translationIS
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'is',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
