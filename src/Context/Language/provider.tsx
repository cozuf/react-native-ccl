import React, { FC, useReducer } from "react";
import { LanguageContext, LanguageDispatchContext } from "./context";
import DEFAULT_LANGUAGE from "./values";

const reducer = (
    state: SetLanguageScheme,
    newState: SetLanguageScheme
): SetLanguageScheme => {
    return { ...state, ...newState };
};

export interface ILanguageProvider {
    initialLanguage?: SetLanguageScheme
}

const LanguageProvider: FC<ILanguageProvider> = ({ initialLanguage, children }) => {

    const [state, setState] = useReducer(reducer, {
        languageKey: initialLanguage?.languageKey || DEFAULT_LANGUAGE.languageKey,
        translations: initialLanguage?.translations || DEFAULT_LANGUAGE.translations
    });

    const getValue = (object: any, keys: string[]): string => {
        const key = keys[0]
        if (typeof object[key] === "string") {
            return object[key]
        }

        if (typeof object[key] === "object" && keys.length === 1) {
            console.error(`"${key}" is an object, please specify the key`)
            return `->${key}<-`
        }

        return getValue(object[key] as object, keys.filter((_, i) => i !== 0))
    }

    const language: LanguageScheme = {
        languageKey: state.languageKey,
        translate: (translateKey: NestedKeyOf<Translations>, params?: any) => {
            const keyArray = translateKey.split(".")
            let value = getValue(state.translations, keyArray)
            if (!params) {
                return value
            } else {
                for (let i = 0; i < Object.keys(params).length; i++) {
                    const paramKey = Object.keys(params)[i];
                    value = value.replace(`{{${paramKey}}}`, params[paramKey])
                }
                return value
            }
        },
    }

    return (
        <LanguageContext.Provider value={language}>
            <LanguageDispatchContext.Provider value={setState}>
                {children}
            </LanguageDispatchContext.Provider>
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;