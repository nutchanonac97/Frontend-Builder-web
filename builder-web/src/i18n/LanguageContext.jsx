import React, { createContext, useContext, useState, useCallback } from 'react';
import th from './translations/th';
import en from './translations/en';

const translations = { th, en };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('lang') || 'th';
    } catch {
      return 'th';
    }
  });

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // localStorage not available
    }
  }, []);

  // Translation helper: t('nav.home') → looks up translations[language].nav.home
  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value ?? key; // Fallback to key if not found
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
