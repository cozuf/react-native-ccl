import { createContext, Dispatch } from "react";
import { Theme } from "./values";

export const ThemeContext = createContext<ThemeScheme>(Theme);

export const ThemeContextDispatch = createContext<Dispatch<Partial<ThemeScheme>>>(() => { });