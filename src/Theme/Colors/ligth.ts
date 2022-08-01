import {
  BLACK,
  BLACK_20,
  GREEN,
  GREY,
  GREY_80,
  GREY_90,
  OPEN_BLUE,
  ORANGE,
  RED,
  SEA_TURQUAZ_BLUE,
  TRANSPARENT,
  TURQUAZ_BLUE,
  WHITE,
} from './palette';

const light: ColorScheme = {
  brand: OPEN_BLUE,
  primary: OPEN_BLUE,
  secondary: TURQUAZ_BLUE,
  tertiary: SEA_TURQUAZ_BLUE,
  success: GREEN,
  warning: ORANGE,
  error: RED,
  white: WHITE,
  black: BLACK,
  transparent: TRANSPARENT,

  pageBackground: WHITE,

  componentBackground: GREY_90,
  componentBorder: OPEN_BLUE,
  componentIcon: BLACK,
  componentTitle: BLACK,
  componentValue: BLACK,

  buttonText: WHITE,

  listItemSeperator: GREY_80,

  modalOutside: BLACK_20,
  modalBackground: WHITE,

  shadow: BLACK,
  placeholder: GREY,
  text: BLACK,
};

export default light;
