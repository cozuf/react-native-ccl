import { Dispatch, useContext } from "react";
import type { IBottomSheetFunctions, IBottomSheetProps } from "./types";
import { BottomSheetContext, BottomSheetDispatchContext } from "./context";

export const useBottomSheet = (): IBottomSheetFunctions => useContext(BottomSheetContext)
export const useSetBottomSheet = (): Dispatch<Partial<IBottomSheetProps>> => useContext(BottomSheetDispatchContext)