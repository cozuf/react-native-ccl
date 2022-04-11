import React, { ComponentType, FC } from "react"
import { useBottomSheet, useSetBottomSheet } from "./hook"

export const withBottomSheet = <P extends Object>(WrappEdComponent: ComponentType<P>): FC<P & IBottomSheetScheme> => ({ ...props }) => {
    const bottomSheet = useBottomSheet()
    const setBottomSheet = useSetBottomSheet()

    return <WrappEdComponent {...props as P} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} />
}