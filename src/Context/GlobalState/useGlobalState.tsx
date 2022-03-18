import { Dispatch, useContext } from "react";
import { GlaobalStateContext, GlobalStateDispatchContext } from "./context";


export const useGlobalState = (): RNCCL.GlobalStateInterface => useContext(GlaobalStateContext);
export const useSetGlobalState = (): Dispatch<Partial<RNCCL.GlobalStateInterface>> => useContext(GlobalStateDispatchContext);