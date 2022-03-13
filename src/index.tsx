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
  BottomSheetProvider,
  useBottomSheet,
  GlobalStateProvider,
  useGlobalState,
  ModalProvider,
  useModal
} from "./Context"

// FIXME: listelemeli komponentlerde key (radiobutton, checkbox) - Modalize warnings
// TODO: SelectBox componentini tekrar gözden geçir navigationProps ile ilgili
// TODO: yayınlamadan önce ReadMe düzenle
// TODO: GlobalState'yi dışarıdan type verilebilir -> global'e yaz
// TODO: Language Context -> global'e yaz
// TODO: import - export ları düzenle -> şimdilik mümkün değil ayırmak gerekiyor
//  --datetimepicker'a moment ile gösterim eklenecek // EKLEME sadece dışarı Date tipini ver
// TODO: styles'de bulunan tokens'leri ve fontfamily'leri inner yap
// TODO: --ClassComponent için withTheme yap
// fucntional component'ta ref kullanmayı SnackBar'dan öğrenebilirsin!

// FIXME: Style'lar theme.style'dan color'lar theme.color'dan çekilmeli - gözden geçir unutma!
