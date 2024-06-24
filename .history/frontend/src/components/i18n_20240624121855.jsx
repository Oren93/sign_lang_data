// src/i18n.jsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importing English translations
import enAbout from '../locales/en/about.json';
import enCommon from '../locales/en/common.json';
import enContact from '../locales/en/contact.json';
import enHomepage from '../locales/en/homepage.json';
import enRecordPage from '../locales/en/record_page.json';

// Importing Icelandic translations
import isAbout from '../locales/is/about.json';
import isCommon from '../locales/is/common.json';
import isContact from '../locales/is/contact.json';
import isHomepage from '../locales/is/homepage.json';
import isRecordPage from '../locales/is/record_page.json';

const resources = {
  en: {
    about: enAbout,
    common: enCommon,
    contact: enContact,
    homepage: enHomepage,
    record_page: enRecordPage,
  },
  is: {
    about: isAbout,
    common: isCommon,
    contact: isContact,
    homepage: isHomepage,
    record_page: isRecordPage,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'is',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    ns: ['about', 'common', 'contact', 'homepage', 'record_page', 'login_sign_sup'], // Specify the namespaces
    defaultNS: 'common', // Specify the default namespace
  });

export default i18n;
