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
// TODO: Örnek Sayfalar da varyantları ekle
// TODO: Style Context - Tüm padding, borderWidth, borderRadius belirle color scheme gibi
// TODO: yayınlamadan önce ReadMe düzenle
// TODO: SearchBar'a aranacak key'i ekle
// : GlobalState'yi dışarıdan type verilebilir -> Şimdilik mümkün değil
// : Language Context -> Burası da GlobalState gibi şimdilik mümkün değil
// TODO: import - export ları düzenle
// TODO: colors'a componentBackground eklenecek
// TODO: modalı Furkan'ın ki gibi yap bir sürü modal açacam diye uğraşma
// TODO: seperator'u da type ile yap
// TODO: checkbox'a titleContainer ve titlestyle eklenecek - seperator eklenecek
// TODO: datetimepicker'a titleContainer ve titlestyle, placeholderContainer placeholderStyle eklenecek
// TODO: switch'e titleContainer ve titlestyle, eklenecek
// TODO: textinput error warning seperator
// TODO: tokens için yapı kur
/**
 * theme.colors|styles|fonts
 * setTheme({colors,styles,fonts})
 */
