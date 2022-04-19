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

// TODO: global'deki context type'ları gözden geçir ve düzenle

// TODO: hangisi daha iyi düşün token'leri dışarıdan vermek mi yoksa styles yapmak mı ?
// TODO: styles, colors, tokens, fonts theme'den alınmalı
// TODO: styles'daki token ve fontFamily'leri inner yap context'den kullan
// TODO: style'dan gönderilen fontWeight vs içeri alma

// TODO: Context'ler dışarıdan initalize edilebilsin araştır

// TODO: SelectBox için modalize(bottomSheet) listelemelisini düzenle - uyarı vermesin
// TODO: SelectBox için navigationProps ve navigationParams'ı suggest edilebilir yap

// TODO: Language context yap - hook, with
// TODO: SnackBar context yap - hook, with
// TODO: RNCCL context yap diğerlerini içine koy

// TODO: Badge platform farklılıklarını gözden geçir ve onayla bitir
// TODO: SearchBar onClear ayrılabilir mi bak gerekiyorsa ayır ve bitir
// TODO: inputs'lar için infoButton yap SnackBar ile
// TODO: SnackBar çeşitlendir - (arkadan öne - önden arkaya) - (aşağıdan yukarıya - yukarıdan aşağıya) - (soldan sağa - sağdan sola)


// TODO: yayınlamadan önce ReadMe düzenle
// FIXME: import - export ları düzenle -> şimdilik mümkün değil ayırmak gerekiyor
