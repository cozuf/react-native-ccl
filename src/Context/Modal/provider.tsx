import React, { FC, useReducer, useState } from "react";
import { Modal } from "../..";
import { ModalContext, ModalDispatchContext } from "./context";

const reducer = (
    state: SetModalScheme,
    newState: Partial<SetModalScheme>
): SetModalScheme => {
    return { ...state, ...newState };
};

const ModalProvider: FC<any> = ({ children }) => {
    const [visible, setVisible] = useState<boolean>(false)

    const modalRef: ModalScheme = {
        show: () => {
            setVisible(true)
        },
        close: () => {
            setVisible(false)
        }
    }

    const initial: SetModalScheme = {
        props: {
            onTouchOutSide: () => {
                setVisible(false)
            }
        },
        renderChildren: () => null
    }

    const [modalProps, setModalProps] = useReducer(reducer, initial);

    return (
        <ModalContext.Provider value={modalRef} >
            <ModalDispatchContext.Provider value={setModalProps}>
                {children}
                <Modal
                    visible={visible}
                    {...modalProps.props}>
                    {typeof modalProps.renderChildren === "function" ? modalProps.renderChildren() : null}
                </Modal>
            </ModalDispatchContext.Provider>
        </ModalContext.Provider>
    )
}

export default ModalProvider