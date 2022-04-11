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
} from "./Components";

export { SelectPage } from "./Components/SelectBox/Page"
export { FONTS } from './Assets';
export { dark, light } from './Theme/Colors';

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
  ICardProps,
  IModalProps
} from "./Components"

export {
  ThemeProvider,
  useTheme,
  useSetTheme,
  withTheme,
  BottomSheetProvider,
  useBottomSheet,
  useSetBottomSheet,
  withBottomSheet,
  GlobalStateProvider,
  useGlobalState,
  useSetGlobalState,
  withGlobalState,
  ModalProvider,
  useModal,
  useSetModal,
  withModal
} from "./Context"

// FIXME: listelemeli komponentlerde key (radiobutton, checkbox) - Modalize warnings
// TODO: SelectBox componentini tekrar gözden geçir navigationProps ile ilgili
// TODO: yayınlamadan önce ReadMe düzenle
// TODO: Language Context -> global'e yaz
// --: import - export ları düzenle -> şimdilik mümkün değil ayırmak gerekiyor
// TODO: styles'de bulunan tokens'leri ve fontfamily'leri inner yap
// TODO: input'ların error'lerini gözden geçir
// ClassComponent için withGlobalState yapıldı
// fucntional component'ta ref kullanmayı SnackBar'dan öğrenebilirsin!

// FIXME: Style'lar theme.style'dan color'lar theme.color'dan çekilmeli - gözden geçir unutma!
// TODO: RNCCL Context yap diğer contextleri içine koy