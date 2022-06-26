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
  StateCard,
  SegmentedButton
} from "./Components";

export { dark, light, fonts, tokens } from './Theme';
export { isIphoneX, ifIphoneX, getStatusBarHeight, getBottomSpace } from "./Utils"

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
  IModalProps,
  CCLModalProps,
  IDateTimePickerProps,
  IDateTimePickerTypes,
  IPageContainerProps,
  IPageContainerTypes,
  IStateCardProps,
  ISegmentedButtonProps,
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
  withModal,
  RNCCLProvider
} from "./Context"

// TODO: Placeholder yap

// TODO: global'deki context type'ları gözden geçir ve düzenle

// TODO: Context'ler dışarıdan çağır "i18n.t" gibi
// TODO: Context'ler dışarıdan initalize edilebilsin araştır ( Language )

// TODO: SelectBox için renderItem prop'unu düzenle onSelect ile alakalı

// TODO: Language context yap - hook, with
// TODO: SnackBar context yap - hook, with
// TODO: RNCCL context yap diğerlerini içine koy

// TODO: SearchBar onClear ayrılabilir mi bak gerekiyorsa ayır ve bitir
// TODO: inputs'lar için infoButton yap SnackBar ile


// TODO: yayınlamadan önce ReadMe düzenle
// FIXME: import - export ları düzenle -> şimdilik mümkün değil ayırmak gerekiyor
