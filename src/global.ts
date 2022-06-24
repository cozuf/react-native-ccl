import type { Dispatch, ReactNode } from 'react'
import type { ColorValue } from 'react-native'
import type { IModalProps, IBottomSheetProps } from './Components'

declare global {

    //#region ColorScheme

    export interface ColorScheme {
        brand: ColorValue
        primary: ColorValue
        secondary: ColorValue
        tertiary: ColorValue
        positive: ColorValue
        warning: ColorValue
        destructive: ColorValue
        pageBackground: ColorValue
        componentBackground: ColorValue
        seperator: ColorValue
        modalOutside: ColorValue
        shadow: ColorValue
        placeholder: ColorValue
        text: ColorValue
        componentText: ColorValue
        white: ColorValue
        black: ColorValue
        transparent: ColorValue
    }

    //#endregion

    //#region GlobalStateScheme

    export interface GlobalStateScheme { }

    export type SetGlobalStateScheme = Partial<GlobalStateScheme>

    export interface IGlobalState {
        globalState: GlobalStateScheme
        setGlobalState: Dispatch<SetGlobalStateScheme>
    }
    //#endregion

    //#region BottomSheetScheme
    export interface BottomSheetScheme {
        show: () => void,
        close: () => void,
    }

    export interface SetBottomSheetScheme {
        props: IBottomSheetProps,
        renderContent?: () => ReactNode | null
    }

    export interface IBottomSheetScheme {
        bottomSheet: BottomSheetScheme
        setBottomSheet: Dispatch<Partial<SetBottomSheetScheme>>
    }
    //#endregion

    //#region ModalScheme
    export interface ModalScheme {
        show: () => void,
        close: () => void,
    }

    export interface SetModalScheme {
        props: Omit<IModalProps, "visible">,
        renderChildren?: () => ReactNode | null
    }

    export interface IModalScheme {
        modal: ModalScheme
        setModal: Dispatch<Partial<SetModalScheme>>
    }
    //#endregion

    //#region FontScheme

    export interface FontScheme {
        light: string
        regular: string
        medium: string
        semibold: string
        bold: string
    }

    //#endregion

    //#region TokenScheme

    export interface TokenScheme {
        quarterInner: number
        semiInner: number
        inner: number
        doubleInner: number
        fourTimesInner: number

        quarterOuter: number
        semiOuter: number
        outer: number
        doubleOuter: number
        fourTimesOuter: number

        semiRadius: number
        radius: number
        fullRadius: number

        thinBorder: number
        border: number
        boldBorder: number
    }
    //#endregion

    //#region Theme
    export interface ThemeScheme {
        name: 'Light' | 'Dark'
        colors: ColorScheme
        fonts: FontScheme
        tokens: TokenScheme
    }

    export interface ITheme {
        theme: ThemeScheme
        setTheme: Dispatch<Partial<ThemeScheme>>
    }
    //#endregion

    //#region RNCCLScheme
    export interface RNCCLScheme {
        theme: ThemeScheme,
        globalState: GlobalStateScheme
    }
    //#endregion
}
