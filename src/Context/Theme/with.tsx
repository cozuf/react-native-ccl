import React, { ComponentType, FC } from "react"
import { useTheme, useSetTheme } from "./hook"

export const withTheme = <P extends Object>(WrappEdComponent: ComponentType<P>): FC<P & RNCCL.ITheme> => ({ ...props }) => {
    const theme = useTheme()
    const setTheme = useSetTheme()

    return <WrappEdComponent {...props as P} theme={theme} setTheme={setTheme} />
}