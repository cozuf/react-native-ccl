import React, { FC, useReducer } from "react";
import { useColorScheme } from "react-native";
import { light, dark } from "../../Theme/Colors";
import { fonts } from "../../Theme/Fonts";
import { componentsStyles } from "../../Theme/Styles";
import { tokens } from "../../Theme";
import { ThemeContext, ThemeContextDispatch } from "./context";

const reducer = (
    theme: ThemeScheme,
    newTheme: Partial<ThemeScheme>
): ThemeScheme => {
    return { ...theme, ...newTheme };
};

const ThemeProvider: FC<any> = ({ children }) => {

    const changeTheme = (name: ThemeScheme["name"]) => {
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

    const setCurrentTheme = (n: Partial<ThemeScheme>) => {
        setTheme({ ...n });
    };

    const initial: ThemeScheme = {
        name: useColorScheme() === 'dark' ? 'Dark' : 'Light',
        colors: useColorScheme() === 'dark' ? dark : light,
        fonts: fonts,
        styles: componentsStyles,
        tokens: tokens,
        changeTheme: changeTheme
    }

    const [theme, setTheme] = useReducer(reducer, initial);


    return (
        <ThemeContext.Provider value={theme}>
            <ThemeContextDispatch.Provider value={setCurrentTheme}>
                {children}
            </ThemeContextDispatch.Provider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;