
import type { ComponentsStylesScheme } from "src/Theme/Styles";
import type { TokensScheme } from "../..//Theme/Tokens";

export interface ThemeType {
    name: 'Light' | 'Dark'
    colors: ColorScheme
    fonts: FontScheme
    styles: ComponentsStylesScheme
    tokens: TokensScheme
    changeTheme?: (name: ThemeType["name"]) => void
};