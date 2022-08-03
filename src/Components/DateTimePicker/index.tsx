import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import { Dimensions, Omit, Platform, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import RNDatePicker, { DatePickerProps } from 'react-native-date-picker';
import { Button, IModalProps, Text, ITextProps, Seperator } from '..';
import { useTheme } from '../../Context/Theme';
import { useBottomSheet, useSetBottomSheet, useModal, useSetModal } from '../../Context';
import type { ModalizeProps } from 'react-native-modalize';
import moment from "moment"
import { getBottomSpace, makeColorPassive } from '../../Utils';

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
  title,
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
  ...props
}) => {
  const theme = useTheme();
  const { colors, tokens } = theme;
  const { innerSpace, borders, radiuses } = tokens

  const modal = useModal()
  const setModal = useSetModal()

  const bottomSheet = useBottomSheet();
  const setBottomSheet = useSetBottomSheet();

  const [nDate, setNDate] = useState<Date>(date || new Date());

  const paddingHorizontal = display === "modal" ? Platform.OS === "android" ? 64 : 40 : innerSpace.pageHorizontal

  const renderSubmit = () => {
    return (
      <Button
        onPress={() => {
          onSubmit(nDate);
          if (display === "modal") {
            modal.close()
          } else {
            bottomSheet.close()
          }
        }}
      />
    );
  };

  const modalProps: Omit<IModalProps, "visible"> = {
    type: "default",
    onTouchOutSide: modal.close,
    containerStyle: { flex: undefined, alignItems: 'center' }
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
    HeaderComponent: <Seperator type='vertical' size={"medium"} />,
    FooterComponent: <Seperator type='vertical' size={getBottomSpace()} />
  }

  const renderDisplayContent = (): ReactNode => {
    return (
      <Fragment>
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
            width: Dimensions.get("screen").width - paddingHorizontal,
          }}
        />
        {renderSubmit()}
      </Fragment>
    )
  }

  const openBottomSheet = () => {
    setBottomSheet({
      props: bottomSheetProps,
      renderContent: renderDisplayContent
    })
    bottomSheet.show()
  }

  const openModal = () => {
    setModal({
      props: modalProps,
      renderChildren: renderDisplayContent
    })

    modal.show()
  }

  useEffect(() => {
    if (display === "bottomSheet") {
      setBottomSheet({
        props: bottomSheetProps,
        renderContent: renderDisplayContent
      })
    }
  }, [date, nDate])

  const onPress = () => {
    switch (display) {
      case 'modal':
        return openModal();
      case "bottomSheet":
        return openBottomSheet()
    }
  };

  const renderTitle = () => {
    if (title) {
      return (
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <Text
            active={active}
            size={titleSize}
            weigth={titleWeight}
            style={[
              styles.title,
              error ?
                { color: colors.error }
                :
                {},
              titleStyle
            ]}>
            {title}
          </Text>
        </View>
      )
    }
    return null
  }

  const renderValue = () => {
    return (
      <View style={[styles.valueContainer, valueContainerStyle]}>
        <Text active={active} size={valueSize} weigth={valueWeight} style={[styles.value, valueStyle]}>
          {date ? moment(date).format(displayFormat) : placeholder}
        </Text>
      </View>
    )
  }

  const renderErrorSeperator = () => {
    if (error) {
      return <Seperator type='vertical' size={2} />
    }
    return null
  }

  const renderError = () => {
    if (error) {
      return (
        <View style={[{ paddingHorizontal: innerSpace.componentHorizontal }, styles.errorContainer, errorContainerStyle]}>
          <Text weigth={errorWeight} size={errorSize} style={[styles.error, { color: colors.error }, errorStyle]}>{error}</Text>
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
            borderWidth: error ? borders.textInputFocused : borders.component,
            borderRadius: radiuses.component,
            paddingVertical: innerSpace.componentVertical,
            paddingHorizontal: innerSpace.componentHorizontal,
            backgroundColor: active ? colors.componentBackground : makeColorPassive(colors.componentBackground),
            borderColor: error ? colors.error : colors.componentBorder,
          },
          containerStyle
        ]}
      >
        {renderTitle()}
        {renderValue()}
      </TouchableOpacity>
      {renderErrorSeperator()}
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