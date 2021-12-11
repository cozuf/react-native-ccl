import { createContext } from "react";
import type { ThemeType } from "./types";
import { light } from "../../Theme/Colors";
import { fonts } from "../..//Theme/Fonts";
import { componentsStyles } from "../..//Theme/Styles";
import { tokens } from "../..//Theme";

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

export const ThemeContextDispatch = createContext<{
    setTheme: (newTheme: Partial<ThemeType>) => void;
}>({
    setTheme: () => { },
});