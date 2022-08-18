import React, { FC, useReducer } from "react";
import { isObject } from "../../Utils";
import { GlaobalStateContext, GlobalStateDispatchContext } from "./context";
import DEFAULT_GLOBAL_STATE from "./values";

const reducer = (
    state: RNCCL.GlobalStateScheme,
    newState: Partial<RNCCL.GlobalStateScheme>
): RNCCL.GlobalStateScheme => {
    return mergeState(state, newState) as RNCCL.GlobalStateScheme
    // return { ...state, ...newState };
};

export interface IGlobalStateProvider {
    initialGobalState: RNCCL.GlobalStateScheme
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

const mergeState = (oldState: object, newState: object): object => {
    const state = {}
    for (let i = 0; i < Object.keys(oldState).length; i++) {
        const _object = Object.keys(oldState)[i];
        // @ts-ignore
        if (newState[_object] === undefined) {
            // @ts-ignore
            state[_object] = oldState[_object]
            // @ts-ignore
        } else if (isObject(newState[_object]) && isObject(oldState[_object])) {
            // @ts-ignore
            state[_object] = mergeState(oldState[_object], newState[_object])
        } else {
            // @ts-ignore
            state[_object] = newState[_object]
        }
    }
    return state
}

