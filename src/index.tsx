import {
  Text,
  PageContainer,
  Icon,
  TextInput,
  ActivityIndicator,
  Button,
  TapSelector,
  RadioButton,
  RadioButtonGroup,
  CheckBox,
  CheckBoxGroup,
  Chip,
  ChipGroup,
  Badge,
  SearchBar,
  Modal,
  SelectBox,
  Seperator,
  DateTimePicker,
  Switch,
  SnackBar,
  Card
} from './Components';

import type {
  ITextProps,
  ITextTypes,
  IIconProps,
  ITextInputProps,
  ITextInputTypes,
  IActivityIndicatorProps,
  IButtonProps,
  IButtonTypes,
  ITapSelectorProps,
  ITapSelectorTypes,
  IRadionButtonProps,
  IRadioButtonGroupProps,
  IRadioButtonGroupTypes,
  ICheckBoxProps,
  ICheckBoxGroupProps,
  ICheckBoxGroupTypes,
  IChipProps,
  IChipGroupProps,
  IChipGroupTypes,
  IBadgeProps,
  ISearchBarProps,
  ISearchBarTypes,
  ISelectBoxProps,
  ISelectBoxTypes,
  ISwitchProps,
  ISwitchTypes,
  ISnackBarProps,
  ICardProps
} from './Components';

import {
  ThemeProvider,
  useThemeContext,
  GlobalStateProvider,
  useGlobalState,
  BottomSheetProvider,
  useBottomSheet,
  ClassGlobalStateProvider,
  useClassGlobalState
} from './Context';
import { FONTS } from './Assets';
import { dark, light } from './Theme/Variants';
import SelectPage from './Components/SelectBox/Page';

export {
  Text,
  PageContainer,
  Icon,
  TextInput,
  ActivityIndicator,
  Button,
  TapSelector,
  RadioButton,
  RadioButtonGroup,
  CheckBox,
  CheckBoxGroup,
  Chip,
  ChipGroup,
  Badge,
  SearchBar,
  Modal,
  SelectBox,
  Seperator,
  DateTimePicker,
  Switch,
  ThemeProvider,
  useThemeContext,
  GlobalStateProvider,
  useGlobalState,
  BottomSheetProvider,
  useBottomSheet,
  FONTS,
  dark,
  light,
  SelectPage,
  SnackBar,
  Card,
  ClassGlobalStateProvider,
  useClassGlobalState
};

export type {
  ITextProps,
  ITextTypes,
  IIconProps,
  ITextInputProps,
  ITextInputTypes,
  IActivityIndicatorProps,
  IButtonProps,
  IButtonTypes,
  ITapSelectorProps,
  ITapSelectorTypes,
  IRadionButtonProps,
  IRadioButtonGroupProps,
  IRadioButtonGroupTypes,
  ICheckBoxProps,
  ICheckBoxGroupProps,
  ICheckBoxGroupTypes,
  IChipProps,
  IChipGroupProps,
  IChipGroupTypes,
  IBadgeProps,
  ISearchBarProps,
  ISearchBarTypes,
  ISelectBoxProps,
  ISelectBoxTypes,
  ISwitchProps,
  ISwitchTypes,
  ISnackBarProps,
  ICardProps
};

// TODO: SelectBox componentini tekrar gözden geçir navigationProps ile ilgili
// TODO: Tüm comoponentlerde eksikleri tamamla (containerStyle vs.)
// TODO: Tüm padding, borderWidth, borderRadius belirle color scheme gibi
// TODO: Örnek Sayfalar da varyantları ekle
// TODO: Style Context
// TODO: Language Context
// TODO: yayınlamadan önce ReadMe düzenle
// TODO: SearchBar'a aranacak key'i ekle
// TODO: GlobalState'yi dışarıdan type verilebilir
// TODO: import - export ları düzenle
/**
 * theme.colors|styles|fonts
 * setTheme({colors,styles,fonts})
 */
