import React, { FC, Fragment, isValidElement, ReactElement, ReactNode, useRef, useState } from 'react';
import {
  TextStyle,
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Platform,
  Pressable,
  Omit,
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { Button, Icon, IIconProps, Text, Seperator } from '..';
import { useTheme } from '../../Context/Theme';
import type { ITextProps } from '../Text';

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
  warning?: string;

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
  warningStyle?: ITextProps["style"]
  /**
   *
   */
  warningContainerStyle?: StyleProp<ViewStyle>;

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

export type ITextInputTypes = ITextInputProps & Omit<TextInputProps, 'onChangeText' | 'onFocus' | 'onBlur' | 'style' | "keyboardType">

const NTextInput: FC<ITextInputTypes> = ({
  testID,
  active = true,
  type = 'default',
  title = 'Başlık',
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
  warning,
  warningSize = "m",
  warningWeight = "regular",
  warningStyle,
  warningContainerStyle,
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
  ...props
}) => {
  const theme = useTheme();
  const { colors, fonts, tokens } = theme;
  const { textInput, common } = colors;
  const { component } = tokens;

  const NativeTextInputRef = useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const STATE: keyof ColorScheme["textInput"] = active ? isFocused ? "focused" : "active" : "passive"

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
          <Icon
            family={CoreIcon.family}
            name={CoreIcon.name}
            size={CoreIcon.size}
            color={CoreIcon.color || error ? common.error : textInput[STATE].titleText}
          />
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

  const renderWarning = () => {
    if (warning) {
      return (
        <View style={[styles.warningContainer, warningContainerStyle]}>
          <Text weigth={warningWeight} size={warningSize} style={[styles.warning, { color: common.warning }, warningStyle,]}>{warning}</Text>
        </View>
      )
    }
    return null
  };

  const renderError = () => {
    if (error) {
      return (
        <View style={[styles.errorContainer, errorContainerStyle]}>
          <Text weigth={errorWeight} size={errorSize} style={[styles.error, { color: common.error }, errorStyle]}>{error}</Text>
        </View>
      )
    }
    return null
  };

  const renderWarningErrorSeperator = () => {
    if (error && warning) {
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
              color: textInput[STATE].inputText,
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
                color: textInput[STATE].inputText,
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
                color: textInput[STATE].inputText,
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
          <Text weigth={titleWeight} size={titleSize} style={[styles.title, titleStyle, { color: error ? common.error : textInput[STATE].titleText }]}>
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
        {renderIcon()}
        {renderSeperator()}
        {
          <View style={styles.nativeInputContainer}>
            <TextInput
              ref={(ref) => {
                NativeTextInputRef.current = ref;
              }}
              editable={active}
              value={value}
              onChangeText={onChangeText}
              style={[
                styles.input,
                inputStyle,
                {
                  fontFamily: fonts[valueWeight],
                  fontSize: defineSize(),
                  ...Platform.select({
                    ios: {
                      paddingVertical:
                        inputStyle && (inputStyle as TextStyle).paddingVertical
                          ? Number((inputStyle as TextStyle)?.paddingVertical) + 6.5
                          : 6.5,
                    },
                    android: {
                      paddingVertical:
                        inputStyle && (inputStyle as TextStyle).paddingVertical
                          ? Number((inputStyle as TextStyle)?.paddingVertical)
                          : 0,
                    },
                  }),
                },
                { color: textInput[STATE].inputText },
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
              selectionColor={textInput.focused.selection}
              placeholderTextColor={
                textInput[active ? 'active' : 'passive'].placeholder
              }
              {...props}
            />
          </View>
        }
        {renderClear()}
        {renderPasswordVisible()}
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
            padding: component.vertical,
            borderRadius: component.radius,
            borderWidth: component.border,
            backgroundColor: textInput[STATE].background,
            borderColor: error ? common.error : textInput[STATE].border,
          },
          containerStyle
        ]}
        onPress={() => {
          changeFocus();
        }}
      >
        {renderTitle()}
        {renderInputContainer()}
      </Pressable>
      {renderWarning()}
      {renderWarningErrorSeperator()}
      {renderError()}
    </Fragment>
  );
};

export default NTextInput;

const styles = StyleSheet.create({
  container: {
  },
  titleContainer: {},
  title: {},
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {},
  seperatorContainer: {},
  seperator: {},
  nativeInputContainer: {
    flex: 1
  },
  input: {
    paddingVertical: 12,
  },
  cleanContainer: {},
  warningContainer: {},
  warning: {},
  errorContainer: {},
  error: {},
})
