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
  SnackBarProvider,
  useSnackBar,
  useSetSnakBar,
  withSnackBar,
  LanguageProvider,
  useTranslation,
  useSetSetTranslation,
  RNCCLProvider
} from "./Context"

// TODO: Placeholder yap

// FIXME: global'deki context type'ları gözden geçir ve düzenle

// LATER: Context'ler dışarıdan çağır "i18n.t" gibi
// LATER: Context'ler dışarıdan initalize edilebilsin araştır ( Language )

// TODO: SelectBox için searchable da multiselect ise seçili kalmalı
// TODO: SelectBox için renderItem prop'unu düzenle onSelect ile alakalı

// TODO: Language context yap - hook, with
// TODO: RNCCL context yap diğerlerini içine koy

// LATER: SearchBar onClear ayrılabilir mi bak gerekiyorsa ayır ve bitir
// LATER: inputs'lar için infoButton yap SnackBar ile


// FIXME: yayınlamadan önce ReadMe düzenle
// LATER: import - export ları düzenle -> şimdilik mümkün değil ayırmak gerekiyor
