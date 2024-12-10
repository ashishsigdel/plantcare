import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './messages/en.json';
import np from './messages/np.json';

const resources = {
  en,
  np,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
