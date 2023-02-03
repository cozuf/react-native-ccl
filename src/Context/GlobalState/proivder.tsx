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

const mergeState = (oldState: RNCCL.GlobalStateScheme, newState: Partial<RNCCL.GlobalStateScheme>): RNCCL.GlobalStateScheme => recersiveMerge(oldState, newState)

const recersiveMerge = <T extends Object>(oldObject: Object, newObject: Object): T => {
    type oldOneObjectType = keyof typeof oldObject
    type newOneObjectType = keyof typeof newObject
    let finalObject = {}
    
    for (let i = 0; i < Object.keys(oldObject).length; i++) {
        const ithKey = Object.keys(oldObject)[i];
        if (!newObject.hasOwnProperty(ithKey)) {
            finalObject[ithKey as oldOneObjectType] = getValue(oldObject[ithKey as oldOneObjectType])
        } else if (isObject(newObject[ithKey as newOneObjectType]) && isObject(oldObject[ithKey as oldOneObjectType])) {
            finalObject[ithKey as oldOneObjectType] = recersiveMerge(oldObject[ithKey as oldOneObjectType], newObject[ithKey as newOneObjectType])
        } else {
            finalObject[ithKey as newOneObjectType] = getValue(newObject[ithKey as newOneObjectType])
        }
    }

    for (let i = 0; i < Object.keys(newObject).length; i++) {
        const ithKey = Object.keys(newObject)[i];
        if (!oldObject.hasOwnProperty(ithKey)) {
            finalObject[ithKey as newOneObjectType] = getValue(newObject[ithKey as newOneObjectType])
        }

    }

    return finalObject as T
}

const getValue = <T extends any>(value: any): T => value