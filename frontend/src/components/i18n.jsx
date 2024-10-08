import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importing English translations
import enAbout from "../locales/en/about.json";
import enCommon from "../locales/en/common.json";
import enContact from "../locales/en/contact.json";
import enHomepage from "../locales/en/homepage.json";
import enRecordPage from "../locales/en/record_page.json";
import enLoginSign from "../locales/en/login_sign_up.json";
import enRating from "../locales/en/rating.json"; 
import enDataAccess from "../locales/en/data_access.json";

// Importing Icelandic translations
import isAbout from "../locales/is/about.json";
import isCommon from "../locales/is/common.json";
import isContact from "../locales/is/contact.json";
import isHomepage from "../locales/is/homepage.json";
import isRecordPage from "../locales/is/record_page.json";
import isLoginSign from "../locales/is/login_sign_up.json";
import isRating from "../locales/is/rating.json"; 
import isDataAccess from "../locales/is/data_access.json";

const resources = {
  en: {
    about: enAbout,
    common: enCommon,
    contact: enContact,
    homepage: enHomepage,
    record_page: enRecordPage,
    login_sign_up: enLoginSign,
    rating: enRating, 
    data_access: enDataAccess, 
  },
  is: {
    about: isAbout,
    common: isCommon,
    contact: isContact,
    homepage: isHomepage,
    record_page: isRecordPage,
    login_sign_up: isLoginSign,
    rating: isRating, 
    data_access: isDataAccess
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    ns: [
      "about",
      "common",
      "contact",
      "homepage",
      "record_page",
      "login_sign_up",
      "rating", 
      "data_access",
    ],
    defaultNS: "common",
  });

export default i18n;