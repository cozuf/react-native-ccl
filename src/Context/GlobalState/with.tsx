import React, { ComponentType, FC } from "react"
import { useGlobalState, useSetGlobalState } from "./hook"



export const withGlobalState = <P extends Object>(WrappEdComponent: ComponentType<P>): FC<P & IGlobalState> => ({ ...props }) => {
    const globalState = useGlobalState()
    const setGlobalState = useSetGlobalState()

    return <WrappEdComponent {...props as P} globalState={globalState} setGlobalState={setGlobalState} />
}