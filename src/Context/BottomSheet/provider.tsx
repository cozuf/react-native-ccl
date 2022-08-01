import React, { FC, useRef, useState } from "react";
import { BottomSheetRef, BottomSheet } from "../../Components";
import { BottomSheetContext, BottomSheetDispatchContext } from "./context";

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

    const [bottomSheetProps, setBottomSheetProps] = useState<Partial<SetBottomSheetScheme>>(initial);

    return (
        <BottomSheetContext.Provider
            value={bottomSheet}>
            <BottomSheetDispatchContext.Provider
                value={(nextProps) => setBottomSheetProps({
                    props: {
                        ...nextProps.props,
                        onClosed: () => {
                            if (typeof nextProps.props?.onClosed === "function") {
                                nextProps.props?.onClosed()
                            }
                            initial.props.onClosed()
                        }
                    },
                    renderContent: nextProps.renderContent || initial.renderContent
                })}>
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