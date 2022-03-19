import { Dispatch, useContext } from "react";
import { GlaobalStateContext, GlobalStateDispatchContext } from "./context";


export const useGlobalState = (): GlobalStateInterface => useContext(GlaobalStateContext);
export const useSetGlobalState = (): Dispatch<Partial<GlobalStateInterface>> => useContext(GlobalStateDispatchContext);