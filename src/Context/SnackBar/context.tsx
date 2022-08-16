import { createContext, Dispatch } from "react";


export const SnackBarContext = createContext<RNCCL.SnackBarScheme>({
    show: () => { },
    close: () => { }
});

export const SnackBarDispatchContext = createContext<Dispatch<Partial<RNCCL.SetSnackBarScheme>>>(() => { });