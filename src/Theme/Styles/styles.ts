import { Platform } from "react-native";
import { fonts } from "../Fonts";
import { tokens } from "../Tokens";
import type {
    IBadgeStyle,
    IButtonStyle,
    ICardStyle,
    ICheckBoxStyle,
    ICheckBoxGroupStyle,
    IChipStyle,
    IChipGroupStyle,
    IDateTimePickerStyle,
    IModalStyle,
    IPageContainerStyle,
    IRadioButtonStyle,
    IRadioButtonGroupStyle,
    ISearchBarStyle,
    ISelectBoxStyle,
    ISeperatorStyle,
    ISnackbarStyle,
    IStateCardStyle,
    ISwitchStyle,
    ITapSelectorStyle,
    ITextStyle,
    ITextInputStyle,
    CopmonentsStylesScheme
} from "./types";

export const badgeStyle: IBadgeStyle = {
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

export const buttonStyle: IButtonStyle = {
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

export const cardStyle: ICardStyle = {
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

export const checkBoxStyle: ICheckBoxStyle = {
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

export const checkBoxGroupStyle: ICheckBoxGroupStyle = {
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

export const chipStyle: IChipStyle = {
    container: {

    },
    title: {

    }
}

export const chipGroupStyle: IChipGroupStyle = {
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

export const dateTimePickerStyle: IDateTimePickerStyle = {
    container: {
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    titleContainer: {},
    title: {},
    seperator: {},
    placeholderContainer: {},
    placeholder: {},
}

export const modalStyle: IModalStyle = {

}

export const pageContainerStyle: IPageContainerStyle = {
    container: {
        flex: 1,
        paddingVertical: tokens.page.paddingVertical,
        paddingHorizontal: tokens.page.paddingHorizontal,
    },
    contentContainer: {
        flex: 1,
        paddingVertical: tokens.page.paddingVertical,
        paddingHorizontal: tokens.page.paddingHorizontal,
    },
}

export const radioButtonStyle: IRadioButtonStyle = {
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

export const radioButtonGroupStyle: IRadioButtonGroupStyle = {
    container: {},
    seperatorContainer: {
        alignItems: 'center',
        paddingVertical: 4
    },
    seperator: {},
}

export const searchBarStyle: ISearchBarStyle = {
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

export const selectBoxStyle: ISelectBoxStyle = {
    container: {
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    titleContainer: {},
    title: {},
    seperator: {},
    placeholderContainer: {},
    placeholder: {},
}

export const seperatorStyle: ISeperatorStyle = {

}

export const snackbarStyle: ISnackbarStyle = {

}

export const stateCardStyle: IStateCardStyle = {

}

export const switchStyle: ISwitchStyle = {
    container: {
        flexDirection: 'row',
        borderWidth: tokens.component.borderWidth,
        borderRadius: 8,
        paddingHorizontal: tokens.component.paddingHorizontal,
        paddingVertical: 8,
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1
    },
    title: {},
}

export const tapSelectorStyle: ITapSelectorStyle = {
    container: {},
    title: {},
}

export const textStyle: ITextStyle = {
    style: {

    }
}

export const textInputStyle: ITextInputStyle = {
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

export const componentsStyles: CopmonentsStylesScheme = {
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