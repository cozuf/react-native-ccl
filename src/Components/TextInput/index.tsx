import React, { FC, isValidElement, ReactNode, useRef, useState } from 'react';
import {
  TextStyle,
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  ColorValue,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Platform,
  Pressable,
  Omit,
  KeyboardTypeOptions,
  StyleProp,
} from 'react-native';
import { Button, Icon, IIconProps, Text, Seperator } from '..';
import { useThemeContext } from '../../Context/ThemeContext';

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
  title?: string;

  /**
   *
   */
  titleStyle?: TextStyle;

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
  style?: TextStyle;

  /**
   *
   */
  warning?: string;

  /**
   *
   */
  warningStyle?: TextStyle;

  /**
   *
   */
  error?: string;

  /**
   *
   */
  errorStyle?: TextStyle;

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

export type ITextInputTypes = ITextInputProps &
  Omit<TextInputProps, 'onChangeText' | 'onFocus' | 'onBlur' | 'style' | "keyboardType">;

const NTextInput: FC<ITextInputTypes> = ({
  testID,
  active = true,
  type = 'default',
  title = 'Başlık',
  titleStyle,
  icon,
  value,
  style,
  onChangeText,
  warning,
  warningStyle,
  error,
  errorStyle,
  containerStyle,
  onFocus,
  onBlur,
  cleanable,
  isRequired,
  ...props
}) => {
  const [theme] = useThemeContext();
  const { colors, styles } = theme;
  const { textInput } = colors;
  const { textInputStyle } = styles;

  const NativeTextInputRef = useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>();

  const containerBackgroundColor = (): ColorValue => {
    const CONTAINER_BACKGROUND =
      textInput[active ? (isFocused ? 'focused' : 'active') : 'passive']
        .background;

    return CONTAINER_BACKGROUND;
  };

  const containerBorderColor = (): ColorValue => {
    const CONTAINER_BORDER_COLOR =
      textInput[active ? (isFocused ? 'focused' : 'active') : 'passive'].border;
    return CONTAINER_BORDER_COLOR;
  };

  const inputTextColor = (): ColorValue => {
    const INPUT_TEXT_COLOR =
      textInput[active ? (isFocused ? 'focused' : 'active') : 'passive']
        .inputText;
    return INPUT_TEXT_COLOR;
  };

  const titleTextColor = (): ColorValue => {
    const TITLE_TEXT_COLOR =
      textInput[active ? (isFocused ? 'focused' : 'active') : 'passive']
        .titleText;

    return TITLE_TEXT_COLOR;
  };

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
            color={CoreIcon.color || titleTextColor()}
          />
        );
      }
    }
    return null
  };

  const renderSeperator = () => {
    if (icon) {
      return <Seperator type="horizontal" />
    }
    return null
  };

  const renderWarning = () => {
    if (warning) {
      return <Text style={[warningStyle]}>{warning}</Text>;
    }
    return null
  };

  const renderError = () => {
    if (error) {
      return <Text style={[errorStyle]}>{error}</Text>;
    }
    return null
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

  const renderClean = () => {
    if (cleanable && value.length > 0 && active) {
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
              color: inputTextColor(),
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

  return (
    <Pressable
      testID={testID}
      disabled={!active}
      style={[
        textInputStyle?.container,
        containerStyle,
        {
          backgroundColor: containerBackgroundColor(),
          borderColor: containerBorderColor(),
        },
      ]}
      onPress={() => {
        changeFocus();
      }}
    >
      {title ? (
        <Text style={[titleStyle, { color: titleTextColor() }]}>
          {isRequired ? `* ${title}` : title}
        </Text>
      ) : null}
      <View style={[textInputStyle?.inputContainer]}>
        {renderIcon()}
        {renderSeperator()}
        {
          <View style={textInputStyle?.nativeInputContainer}>
            <TextInput
              ref={(ref) => {
                NativeTextInputRef.current = ref;
              }}
              editable={active}
              value={value}
              onChangeText={onChangeText}
              style={[
                textInputStyle?.input,
                style,
                {
                  ...Platform.select({
                    ios: {
                      paddingVertical:
                        style && style.paddingVertical
                          ? Number(style?.paddingVertical) + 6.5
                          : 6.5,
                    },
                    android: {
                      paddingVertical:
                        style && style.paddingVertical
                          ? Number(style?.paddingVertical)
                          : 0,
                    },
                  }),
                },
                { color: inputTextColor() },
              ]}
              keyboardType={keyboardType()}
              secureTextEntry={type === 'password'}
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
        {renderClean()}
      </View>
      {renderWarning()}
      {renderError()}
    </Pressable>
  );
};

export default NTextInput;

//  TODO: Info Button oluştur snackbar ile
