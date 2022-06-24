import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import { Dimensions, Omit, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import RNDatePicker, { DatePickerProps } from 'react-native-date-picker';
import { Button, Modal, Text } from '..';
import { useTheme } from '../../Context/Theme';
import { useBottomSheet, useSetBottomSheet } from '../../Context/BottomSheet';
import type { ModalizeProps } from 'react-native-modalize';
import moment from "moment"
import type { ITextProps } from '../Text';
import { makeColorPassive } from '../../Utils';

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
  titleStyle?: ITextProps["style"]

  /**
   *  
   */
  titleWeight?: ITextProps["weigth"]

  /**
   *  
   */
  titleSize?: ITextProps["size"]

  /**
   * 
   */
  valueContainerStyle?: StyleProp<ViewStyle>

  /**
   * 
   */
  valueStyle?: ITextProps["style"]

  /**
   *  
   */
  valueWeight?: ITextProps["weigth"]

  /**
   *  
   */
  valueSize?: ITextProps["size"]

  /**
   *
   */
  warning?: string

  /**
   *
   */
  warningStyle?: ITextProps["style"]

  /**
   *  
   */
  warningWeight?: ITextProps["weigth"]

  /**
   *  
   */
  warningSize?: ITextProps["size"]

  /**
   *
   */
  warningContainerStyle?: ITextProps["style"]

  /**
   *
   */
  error?: string

  /**
   *
   */
  errorStyle?: ITextProps["style"]

  /**
   *  
   */
  errorWeight?: ITextProps["weigth"]

  /**
   *  
   */
  errorSize?: ITextProps["size"]

  /**
   *
   */
  errorContainerStyle?: StyleProp<ViewStyle>
}

export interface IDateTimePickerTypes extends IDateTimePickerProps, Omit<DatePickerProps, 'date' | 'mode' | 'onDateChange'> { }

const DateTimePicker: FC<IDateTimePickerTypes> = ({
  testID,
  active = true,
  title = 'Başlık',
  titleSize = "m",
  titleWeight = "regular",
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
  valueContainerStyle,
  valueStyle,
  valueSize = "m",
  valueWeight = "regular",
  error,
  errorStyle,
  errorSize = "m",
  errorWeight = "regular",
  errorContainerStyle,
  warning,
  warningStyle,
  warningSize = "m",
  warningWeight = "regular",
  warningContainerStyle,
  ...props
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [nDate, setNDate] = useState<Date>(date || new Date());
  const bottomSheet = useBottomSheet();
  const setBottomSheet = useSetBottomSheet();
  const theme = useTheme();
  const { colors, tokens } = theme;
  const { component } = tokens

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
          textColor={colors.text as string}
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
      backgroundColor: colors.pageBackground,
    },
    overlayStyle: {
      backgroundColor: colors.modalOutside,
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
          textColor={colors.text as string}
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
        <View style={[styles.warningContainer, warningContainerStyle]}>
          <Text weigth={warningWeight} size={warningSize} style={[styles.warning, { color: colors.warning }, warningStyle]}>{warning}</Text>
        </View>
      )
    }
    return null
  };

  const renderError = () => {
    if (error) {
      return (
        <View style={[styles.errorContainer, errorContainerStyle]}>
          <Text weigth={errorWeight} size={errorSize} style={[styles.error, { color: colors.destructive }, errorStyle]}>{error}</Text>
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
          {
            borderWidth: component.border,
            borderRadius: component.radius,
            paddingVertical: component.vertical,
            paddingHorizontal: component.horizontal,
            backgroundColor: active ? colors.componentBackground : makeColorPassive(colors.componentBackground),
            borderColor: error ? colors.destructive : colors.seperator,
          },
          containerStyle
        ]}
      >
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <Text
            active={active}
            size={titleSize}
            weigth={titleWeight}
            style={[
              styles.title,
              error ?
                { color: colors.destructive }
                :
                {},
              titleStyle
            ]}>
            {title}
          </Text>
        </View>
        <View style={[styles.valueContainer, valueContainerStyle]}>
          <Text active={active} size={valueSize} weigth={valueWeight} style={[styles.value, valueStyle]}>
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

const styles = StyleSheet.create({
  titleContainer: {},
  title: {},
  seperator: {},
  valueContainer: {},
  value: {},
  warningContainer: {},
  warning: {},
  errorContainer: {},
  error: {},
})