import React, { Component, createContext, useContext } from "react";


interface GlobalState {
    token: string | null
    user: any
}

const GlaobalStateContext = createContext<{
    state: Readonly<GlobalState>;
}>({ state: { token: null, user: null } });

type SetStateType = <K extends keyof GlobalState>(
    state: ((prevState: Readonly<GlobalState>, props: Readonly<any>) => (Pick<GlobalState, K> | GlobalState | null)) | (Pick<GlobalState, K> | GlobalState | null),
    callback?: () => void
) => void

const GlobalStateDispatchContext = createContext<{
    setState: SetStateType
}>({
    setState: () => { },
});

export default class ClassGlobalStateProvider extends Component<any, GlobalState>{
    constructor(props: any) {
        super(props)
        this.state = {
            token: "",
            user: null
        }
    }

    render() {
        return (
            <GlaobalStateContext.Provider value={{ state: this.state }}>
                <GlobalStateDispatchContext.Provider value={{
                    setState: (state, callback?) => {
                        if (typeof state === "object") {
                            this.setState({ ...state as GlobalState }, callback)
                        }

                        if (typeof state === "function") {
                            this.setState(state as any, callback)
                        }

                        if (state === null) {
                            this.setState({}, callback)
                        }
                    }
                }}>
                    {this.props.children}
                </GlobalStateDispatchContext.Provider>
            </GlaobalStateContext.Provider >
        );
    }
}

export const useClassGlobalState = (): [
    Readonly<GlobalState>,
    SetStateType
] => [
        useContext(GlaobalStateContext).state,
        useContext(GlobalStateDispatchContext).setState,
    ];