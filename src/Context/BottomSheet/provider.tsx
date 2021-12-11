import React, { FC, useRef, useState } from "react";
import { View } from "react-native";
import type { Modalize } from "react-native-modalize";
import { Modalize as BottomSheet } from 'react-native-modalize';
import { BottomSheetContext, BottomSheetDispatchContext } from "./context";
import type { IBottomSheetFunctions, IBottomSheetProps } from "./types";


const BottomSheetProvider: FC<any> = ({ children }) => {
    const bottomSheetRef = useRef<Modalize>(null);

    const [bottomSheet] = useState<IBottomSheetFunctions>({
        show: () => {
            bottomSheetRef.current?.open()
        },
        close: () => {
            bottomSheetRef.current?.close()
        }
    })

    const initial: IBottomSheetProps = {
        props: {
            onClosed: () => {
                setBottomSheetProps(initial)
            }
        },
        renderContent: () => <View />
    }

    const [bottomSheetProps, setBottomSheetProps] = useState<Partial<IBottomSheetProps>>(initial)

    return (
        <BottomSheetContext.Provider value={bottomSheet}>
            <BottomSheetDispatchContext.Provider value={setBottomSheetProps}>
                {children}
                <BottomSheet ref={bottomSheetRef} {...bottomSheetProps.props} >
                    {typeof bottomSheetProps.renderContent === "function" ? bottomSheetProps.renderContent() : null}
                </BottomSheet>
            </BottomSheetDispatchContext.Provider>
        </BottomSheetContext.Provider>
    );
};

export default BottomSheetProvider;