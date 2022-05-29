import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import Router from './routers';
import { useTranslation } from 'react-i18next';
import { SUPPORT_THEME } from './config';
import { loadShoppingCategories } from './utils/initialize';

function App() {
  const { i18n } = useTranslation();
  const {language, themeMode} = useSelector((state)=>state.setting);

  useEffect(()=>{
    if(themeMode && SUPPORT_THEME.includes(themeMode)){
      const root = window.document.documentElement;
      root.setAttribute('data-theme',themeMode);
    }
  },[themeMode]);


  useEffect(() => {
    i18n.changeLanguage(language?.key);
  }, [language, i18n]);

  useEffect(()=>{
    loadShoppingCategories();
  },[])

  return (
    <Router />
  );
}
export default App;
