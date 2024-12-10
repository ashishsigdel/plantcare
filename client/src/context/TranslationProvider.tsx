import i18next, {changeLanguage} from 'i18next';
import React, {createContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {asyncStorage} from '../services/asyncStorage';

const USER_LANGUAGE = 'USER_LANGUAGE';
export const TranslationContext = createContext({
  currentLanguage: 'en',
  changeLanguage: (_lng: string) => {},
});

export const TranslationProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = React.useState(
    i18next.language ?? 'en',
  );

  const changeLanguage = async (lng: string) => {
    setCurrentLanguage(lng);
    i18next.changeLanguage(lng);
    await asyncStorage.setItem(USER_LANGUAGE, lng);
  };

  useEffect(() => {
    const getUserLanguage = async () => {
      const userLanguage = await asyncStorage.getItem(USER_LANGUAGE);
      if (userLanguage !== undefined) {
        setCurrentLanguage(userLanguage);
        i18next.changeLanguage(userLanguage);
      }
    };
    getUserLanguage();
  }, []);

  return (
    <TranslationContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
      }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useLocale = () => {
  const {currentLanguage, changeLanguage} =
    React.useContext(TranslationContext);
  const {t} = useTranslation();
  return {
    t,
    currentLanguage,
    changeLanguage,
  };
};
