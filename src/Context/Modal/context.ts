import { createContext, Dispatch } from "react";
import type { IModalContextFunctions, IModaContextProps } from "./types";


export const ModalContext = createContext<IModalContextFunctions>({
    show: () => { },
    close: () => { }
});

export const ModalDispatchContext = createContext<Dispatch<Partial<IModaContextProps>>>(() => { });