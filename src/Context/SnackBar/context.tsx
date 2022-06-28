import { createContext, Dispatch } from "react";


export const SnackBarContext = createContext<SnackBarScheme>({
    show: () => { },
    close: () => { }
});

export const SnackBarDispatchContext = createContext<Dispatch<Partial<SetSnackBarScheme>>>(() => { });