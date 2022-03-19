import React, { FC, isValidElement, ReactElement, ReactNode, useRef, useState } from 'react';
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
import { useTheme } from '../../Context/Theme';

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
  titleStyle?: StyleProp<TextStyle>;

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
  inputStyle?: StyleProp<TextStyle>;

  /**
   *
   */
  warning?: string;

  /**
   *
   */
  warningStyle?: StyleProp<TextStyle>;

  /**
   *
   */
  warningContainerStyle?: StyleProp<TextStyle>;

  /**
   *
   */
  error?: string;

  /**
   *
   */
  errorStyle?: StyleProp<TextStyle>;

  /**
   *
   */
  errorContainerStyle?: StyleProp<TextStyle>;

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
  titleContainerStyle,
  icon,
  value,
  inputStyle,
  onChangeText,
  warning,
  warningStyle,
  warningContainerStyle,
  error,
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
  const { colors, styles } = theme;
  const { textInput } = colors;
  const { textInputStyle } = styles;

  const NativeTextInputRef = useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

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
      return (
        <View style={[textInputStyle?.warningContainer, warningContainerStyle]}>
          <Text style={[textInputStyle?.warning, warningStyle]}>{warning}</Text>
        </View>
      )
    }
    return null
  };

  const renderError = () => {
    if (error) {
      return (
        <View style={[textInputStyle?.errorContainer, errorContainerStyle]}>
          <Text style={[textInputStyle?.error, errorStyle]}>{error}</Text>
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

  const renderClean = () => {
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
                color: inputTextColor(),
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
                color: inputTextColor(),
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
        <View style={[textInputStyle?.titleContainer, titleContainerStyle]}>
          <Text style={[textInputStyle?.title, titleStyle, { color: titleTextColor() }]}>
            {isRequired ? `* ${title}` : title}
          </Text>
        </View>
      )
    }
    return null
  }

  const renderInputContainer = (): ReactElement | null => {
    return (
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
                inputStyle,
                {
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
                { color: inputTextColor() },
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
        {renderClean()}
        {renderPasswordVisible()}
      </View>
    )
  }

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
      {renderTitle()}
      {renderInputContainer()}
      {renderWarning()}
      {renderWarningErrorSeperator()}
      {renderError()}
    </Pressable>
  );
};

export default NTextInput;

//  TODO: Info Button oluştur snackbar ile
