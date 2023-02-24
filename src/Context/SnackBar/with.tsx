import React, { ComponentType } from "react"
import { useSnackBar, useSetSnackBar } from "./hook"

// export const withSnackBar = <P extends Object>(WrappEdComponent: ComponentType<P>): FC<P & RNCCL.ISnackBarScheme> => ({ ...props }) => {
//     const modal = useSnackBar()
//     const setModal = useSetSnackBar()

//     return <WrappEdComponent {...props as P} modal={modal} setModal={setModal} />
// }

export function withSnackBar<P>(WrappedComponent: ComponentType<P>) {
    return (hocProps: Omit<P, "snackbar" | "setSnackbar">) => {
        const snackbar = useSnackBar()
        const setSnackbar = useSetSnackBar()
        return <WrappedComponent {...hocProps as P} snackbar={snackbar} setSnackbar={setSnackbar} />
    }
}