import React, { FC, useState } from "react";
import { Modal } from "../..";
import { ModalContext, ModalDispatchContext } from "./context";
import type { IModaContextProps, IModalContextFunctions } from "./types";

const ModalProvider: FC<any> = ({ children }) => {
    const [visible, setVisible] = useState<boolean>(false)

    const [modalRef] = useState<IModalContextFunctions>({
        show: () => {
            setVisible(true)
        },
        close: () => {
            setVisible(false)
        }
    })

    const initial: IModaContextProps = {
        props: {
            onTouchOutSide: () => {
                setVisible(false)
            }
        },
        renderChildren: () => null
    }

    const [modalProps, setModalProps] = useState<Partial<IModaContextProps>>(initial)

    return (
        <ModalContext.Provider value={modalRef} >
            <ModalDispatchContext.Provider value={setModalProps}>
                {children}
                <Modal
                    visible={visible}
                    onTouchOutSide={() => { setVisible(false) }}
                    {...modalProps.props}>
                    {typeof modalProps.renderChildren === "function" ? modalProps.renderChildren() : null}
                </Modal>
            </ModalDispatchContext.Provider>
        </ModalContext.Provider>
    )
}

export default ModalProvider