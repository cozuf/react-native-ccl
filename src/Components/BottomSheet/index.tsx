import React, { forwardRef, PropsWithChildren, Ref, useImperativeHandle, useRef } from "react";
import { Modalize, ModalizeProps } from "react-native-modalize";
import { useTheme } from "../../Context";

export interface BottomSheetRef {
    show: () => void
    close: () => void
}

export interface IBottomSheetProps extends ModalizeProps {

}

const BottomSheet = forwardRef((props: PropsWithChildren<IBottomSheetProps>, ref: Ref<BottomSheetRef>) => {
    const modalizeRef = useRef<Modalize>()
    const { colors, tokens } = useTheme()
    const { common, pageContainer, modal } = colors
    const { component } = tokens

    useImperativeHandle(ref, () => {
        if (modalizeRef && modalizeRef.current) {
            return ({
                show: modalizeRef.current.open,
                close: modalizeRef.current.close,
            })
        } else {
            return ({
                show: () => { },
                close: () => { }
            })
        }
    }, [modalizeRef]);


    return (
        <Modalize
            ref={modalizeRef}
            rootStyle={[{}]}
            modalStyle={[props.modalStyle, {
                backgroundColor: pageContainer.background
            }]}
            handleStyle={[props.handleStyle, {
                backgroundColor: common.componentBackground
            }]}
            overlayStyle={[props.overlayStyle, {
                backgroundColor: modal.outsideBackground
            }]}
            childrenStyle={[props.childrenStyle, {
                paddingTop: component.vertical
            }]}
        >
            {props.children}
        </Modalize >
    )
})

export default BottomSheet