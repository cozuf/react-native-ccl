import { Dispatch, useContext } from "react";
import type { IBottomSheetFunctions, IBottomSheetProps } from "./types";
import { BottomSheetContext, BottomSheetDispatchContext } from "./context";

const useBottomSheet = (): [
    IBottomSheetFunctions,
    Dispatch<Partial<IBottomSheetProps>>,
] => [
        useContext(BottomSheetContext),
        useContext(BottomSheetDispatchContext)
    ];

export default useBottomSheet