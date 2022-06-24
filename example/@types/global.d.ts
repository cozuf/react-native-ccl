declare global {

    export interface ColorScheme {
    }

    export interface GlobalStateScheme {
        token?: string
    }
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
}
export { }