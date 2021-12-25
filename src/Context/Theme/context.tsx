import { createContext } from "react";
import type { ThemeType } from "./types";
import { Theme } from "./values";

export const ThemeContext = createContext<{
    theme: ThemeType;
}>({
    theme: Theme,
});

export const ThemeContextDispatch = createContext<{
    setTheme: (newTheme: Partial<ThemeType>) => void;
}>({
    setTheme: () => { },
});