declare global {

    export interface ColorScheme {
    }

    export interface GlobalStateScheme {
        token?: string
    }
    //#region TokenScheme
    export interface Page {
        vertical: number
        semiVertical: number
        quarterVertical: number
        doubleVertical: number
        horizontal: number
        semiHorizontal: number
        quarterHorizontal: number
        doubleHorizontal: number
    }

    export interface Component {
        vertical: number
        semiVertical: number
        quarterVertical: number
        doubleVertical: number
        horizontal: number
        semiHorizontal: number
        quarterHorizontal: number
        doubleHorizontal: number
        radius: number
        semiRadius: number
        quarterRadius: number
        doubleRadius: number
        border: number
        semiBorder: number
        quarterBorder: number
        doubleBorder: number
    }

    export interface TokenScheme {
        page: Page,
        component: Component
    }
    //#endregion
}
export { }