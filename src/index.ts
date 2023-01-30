export {
  Text,
  PageContainer,
  Icon,
  TextInput,
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
export { isIphoneX, ifIphoneX, getStatusBarHeight, getBottomSpace, makeColorPassive } from "./Utils"

export type {
  ITextProps,
  ITextTypes,
  IIconProps,
  ITextInputRef,
  ITextInputProps,
  ITextInputTypes,
  IButtonProps,
  IButtonTypes,
  ITapSelectorProps,
  ITapSelectorTypes,
  IRadioButtonProps,
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
  ISnackBarRef,
  ICardProps,
  IModalProps,
  IModalTypes,
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
  RNCCLProvider
} from "./Context"

// FIXME: yayınlamadan önce ReadMe düzenle
// LATER: import - export ları düzenle -> şimdilik mümkün değil ayırmak gerekiyor

//#region Remove
// TODO: ---TO REMOVE---
// -> react-native-vector-icons
// Button - Card - Checkbox - Modal - RadioBUtton - Selectbox - StateCard - TextInput

// -> Indicator
// PageContainer - loading - component yap
// Modal - loading - component yap
//#endregion

//#region Fix
// TODO: ---TO FIX---
// -> Chip
// Tema dizayn - disabled - unselected - selected

// -> SnackBar
// success - error - warning - default
// border ekle

// -> types
// global'deki context type'ları gözden geçir ve düzenle

// -> Dışarıdan erişim
// Context'ler dışarıdan çağır "i18n.t" gibi
// Context'ler dışarıdan initalize edilebilsin araştır ( Language )

// -> SelectBox
// searchable da multiselect ise seçili kalmalı
// renderItem prop'unu düzenle onSelect ile alakalı

// -> Context
// Language context yap - hook, with
// RNCCL context yap diğerlerini içine koy

// -> SearchBar
// onClear ayrılabilir mi bak gerekiyorsa ayır ve bitir
//#endregion

//#region Add
// TODO: ---TO ADD---
// -> Portalize
// Araştırılacak

// -> Placeholder, yapılacak

// inputs'lar (textinput, selectbox, datetimepicker) için infoButton yap SnackBar ile
//#endregion