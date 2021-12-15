import { createContext, Dispatch } from "react";
import type { GlobalStateInterface } from "./types";
import DEFAULT_GLOBAL_STATE from "./values";

export const GlaobalStateContext = createContext<{
    state: GlobalStateInterface;
}>({ state: DEFAULT_GLOBAL_STATE });

export const GlobalStateDispatchContext = createContext<{
    setState: Dispatch<Partial<GlobalStateInterface>>;
}>({
    setState: () => { },
});