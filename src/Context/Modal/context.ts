import { createContext, Dispatch } from "react";


export const ModalContext = createContext<ModalScheme>({
    show: () => { },
    close: () => { }
});

export const ModalDispatchContext = createContext<Dispatch<Partial<SetModalScheme>>>(() => { });