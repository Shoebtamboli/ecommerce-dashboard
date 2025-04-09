import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          dashboard: 'Dashboard',
          products: 'Products',
          orders: 'Orders',
          customers: 'Customers',
          analytics: 'Analytics',
          settings: 'Settings'
        }
      }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;