import React, { FC, Fragment, isValidElement, ReactNode, useState } from 'react';
import {
  PressableProps,
  TouchableOpacityProps,
  TouchableOpacity,
  Pressable,
  StyleProp,
  ViewStyle,
  FlexAlignType,
  ColorValue,
  TextStyle,
  Omit,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import { Icon, IIconProps, Text } from '..';
import { useTheme } from '../../Context/Theme';
import { tokens } from '../../Theme';

export interface IButtonProps {
  /**
   * 
   */
  testID?: string

  /**
   * @enum 'opacity' | 'changeable'
   * @default opacity
   */
  clickType?: 'opacity' | 'changeable';

  /**
   * @enum 'text' | 'icon' | 'both'
   * @default text
   */
  childType?: 'text' | 'icon' | 'both'

  /**
   * @enum 'filled' | 'outlined' | 'simplied'
   * @default filled
   */
  type?: 'filled' | 'outlined' | 'simplied'

  /**
   * @enum 'wrap' | 'no-wrap' | 'free'
   * @default no-wrap
   */
  wrap?: 'wrap' | 'no-wrap' | 'free';

  /**
   * invokes when press
   */
  onPress: () => void;

  /**
   * invokes when long press
   */
  onLongPress?: () => void;

  /**
   *
   */
  icon?: IIconProps | ReactNode;

  /**
   * @default Button
   */
  title?: string;

  /**
   * @see https://reactnative.dev/docs/text#style
   */
  titleStyle?: StyleProp<TextStyle>;

  /**
   *
   */
  containerStyle?: StyleProp<ViewStyle>;
}

export type IButtonTypes = IButtonProps &
  (
    | Omit<TouchableOpacityProps, 'onPress' | 'style' | 'onLongPress'>
    | Omit<PressableProps, 'onPress' | 'style' | 'onLongPress'>
  );

const Button: FC<IButtonTypes> = ({
  testID,
  clickType = 'opacity',
  childType = 'text',
  type = 'filled',
  wrap = 'no-wrap',
  title = 'Button',
  icon,
  titleStyle,
  containerStyle,
  onPress = () => { },
  onLongPress = () => { },
  ...props
}) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const theme = useTheme();
  const { colors } = theme
  const { button } = colors

  const STATE: keyof ColorScheme["button"] = props.disabled ? "passive" : "active"
  const PRESSED_STATE: keyof ColorScheme["button"]["active"] = pressed ? "pressed" : "normal"

  const backgroundColor = (): ColorValue => {
    switch (type) {
      case 'filled':
        return button[STATE][PRESSED_STATE].filled.background;
      case 'outlined':
        return button[STATE][PRESSED_STATE].outlined.background;
      case 'simplied':
        return button[STATE][PRESSED_STATE].simplied.background;
    }
  };

  const borderColor = (): ColorValue => {
    switch (type) {
      case 'filled':
        return button[STATE][PRESSED_STATE].filled.border;
      case 'outlined':
        return button[STATE][PRESSED_STATE].outlined.border;
      case 'simplied':
        return button[STATE][PRESSED_STATE].simplied.border;
    }
  };

  const titleColor = (): ColorValue => {
    switch (type) {
      case 'filled':
        return button[STATE][PRESSED_STATE].filled.text;
      case 'outlined':
        return button[STATE][PRESSED_STATE].outlined.text;
      case 'simplied':
        return button[STATE][PRESSED_STATE].simplied.text;
    }
  };

  const wrappableStyle = (): FlexAlignType | undefined => {
    switch (wrap) {
      case 'wrap':
        return 'baseline';
      case 'no-wrap':
        return 'stretch';
      case 'free':
      default:
        return undefined;
    }
  };

  const renderContainerStyle = (): StyleProp<ViewStyle> => {
    return {
      backgroundColor: backgroundColor(),
      borderRadius: tokens.component.radius,
      borderWidth: tokens.component.border,
      borderColor: borderColor(),
      alignSelf: wrappableStyle(),
    };
  };

  const renderIcon = (): ReactNode => {
    if (isValidElement(icon)) {
      return icon;
    } else {
      const CoreIcon = icon as IIconProps;
      return (
        <Icon
          {...CoreIcon}
          color={CoreIcon.color ? CoreIcon.color : titleColor()}
        />
      );
    }
  };

  const renderTitle = (): ReactNode => {
    return (
      <Text
        weigth="semibold"
        style={
          [
            { color: titleColor() },
            styles.title,
            titleStyle
          ]
        }
      >
        {title}
      </Text>
    );
  };

  const renderChildren = (): ReactNode => {
    switch (childType) {
      case 'text':
        return renderTitle();
      case 'icon':
        return renderIcon();
      case 'both':
        return (
          <Fragment>
            {renderIcon()}
            {renderTitle()}
          </Fragment>
        );
    }
  };

  const renderOpacity = () => {
    return (
      <TouchableOpacity
        testID={testID}
        activeOpacity={0.5}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[
          renderContainerStyle(),
          wrap !== 'free'
            ? {
              paddingVertical: tokens.component.vertical,
              paddingHorizontal: tokens.component.horizontal,
            }
            : {},
          wrap !== 'free' ? styles.container : {},
          containerStyle
        ]}
        {...(props as TouchableOpacityProps)}
      >
        {renderChildren()}
      </TouchableOpacity>
    );
  };

  const renderChangeable = () => {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        onPressIn={(e: GestureResponderEvent) => {
          setPressed(true);
          if (typeof props.onPressIn === 'function') {
            props.onPressIn(e);
          }
        }}
        onPressOut={(e: GestureResponderEvent) => {
          setPressed(false);
          if (typeof props.onPressOut === 'function') {
            props.onPressOut(e);
          }
        }}
        onLongPress={onLongPress}
        style={[
          renderContainerStyle(),
          wrap !== 'free'
            ? {
              paddingVertical: tokens.component.vertical,
              paddingHorizontal: tokens.component.horizontal
            }
            : {},
          wrap !== 'free' ? styles.container : {},
          containerStyle,
        ]}
        {...(props as PressableProps)}
      >
        {renderChildren()}
      </Pressable>
    );
  };

  switch (clickType) {
    case 'opacity':
    default:
      return renderOpacity();
    case 'changeable':
      return renderChangeable();
  }
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  }
})