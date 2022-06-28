import { Dispatch, useContext } from "react";
import { SnackBarContext, SnackBarDispatchContext } from "./context";

export const useSnackBar = (): SnackBarScheme => useContext(SnackBarContext)
export const useSetSnakBar = (): Dispatch<Partial<SetSnackBarScheme>> => useContext(SnackBarDispatchContext)