import { createContext, Dispatch } from "react";

export const BottomSheetContext = createContext<BottomSheetScheme>({
    show: () => { },
    close: () => { }
});

export const BottomSheetDispatchContext = createContext<Dispatch<Partial<SetBottomSheetScheme>>>(() => { });