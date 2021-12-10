import React, { Component, ComponentType, createContext, FC, FunctionComponent, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { componentsStyles } from '../Theme/Styles';
import type { CopmonentsStylesScheme } from '../Theme/Styles';
import { tokens } from '../Theme/Tokens';
import type { TokensScheme } from '../Theme/Tokens';
import type { FontScheme } from '../Theme/Fonts';
import { fonts } from '../Theme/Fonts';
import type { ColorScheme } from '../Theme/Variants';
import { dark, light } from '../Theme/Variants';

export const ThemeContext = createContext<{
  theme: ThemeType;
}>({
  theme: {
    name: 'Light',
    colors: light,
    fonts: fonts,
    styles: componentsStyles,
    tokens: tokens,
    changeTheme: () => { }
  },
});

// eslint-disable-next-line no-spaced-func
export const ThemeContextDispatch = createContext<{
  setTheme: (newTheme: Partial<ThemeType>) => void;
}>({
  setTheme: () => { },
});

type ThemeType = {
  name: 'Light' | 'Dark'
  colors: ColorScheme
  fonts: FontScheme
  styles: CopmonentsStylesScheme
  tokens: TokensScheme
  changeTheme?: (name: ThemeType["name"]) => void
};

const ThemeProvider: FC<any> = ({ children }) => {

  const changeTheme = (name: ThemeType["name"]) => {
    switch (name) {
      case "Light":
      default:
        setCurrentTheme({ name: "Light", colors: light })
        break;

      case "Dark":
        setCurrentTheme({ name: "Dark", colors: dark })
        break;
    }
  }

  const [theme, setTheme] = useState<ThemeType>({
    name: useColorScheme() === 'dark' ? 'Dark' : 'Light',
    colors: useColorScheme() === 'dark' ? dark : light,
    fonts: fonts,
    styles: componentsStyles,
    tokens: tokens,
    changeTheme: changeTheme
  });

  const setCurrentTheme = (n: Partial<ThemeType>) => {
    setTheme((prevTheme) => ({ ...prevTheme, ...n }));
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
