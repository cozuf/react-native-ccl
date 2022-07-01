import { createContext, Dispatch } from "react";
import DEFAULT_LANGUAGE from "./values";

export const LanguageContext = createContext<LanguageScheme>({ languageKey: DEFAULT_LANGUAGE.languageKey, translate: () => "" })
export const LanguageDispatchContext = createContext<Dispatch<SetLanguageScheme>>(() => { })