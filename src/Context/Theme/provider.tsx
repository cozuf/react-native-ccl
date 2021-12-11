import React, { FC, useState } from "react";
import { useColorScheme } from "react-native";
import type { ThemeType } from "./types";
import { light, dark } from "../../Theme/Colors";
import { fonts } from "../../Theme/Fonts";
import { componentsStyles } from "../../Theme/Styles";
import { tokens } from "../../Theme";
import { ThemeContext, ThemeContextDispatch } from "./context";

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