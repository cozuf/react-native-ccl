import { Dispatch, useContext } from "react";
import { GlaobalStateContext, GlobalStateDispatchContext } from "./context";
import type { GlobalStateInterface } from "./types";


const useGlobalState = (): [
    GlobalStateInterface,
    Dispatch<Partial<GlobalStateInterface>>
] => [
        useContext(GlaobalStateContext),
        useContext(GlobalStateDispatchContext),
    ];

export default useGlobalState