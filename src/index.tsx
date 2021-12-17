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
  SnackBarRef,
  ICardProps
} from './Components';

import {
  ThemeProvider,
  useTheme,
  BottomSheetProvider,
  useBottomSheet,
  GlobalStateProvider,
  useGlobalState,
  // ClassGlobalStateProvider,
  // useClassGlobalState
} from './Context';
import { FONTS } from './Assets';
import { dark, light } from './Theme/Colors';
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
  SnackBar,
  Card,
  SelectPage,
  ThemeProvider,
  useTheme,
  BottomSheetProvider,
  useBottomSheet,
  GlobalStateProvider,
  useGlobalState,
  // ClassGlobalStateProvider,
  // useClassGlobalState,
  FONTS,
  dark,
  light,
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
  SnackBarRef,
  ICardProps
};

// TODO: SelectBox componentini tekrar gözden geçir navigationProps ile ilgili
// TODO: Örnek Sayfalar da varyantları ekle
// TODO: yayınlamadan önce ReadMe düzenle
// : GlobalState'yi dışarıdan type verilebilir -> Şimdilik mümkün değil
// : Language Context -> Burası da GlobalState gibi şimdilik mümkün değil
// : import - export ları düzenle -> şimdilik mümkün değil ayırmak gerekiyor
// TODO: --modalı Furkan'ın ki gibi yap bir sürü modal açacam diye uğraşma
// TODO: --datetimepicker'a moment ile gösterim eklenecek
// TODO: styles'de bulunan tokens'leri ve fontfamily'leri inner yap
// TODO: --ClassComponent için withTheme yap
// fucntional component'ta ref kullanmayı öğren - SnackBar'dan öğrenebilirsin!

// FIXME: Style'lar theme.style'dan color'lar theme.color'dan çekilmeli - gözden geçir unutma!
