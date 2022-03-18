import { Dispatch, useContext } from "react";
import type { IModalContextFunctions, IModaContextProps } from "./types";
import { ModalContext, ModalDispatchContext } from "./context";

export const useModal = (): IModalContextFunctions => useContext(ModalContext)
export const useSetModal = (): Dispatch<Partial<IModaContextProps>> => useContext(ModalDispatchContext)