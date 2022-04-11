import { light } from "../../Theme/Colors";
import { fonts } from "../../Theme/Fonts";
import { componentsStyles } from "../../Theme/Styles";
import { tokens } from "../../Theme";

export const Theme: ThemeScheme = {
    name: 'Light',
    colors: light,
    fonts: fonts,
    styles: componentsStyles,
    tokens: tokens,
    changeTheme: () => { }
}