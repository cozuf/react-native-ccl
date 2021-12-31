import { Dispatch, useContext } from "react";
import type { IModalContextFunctions, IModaContextProps } from "./types";
import { ModalContext, ModalDispatchContext } from "./context";

const useBottomSheet = (): [
    IModalContextFunctions,
    Dispatch<Partial<IModaContextProps>>,
] => [
        useContext(ModalContext),
        useContext(ModalDispatchContext)
    ];

export default useBottomSheet