import { Dispatch, useContext } from "react";
import { GlaobalStateContext, GlobalStateDispatchContext } from "./context";


export const useGlobalState = (): RNCCL.GlobalStateScheme => useContext(GlaobalStateContext);
export const useSetGlobalState = (): Dispatch<Partial<RNCCL.GlobalStateScheme>> => useContext(GlobalStateDispatchContext);