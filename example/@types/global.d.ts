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
    //#region TokenScheme
    export interface Page {
        vertical: number
        semiVertical: number
        quarterVertical: number
        doubleVertical: number
        horizontal: number
        semiHorizontal: number
        quarterHorizontal: number
        doubleHorizontal: number
    }

    export interface Component {
        vertical: number
        semiVertical: number
        quarterVertical: number
        doubleVertical: number
        horizontal: number
        semiHorizontal: number
        quarterHorizontal: number
        doubleHorizontal: number
        radius: number
        semiRadius: number
        quarterRadius: number
        doubleRadius: number
        border: number
        semiBorder: number
        quarterBorder: number
        doubleBorder: number
    }

    export interface TokenScheme {
        page: Page,
        component: Component
    }
    //#endregion
}
export { }