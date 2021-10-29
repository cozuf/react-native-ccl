import React, { FC, isValidElement, ReactNode, useState } from 'react';
import {
  PressableProps,
  TouchableOpacityProps,
  TouchableOpacity,
  Pressable,
  StyleProp,
  ViewStyle,
  StyleSheet,
  FlexAlignType,
  ColorValue,
  TextStyle,
  Omit,
  GestureResponderEvent,
} from 'react-native';
import { Icon, IIconProps, Text } from '..';
import { FONTS } from '../../Assets';
import { useThemeContext } from '../../Context/ThemeContext';
import { TOKENS } from '../../Theme';

export interface IButtonProps {
  /**
   * @enum 'Opacity' | 'Changeable'
   * @default Opacity
   */
  clickType?: 'Opacity' | 'Changeable';

  /**
   * @enum 'Text' | 'Icon' | 'Both'
   * @default Text
   */
  childType?: 'Text' | 'Icon' | 'Both';

  /**
   * @enum 'Filled' | 'Outlined' | 'Simplied'
   * @default Filled
   */
  type?: 'Filled' | 'Outlined' | 'Simplied';

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
  containerStyle?: ViewStyle;
}

export type IButtonTypes = IButtonProps &
  (
    | Omit<TouchableOpacityProps, 'onPress' | 'style' | 'onLongPress'>
    | Omit<PressableProps, 'onPress' | 'style' | 'onLongPress'>
  );

const Button: FC<IButtonTypes> = ({
  clickType = 'Opacity',
  childType = 'Text',
  type = 'Filled',
  wrap = 'no-wrap',
  title = 'Button',
  icon,
  titleStyle,
  containerStyle,
  onPress = () => {},
  onLongPress = () => {},
  ...props
}) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const [theme] = useThemeContext();
  const { button } = theme.colors;

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
      case 'Filled':
        return BUTTON_FILLED_BACKGROUND;
      case 'Outlined':
        return BUTTON_OUTLINED_BACKGROUND;
      case 'Simplied':
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
      case 'Filled':
        return BUTTON_FILLED_BORDER;
      case 'Outlined':
        return BUTTON_OUTLINED_BORDER;
      case 'Simplied':
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
      case 'Filled':
        return BUTTON_FILLED_TEXT;
      case 'Outlined':
        return BUTTON_OUTLINED_TEXT;
      case 'Simplied':
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
      borderRadius: TOKENS.radiuses.button,
      borderWidth: TOKENS.borders.button,
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

  const renderTitle = () => {
    return (
      <Text style={[{ color: titleColor() }, styles.title, titleStyle]}>
        {title}
      </Text>
    );
  };

  const renderChildren = (): ReactNode => {
    switch (childType) {
      case 'Text':
        return renderTitle();
      case 'Icon':
        return renderIcon();
      case 'Both':
        return (
          <>
            {renderIcon()}
            {renderTitle()}
          </>
        );
    }
  };

  const renderOpacity = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[
          renderContainerStyle(),
          wrap !== 'free'
            ? {
                paddingVertical: TOKENS.paddings.componentContainerVertical,
                paddingHorizontal: TOKENS.paddings.componentContainerHorizontal,
              }
            : {},
          wrap !== 'free' ? styles.container : {},
          containerStyle,
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
                paddingVertical: TOKENS.paddings.componentContainerVertical,
                paddingHorizontal: TOKENS.paddings.componentContainerHorizontal,
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
    case 'Opacity':
    default:
      return renderOpacity();

    case 'Changeable':
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
    fontFamily: FONTS.semibold,
    fontSize: 16,
  },
});
