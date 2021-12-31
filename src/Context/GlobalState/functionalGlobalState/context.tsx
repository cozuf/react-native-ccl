import { createContext, Dispatch } from "react";
import type { GlobalStateInterface } from "./types";
import DEFAULT_GLOBAL_STATE from "./values";

export const GlaobalStateContext = createContext<GlobalStateInterface>(DEFAULT_GLOBAL_STATE);

export const GlobalStateDispatchContext = createContext<Dispatch<Partial<GlobalStateInterface>>>(() => { });