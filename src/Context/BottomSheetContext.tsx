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

export const BottomSheetDispatchContext = createContext<Dispatch<IBottomSheetProps>>(() => {

});

const BottomSheetProvider: FC<any> = ({ children }) => {
    const bottomSheetRef = useRef<Modalize>(null);

    const [bottomSheet] = useState<IBottomSheetFunctions>({
        show: () => {
            bottomSheetRef.current?.open()
        },
        close: () => {
            bottomSheetRef.current?.close()
            setBottomSheetProps({
                props: {},
                renderContent: () => <View />
            })
        }
    })

    const [bottomSheetProps, setBottomSheetProps] = useState<IBottomSheetProps>({
        props: {},
        renderContent: () => <View />
    })

    return (
        <BottomSheetContext.Provider value={bottomSheet}>
            <BottomSheetDispatchContext.Provider value={setBottomSheetProps}>
                {children}
                <BottomSheet ref={bottomSheetRef} {...bottomSheetProps.props} >
                    {bottomSheetProps.renderContent()}
                </BottomSheet>
            </BottomSheetDispatchContext.Provider>
        </BottomSheetContext.Provider>
    );
};

export default BottomSheetProvider;

export const useBottomSheet = (): [
    IBottomSheetFunctions,
    Dispatch<IBottomSheetProps>,
] => [
        useContext(BottomSheetContext),
        useContext(BottomSheetDispatchContext)
    ];