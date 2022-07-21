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
            itemSeperator: number
        }
        outerSpace: {
            componentVertical: number
            componentHorizontal: number
        }
        borders: {
            badge: number
            button: number
            component: number
            textInputFocused: number
        }
        radiuses: {
            component: number
        }
    }
    //#endregion
}
export { }