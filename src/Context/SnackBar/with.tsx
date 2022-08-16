import React, { ComponentType, FC } from "react"
import { useSnackBar, useSetSnakBar } from "./hook"

export const withSnackBar = <P extends Object>(WrappEdComponent: ComponentType<P>): FC<P & RNCCL.ISnackBarScheme> => ({ ...props }) => {
    const modal = useSnackBar()
    const setModal = useSetSnakBar()

    return <WrappEdComponent {...props as P} modal={modal} setModal={setModal} />
}