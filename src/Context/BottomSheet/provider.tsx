import React, { FC, useReducer, useRef, useCallback } from "react";
import type { Modalize } from "react-native-modalize";
import { Modalize as BottomSheet } from 'react-native-modalize';
import { useTheme } from "../Theme";
import { BottomSheetContext, BottomSheetDispatchContext } from "./context";

const reducer = (
    state: SetBottomSheetScheme,
    newState: Partial<SetBottomSheetScheme>
): SetBottomSheetScheme => {
    const props = { ...state.props, ...newState.props }
    const nState = { ...state, ...newState, props }
    return nState
};

const BottomSheetProvider: FC<any> = ({ children }) => {
    const bottomSheetRef = useRef<Modalize>(null);
    const theme = useTheme()
    const { modal, common, pageContainer } = theme.colors

    const bottomSheet: BottomSheetScheme = {
        show: () => {
            bottomSheetRef.current?.open()
        },
        close: () => {
            bottomSheetRef.current?.close()
        }
    }

    const initial = useCallback((): SetBottomSheetScheme => ({
        props: {
            rootStyle: {
            },
            modalStyle: {
                backgroundColor: pageContainer.background
            },
            handleStyle: {
                backgroundColor: common.componentBackground
            },
            overlayStyle: {
                backgroundColor: modal.outsideBackground
            },
            childrenStyle: {
                paddingTop: 16,
            },
            onClosed: () => {
                setBottomSheetProps(initial())
            },
            
        },
        renderContent: () => null
    }), [theme])


    const [bottomSheetProps, setBottomSheetProps] = useReducer(reducer, initial());

    return (
        <BottomSheetContext.Provider
            value={bottomSheet}>
            <BottomSheetDispatchContext.Provider
                value={(values: Partial<SetBottomSheetScheme>) => {
                    const props = { ...initial().props, ...values.props }
                    const nState = { ...initial(), ...values, props }
                    setBottomSheetProps({ ...nState })
                }}>
                {children}
                <BottomSheet
                    ref={bottomSheetRef}
                    {...bottomSheetProps.props}>
                    {typeof bottomSheetProps.renderContent === "function" ? bottomSheetProps.renderContent() : null}
                </BottomSheet>
            </BottomSheetDispatchContext.Provider>
        </BottomSheetContext.Provider>
    );
};

export default BottomSheetProvider;