declare global {

    export interface ColorScheme {
    }

    export interface GlobalStateScheme {
        token?: string
    }
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
}
export { }