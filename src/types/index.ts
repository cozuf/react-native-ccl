import type { Dispatch, ReactNode, Ref } from 'react'
import type { ColorValue } from 'react-native'
import type { IModalProps, IBottomSheetProps, ISnackBarProps } from '../Components'
import type { IGLobalStateRef } from '../Context'

declare global {
    export namespace RNCCL {

        //#region ColorScheme

        interface ColorScheme {
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

        interface FontScheme {
            light: string
            regular: string
            medium: string
            semibold: string
            bold: string
        }

        //#endregion

        //#region TokenScheme

        interface GeneralTokensScheme {
            extraLight: number
            light: number
            extraSmall: number
            small: number
            regular: number
            medium: number
            semiLarge: number
            large: number
            extraLarge: number
        }

        interface SpaceTokensScheme {
            pageVertical: number
            pageHorizontal: number
            componentVertical: number
            componentHorizontal: number
        }

        interface BorderTokensScheme {
            badge: number
            button: number
            component: number
            textInputFocused: number
        }

        interface RadiusTokensScheme {
            component: number
        }

        interface TokenScheme {
            spaces: SpaceTokensScheme & GeneralTokensScheme
            borders: BorderTokensScheme & GeneralTokensScheme
            radiuses: RadiusTokensScheme & GeneralTokensScheme
        }
        //#endregion

        //#region ThemeScheme
        interface ThemeScheme {
            name: 'Light' | 'Dark'
            colors: ColorScheme
            fonts: FontScheme
            tokens: TokenScheme
        }

        interface ITheme {
            theme: ThemeScheme
            setTheme: Dispatch<Partial<ThemeScheme>>
        }
        //#endregion

        //#region GlobalStateScheme

        interface GlobalStateScheme { }

        interface IGlobalState {
            globalState: Partial<GlobalStateScheme>
            setGlobalState: Dispatch<Partial<GlobalStateScheme>>
        }
        //#endregion

        //#region BottomSheetScheme
        interface BottomSheetScheme {
            show: () => void,
            close: () => void,
        }

        interface SetBottomSheetScheme {
            props: IBottomSheetProps,
            renderContent?: () => ReactNode | null
        }

        interface IBottomSheetScheme {
            bottomSheet: BottomSheetScheme
            setBottomSheet: Dispatch<Partial<SetBottomSheetScheme>>
        }
        //#endregion

        //#region ModalScheme
        interface ModalScheme {
            show: () => void,
            close: () => void,
        }

        interface SetModalScheme {
            props: Omit<IModalProps, "visible">,
            renderChildren?: () => ReactNode | null
        }

        interface IModalScheme {
            modal: ModalScheme
            setModal: Dispatch<Partial<SetModalScheme>>
        }
        //#endregion

        // #region SnackBarScheme
        interface SnackBarScheme {
            show: () => void,
            close: () => void,
        }

        interface SetSnackBarScheme {
            props: ISnackBarProps,
            renderChildren?: () => ReactNode | null
        }

        interface ISnackBarScheme {
            snackBar: SnackBarScheme
            setSnacBar: Dispatch<Partial<SetSnackBarScheme>>
        }
        // #endregion

        //#region RNCCLScheme
        interface RNCCLScheme {
            theme: ThemeScheme,
            globalState: GlobalStateScheme
            stateRef?: Ref<IGLobalStateRef>
        }
        //#endregion
    }
}
