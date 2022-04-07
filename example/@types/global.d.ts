declare global {

    export interface ColorScheme {
        badge: BadgeColorScheme
        button: ButtonColorScheme
        card: CardColorScheme
        checkBox: CheckBoxColorScheme
        checkBoxGroup: CheckBoxGroupColorScheme
        chip: ChipColorScheme
        chipGroup: ChipGroupColorScheme
        common: CommonColorScheme
        dateTimePicker: DateTimePickerColorScheme
        icon: IconColorScheme
        modal: ModalColorScheme
        pageContainer: PageContainerColorScheme
        radioButton: RadioButtonColorScheme
        radioButtonGroup: RadioButtonGroupColorScheme
        selectBox: SelectBoxColorScheme
        snackBar: SnackBarColorScheme
        switchComponent: SwitchComponentColorScheme
        text: TextColorScheme
        textInput: TextInputColorScheme
    }

    export interface GlobalStateScheme {
        token?: string
    }
}
export { }