import { createContext, Dispatch } from "react";
import type { ThemeType } from "./types";
import { Theme } from "./values";

export const ThemeContext = createContext<ThemeType>(Theme);

export const ThemeContextDispatch = createContext<Dispatch<Partial<ThemeType>>>(() => { });