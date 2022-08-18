declare global {

    export interface User {
        name: string
        surname: string
        languages: string[]
    }

    namespace RNCCL {
        export interface ColorScheme {
        }

        export interface GlobalStateScheme {
            token?: string
            user: User
            objec1: {
                a?: string
                object11: {
                    b: string
                }
            }
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
}
export { }