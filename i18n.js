// import i18n from 'i18next';
// import {initReactI18next} from 'react-i18next';
// import * as Localization from 'react-native-localize';

// import en from './locales/en.json';
// import hi from './locales/hi.json';

// // import en from './Src/Constants/lang/en';
// // import hi from './Src/Constants/lang/hi';
// const resources = {
//   en: {translation: en},
//   hi: {translation: hi},
// };

// const languageDetector = {
//   type: 'languageDetector',
//   async: true,
//   detect: callback => {
//     const bestLanguage = Localization.findBestLanguageTag(
//       Object.keys(resources),
//     );
//     callback(bestLanguage?.languageTag || 'en');
//   },
//   init: () => {},
//   cacheUserLanguage: () => {},
// };

// i18n
//   .use(languageDetector)
//   .use(initReactI18next)
//   .init({
//     compatibilityJSON: 'v3',
//     fallbackLng: 'en',
//     resources,
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;




import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import en from './locales/en.json';
// import hi from './locales/hi.json';

import en from './Src/Constants/lang/en';
import hi from './Src/Constants/lang/hi';

// Language Resources
const resources = {
    en: {translation: en},
  hi: {translation: hi},
};

// Load the language from AsyncStorage
const loadLanguage = async () => {
  try {
    const lang = await AsyncStorage.getItem('language');
    if (lang) {
      i18n.changeLanguage(lang);
    } else {
      i18n.changeLanguage('en');
    }
  } catch (error) {
    i18n.changeLanguage('en'); 
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

loadLanguage();

export default i18n;
