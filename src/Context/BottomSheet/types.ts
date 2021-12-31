import type { ReactNode } from "react";
import type { ModalizeProps } from "react-native-modalize";

export interface IBottomSheetFunctions {
    show: () => void,
    close: () => void,
}

export interface IBottomSheetProps {
    props: ModalizeProps,
    renderContent: () => ReactNode
}