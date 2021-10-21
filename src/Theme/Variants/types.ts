import type { ColorValue } from 'react-native'

interface CommonColorScheme {
  primary: ColorValue
  secondary: ColorValue
  active: ColorValue
  passive: ColorValue
  statusbar: ColorValue
}

interface PageContainerColorScheme {
  background: ColorValue
}

interface TextColorScheme {
  active: ColorValue
  passive: ColorValue
}

interface IconColorScheme {
  active: ColorValue
  passive: ColorValue
}

interface TextInputColorScheme {
  /**
   * Pressable but not focused
   */
  active: {
    background: ColorValue
    border: ColorValue
    titleText: ColorValue
    inputText: ColorValue
    placeholder: ColorValue
  }
  /**
   * Not pressable
   */
  passive: {
    background: ColorValue
    border: ColorValue
    titleText: ColorValue
    inputText: ColorValue
    placeholder: ColorValue
  }
  /**
   * focused
   */
  focused: {
    background: ColorValue
    border: ColorValue
    titleText: ColorValue
    inputText: ColorValue
    selection: ColorValue
  }
}

interface ButtonColorScheme {
  /**
   * Pressable
   */
  active: {
    normal: {
      filled: {
        background: ColorValue
        text: ColorValue
        border: ColorValue
      }
      outlined: {
        background: ColorValue
        text: ColorValue
        border: ColorValue
      }
      simplied: {
        background: ColorValue
        text: ColorValue
        border: ColorValue
      }
    }
    pressed: {
      filled: {
        background: ColorValue
        text: ColorValue
        border: ColorValue
      }
      outlined: {
        background: ColorValue
        text: ColorValue
        border: ColorValue
      }
      simplied: {
        background: ColorValue
        text: ColorValue
        border: ColorValue
      }
    }
  }
  /**
   * Not pressable
   */
  passive: {
    normal: {
      filled: {
        background: ColorValue
        text: ColorValue
        border: ColorValue
      }
      outlined: {
        background: ColorValue
        text: ColorValue
        border: ColorValue
      }
      simplied: {
        background: ColorValue
        text: ColorValue
        border: ColorValue
      }
    }
    pressed: {
      filled: {
        background: ColorValue
        text: ColorValue
        border: ColorValue
      }
      outlined: {
        background: ColorValue
        text: ColorValue
        border: ColorValue
      }
      simplied: {
        background: ColorValue
        text: ColorValue
        border: ColorValue
      }
    }
  }
}

interface RadioButtonColorScheme {
  /**
   * Pressable
   */
  active: {
    text: ColorValue
    icon: ColorValue
    background: ColorValue
    border: ColorValue
  }
  /**
   * Not pressable
   */
  passive: {
    text: ColorValue
    icon: ColorValue
    background: ColorValue
    border: ColorValue
  }
}

interface RadioButtonGroupColorScheme {
  active: {
    background: ColorValue
    seperator: ColorValue
  }
  passive: {
    background: ColorValue
    seperator: ColorValue
  }
}

interface CheckBoxColorScheme {
  /**
   * Pressable
   */
  active: {
    text: ColorValue
    icon: ColorValue
    background: ColorValue
    border: ColorValue
    iconBorder: ColorValue
  }
  /**
   * Not pressable
   */
  passive: {
    text: ColorValue
    icon: ColorValue
    background: ColorValue
    border: ColorValue
    iconBorder: ColorValue
  }
}

interface CheckBoxGroupColorScheme {
  active: {
    background: ColorValue
    seperator: ColorValue
  }
  passive: {
    background: ColorValue
    seperator: ColorValue
  }
}

interface ChipColorScheme {
  /**
   * Pressable
   */
  active: {
    text: ColorValue
    icon: ColorValue
    background: ColorValue
    border: ColorValue
  }
  /**
   * Not pressable
   */
  passive: {
    text: ColorValue
    icon: ColorValue
    background: ColorValue
    border: ColorValue
  }
}

interface ChipGroupColorScheme {
  active: {
    background: ColorValue
  }
  passive: {
    background: ColorValue
  }
}

interface BadgeColorScheme {
  border: ColorValue
  background: ColorValue
  text: ColorValue
  shadow: ColorValue
}

interface ModalColorScheme {
  outsideBackground: ColorValue
  containerBackground: ColorValue
  shadow: ColorValue
}

interface SelectBoxColorScheme {
  active: {
    background: ColorValue
    border: ColorValue
    title: ColorValue
    placeholder: ColorValue
    value: ColorValue
  }
  passive: {
    background: ColorValue
    border: ColorValue
    title: ColorValue
    placeholder: ColorValue
    value: ColorValue
  }
}

interface DateTimePickerColorScheme {
  active: {
    background: ColorValue
    border: ColorValue
    title: ColorValue
    placeholder: ColorValue
    value: ColorValue
    pickerText: ColorValue
  }
  passive: {
    background: ColorValue
    border: ColorValue
    title: ColorValue
    placeholder: ColorValue
    value: ColorValue
  }
}

interface SwitchComponentColorScheme {
  active: {
    border: ColorValue
    background: ColorValue
    backgroundOn: ColorValue
    backgroundOff: ColorValue
    thumb: ColorValue
  }
  passive: {
    border: ColorValue
    background: ColorValue
    backgroundOn: ColorValue
    backgroundOff: ColorValue
    thumb: ColorValue
  }
}

interface ColorScheme {
  common: CommonColorScheme
  pageContainer: PageContainerColorScheme
  text: TextColorScheme
  icon: IconColorScheme
  textInput: TextInputColorScheme
  button: ButtonColorScheme
  radioButton: RadioButtonColorScheme
  radioButtonGroup: RadioButtonGroupColorScheme
  checkBox: CheckBoxColorScheme
  checkBoxGroup: CheckBoxGroupColorScheme
  chip: ChipColorScheme
  chipGroup: ChipGroupColorScheme
  badge: BadgeColorScheme
  modal: ModalColorScheme
  selectBox: SelectBoxColorScheme
  dateTimePicker: DateTimePickerColorScheme
  switchComponent: SwitchComponentColorScheme
}

export type {
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
  TextInputColorScheme
}