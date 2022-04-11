import { Dispatch, useContext } from "react";
import { BottomSheetContext, BottomSheetDispatchContext } from "./context";

export const useBottomSheet = (): BottomSheetScheme => useContext(BottomSheetContext)
export const useSetBottomSheet = (): Dispatch<Partial<SetBottomSheetScheme>> => useContext(BottomSheetDispatchContext)