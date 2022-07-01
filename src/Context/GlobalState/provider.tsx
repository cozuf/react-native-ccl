import React, { FC, useReducer } from "react";
import { GlaobalStateContext, GlobalStateDispatchContext } from "./context";
import DEFAULT_GLOBAL_STATE from "./values";

const reducer = (
    state: GlobalStateScheme,
    newState: Partial<GlobalStateScheme>
): GlobalStateScheme => {
    return { ...state, ...newState };
};

export interface IGlobalStateProvider {
    initialGobalState: GlobalStateScheme
}

const GlobalStateProvider: FC<IGlobalStateProvider> = ({ initialGobalState, children }) => {
    const [state, setState] = useReducer(reducer, initialGobalState || DEFAULT_GLOBAL_STATE);

    return (
        <GlaobalStateContext.Provider value={state}>
            <GlobalStateDispatchContext.Provider value={setState}>
                {children}
            </GlobalStateDispatchContext.Provider>
        </GlaobalStateContext.Provider>
    );
};

export default GlobalStateProvider;