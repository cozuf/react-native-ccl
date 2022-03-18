
import type { ComponentsStylesScheme } from "src/Theme/Styles";
import type { TokensScheme } from "../..//Theme/Tokens";

export interface ThemeType {
    name: 'Light' | 'Dark'
    colors: RNCCL.ColorScheme
    fonts: RNCCL.FontScheme
    styles: ComponentsStylesScheme
    tokens: TokensScheme
    changeTheme?: (name: ThemeType["name"]) => void
};