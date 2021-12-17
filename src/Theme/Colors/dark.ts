import type {
  ColorScheme,
  BadgeColorScheme,
  ButtonColorScheme,
  CheckBoxColorScheme,
  CheckBoxGroupColorScheme,
  ChipColorScheme,
  ChipGroupColorScheme,
  CommonColorScheme,
  DateTimePickerColorScheme,
  IconColorScheme,
  ModalColorScheme,
  PageContainerColorScheme,
  RadioButtonColorScheme,
  RadioButtonGroupColorScheme,
  SelectBoxColorScheme,
  SwitchComponentColorScheme,
  TextColorScheme,
  TextInputColorScheme,
  CardColorScheme,
  SnackBarColorScheme,
} from './types';
import {
  BLACK,
  BLACK_90,
  BLACK_90_PALE,
  BLACK_PALE,
  GREEN,
  GREEN_PALE,
  GREY,
  GREY_80,
  GREY_80_PALE,
  GREY_PALE,
  ORANGE,
  ORANGE_OPPOSITE,
  ORANGE_PALE,
  TRANSPARENT,
  WHITE,
  WHITE_20,
  WHITE_PALE,
} from './palette';

const common: CommonColorScheme = {
  primary: BLACK,
  secondary: WHITE,
  active: ORANGE,
  passive: ORANGE_PALE,
  statusbar: BLACK,
  componentBackground: BLACK_90
};

const pageContainer: PageContainerColorScheme = {
  background: BLACK,
};

const text: TextColorScheme = {
  active: WHITE,
  passive: WHITE_PALE,
};

const icon: IconColorScheme = {
  active: WHITE,
  passive: WHITE_PALE,
};

const textInput: TextInputColorScheme = {
  active: {
    inputText: WHITE,
    titleText: WHITE,
    border: WHITE,
    background: BLACK_90,
    placeholder: GREY,
  },
  passive: {
    inputText: WHITE_PALE,
    titleText: WHITE_PALE,
    border: WHITE_PALE,
    background: BLACK_90_PALE,
    placeholder: GREY,
  },
  focused: {
    inputText: WHITE,
    titleText: ORANGE,
    border: ORANGE,
    background: BLACK_90,
    selection: ORANGE,
  },
};

const button: ButtonColorScheme = {
  active: {
    normal: {
      filled: {
        background: ORANGE,
        text: BLACK,
        border: ORANGE,
      },
      outlined: {
        background: BLACK,
        text: ORANGE,
        border: ORANGE,
      },
      simplied: {
        background: TRANSPARENT,
        text: ORANGE,
        border: TRANSPARENT,
      },
    },
    pressed: {
      filled: {
        background: ORANGE_OPPOSITE,
        text: WHITE,
        border: ORANGE_OPPOSITE,
      },
      outlined: {
        background: WHITE,
        text: ORANGE_OPPOSITE,
        border: ORANGE_OPPOSITE,
      },
      simplied: {
        background: TRANSPARENT,
        text: ORANGE_OPPOSITE,
        border: TRANSPARENT,
      },
    },
  },
  passive: {
    normal: {
      filled: {
        background: ORANGE_PALE,
        text: BLACK_PALE,
        border: ORANGE_PALE,
      },
      outlined: {
        background: BLACK_PALE,
        text: ORANGE_PALE,
        border: ORANGE_PALE,
      },
      simplied: {
        background: TRANSPARENT,
        text: ORANGE_PALE,
        border: TRANSPARENT,
      },
    },
    pressed: {
      filled: {
        background: ORANGE_OPPOSITE,
        text: WHITE,
        border: ORANGE_OPPOSITE,
      },
      outlined: {
        background: WHITE,
        text: ORANGE_OPPOSITE,
        border: ORANGE_OPPOSITE,
      },
      simplied: {
        background: TRANSPARENT,
        text: ORANGE_OPPOSITE,
        border: TRANSPARENT,
      },
    },
  },
};

const radioButton: RadioButtonColorScheme = {
  active: {
    text: WHITE,
    background: BLACK,
    border: WHITE,
    icon: ORANGE,
  },
  passive: {
    text: WHITE_PALE,
    background: BLACK_PALE,
    border: BLACK_PALE,
    icon: ORANGE_PALE,
  },
};

const radioButtonGroup: RadioButtonGroupColorScheme = {
  active: {
    background: BLACK,
    seperator: GREY_80,
  },
  passive: {
    background: BLACK_PALE,
    seperator: GREY_80_PALE,
  },
};

const checkBox: CheckBoxColorScheme = {
  active: {
    text: WHITE,
    background: BLACK,
    border: WHITE,
    icon: BLACK,
    iconBorder: ORANGE,
  },
  passive: {
    text: WHITE_PALE,
    background: BLACK_PALE,
    border: WHITE_PALE,
    icon: BLACK_PALE,
    iconBorder: ORANGE_PALE,
  },
};

const checkBoxGroup: CheckBoxGroupColorScheme = {
  active: {
    background: BLACK,
    seperator: GREY_80,
  },
  passive: {
    background: BLACK_PALE,
    seperator: GREY_80_PALE,
  },
};

const chip: ChipColorScheme = {
  active: {
    text: WHITE,
    background: BLACK,
    border: BLACK,
    icon: ORANGE,
  },
  passive: {
    text: WHITE_PALE,
    background: BLACK_PALE,
    border: BLACK_PALE,
    icon: ORANGE_PALE,
  },
};

const chipGroup: ChipGroupColorScheme = {
  active: {
    background: BLACK,
  },
  passive: {
    background: BLACK_PALE,
  },
};

const badge: BadgeColorScheme = {
  background: BLACK,
  border: WHITE,
  text: ORANGE,
  shadow: WHITE,
};

const modal: ModalColorScheme = {
  outsideBackground: WHITE_20,
  containerBackground: BLACK,
  shadow: WHITE,
};

const selectBox: SelectBoxColorScheme = {
  active: {
    background: BLACK_90,
    border: WHITE,
    title: WHITE,
    placeholder: GREY,
    value: WHITE,
  },
  passive: {
    background: BLACK_90_PALE,
    border: WHITE_PALE,
    title: WHITE_PALE,
    placeholder: GREY_PALE,
    value: WHITE_PALE,
  },
};

const dateTimePicker: DateTimePickerColorScheme = {
  active: {
    background: BLACK_90,
    border: WHITE,
    title: WHITE,
    placeholder: GREY,
    pickerText: WHITE,
    value: WHITE,
  },
  passive: {
    background: BLACK_90_PALE,
    border: WHITE_PALE,
    title: WHITE_PALE,
    placeholder: GREY_PALE,
    value: WHITE_PALE,
  },
};

const switchColors: SwitchComponentColorScheme = {
  active: {
    border: WHITE,
    background: BLACK_90,
    backgroundOn: GREEN,
    backgroundOff: GREY,
    thumb: ORANGE,
  },
  passive: {
    border: WHITE_PALE,
    background: BLACK_90_PALE,
    backgroundOn: GREEN_PALE,
    backgroundOff: GREY,
    thumb: ORANGE_PALE,
  },
};

const card: CardColorScheme = {
  active: {
    background: BLACK_90,
    border: WHITE,
    icon: WHITE
  },
  passive: {
    background: BLACK_90_PALE,
    border: WHITE_PALE,
    icon: WHITE_PALE
  }
}

const snackBar: SnackBarColorScheme = {
  background: BLACK_90,
  shadow: WHITE
}

const dark: ColorScheme = {
  common,
  pageContainer,
  text,
  icon,
  textInput,
  button,
  radioButton,
  radioButtonGroup,
  checkBox,
  checkBoxGroup,
  chip,
  chipGroup,
  badge,
  modal,
  selectBox,
  dateTimePicker,
  switchComponent: switchColors,
  card,
  snackBar
};

export default dark;
