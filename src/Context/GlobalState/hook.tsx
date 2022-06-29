import { Dispatch, useContext } from "react";
import { GlaobalStateContext, GlobalStateDispatchContext } from "./context";


export const useGlobalState = (): GlobalStateScheme => useContext(GlaobalStateContext);
export const useSetGlobalState = (): Dispatch<Partial<GlobalStateScheme>> => useContext(GlobalStateDispatchContext);