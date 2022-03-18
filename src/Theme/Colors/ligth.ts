import {
  BLACK,
  BLACK_20,
  BLACK_PALE,
  GREEN,
  GREEN_PALE,
  GREY,
  GREY_80,
  GREY_80_PALE,
  GREY_90,
  GREY_90_PALE,
  GREY_PALE,
  OPEN_BLUE,
  OPEN_BLUE_OPPOSITE,
  OPEN_BLUE_PALE,
  TRANSPARENT,
  WHITE,
  WHITE_PALE,
} from './palette';

const common: RNCCL.CommonColorScheme = {
  primary: WHITE,
  secondary: BLACK,
  active: OPEN_BLUE,
  passive: OPEN_BLUE_PALE,
  statusbar: WHITE,
  componentBackground: GREY_90
};

const pageContainer: RNCCL.PageContainerColorScheme = {
  background: WHITE,
};

const text: RNCCL.TextColorScheme = {
  active: BLACK,
  passive: BLACK_PALE,
};

const icon: RNCCL.IconColorScheme = {
  active: OPEN_BLUE,
  passive: OPEN_BLUE_PALE,
};

const textInput: RNCCL.TextInputColorScheme = {
  active: {
    titleText: BLACK,
    inputText: BLACK,
    border: BLACK,
    background: GREY_90,
    placeholder: GREY,
  },
  passive: {
    titleText: BLACK_PALE,
    inputText: BLACK_PALE,
    border: BLACK_PALE,
    background: GREY_90_PALE,
    placeholder: GREY,
  },
  focused: {
    titleText: OPEN_BLUE,
    inputText: BLACK,
    border: OPEN_BLUE,
    background: GREY_90,
    selection: OPEN_BLUE,
  },
};

const button: RNCCL.ButtonColorScheme = {
  active: {
    normal: {
      filled: {
        background: OPEN_BLUE,
        text: WHITE,
        border: OPEN_BLUE,
      },
      outlined: {
        background: WHITE,
        text: OPEN_BLUE,
        border: OPEN_BLUE,
      },
      simplied: {
        background: TRANSPARENT,
        text: OPEN_BLUE,
        border: TRANSPARENT,
      },
    },
    pressed: {
      filled: {
        background: OPEN_BLUE_OPPOSITE,
        text: WHITE,
        border: OPEN_BLUE_OPPOSITE,
      },
      outlined: {
        background: WHITE,
        text: OPEN_BLUE_OPPOSITE,
        border: OPEN_BLUE_OPPOSITE,
      },
      simplied: {
        background: TRANSPARENT,
        text: OPEN_BLUE_OPPOSITE,
        border: TRANSPARENT,
      },
    },
  },
  passive: {
    normal: {
      filled: {
        background: OPEN_BLUE_PALE,
        text: BLACK_PALE,
        border: OPEN_BLUE_PALE,
      },
      outlined: {
        background: WHITE_PALE,
        text: OPEN_BLUE_PALE,
        border: OPEN_BLUE_PALE,
      },
      simplied: {
        background: TRANSPARENT,
        text: OPEN_BLUE_PALE,
        border: TRANSPARENT,
      },
    },
    pressed: {
      filled: {
        background: OPEN_BLUE_OPPOSITE,
        text: WHITE,
        border: OPEN_BLUE_OPPOSITE,
      },
      outlined: {
        background: WHITE,
        text: OPEN_BLUE_OPPOSITE,
        border: OPEN_BLUE_OPPOSITE,
      },
      simplied: {
        background: TRANSPARENT,
        text: OPEN_BLUE_OPPOSITE,
        border: TRANSPARENT,
      },
    },
  },
};

const radioButton: RNCCL.RadioButtonColorScheme = {
  active: {
    text: BLACK,
    background: WHITE,
    border: BLACK,
    icon: OPEN_BLUE,
  },
  passive: {
    text: BLACK_PALE,
    background: WHITE_PALE,
    border: BLACK_PALE,
    icon: OPEN_BLUE_PALE,
  },
};

const radioButtonGroup: RNCCL.RadioButtonGroupColorScheme = {
  active: {
    background: BLACK,
    seperator: GREY_80,
  },
  passive: {
    background: BLACK_PALE,
    seperator: GREY_80_PALE,
  },
};

const checkBox: RNCCL.CheckBoxColorScheme = {
  active: {
    text: BLACK,
    background: WHITE,
    border: BLACK,
    icon: WHITE,
    iconBorder: OPEN_BLUE,
  },
  passive: {
    text: BLACK_PALE,
    background: WHITE_PALE,
    border: BLACK_PALE,
    icon: WHITE_PALE,
    iconBorder: OPEN_BLUE_PALE,
  },
};

const checkBoxGroup: RNCCL.CheckBoxGroupColorScheme = {
  active: {
    background: WHITE,
    seperator: GREY_80,
  },
  passive: {
    background: WHITE_PALE,
    seperator: GREY_80_PALE,
  },
};

const chip: RNCCL.ChipColorScheme = {
  active: {
    text: BLACK,
    background: WHITE,
    border: BLACK,
    icon: OPEN_BLUE,
  },
  passive: {
    text: BLACK_PALE,
    background: WHITE_PALE,
    border: BLACK_PALE,
    icon: OPEN_BLUE_PALE,
  },
};

const chipGroup: RNCCL.ChipGroupColorScheme = {
  active: {
    background: BLACK,
  },
  passive: {
    background: BLACK_PALE,
  },
};

const badge: RNCCL.BadgeColorScheme = {
  background: WHITE,
  border: BLACK,
  text: OPEN_BLUE,
  shadow: BLACK,
};

const modal: RNCCL.ModalColorScheme = {
  outsideBackground: BLACK_20,
  containerBackground: WHITE,
  shadow: BLACK,
};

const selectBox: RNCCL.SelectBoxColorScheme = {
  active: {
    background: GREY_90,
    border: BLACK,
    title: BLACK,
    placeholder: GREY,
    value: BLACK,
  },
  passive: {
    background: GREY_90_PALE,
    border: BLACK_PALE,
    title: BLACK_PALE,
    placeholder: GREY_PALE,
    value: BLACK_PALE,
  },
};

const dateTimePicker: RNCCL.DateTimePickerColorScheme = {
  active: {
    background: WHITE,
    border: BLACK,
    title: BLACK,
    placeholder: GREY,
    value: BLACK,
    pickerText: BLACK,
  },
  passive: {
    background: WHITE_PALE,
    border: BLACK_PALE,
    title: BLACK_PALE,
    placeholder: GREY_PALE,
    value: BLACK_PALE,
  },
};

const switchColors: RNCCL.SwitchComponentColorScheme = {
  active: {
    border: BLACK,
    background: GREY_90,
    backgroundOn: GREEN,
    backgroundOff: GREY,
    thumb: OPEN_BLUE,
  },
  passive: {
    border: BLACK_PALE,
    background: GREY_90_PALE,
    backgroundOn: GREEN_PALE,
    backgroundOff: GREY,
    thumb: OPEN_BLUE_PALE,
  },
};

const card: RNCCL.CardColorScheme = {
  active: {
    background: GREY_90,
    border: BLACK,
    icon: BLACK
  },
  passive: {
    background: GREY_90_PALE,
    border: BLACK_PALE,
    icon: BLACK_PALE
  }
}

const snackBar: RNCCL.SnackBarColorScheme = {
  background: GREY_90,
  shadow: BLACK
}

const light: RNCCL.ColorScheme = {
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

export default light;
