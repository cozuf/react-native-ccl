declare global {

    export interface User {
        name: string
        surname: string
        languages: string[]
    }

    export interface Location {
        lat?: number | string
        long?: number | string
        address: {
            country: string
            city: string
            town: string
        }
    }

    namespace RNCCL {

        export interface GlobalStateScheme {
            token?: string
            user?: User
            location?: Location
        }

    }
}
export { }