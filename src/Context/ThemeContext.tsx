import React, { createContext, FC, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Fonts, FontScheme } from '../Theme/Fonts';
import { dark, light, ColorScheme } from '../Theme/Variants';

export const ThemeContext = createContext<{
  theme: ThemeType;
}>({
  theme: {
    name: 'Light',
    colors: light,
    fonts: Fonts,
  },
});

// eslint-disable-next-line no-spaced-func
export const ThemeContextDispatch = createContext<{
  setTheme: (newTheme: Partial<ThemeType>) => void;
}>({
  setTheme: () => {},
});

type ThemeType = {
  name: 'Light' | 'Dark';
  colors: ColorScheme;
  fonts: FontScheme;
};

const ThemeProvider: FC<any> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>({
    name: useColorScheme() === 'dark' ? 'Dark' : 'Light',
    colors: useColorScheme() === 'dark' ? dark : light,
    fonts: Fonts,
  });

  const setCurrentTheme = (n: Partial<ThemeType>) => {
    setTheme({ ...theme, ...n });
  };

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ThemeContextDispatch.Provider value={{ setTheme: setCurrentTheme }}>
        {children}
      </ThemeContextDispatch.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useThemeContext = (): [
  ThemeType,
  (newTheme: Partial<ThemeType>) => void
] => [
  useContext(ThemeContext).theme,
  useContext(ThemeContextDispatch).setTheme,
];
