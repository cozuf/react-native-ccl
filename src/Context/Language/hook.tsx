import { Dispatch, useContext } from "react";
import { LanguageContext, LanguageDispatchContext } from "./context";


export const useTranslation = (): LanguageScheme => useContext(LanguageContext);
export const useSetSetTranslation = (): Dispatch<SetLanguageScheme> => useContext(LanguageDispatchContext);