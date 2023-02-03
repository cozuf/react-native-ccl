import React, { forwardRef, Fragment, isValidElement, ReactElement, ReactNode, useImperativeHandle, useRef, useState } from 'react';
import {
  TextStyle,
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Pressable,
  Omit,
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { makeColorPassive } from '../../Utils';
import { Button, Icon, IIconProps, Text, Seperator } from '..';
import { useTheme } from '../../Context/Theme';
import type { ITextProps } from '../Text';

export interface ITextInputRef {
  focus: () => void
  blur: () => void
  clear: () => void
  isFocused: () => boolean
}

export interface ITextInputProps {
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
  type?: 'email' | 'password' | 'default' | "phone" | "calculator";

  /**
   *
   */
  titleContainerStyle?: StyleProp<ViewStyle>;

  /**
   *
   */
  title?: string;

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
  titleStyle?: ITextProps["style"]

  /**
   *
   */
  icon?: IIconProps | ReactNode;

  /**
   *
   */
  value: string;

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
  onChangeText: (text: string) => void;

  /**
   *
   */
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;

  /**
   *
   */
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;

  /**
   *
   */
  inputStyle?: ITextProps["style"]

  /**
   *
   */
  error?: string;

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
  errorStyle?: ITextProps["style"]

  /**
   *
   */
  errorContainerStyle?: StyleProp<View>;

  /**
   *
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   *
   */
  cleanable?: boolean;

  /**
   *
   */
  isRequired?: boolean;
}

export type ITextInputTypes = ITextInputProps & Omit<TextInputProps, 'value' | 'onChangeText' | 'onFocus' | 'onBlur' | 'style' | "keyboardType">

const STextInput = forwardRef<ITextInputRef, ITextInputTypes>((props, ref) => {
  const {
    testID,
    active = true,
    type = 'default',
    title,
    titleSize = "m",
    titleWeight = "regular",
    titleStyle,
    titleContainerStyle,
    icon,
    value,
    valueWeight = "medium",
    valueSize = "m",
    inputStyle,
    onChangeText,
    error,
    errorSize = "m",
    errorWeight = "regular",
    errorStyle,
    errorContainerStyle,
    containerStyle,
    onFocus,
    onBlur,
    cleanable,
    isRequired,
    ...otherProps
  } = props
  const theme = useTheme()
  const { colors, fonts, tokens } = theme
  const { spaces, borders, radiuses } = tokens

  const NativeTextInputRef = useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)


  useImperativeHandle(ref, () => {
    if (NativeTextInputRef.current) {
      return {
        focus: () => NativeTextInputRef.current?.focus() || {},
        blur: () => NativeTextInputRef.current?.blur() || {},
        clear: () => NativeTextInputRef.current?.clear() || {},
        isFocused: () => NativeTextInputRef.current?.isFocused() || false
      }
    } else {
      return {
        focus: () => { },
        blur: () => { },
        clear: () => { },
        isFocused: () => false
      }
    }
  });


  const defineSize = (): number => {
    switch (valueSize) {
      case 'xxs':
        return 8;
      case 'xs':
        return 10;
      case 's':
        return 12;
      case 'm':
        return 14;
      case 'l':
        return 16;
      case 'xl':
        return 18;
      case 'xxl':
        return 20;
      default:
        return valueSize as number
    }
  };

  const changeFocus = () => {
    if (NativeTextInputRef.current?.isFocused()) {
      NativeTextInputRef.current?.blur();
      setIsFocused(false);
    } else {
      NativeTextInputRef.current?.focus();
      setIsFocused(true);
    }
  };

  const keyboardType = (): KeyboardTypeOptions => {
    switch (type) {
      case "phone":
        return "phone-pad"
      case "email":
        return "email-address"
      case "calculator":
        return "decimal-pad"
      default:
        return "default"
    }
  }

  const renderIcon = () => {
    if (icon) {
      if (isValidElement(icon)) {
        return icon;
      } else {
        const CoreIcon = icon as IIconProps;
        return (
          <View style={styles.iconContainer}>
            <Icon
              family={CoreIcon.family}
              name={CoreIcon.name}
              size={CoreIcon.size}
              color={active ? CoreIcon.color || error ? colors.error : isFocused ? colors.primary : colors.text : makeColorPassive(colors.text)}
            />
          </View>
        );
      }
    }
    return null
  };

  const renderSeperator = () => {
    if (icon) {
      return <Seperator type="horizontal" size={"medium"} />
    }
    return null
  };

  const renderError = () => {
    if (error) {
      return (
        <View style={[{ paddingHorizontal: spaces.componentHorizontal }, styles.errorContainer, errorContainerStyle]}>
          <Text weigth={errorWeight} size={errorSize} style={[styles.error, { color: colors.error }, errorStyle]}>{error}</Text>
        </View>
      )
    }
    return null
  };

  const renderErrorSeperator = () => {
    if (error) {
      return <Seperator type="vertical" />
    }
    return null
  };

  const renderClear = () => {
    if (type !== 'password' && cleanable && value.length > 0 && active) {
      return (
        <View>
          <Button
            wrap={'free'}
            childType={'icon'}
            type="simplied"
            icon={{
              family: 'Ionicons',
              name: 'close',
              size: 20,
              color: colors.text,
            }}
            onPress={() => {
              NativeTextInputRef.current?.clear();
              onChangeText('');
            }}
          />
        </View>
      );
    }
    return null
  };

  const renderPasswordVisible = () => {
    if (type === 'password') {
      if (passwordVisible) {
        return (
          <View>
            <Button
              wrap={'free'}
              childType={'icon'}
              type="simplied"
              icon={{
                family: 'Entypo',
                name: 'eye',
                size: 20,
                color: colors.text,
              }}
              onPress={() => {
                setPasswordVisible(false)
                // NativeTextInputRef.current?.clear();
                // onChangeText('');
              }}
            />
          </View>
        );
      } else {
        return (
          <View>
            <Button
              wrap={'free'}
              childType={'icon'}
              type="simplied"
              icon={{
                family: 'Entypo',
                name: 'eye-with-line',
                size: 20,
                color: colors.text,
              }}
              onPress={() => {
                setPasswordVisible(true)
                // NativeTextInputRef.current?.clear();
                // onChangeText('');
              }}
            />
          </View>
        );
      }
    }
    return null
  };

  const renderTitle = (): ReactElement | null => {
    if (title) {
      return (
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <Text weigth={titleWeight} size={titleSize} style={[styles.title, titleStyle, { color: active ? error ? colors.error : isFocused ? colors.primary : colors.text : makeColorPassive(colors.text) }]}>
            {isRequired ? `* ${title}` : title}
          </Text>
        </View>
      )
    }
    return null
  }

  const renderInputContainer = (): ReactElement | null => {
    return (
      <View style={[styles.inputContainer]}>
        <View style={styles.nativeInputContainer}>
          <TextInput
            ref={NativeTextInputRef}
            editable={active}
            value={value}
            onChangeText={onChangeText}
            style={[
              styles.input,
              inputStyle,
              {
                fontFamily: fonts[valueWeight],
                fontSize: defineSize(),
                color: colors.text,
                textAlignVertical: (inputStyle as TextStyle)?.textAlignVertical || props.multiline ? "top" : "auto",
                padding: 0
              },
            ]}
            keyboardType={keyboardType()}
            secureTextEntry={type === 'password' && !passwordVisible}
            onFocus={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
              setIsFocused(true);
              if (typeof onFocus === 'function') {
                onFocus(e);
              }
            }}
            onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
              setIsFocused(false);
              if (typeof onBlur === 'function') {
                onBlur(e);
              }
            }}
            selectionColor={colors.primary}
            placeholderTextColor={colors.placeholder}
            {...otherProps}
          />
        </View>
        {renderClear()}
        {renderPasswordVisible()}
      </View>
    )
  }

  const renderTitleAndInput = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderTitle()}
        {renderInputContainer()}
      </View>
    )
  }

  return (
    <Fragment>
      <Pressable
        testID={testID}
        disabled={!active}
        style={[
          styles.container,
          {
            paddingVertical: spaces.componentVertical,
            paddingHorizontal: spaces.componentHorizontal,
            borderRadius: radiuses.component,
            borderWidth: borders.textInputFocused,
            backgroundColor: active ? colors.componentBackground : makeColorPassive(colors.componentBackground),
            borderColor: active ? error ? colors.error : isFocused ? colors.primary : borders.component === 0 ? colors.componentBackground : colors.text : makeColorPassive(colors.text),
          },
          containerStyle
        ]}
        onPress={changeFocus}
      >
        {renderIcon()}
        {renderSeperator()}
        {renderTitleAndInput()}
      </Pressable>
      {renderErrorSeperator()}
      {renderError()}
    </Fragment>
  );

})

export default STextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center"
  },
  titleContainer: {},
  title: {},
  inputContainer: {
    alignItems: "center",
    flexDirection: 'row'
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  seperatorContainer: {},
  seperator: {},
  nativeInputContainer: {
    flex: 1,
  },
  input: {
  },
  cleanContainer: {},
  warningContainer: {},
  warning: {},
  errorContainer: {},
  error: {},
})
