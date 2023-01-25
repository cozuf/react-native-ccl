import React, { ComponentType } from "react"
import { useTheme, useSetTheme } from "./hook"

// export const withTheme = <P extends Object>(WrappEdComponent: ComponentType<P>): FC<P & RNCCL.ITheme> => ({ ...props }) => {
//     const theme = useTheme()
//     const setTheme = useSetTheme()

//     return <WrappEdComponent {...props as P} theme={theme} setTheme={setTheme} />
// }

export function withTheme<P>(WrappedComponent: ComponentType<P>) {
    return (hocProps: Omit<P, "theme" | "setTheme">) => {
        const theme = useTheme()
        const setTheme = useSetTheme()
        return <WrappedComponent {...hocProps as P} theme={theme} setTheme={setTheme} />
    }
}