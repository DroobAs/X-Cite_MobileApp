import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/en.json";
import ar from "./locales/ar/ar.json";
import { I18nManager } from "react-native";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
      
    },
    lng:I18nManager.isRTL ? "ar" : "en",
    
  });

export default i18next;