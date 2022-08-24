import Text, { ITextProps, ITextTypes } from './Text';
import PageContainer, { IPageContainerProps, IPageContainerTypes } from './PageContainer';
import Icon, { IIconProps } from './Icon';
import TextInput, { ITextInputRef, ITextInputProps, ITextInputTypes } from './TextInput';
import ActivityIndicator, { IActivityIndicatorProps, } from './ActivityIndicator';
import Button, { IButtonProps, IButtonTypes } from './Button';
import TapSelector, { ITapSelectorProps, ITapSelectorTypes, } from './TapSelector';
import RadioButton, { IRadioButtonProps } from './RadioButton';
import RadioButtonGroup, { IRadioButtonGroupProps, IRadioButtonGroupTypes, } from './RadioButtonGroup';
import CheckBox, { ICheckBoxProps } from './CheckBox';
import CheckBoxGroup, { ICheckBoxGroupProps, ICheckBoxGroupTypes, } from './CheckBoxGroup';
import Chip, { IChipProps } from './Chip';
import ChipGroup, { IChipGroupProps, IChipGroupTypes } from './ChipGroup';
import Badge, { IBadgeProps } from './Badge';
import SearchBar, { ISearchBarProps, ISearchBarTypes } from './SearchBar';
import Modal, { IModalProps, IModalTypes } from './Modal';
import SelectBox, { ISelectBoxProps, ISelectBoxTypes } from './SelectBox';
import Seperator, { ISperatorProps } from './Seperator';
import DateTimePicker, { IDateTimePickerProps, IDateTimePickerTypes } from './DateTimePicker';
import Switch, { ISwitchProps, ISwitchTypes } from './Switch';
import SnackBar, { ISnackBarProps, ISnackBarRef } from './SnackBar';
import Card, { ICardProps } from './Card';
import StateCard, { IStateCardProps } from './StateCard';
import SegmentedButton, { ISegmentedButtonProps } from './SegmentedButton';
import BottomSheet, { IBottomSheetRef, IBottomSheetProps } from './BottomSheet';

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
  SegmentedButton,
  BottomSheet
};
interface IListItem {
  active?: boolean
  value: any
  title: string
  selected: boolean
}

export type {
  ITextProps,
  ITextTypes,
  IIconProps,
  ITextInputRef,
  ITextInputProps,
  ITextInputTypes,
  IActivityIndicatorProps,
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
  IBottomSheetRef,
  IListItem
};
