import {
  BLACK,
  BLACK_90,
  GREEN,
  GREY,
  GREY_80,
  ORANGE,
  RED,
  TRANSPARENT,
  TURQUOISE,
  TURQUOISE_1,
  TURQUOISE_2,
  WHITE,
  WHITE_20,
} from './palette';

const dark: RNCCL.ColorScheme = {
  brand: TURQUOISE_2,
  primary: TURQUOISE,
  secondary: TURQUOISE_1,
  tertiary: TURQUOISE_2,
  success: GREEN,
  warning: ORANGE,
  error: RED,
  white: WHITE,
  black: BLACK,
  transparent: TRANSPARENT,

  pageBackground: BLACK,
  componentBackground: BLACK_90,
  componentBorder: TURQUOISE,
  componentIcon: TURQUOISE,
  componentTitle: WHITE,
  componentValue: WHITE,

  buttonText: WHITE,

  listItemSeperator: GREY_80,

  modalOutside: WHITE_20,
  modalBackground: BLACK,

  shadow: WHITE,
  placeholder: GREY,
  text: WHITE,
};

export default dark;
