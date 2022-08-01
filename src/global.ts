import type { Dispatch, ReactNode } from 'react'
import type { ColorValue } from 'react-native'
import type { IModalProps, IBottomSheetProps, ISnackBarProps } from './Components'

declare global {

    //#region ColorScheme

    export interface ColorScheme {
        brand: ColorValue
        primary: ColorValue
        secondary: ColorValue
        tertiary: ColorValue
        success: ColorValue
        warning: ColorValue
        error: ColorValue
        white: ColorValue
        black: ColorValue
        transparent: ColorValue

        pageBackground: ColorValue

        componentBackground: ColorValue
        componentBorder: ColorValue
        componentIcon: ColorValue
        componentTitle: ColorValue
        componentValue: ColorValue

        buttonText: ColorValue

        /**
         * selectBox listItemSeperator
         */
        listItemSeperator: ColorValue

        modalOutside: ColorValue
        modalBackground: ColorValue

        shadow: ColorValue

        text: ColorValue
        placeholder: ColorValue
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
        innerSpace: {
            pageVertical: number
            pageHorizontal: number
            componentVertical: number
            componentHorizontal: number

            thin: number
            semiThin: number
            regular: number
            semiLarge: number
            large: number
        }
        outerSpace: {
            componentVertical: number
            componentHorizontal: number

            thin: number
            semiThin: number
            regular: number
            semiLarge: number
            large: number
        }
        borders: {
            badge: number
            button: number
            component: number
            textInputFocused: number

            thin: number
            semiThin: number
            regular: number
            semiLarge: number
            large: number
        }
        radiuses: {
            component: number

            thin: number
            semiThin: number
            regular: number
            semiLarge: number
            large: number
        }
    }
    //#endregion

    //#region ThemeScheme
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

    //#region GlobalStateScheme

    export interface GlobalStateScheme { }

    export interface IGlobalState {
        globalState: Partial<GlobalStateScheme>
        setGlobalState: Dispatch<Partial<GlobalStateScheme>>
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

    // #region SnackBarScheme
    export interface SnackBarScheme {
        show: () => void,
        close: () => void,
    }

    export interface SetSnackBarScheme {
        props: ISnackBarProps,
        renderChildren?: () => ReactNode | null
    }

    export interface ISnackBarScheme {
        snackBar: SnackBarScheme
        setSnacBar: Dispatch<Partial<SetSnackBarScheme>>
    }
    // #endregion

    //#region RNCCLScheme
    export interface RNCCLScheme {
        theme: ThemeScheme,
        globalState: GlobalStateScheme
    }
    //#endregion
}
