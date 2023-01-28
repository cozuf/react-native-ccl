import { createContext, Dispatch } from "react";


export const ModalContext = createContext<RNCCL.ModalScheme>({
    show: () => { },
    close: () => { }
});

export const ModalDispatchContext = createContext<Dispatch<Partial<RNCCL.SetModalScheme>>>(() => { });