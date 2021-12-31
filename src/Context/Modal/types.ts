import type { ReactNode } from "react";
import type { Omit } from "react-native";
import type { IModalProps } from "react-native-ccl";

export interface IModalContextFunctions {
    show: () => void,
    close: () => void,
}

export interface IModaContextProps {
    props: Omit<IModalProps, "visible">,
    renderChildren?: () => ReactNode | null
}