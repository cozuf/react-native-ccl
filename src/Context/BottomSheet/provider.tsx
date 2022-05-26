import React, { FC, useReducer, useRef } from "react";
import { BottomSheetRef, BottomSheet } from "../../Components";
import { BottomSheetContext, BottomSheetDispatchContext } from "./context";

const reducer = (
    state: SetBottomSheetScheme,
    newState: Partial<SetBottomSheetScheme>
): SetBottomSheetScheme => {
    return { ...state, ...newState }
};

const BottomSheetProvider: FC<any> = ({ children }) => {
    const bottomSheetRef = useRef<BottomSheetRef>(null);

    const bottomSheet: BottomSheetScheme = {
        show: () => {
            bottomSheetRef.current?.show()
        },
        close: () => {
            bottomSheetRef.current?.close()
        }
    }

    const initial = {
        props: {
            onClosed: () => {
                setBottomSheetProps(initial)
            }
        },
        renderContent: () => null
    }


    const [bottomSheetProps, setBottomSheetProps] = useReducer(reducer, initial);

    return (
        <BottomSheetContext.Provider
            value={bottomSheet}>
            <BottomSheetDispatchContext.Provider
                value={setBottomSheetProps}>
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