import { Dispatch, useContext } from "react";
import { SnackBarContext, SnackBarDispatchContext } from "./context";

export const useSnackBar = (): RNCCL.SnackBarScheme => useContext(SnackBarContext)
export const useSetSnackBar = (): Dispatch<Partial<RNCCL.SetSnackBarScheme>> => useContext(SnackBarDispatchContext)