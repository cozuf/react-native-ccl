import React, { FC } from "react"
import { light, fonts as defaultFonts, tokens as defaultTokens } from "../../Theme"
import { BottomSheetProvider } from "../BottomSheet"
import { GlobalStateProvider } from "../GlobalState"
import { ModalProvider } from "../Modal"
import { SnackBarProvider } from "../SnackBar"
import { ThemeProvider } from "../Theme"

const RNCCLProvider: FC<RNCCL.RNCCLScheme> = ({ theme, globalState, children }) => {
    const { name, colors, fonts, tokens } = theme
    return (
        <GlobalStateProvider initialGobalState={globalState}>
            <ThemeProvider name={name || "light"} colors={colors || light} fonts={fonts || defaultFonts} tokens={tokens || defaultTokens}>
                <SnackBarProvider>
                    <ModalProvider>
                        <BottomSheetProvider>
                            {children}
                        </BottomSheetProvider>
                    </ModalProvider>
                </SnackBarProvider>
            </ThemeProvider>
        </GlobalStateProvider>
    )
}

export default RNCCLProvider