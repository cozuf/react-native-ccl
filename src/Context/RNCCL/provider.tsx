import React, { FC } from "react"
import { light, fonts, tokens } from "../../Theme"
import { BottomSheetProvider } from "../BottomSheet"
import { GlobalStateProvider } from "../GlobalState"
import { ModalProvider } from "../Modal"
import { ThemeProvider } from "../Theme"

const RNCCLProvider: FC<RNCCLScheme> = ({ theme, globalState, children }) => {
    return (
        <GlobalStateProvider initialGobalState={globalState}>
            <ThemeProvider name={theme.name || "light"} colors={theme.colors || light} fonts={theme.fonts || fonts} tokens={theme.tokens || tokens}>
                <ModalProvider>
                    <BottomSheetProvider>
                        {children}
                    </BottomSheetProvider>
                </ModalProvider>
            </ThemeProvider>
        </GlobalStateProvider>
    )
}

export default RNCCLProvider