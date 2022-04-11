import { Dispatch, useContext } from "react";
import { ModalContext, ModalDispatchContext } from "./context";

export const useModal = (): ModalScheme => useContext(ModalContext)
export const useSetModal = (): Dispatch<Partial<SetModalScheme>> => useContext(ModalDispatchContext)