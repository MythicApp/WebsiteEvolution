import { useEffect, useState } from 'react';

const getColorSchemeSetting = () =>
  window.localStorage.getItem('colorScheme') ?? 'auto';

const getSystemColorScheme = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const useColorScheme = () => {
  const [colorSchemeSetting, setColorSchemeSetting] = useState('auto');
  const [colorScheme, setColorScheme] = useState(getSystemColorScheme());

  const setColorSchemePref = (scheme) => {
    if (['light', 'dark'].includes(scheme)) {
      window.localStorage.setItem('colorScheme', scheme);
      setColorSchemeSetting(scheme);
      setColorScheme(scheme);
    } else {
      window.localStorage.removeItem('colorScheme');
      setColorSchemeSetting('auto');
      setColorScheme(getSystemColorScheme());
    }
  };

  // Update color scheme on system change if in auto mode
  useEffect(() => {
    const handleChange = () => {
      if ((window.localStorage.getItem('colorScheme') ?? 'auto') === 'auto') {
        setColorScheme(getSystemColorScheme());
      }
    };
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChange);
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChange);
    };
  }, []);
  
  useEffect(() => {
    const pref = getColorSchemeSetting();
    setColorSchemeSetting(pref);
    setColorScheme(pref === 'auto' ? getSystemColorScheme() : pref);
  }, []);

  useEffect(() => {
    document.children[0].setAttribute('data-color-scheme', colorScheme);
  }, [colorScheme]);

  return {
    colorSchemeSetting,
    colorScheme,
    getColorSchemeSetting,
    setColorScheme: setColorSchemePref,
    getSystemColorScheme,
  };
};

export default useColorScheme;
