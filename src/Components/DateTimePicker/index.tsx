import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import { Dimensions, Omit, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import RNDatePicker, { DatePickerProps } from 'react-native-date-picker';
import { Button, Modal, Text } from '..';
import { useTheme } from '../../Context/Theme';
import { useBottomSheet, useSetBottomSheet } from '../../Context/BottomSheet';
import type { ModalizeProps } from 'react-native-modalize';
import moment from "moment"

export interface IDateTimePickerProps {
  /**
   * 
   */
  testID?: string

  /**
   * 
   */
  active?: boolean;
  /**
   *
   */
  display?: 'modal' | 'bottomSheet';

  /**
   *
   */
  title?: string;

  /**
   *
   */
  placeholder?: string;

  /**
   * The currently selected date.
   */
  date?: Date;

  /**
   * The date picker mode.
   */
  mode?: 'date' | 'time' | 'datetime';

  /**
   * Date change handler.
   *
   * This is called when the user changes the date or time in the UI.
   * The first and only argument is a Date object representing the new
   * date and time.
   */
  onDateChange?: (date: Date) => void;

  /**
   * 
   */
  onSubmit?: (date: Date) => void;

  /**
   * 
   */
  displayFormat?: string

  /**
   * 
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * 
   */
  titleContainerStyle?: StyleProp<ViewStyle>

  /**
   * 
   */
  titleStyle?: StyleProp<TextStyle>

  /**
   * 
   */
  textContainerStyle?: StyleProp<ViewStyle>

  /**
   * 
   */
  textStyle?: StyleProp<TextStyle>

  /**
   *
   */
  warning?: string

  /**
   *
   */
  warningStyle?: StyleProp<TextStyle>

  /**
   *
   */
  warningContainerStyle?: StyleProp<TextStyle>

  /**
   *
   */
  error?: string

  /**
   *
   */
  errorStyle?: StyleProp<TextStyle>

  /**
   *
   */
  errorContainerStyle?: StyleProp<TextStyle>
}

type IDateTimePickerTypes = IDateTimePickerProps &
  Omit<DatePickerProps, 'date' | 'mode' | 'onDateChange'>;

const DateTimePicker: FC<IDateTimePickerTypes> = ({
  testID,
  active = true,
  title = 'Başlık',
  placeholder = 'Placeholder',
  date,
  display = 'modal',
  mode = 'datetime',
  displayFormat = "DD-MM-YYYY HH:mm:SS",
  onDateChange = () => { },
  onSubmit = () => { },
  containerStyle,
  titleContainerStyle,
  titleStyle,
  textContainerStyle,
  textStyle,
  error,
  errorStyle,
  errorContainerStyle,
  warning,
  warningStyle,
  warningContainerStyle,
  ...props
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [nDate, setNDate] = useState<Date>(date || new Date());
  const bottomSheet = useBottomSheet();
  const setBottomSheet = useSetBottomSheet();
  const theme = useTheme();
  const { colors, styles } = theme;
  const { dateTimePicker, modal, common } = colors;
  const { dateTimePickerStyle } = styles

  const STATE: keyof ColorScheme["dateTimePicker"] = active ? "active" : "passive";

  const renderSubmit = () => {
    return (
      <Button
        onPress={() => {
          onSubmit(nDate);
          if (display === "modal") {
            setVisible(false);
          }
          else {
            bottomSheet.close()
          }
        }}
      />
    );
  };

  const renderModal = (): ReactNode => {
    return (
      <Modal
        type="default"
        visible={visible}
        onTouchOutSide={() => {
          setVisible(false);
        }}
        containerStyle={{ flex: undefined, alignItems: 'center' }}
      >
        <RNDatePicker
          date={nDate}
          onDateChange={(date: Date) => {
            setNDate(date);
            onDateChange(date);
          }}
          mode={mode}
          textColor={dateTimePicker.active.pickerText as string}
          {...props}
          fadeToColor={theme.name === 'Dark' ? 'black' : 'white'}
        />
        {renderSubmit()}
      </Modal>
    );
  };

  const renderChildren = (): ReactNode | null => {
    switch (display) {
      case "modal":
        return renderModal();
      default:
        return null
    }
  }

  const openModal = () => {
    setVisible(true);
  }

  const bottomSheetProps: ModalizeProps = {
    adjustToContentHeight: true,
    modalStyle: {
      backgroundColor: modal.containerBackground,
    },
    overlayStyle: {
      backgroundColor: modal.outsideBackground,
    },
    handlePosition: "inside",
    childrenStyle: {
      padding: 8
    },
  }

  const renderBottomSheetContent = (): ReactNode => {
    return (
      <View style={{ alignItems: "center" }}>
        <RNDatePicker
          date={nDate}
          onDateChange={(date: Date) => {
            setNDate(date);
            onDateChange(date);
          }}
          mode={mode}
          textColor={dateTimePicker.active.pickerText as string}
          {...props}
          fadeToColor={theme.name === 'Dark' ? 'black' : 'white'}
          style={{
            width: Dimensions.get("screen").width - 16,
          }}

        />
        {renderSubmit()}
      </View>
    )
  }

  const openBottomSheet = () => {
    setBottomSheet({
      props: bottomSheetProps,
      renderContent: renderBottomSheetContent
    })
    bottomSheet.show()
  }

  useEffect(() => {
    setBottomSheet({
      props: bottomSheetProps,
      renderContent: renderBottomSheetContent
    })
  }, [date, nDate])

  const onPress = () => {
    switch (display) {
      case 'modal':
        openModal();
        break;
      case "bottomSheet":
        openBottomSheet();
        break;
    }
  };

  const renderWarning = () => {
    if (warning) {
      return (
        <View style={[dateTimePickerStyle?.warningContainer, warningContainerStyle]}>
          <Text weigth='medium' style={[dateTimePickerStyle?.warning, { color: common.warning }, warningStyle]}>{warning}</Text>
        </View>
      )
    }
    return null
  };

  const renderError = () => {
    if (error) {
      return (
        <View style={[dateTimePickerStyle?.errorContainer, errorContainerStyle]}>
          <Text weigth='medium' style={[dateTimePickerStyle?.error, { color: common.error }, errorStyle]}>{error}</Text>
        </View>
      )
    }
    return null
  };

  return (
    <Fragment>
      <TouchableOpacity
        testID={testID}
        disabled={!active}
        onPress={onPress}
        style={[
          containerStyle,
          {
            backgroundColor: dateTimePicker[STATE].background,
            borderColor: error ? common.error : dateTimePicker[STATE].border,
          },
          dateTimePickerStyle?.container,
        ]}
      >
        <View style={[dateTimePickerStyle?.titleContainer, titleContainerStyle]}>
          <Text style={[dateTimePickerStyle?.title, error ? { color: common.error } : {}, titleStyle]}>
            {title}
          </Text>
        </View>
        <View style={[dateTimePickerStyle?.textContainer, textContainerStyle]}>
          <Text style={[dateTimePickerStyle?.text, textStyle]}>
            {date ? moment(date).format(displayFormat) : placeholder}
          </Text>
        </View>
        {renderChildren()}
      </TouchableOpacity>
      {renderWarning()}
      {renderError()}
    </Fragment>
  );
};

export default DateTimePicker;
