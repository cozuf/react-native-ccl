import React, { FC, useReducer } from "react";
import { useColorScheme } from "react-native";
import { light, dark } from "../../Theme/Colors";
import { fonts as DefaultFonts } from "../../Theme/Fonts";
import { tokens as DefaultTokens } from "../../Theme";
import { ThemeContext, ThemeContextDispatch } from "./context";

const reducer = (
    theme: RNCCL.ThemeScheme,
    newTheme: Partial<RNCCL.ThemeScheme>
): RNCCL.ThemeScheme => {
    const name = newTheme.name || "Light"
    const colors = mergeColors(name, newTheme.colors)
    const fonts = newTheme.fonts ? { ...DefaultFonts, ...newTheme.fonts } : theme.fonts
    const tokens = newTheme.tokens ? mergeTokens(newTheme.tokens) : theme.tokens

    return { name, colors, fonts, tokens };
};

interface IThemeProvider {
    name?: RNCCL.ThemeScheme["name"]
    colors?: Partial<RNCCL.ColorScheme>
    fonts?: RNCCL.FontScheme
    tokens?: RNCCL.TokenScheme
}

const ThemeProvider: FC<IThemeProvider> = ({ name, colors, fonts, tokens, children }) => {
    const DEFINED_NAME = name ? name : useColorScheme() === 'dark' ? 'Dark' : 'Light'

    const initial: RNCCL.ThemeScheme = {
        name: DEFINED_NAME,
        colors: mergeColors(DEFINED_NAME, colors),
        fonts: { ...DefaultFonts, ...fonts },
        tokens: mergeTokens(tokens)
    }

    const [theme, setTheme] = useReducer(reducer, initial);


    return (
        <ThemeContext.Provider value={theme}>
            <ThemeContextDispatch.Provider value={setTheme}>
                {children}
            </ThemeContextDispatch.Provider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

const mergeColors = (name: string, newColors?: Partial<RNCCL.ColorScheme>): RNCCL.ColorScheme => {
    const defaultColors = name === "Light" || name === "light" ? light : dark

    // FIXME: burada olanları ve olmayanlarıda dene
    return {
        ...defaultColors,
        ...newColors
    }
}

const mergeTokens = (newTokens?: Partial<RNCCL.TokenScheme>): RNCCL.TokenScheme => {
    return {
        ...DefaultTokens,
        ...newTokens
    }
}