import { Dispatch, useContext } from "react";
import { BottomSheetContext, BottomSheetDispatchContext } from "./context";

export const useBottomSheet = (): RNCCL.BottomSheetScheme => useContext(BottomSheetContext)
export const useSetBottomSheet = (): Dispatch<Partial<RNCCL.SetBottomSheetScheme>> => useContext(BottomSheetDispatchContext)