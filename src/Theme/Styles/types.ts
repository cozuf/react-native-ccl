import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface IBadgeStyle {
    container?: StyleProp<ViewStyle>
    text?: StyleProp<TextStyle>
}

export interface IButtonStyle {
    container?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
}

export interface ICardStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    bodyBackground?: StyleProp<ViewStyle>
    bodyContainer?: StyleProp<ViewStyle>
    footerContainer?: StyleProp<ViewStyle>
}

export interface ICheckBoxStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
    seperator?: StyleProp<ViewStyle>
    iconContainer?: StyleProp<ViewStyle>
}

export interface ICheckBoxGroupStyle {
    seperatorContainer?: StyleProp<ViewStyle>
    seperator?: StyleProp<ViewStyle>
    buttonsContainer?: StyleProp<ViewStyle>
    buttons?: StyleProp<ViewStyle>
}

export interface IChipStyle {
    container?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
}

export interface IChipGroupStyle {
    container?: StyleProp<ViewStyle>
    seperator?: StyleProp<ViewStyle>
}

export interface IDateTimePickerStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
    seperator?: StyleProp<TextStyle>
    placeholderContainer?: StyleProp<ViewStyle>
    placeholder?: StyleProp<TextStyle>
}

export interface IModalStyle {

}

export interface IPageContainerStyle {
    container?: StyleProp<ViewStyle>
    contentContainer?: StyleProp<ViewStyle>;
}

export interface IRadioButtonStyle {
    container?: StyleProp<ViewStyle>
    iconContainer?: StyleProp<ViewStyle>
    sperator?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<ViewStyle>
}

export interface IRadioButtonGroupStyle {
    container?: StyleProp<ViewStyle>
    speratorContainer?: StyleProp<ViewStyle>
    sperator?: StyleProp<ViewStyle>
}

export interface ISearchBarStyle {
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

export interface ISelectBoxStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
    seperator?: StyleProp<TextStyle>
    placeholderContainer?: StyleProp<ViewStyle>
    placeholder?: StyleProp<TextStyle>
}

export interface ISeperatorStyle {
    container?: StyleProp<ViewStyle>
    style?: StyleProp<ViewStyle>
}

export interface ISnackbarStyle {
    animatedContainer?: StyleProp<ViewStyle>
    contentContainer?: StyleProp<ViewStyle>
}

export interface IStateCardStyle {

}

export interface ISwitchStyle {
    container?: StyleProp<ViewStyle>
    titleContainer?: StyleProp<TextStyle>
    title?: StyleProp<TextStyle>
}

export interface ITapSelectorStyle {
    container?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
}

export interface ITextStyle {
    style?: StyleProp<TextStyle>
}

export interface ITextInputStyle {
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

export interface CopmonentsStylesScheme {
    badgeStyle?: IBadgeStyle,
    buttonStyle?: IButtonStyle,
    cardStyle?: ICardStyle,
    checkBoxStyle?: ICheckBoxStyle,
    checkBoxGroupStyle?: ICheckBoxGroupStyle,
    chipStyle?: IChipStyle,
    chipGroupStyle?: IChipGroupStyle,
    dateTimePickerStyle?: IDateTimePickerStyle,
    modalStyle?: IModalStyle,
    pageContainerStyle?: IPageContainerStyle,
    radioButtonStyle?: IRadioButtonStyle,
    radioButtonGroupStyle?: IRadioButtonGroupStyle,
    searchBarStyle?: ISearchBarStyle,
    selectBoxStyle?: ISelectBoxStyle,
    seperatorStyle?: ISeperatorStyle,
    snackbarStyle?: ISnackbarStyle,
    stateCardStyle?: IStateCardStyle,
    switchStyle?: ISwitchStyle,
    tapSelectorStyle?: ITapSelectorStyle,
    textStyle?: ITextStyle,
    textInputStyle?: ITextInputStyle
}