import { createContext, Dispatch } from "react";
import DEFAULT_GLOBAL_STATE from "./values";

export const GlaobalStateContext = createContext<RNCCL.GlobalStateInterface>(DEFAULT_GLOBAL_STATE);

export const GlobalStateDispatchContext = createContext<Dispatch<Partial<RNCCL.GlobalStateInterface>>>(() => { });