import React, { ComponentType } from "react"
import { useBottomSheet, useSetBottomSheet } from "./hook"

// export const withBottomSheet = <P extends Object>(WrappEdComponent: ComponentType<P>): FC<P & RNCCL.IBottomSheetScheme> => ({ ...props }) => {
//     const bottomSheet = useBottomSheet()
//     const setBottomSheet = useSetBottomSheet()

//     return <WrappEdComponent {...props as P} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} />
// }

export function withBottomSheet<P>(WrappedComponent: ComponentType<P>) {
    return (hocProps: Omit<P, "bottomSheet" | "setBottomSheet">) => {
        const bottomSheet = useBottomSheet()
        const setBottomSheet = useSetBottomSheet()
        return <WrappedComponent {...hocProps as P} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} />
    }
}