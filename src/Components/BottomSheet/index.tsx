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
                backgroundColor: colors.pageBackground
            }]}
            handleStyle={[props.handleStyle, {
                backgroundColor: colors.componentBackground
            }]}
            overlayStyle={[props.overlayStyle, {
                backgroundColor: colors.modalOutside
            }]}
            childrenStyle={[props.childrenStyle, {
                paddingTop: tokens.inner
            }]}
            {...props}
        >
            {props.children}
        </Modalize >
    )
})

export default BottomSheet