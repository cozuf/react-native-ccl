import { createContext, Dispatch } from "react";
import type { IBottomSheetFunctions, IBottomSheetProps } from "./types";


export const BottomSheetContext = createContext<IBottomSheetFunctions>({
    show: () => { },
    close: () => { }
});

export const BottomSheetDispatchContext = createContext<Dispatch<Partial<IBottomSheetProps>>>(() => { });