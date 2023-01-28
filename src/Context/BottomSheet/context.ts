import { createContext, Dispatch } from "react";

export const BottomSheetContext = createContext<RNCCL.BottomSheetScheme>({
    show: () => { },
    close: () => { }
});

export const BottomSheetDispatchContext = createContext<Dispatch<Partial<RNCCL.SetBottomSheetScheme>>>(() => { });