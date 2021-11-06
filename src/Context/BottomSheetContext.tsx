import React, { createContext, Dispatch, FC, ReactNode, useContext, useRef, useState } from 'react';
import { View } from "react-native";
import type { Modalize, ModalizeProps } from 'react-native-modalize';
import { Modalize as BottomSheet } from 'react-native-modalize';

interface IBottomSheetFunctions {
    show: () => void,
    close: () => void,
}

interface IBottomSheetProps {
    props: ModalizeProps,
    renderContent: () => ReactNode
}

export const BottomSheetContext = createContext<IBottomSheetFunctions>({
    show: () => { },
    close: () => { }
});

export const BottomSheetDispatchContext = createContext<Dispatch<Partial<IBottomSheetProps>>>(() => {

});

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

export const useBottomSheet = (): [
    IBottomSheetFunctions,
    Dispatch<Partial<IBottomSheetProps>>,
] => [
        useContext(BottomSheetContext),
        useContext(BottomSheetDispatchContext)
    ];