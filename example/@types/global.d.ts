declare global {

    export interface User {
        name: string
        surname: string
        languages: string[]
    }

    namespace RNCCL {

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

    }
}
export { }