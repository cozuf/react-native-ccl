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
  SegmentedButton,
  BottomSheet
} from "./Components";

export { dark, light, fonts, tokens } from './Theme';
export { isIphoneX, ifIphoneX, getStatusBarHeight, getBottomSpace, makeColorPassive, isObject } from "./Utils"

export type {
  ITextProps,
  ITextTypes,
  IIconProps,
  ITextInputRef,
  ITextInputProps,
  ITextInputTypes,
  IButtonProps,
  IButtonTypes,
  ISperatorProps,
  IDateTimePickerProps,
  IDateTimePickerTypes,
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
  IModalProps,
  IModalTypes,
  ISearchBarProps,
  ISearchBarTypes,
  ISelectBoxProps,
  ISelectBoxTypes,
  ISwitchProps,
  ISwitchTypes,
  ISnackBarProps,
  ISnackBarRef,
  ICardProps,
  IPageContainerProps,
  IPageContainerTypes,
  IStateCardProps,
  ISegmentedButtonProps,
  IBottomSheetProps,
  IBottomSheetRef
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
  IGLobalStateRef,
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
  useSetSnackBar,
  withSnackBar,
  RNCCLProvider
} from "./Context"

// FIXME: yayınlamadan önce ReadMe düzenle
// LATER: import - export ları düzenle -> şimdilik mümkün değil ayırmak gerekiyor

//#region Remove
// TODO: ---TO REMOVE---
// -> react-native-vector-icons
// Button - Card - Checkbox - Modal - RadioBUtton - Selectbox - StateCard - TextInput

//#endregion

//#region Fix
// TODO: ---TO FIX---
// -> Chip
// Tema dizayn - disabled - unselected - selected

// -> SnackBar
// success - error - warning - default
// border ekle
// modal ile yap boşluğa dokununca snackbar kaybolsun

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