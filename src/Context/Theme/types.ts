import type { ColorScheme } from "../../Theme/Colors";
import type { FontScheme } from "../..//Theme/Fonts";
import type { CopmonentsStylesScheme } from "../..//Theme/Styles";
import type { TokensScheme } from "../..//Theme/Tokens";

export interface ThemeType {
    name: 'Light' | 'Dark'
    colors: ColorScheme
    fonts: FontScheme
    styles: CopmonentsStylesScheme
    tokens: TokensScheme
    changeTheme?: (name: ThemeType["name"]) => void
};