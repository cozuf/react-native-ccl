import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Dimensions, Omit, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import RNDatePicker, { DatePickerProps } from 'react-native-date-picker';
import { Button, Modal, Text } from '..';
import { useTheme } from '../../Context/Theme';
import { useBottomSheet } from '../../Context/BottomSheet';
import type { ModalizeProps } from 'react-native-modalize';

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
  onDateChange = () => { },
  onSubmit = () => { },
  containerStyle,
  titleContainerStyle,
  titleStyle,
  textContainerStyle,
  textStyle,
  ...props
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [nDate, setNDate] = useState<Date>(date || new Date());
  const [bottomSheet, setBottomSheet] = useBottomSheet();
  const [theme] = useTheme();
  const { colors, styles } = theme;
  const { dateTimePicker, modal } = colors;
  const { dateTimePickerStyle } = styles

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
      <Modal.Default
        visible={visible}
        onTouchOutSide={() => {
          setVisible(false);
        }}
        containerStyle={{ alignItems: 'center' }}
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
      </Modal.Default>
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

  return (
    <TouchableOpacity
      testID={testID}
      disabled={!active}
      onPress={onPress}
      style={[
        containerStyle,
        {
          backgroundColor:
            dateTimePicker[active ? 'active' : 'passive'].background,
          borderColor: dateTimePicker[active ? 'active' : 'passive'].border,
        },
        dateTimePickerStyle?.container,
      ]}
    >
      <View style={[dateTimePickerStyle?.titleContainer, titleContainerStyle]}>
        <Text style={[dateTimePickerStyle?.title, titleStyle]}>
          {title}
        </Text>
      </View>
      <View style={[dateTimePickerStyle?.titleContainer, textContainerStyle]}>
        <Text style={[dateTimePickerStyle?.title, textStyle]}>
          {date ? date.toLocaleString() : placeholder}
        </Text>
      </View>
      {renderChildren()}
    </TouchableOpacity>
  );
};

export default DateTimePicker;
