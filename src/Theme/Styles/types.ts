import type { StyleProp, TextStyle as RNTextStyle, ViewStyle } from "react-native";

export interface BadgeStyle {
    container?: StyleProp<ViewStyle>
    text?: StyleProp<RNTextStyle>
}

export interface ButtonStyle {
    container?: StyleProp<ViewStyle>
    title?: StyleProp<RNTextStyle>
}

export interface CardStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    bodyBackground?: StyleProp<ViewStyle>
    bodyContainer?: StyleProp<ViewStyle>
    footerContainer?: StyleProp<ViewStyle>
}

export interface CheckBoxStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<RNTextStyle>
    seperator?: StyleProp<ViewStyle>
    iconContainer?: StyleProp<ViewStyle>
}

export interface CheckBoxGroupStyle {
    seperatorContainer?: StyleProp<ViewStyle>
    seperator?: StyleProp<ViewStyle>
    buttonsContainer?: StyleProp<ViewStyle>
    buttons?: StyleProp<ViewStyle>
}

export interface ChipStyle {
    container?: StyleProp<ViewStyle>
    title?: StyleProp<RNTextStyle>
}

export interface ChipGroupStyle {
    container?: StyleProp<ViewStyle>
    chipContainer?: StyleProp<ViewStyle>
    seperator?: StyleProp<ViewStyle>
}

export interface DateTimePickerStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<RNTextStyle>
    seperator?: StyleProp<RNTextStyle>
    textContainer?: StyleProp<ViewStyle>
    text?: StyleProp<RNTextStyle>
    warningContainer?: StyleProp<ViewStyle>
    warning?: StyleProp<RNTextStyle>
    errorContainer?: StyleProp<ViewStyle>
    error?: StyleProp<RNTextStyle>
}

export interface ModalStyle {
    outside?: StyleProp<ViewStyle>
    container?: StyleProp<ViewStyle>
}

export interface PageContainerStyle {
    container?: StyleProp<ViewStyle>
    contentContainer?: StyleProp<ViewStyle>;
}

export interface RadioButtonStyle {
    container?: StyleProp<ViewStyle>
    iconContainer?: StyleProp<ViewStyle>
    sperator?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<ViewStyle>
}

export interface RadioButtonGroupStyle {
    container?: StyleProp<ViewStyle>
    seperatorContainer?: StyleProp<ViewStyle>
    seperator?: StyleProp<ViewStyle>
}

export interface SearchBarStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<RNTextStyle>
    inputContainer?: StyleProp<ViewStyle>
    iconContainer?: StyleProp<ViewStyle>
    seperatorContainer?: StyleProp<ViewStyle>
    seperator?: StyleProp<ViewStyle>
    nativeInputContainer?: StyleProp<ViewStyle>
    input?: StyleProp<RNTextStyle>
    cleanContainer?: StyleProp<ViewStyle>
}

export interface SelectBoxStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<RNTextStyle>
    seperator?: StyleProp<RNTextStyle>
    textContainer?: StyleProp<ViewStyle>
    text?: StyleProp<RNTextStyle>
    warningContainer?: StyleProp<ViewStyle>
    warning?: StyleProp<RNTextStyle>
    errorContainer?: StyleProp<ViewStyle>
    error?: StyleProp<RNTextStyle>
}

export interface SeperatorStyle {
    container?: StyleProp<ViewStyle>
    style?: StyleProp<ViewStyle>
}

export interface SnackbarStyle {
    animatedContainer?: StyleProp<ViewStyle>
    contentContainer?: StyleProp<ViewStyle>
}

export interface StateCardStyle {

}

export interface SwitchStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<RNTextStyle>
    title?: StyleProp<RNTextStyle>
}

export interface TapSelectorStyle {
    container?: StyleProp<ViewStyle>
    title?: StyleProp<RNTextStyle>
}

export interface TextStyle {
    style?: StyleProp<RNTextStyle>
}

export interface TextInputStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<RNTextStyle>
    inputContainer?: StyleProp<ViewStyle>
    iconContainer?: StyleProp<ViewStyle>
    seperatorContainer?: StyleProp<ViewStyle>
    seperator?: StyleProp<ViewStyle>
    nativeInputContainer?: StyleProp<ViewStyle>
    input?: StyleProp<RNTextStyle>
    cleanContainer?: StyleProp<ViewStyle>
    warningContainer?: StyleProp<ViewStyle>
    warning?: StyleProp<RNTextStyle>
    errorContainer?: StyleProp<ViewStyle>
    error?: StyleProp<RNTextStyle>
}

export interface ComponentsStylesScheme {
    badgeStyle?: BadgeStyle,
    buttonStyle?: ButtonStyle,
    cardStyle?: CardStyle,
    checkBoxStyle?: CheckBoxStyle,
    checkBoxGroupStyle?: CheckBoxGroupStyle,
    chipStyle?: ChipStyle,
    chipGroupStyle?: ChipGroupStyle,
    dateTimePickerStyle?: DateTimePickerStyle,
    modalStyle?: ModalStyle,
    pageContainerStyle?: PageContainerStyle,
    radioButtonStyle?: RadioButtonStyle,
    radioButtonGroupStyle?: RadioButtonGroupStyle,
    searchBarStyle?: SearchBarStyle,
    selectBoxStyle?: SelectBoxStyle,
    seperatorStyle?: SeperatorStyle,
    snackbarStyle?: SnackbarStyle,
    stateCardStyle?: StateCardStyle,
    switchStyle?: SwitchStyle,
    tapSelectorStyle?: TapSelectorStyle,
    textStyle?: TextStyle,
    textInputStyle?: TextInputStyle
}