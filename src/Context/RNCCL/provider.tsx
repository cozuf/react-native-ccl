import React, { FC } from "react"
import { light, fonts as defaultFonts, tokens as defaultTokens } from "../../Theme"
import { BottomSheetProvider } from "../BottomSheet"
import { GlobalStateProvider } from "../GlobalState"
import { ModalProvider } from "../Modal"
import { ThemeProvider } from "../Theme"

const RNCCLProvider: FC<RNCCLScheme> = ({ theme, globalState, children }) => {
    const { name, colors, fonts, tokens } = theme
    return (
        <GlobalStateProvider initialGobalState={globalState}>
            <ThemeProvider name={name || "light"} colors={colors || light} fonts={fonts || defaultFonts} tokens={tokens || defaultTokens}>
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