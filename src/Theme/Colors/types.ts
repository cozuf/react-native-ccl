import type { ColorValue } from 'react-native';

export interface BadgeColorScheme {
  border: ColorValue;
  background: ColorValue;
  text: ColorValue;
  shadow: ColorValue;
}

export interface ButtonColorScheme {
  /**
   * Pressable
   */
  active: {
    normal: {
      filled: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
      };
      outlined: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
      };
      simplied: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
      };
    };
    pressed: {
      filled: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
      };
      outlined: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
      };
      simplied: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
      };
    };
  };
  /**
   * Not pressable
   */
  passive: {
    normal: {
      filled: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
      };
      outlined: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
      };
      simplied: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
      };
    };
    pressed: {
      filled: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
      };
      outlined: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
      };
      simplied: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
      };
    };
  };
}

export interface CardColorScheme {
  active: {
    background: ColorValue
    border: ColorValue
    icon?: ColorValue
  },
  passive: {
    background: ColorValue
    border: ColorValue
    icon?: ColorValue
  }
}

export interface CheckBoxColorScheme {
  /**
   * Pressable
   */
  active: {
    text: ColorValue;
    icon: ColorValue;
    background: ColorValue;
    border: ColorValue;
    iconBorder: ColorValue;
  };
  /**
   * Not pressable
   */
  passive: {
    text: ColorValue;
    icon: ColorValue;
    background: ColorValue;
    border: ColorValue;
    iconBorder: ColorValue;
  };
}

export interface CheckBoxGroupColorScheme {
  active: {
    background: ColorValue;
    seperator: ColorValue;
  };
  passive: {
    background: ColorValue;
    seperator: ColorValue;
  };
}

export interface ChipColorScheme {
  /**
   * Pressable
   */
  active: {
    text: ColorValue;
    icon: ColorValue;
    background: ColorValue;
    border: ColorValue;
  };
  /**
   * Not pressable
   */
  passive: {
    text: ColorValue;
    icon: ColorValue;
    background: ColorValue;
    border: ColorValue;
  };
}

export interface ChipGroupColorScheme {
  active: {
    background: ColorValue;
  };
  passive: {
    background: ColorValue;
  };
}

export interface CommonColorScheme {
  primary: ColorValue;
  secondary: ColorValue;
  active: ColorValue;
  passive: ColorValue;
  statusbar: ColorValue;
  componentBackground: ColorValue
}

export interface DateTimePickerColorScheme {
  active: {
    background: ColorValue;
    border: ColorValue;
    title: ColorValue;
    placeholder: ColorValue;
    value: ColorValue;
    pickerText: ColorValue;
  };
  passive: {
    background: ColorValue;
    border: ColorValue;
    title: ColorValue;
    placeholder: ColorValue;
    value: ColorValue;
  };
}

export interface IconColorScheme {
  active: ColorValue;
  passive: ColorValue;
}

export interface ModalColorScheme {
  outsideBackground: ColorValue;
  containerBackground: ColorValue;
  shadow: ColorValue;
}

export interface PageContainerColorScheme {
  background: ColorValue;
}

export interface RadioButtonColorScheme {
  /**
   * Pressable
   */
  active: {
    text: ColorValue;
    icon: ColorValue;
    background: ColorValue;
    border: ColorValue;
  };
  /**
   * Not pressable
   */
  passive: {
    text: ColorValue;
    icon: ColorValue;
    background: ColorValue;
    border: ColorValue;
  };
}

export interface RadioButtonGroupColorScheme {
  active: {
    background: ColorValue;
    seperator: ColorValue;
  };
  passive: {
    background: ColorValue;
    seperator: ColorValue;
  };
}

export interface SelectBoxColorScheme {
  active: {
    background: ColorValue;
    border: ColorValue;
    title: ColorValue;
    placeholder: ColorValue;
    value: ColorValue;
  };
  passive: {
    background: ColorValue;
    border: ColorValue;
    title: ColorValue;
    placeholder: ColorValue;
    value: ColorValue;
  };
}

export interface SnackBarColorScheme {
  background: ColorValue
  shadow: ColorValue
}

export interface SwitchComponentColorScheme {
  active: {
    border: ColorValue;
    background: ColorValue;
    backgroundOn: ColorValue;
    backgroundOff: ColorValue;
    thumb: ColorValue;
  };
  passive: {
    border: ColorValue;
    background: ColorValue;
    backgroundOn: ColorValue;
    backgroundOff: ColorValue;
    thumb: ColorValue;
  };
}

export interface TextColorScheme {
  active: ColorValue;
  passive: ColorValue;
}

export interface TextInputColorScheme {
  /**
   * Pressable but not focused
   */
  active: {
    background: ColorValue;
    border: ColorValue;
    titleText: ColorValue;
    inputText: ColorValue;
    placeholder: ColorValue;
  };
  /**
   * Not pressable
   */
  passive: {
    background: ColorValue;
    border: ColorValue;
    titleText: ColorValue;
    inputText: ColorValue;
    placeholder: ColorValue;
  };
  /**
   * focused
   */
  focused: {
    background: ColorValue;
    border: ColorValue;
    titleText: ColorValue;
    inputText: ColorValue;
    selection: ColorValue;
  };
}

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
