import React, { FC, useReducer } from "react";
import { GlaobalStateContext, GlobalStateDispatchContext } from "./context";
import DEFAULT_GLOBAL_STATE from "./values";


const reducer = (
    state: GlobalStateScheme,
    newState: Partial<GlobalStateScheme>
): GlobalStateScheme => {
    return { ...state, ...newState };
};

const GlobalStateProvider: FC<any> = ({ children }) => {
    const [state, setState] = useReducer(reducer, DEFAULT_GLOBAL_STATE);

    return (
        <GlaobalStateContext.Provider value={state}>
            <GlobalStateDispatchContext.Provider value={setState}>
                {children}
            </GlobalStateDispatchContext.Provider>
        </GlaobalStateContext.Provider>
    );
};

export default GlobalStateProvider;