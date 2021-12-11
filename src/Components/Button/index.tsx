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
  const [theme] = useTheme();
  const { colors, styles } = theme;
  const { button } = colors;
  const { buttonStyle } = styles

  const backgroundColor = (): ColorValue => {
    const BUTTON_FILLED_BACKGROUND =
      button[props.disabled ? 'passive' : 'active'][
        pressed ? 'pressed' : 'normal'
      ].filled.background;

    const BUTTON_OUTLINED_BACKGROUND =
      button[props.disabled ? 'passive' : 'active'][
        pressed ? 'pressed' : 'normal'
      ].outlined.background;

    const BUTTON_SIMPLIED_BACKGROUND =
      button[props.disabled ? 'passive' : 'active'][
        pressed ? 'pressed' : 'normal'
      ].simplied.background;

    switch (type) {
      case 'filled':
        return BUTTON_FILLED_BACKGROUND;
      case 'outlined':
        return BUTTON_OUTLINED_BACKGROUND;
      case 'simplied':
        return BUTTON_SIMPLIED_BACKGROUND;
    }
  };

  const borderColor = (): ColorValue => {
    const BUTTON_FILLED_BORDER =
      button[props.disabled ? 'passive' : 'active'][
        pressed ? 'pressed' : 'normal'
      ].filled.border;

    const BUTTON_OUTLINED_BORDER =
      button[props.disabled ? 'passive' : 'active'][
        pressed ? 'pressed' : 'normal'
      ].outlined.border;

    const BUTTON_SIMPLIED_BORDER =
      button[props.disabled ? 'passive' : 'active'][
        pressed ? 'pressed' : 'normal'
      ].simplied.border;

    switch (type) {
      case 'filled':
        return BUTTON_FILLED_BORDER;
      case 'outlined':
        return BUTTON_OUTLINED_BORDER;
      case 'simplied':
        return BUTTON_SIMPLIED_BORDER;
    }
  };

  const titleColor = (): ColorValue => {
    const BUTTON_FILLED_TEXT =
      button[props.disabled ? 'passive' : 'active'][
        pressed ? 'pressed' : 'normal'
      ].filled.text;

    const BUTTON_OUTLINED_TEXT =
      button[props.disabled ? 'passive' : 'active'][
        pressed ? 'pressed' : 'normal'
      ].outlined.text;

    const BUTTON_SIMPLIED_TEXT =
      button[props.disabled ? 'passive' : 'active'][
        pressed ? 'pressed' : 'normal'
      ].simplied.text;

    switch (type) {
      case 'filled':
        return BUTTON_FILLED_TEXT;
      case 'outlined':
        return BUTTON_OUTLINED_TEXT;
      case 'simplied':
        return BUTTON_SIMPLIED_TEXT;
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
      borderRadius: 8,
      borderWidth: tokens.component.borderWidth,
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
        weigth="semiBold"
        style={
          [
            { color: titleColor() },
            buttonStyle?.title,
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
              paddingVertical: tokens.component.paddingVertical,
              paddingHorizontal: tokens.component.paddingHorizontal,
            }
            : {},
          wrap !== 'free' ? buttonStyle?.container : {},
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
              paddingVertical: tokens.component.paddingVertical,
              paddingHorizontal: tokens.component.paddingHorizontal
            }
            : {},
          wrap !== 'free' ? buttonStyle?.container : {},
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
