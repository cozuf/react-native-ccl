import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface badgeStyle {
    container?: StyleProp<ViewStyle>
    text?: StyleProp<TextStyle>
}

export interface buttonStyle {
    container?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
}

export interface cardStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    bodyBackground?: StyleProp<ViewStyle>
    bodyContainer?: StyleProp<ViewStyle>
    footerContainer?: StyleProp<ViewStyle>
}

export interface checkBoxStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
    seperator?: StyleProp<ViewStyle>
    iconContainer?: StyleProp<ViewStyle>
}

export interface checkBoxGroupStyle {
    seperatorContainer?: StyleProp<ViewStyle>
    seperator?: StyleProp<ViewStyle>
    buttonsContainer?: StyleProp<ViewStyle>
    buttons?: StyleProp<ViewStyle>
}

export interface chipStyle {
    container?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
}

export interface chipGroupStyle {
    container?: StyleProp<ViewStyle>
    seperator?: StyleProp<ViewStyle>
}

export interface dateTimePickerStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
    seperator?: StyleProp<TextStyle>
    placeholderContainer?: StyleProp<ViewStyle>
    placeholder?: StyleProp<TextStyle>
}

export interface modalStyle {

}

export interface pageContainerStyle {
    container?: StyleProp<ViewStyle>
    contentContainer?: StyleProp<ViewStyle>;
}

export interface radioButtonStyle {
    container?: StyleProp<ViewStyle>
    iconContainer?: StyleProp<ViewStyle>
    sperator?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<ViewStyle>
}

export interface radioButtonGroupStyle {
    container?: StyleProp<ViewStyle>
    speratorContainer?: StyleProp<ViewStyle>
    sperator?: StyleProp<ViewStyle>
}

export interface searchBarStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
    inputContainer?: StyleProp<ViewStyle>
    iconContainer?: StyleProp<ViewStyle>
    seperatorContainer?: StyleProp<ViewStyle>
    seperator?: StyleProp<ViewStyle>
    nativeInputContainer?: StyleProp<ViewStyle>
    input?: StyleProp<TextStyle>
    cleanContainer?: StyleProp<ViewStyle>
}

export interface selectBoxStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
    seperator?: StyleProp<TextStyle>
    placeholderContainer?: StyleProp<ViewStyle>
    placeholder?: StyleProp<TextStyle>
}

export interface seperatorStyle {
    container?: StyleProp<ViewStyle>
    style?: StyleProp<ViewStyle>
}

export interface snackbarStyle {
    animatedContainer?: StyleProp<ViewStyle>
    contentContainer?: StyleProp<ViewStyle>
}

export interface stateCardStyle {

}

export interface switchStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<TextStyle>
    title?: StyleProp<TextStyle>
}

export interface tapSelectorStyle {
    container?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
}

export interface textStyle {
    style?: StyleProp<TextStyle>
}

export interface textInputStyles {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
    inputContainer?: StyleProp<ViewStyle>
    iconContainer?: StyleProp<ViewStyle>
    seperatorContainer?: StyleProp<ViewStyle>
    seperator?: StyleProp<ViewStyle>
    nativeInputContainer?: StyleProp<ViewStyle>
    input?: StyleProp<TextStyle>
    cleanContainer?: StyleProp<ViewStyle>
    warningContainer?: StyleProp<ViewStyle>
    warning?: StyleProp<TextStyle>
    errorContainer?: StyleProp<ViewStyle>
    error?: StyleProp<TextStyle>
}

export interface copmonentsStyles {
    pageContainer: pageContainerStyle
    textInput: textInputStyles
    text: textStyle
}