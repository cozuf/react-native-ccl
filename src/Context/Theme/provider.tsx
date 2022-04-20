import React, { FC, useReducer } from "react";
import { useColorScheme } from "react-native";
import { light, dark } from "../../Theme/Colors";
import { fonts as DefaultFonts } from "../../Theme/Fonts";
import { tokens as DefaultTokens } from "../../Theme";
import { ThemeContext, ThemeContextDispatch } from "./context";

const reducer = (
    theme: ThemeScheme,
    newTheme: Partial<ThemeScheme>
): ThemeScheme => {
    const name = newTheme.name || "Light"
    const colors = mergeColors(name, newTheme.colors)
    const fonts = newTheme.fonts ? { ...DefaultFonts, ...newTheme.fonts } : theme.fonts
    const tokens = newTheme.tokens ? mergeTokens(newTheme.tokens) : theme.tokens

    return { name, colors, fonts, tokens };
};

interface IThemeProvider {
    name?: string
    colors?: Partial<ColorScheme>
    fonts?: FontScheme
    tokens?: TokenScheme
}

const ThemeProvider: FC<IThemeProvider> = ({ name, colors, fonts, tokens, children }) => {
    const DEFINED_NAME = name || useColorScheme() === 'dark' ? 'Dark' : 'Light'

    const initial: ThemeScheme = {
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

const mergeColors = (name: string, newColors?: Partial<ColorScheme>): ColorScheme => {
    const defaultColors = name === "Light" || name === "light" ? light : dark

    return {
        badge: {
            ...defaultColors.badge,
            ...newColors?.badge
        },
        button: {
            ...defaultColors.button,
            ...newColors?.button
        },
        card: {
            ...defaultColors.card,
            ...newColors?.card
        },
        checkBox: {
            ...defaultColors.checkBox,
            ...newColors?.checkBox
        },
        checkBoxGroup: {
            ...defaultColors.checkBoxGroup,
            ...newColors?.checkBoxGroup
        },
        chip: {
            ...defaultColors.chip,
            ...newColors?.chip
        },
        chipGroup: {
            ...defaultColors.chipGroup,
            ...newColors?.chipGroup
        },
        common: {
            ...defaultColors.common,
            ...newColors?.common
        },
        dateTimePicker: {
            ...defaultColors.dateTimePicker,
            ...newColors?.dateTimePicker
        },
        icon: {
            ...defaultColors.icon,
            ...newColors?.icon
        },
        modal: {
            ...defaultColors.modal,
            ...newColors?.modal
        },
        pageContainer: {
            ...defaultColors.pageContainer,
            ...newColors?.pageContainer
        },
        radioButton: {
            ...defaultColors.radioButton,
            ...newColors?.radioButton
        },
        radioButtonGroup: {
            ...defaultColors.radioButtonGroup,
            ...newColors?.radioButtonGroup
        },
        selectBox: {
            ...defaultColors.selectBox,
            ...newColors?.selectBox
        },
        snackBar: {
            ...defaultColors.snackBar,
            ...newColors?.snackBar
        },
        switchComponent: {
            ...defaultColors.switchComponent,
            ...newColors?.switchComponent
        },
        text: {
            ...defaultColors.text,
            ...newColors?.text
        },
        textInput: {
            ...defaultColors.textInput,
            ...newColors?.textInput
        }
    }
}

const mergeTokens = (newTokens?: Partial<TokenScheme>): TokenScheme => {
    return {
        page: {
            ...DefaultTokens.page,
            ...newTokens?.page
        },
        component: {
            ...DefaultTokens.component,
            ...newTokens?.component
        }
    }
}