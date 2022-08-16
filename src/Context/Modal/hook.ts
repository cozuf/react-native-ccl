import { Dispatch, useContext } from "react";
import { ModalContext, ModalDispatchContext } from "./context";

export const useModal = (): RNCCL.ModalScheme => useContext(ModalContext)
export const useSetModal = (): Dispatch<Partial<RNCCL.SetModalScheme>> => useContext(ModalDispatchContext)