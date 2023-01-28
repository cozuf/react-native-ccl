import React, { FC, useReducer, useRef } from "react";
import { ISnackBarRef, SnackBar } from "../../Components";
import { SnackBarContext, SnackBarDispatchContext } from "./context";

const reducer = (
    state: RNCCL.SetSnackBarScheme,
    newState: Partial<RNCCL.SetSnackBarScheme>
): RNCCL.SetSnackBarScheme => {
    return { ...state, ...newState };
};

const SnackBarProvider: FC<any> = ({ children }) => {
    const snackBarRef = useRef<ISnackBarRef>(null);

    const snackBar: RNCCL.SnackBarScheme = {
        show: () => {
            snackBarRef.current?.show()
        },
        close: () => {
            snackBarRef.current?.close()
        }
    }

    const initial: RNCCL.SetSnackBarScheme = {
        props: {
            displayForm: "bottomToTop",
            duration: "infinite",
            containerStyle: {},
            onCompleteHide: () => { },
            onCompleteShow: () => { },
        },
        renderChildren: () => null
    }

    const [snackBarProps, setSnackBarProps] = useReducer(reducer, initial);

    return (
        <SnackBarContext.Provider
            value={snackBar}>
            <SnackBarDispatchContext.Provider
                value={setSnackBarProps}>
                {children}
                <SnackBar
                    ref={snackBarRef}
                    displayForm="bottomToTop"
                    duration="infinite"
                    containerStyle={{}}
                    onCompleteHide={() => { }}
                    onCompleteShow={() => { }}
                    {...snackBarProps.props}>
                    {typeof snackBarProps.renderChildren === "function" ? snackBarProps.renderChildren() : null}
                </SnackBar>
            </SnackBarDispatchContext.Provider>
        </SnackBarContext.Provider >
    );
};

export default SnackBarProvider;