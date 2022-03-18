import { Platform } from "react-native";
import { fonts } from "../Fonts";
import { tokens } from "../Tokens";
import type {
    BadgeStyle,
    ButtonStyle,
    CardStyle,
    CheckBoxStyle,
    CheckBoxGroupStyle,
    ChipStyle,
    ChipGroupStyle,
    DateTimePickerStyle,
    ModalStyle,
    PageContainerStyle,
    RadioButtonStyle,
    RadioButtonGroupStyle,
    SearchBarStyle,
    SelectBoxStyle,
    SeperatorStyle,
    SnackbarStyle,
    StateCardStyle,
    SwitchStyle,
    TapSelectorStyle,
    TextStyle,
    TextInputStyle,
    ComponentsStylesScheme
} from "./types";

export const badgeStyle: BadgeStyle = {
    container: {
        borderWidth: 2,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                justifyContent: 'center',
            },
        }),
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    text: {
        fontFamily: fonts.semibold,
        textAlign: 'center',
    }
}

export const buttonStyle: ButtonStyle = {
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: fonts.semibold,
        fontSize: 16,
    }
}

export const cardStyle: CardStyle = {
    container: {
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bodyBackground: {
        overflow: 'hidden',
    },
    bodyContainer: {
        position: 'absolute',
        bottom: 0,
    },
    footerContainer: {

    },
}

export const checkBoxStyle: CheckBoxStyle = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: tokens.component.paddingVertical,
        paddingHorizontal: tokens.component.paddingHorizontal,
    },
    titleContainer: {},
    title: {},
    seperator: {},
    iconContainer: {
        borderWidth: 2,
        borderRadius: 4,
        minHeight: 24,
        minWidth: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
}

export const checkBoxGroupStyle: CheckBoxGroupStyle = {
    seperatorContainer: {
        alignItems: 'center',
        paddingVertical: 4
    },
    seperator: {},
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttons: {
        paddingHorizontal: 0
    },
}

export const chipStyle: ChipStyle = {
    container: {

    },
    title: {

    }
}

export const chipGroupStyle: ChipGroupStyle = {
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    chipContainer: {
        marginBottom: 4
    },
    seperator: {
        width: 8
    }
}

export const dateTimePickerStyle: DateTimePickerStyle = {
    container: {
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    titleContainer: {},
    title: {},
    seperator: {},
    textContainer: {},
    text: {},
}
export const modalStyle: ModalStyle = {
    outside: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        borderRadius: 16,
        padding: 16,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.5,
                shadowRadius: 4.65,
            },
            android: {
                elevation: 6,
            },
        }),
    },
}

export const pageContainerStyle: PageContainerStyle = {
    container: {
        flex: 1,
        paddingVertical: tokens.page.paddingVertical,
        paddingHorizontal: tokens.page.paddingHorizontal,
    },
    contentContainer: {
        paddingVertical: tokens.page.paddingVertical,
        paddingHorizontal: tokens.page.paddingHorizontal,
    },
}

export const radioButtonStyle: RadioButtonStyle = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: tokens.component.paddingVertical,
        paddingHorizontal: tokens.component.paddingHorizontal,
    },
    iconContainer: {},
    sperator: {},
    titleContainer: {},
    title: {},
}

export const radioButtonGroupStyle: RadioButtonGroupStyle = {
    container: {},
    seperatorContainer: {
        alignItems: 'center',
        paddingVertical: 4
    },
    seperator: {},
}

export const searchBarStyle: SearchBarStyle = {
    container: {},
    titleContainer: {},
    title: {},
    inputContainer: {},
    iconContainer: {},
    seperatorContainer: {},
    seperator: {},
    nativeInputContainer: {},
    input: {},
    cleanContainer: {},
}

export const selectBoxStyle: SelectBoxStyle = {
    container: {
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    titleContainer: {},
    title: {},
    seperator: {},
    textContainer: {},
    text: {},
}

export const seperatorStyle: SeperatorStyle = {
    container: {},
    style: {}
}

export const snackbarStyle: SnackbarStyle = {
    animatedContainer: {
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        height: 66,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    contentContainer: {
        flex: 1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
}

export const stateCardStyle: StateCardStyle = {

}

export const switchStyle: SwitchStyle = {
    container: {
        flexDirection: 'row',
        borderWidth: tokens.component.borderWidth,
        borderRadius: 8,
        paddingHorizontal: tokens.component.paddingHorizontal,
        paddingVertical: 8,
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center"
    },
    title: {

    },
}

export const tapSelectorStyle: TapSelectorStyle = {
    container: {},
    title: {},
}

export const textStyle: TextStyle = {
    style: {

    }
}

export const textInputStyle: TextInputStyle = {
    container: {
        borderRadius: 8,
        borderWidth: tokens.component.borderWidth,
        padding: tokens.component.paddingVertical,
    },
    titleContainer: {},
    title: {},
    inputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconContainer: {},
    seperatorContainer: {},
    seperator: {},
    nativeInputContainer: {
        flex: 1
    },
    input: {
        paddingLeft: 0,
        paddingVertical: 12,
    },
    cleanContainer: {},
    warningContainer: {},
    warning: {},
    errorContainer: {},
    error: {},
}

export const componentsStyles: ComponentsStylesScheme = {
    badgeStyle: badgeStyle,
    buttonStyle: buttonStyle,
    cardStyle: cardStyle,
    checkBoxStyle: checkBoxStyle,
    checkBoxGroupStyle: checkBoxGroupStyle,
    chipStyle: chipStyle,
    chipGroupStyle: chipGroupStyle,
    dateTimePickerStyle: dateTimePickerStyle,
    modalStyle: modalStyle,
    pageContainerStyle: pageContainerStyle,
    radioButtonStyle: radioButtonStyle,
    radioButtonGroupStyle: radioButtonGroupStyle,
    searchBarStyle: searchBarStyle,
    selectBoxStyle: selectBoxStyle,
    seperatorStyle: seperatorStyle,
    snackbarStyle: snackbarStyle,
    stateCardStyle: stateCardStyle,
    switchStyle: switchStyle,
    tapSelectorStyle: tapSelectorStyle,
    textStyle: textStyle,
    textInputStyle: textInputStyle
}

// TODO: fonts'lar içeriden alınacak