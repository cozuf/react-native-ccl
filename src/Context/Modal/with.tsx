import React, { ComponentType } from "react"
import { useModal, useSetModal } from "./hook"

// export const withModal = <P extends Object>(WrappEdComponent: ComponentType<P>): FC<P & RNCCL.IModalScheme> => ({ ...props }) => {
//     const modal = useModal()
//     const setModal = useSetModal()

//     return <WrappEdComponent {...props as P} modal={modal} setModal={setModal} />
// }

export function withModal<P>(WrappedComponent: ComponentType<P>) {
    return (hocProps: Omit<P, "modal" | "setModal">) => {
        const modal = useModal()
        const setModal = useSetModal()
        return <WrappedComponent {...hocProps as P} modal={modal} setBottomSheet={setModal} />
    }
}