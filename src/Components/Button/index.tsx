import React, { FC, Fragment, isValidElement, ReactNode, useState } from 'react';
import {
  PressableProps,
  TouchableOpacityProps,
  TouchableOpacity,
  Pressable,
  StyleProp,
  ViewStyle,
  FlexAlignType,
  Omit,
  GestureResponderEvent,
  StyleSheet,
  ColorValue,
} from 'react-native';
import { makeColorPassive } from '../../Utils';
import { Icon, IIconProps, Text, ITextProps } from '..';
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
  clickType?: 'opacity' | 'changeable'

  /**
   * @enum 'text' | 'icon' | 'both'
   * @default text
   */
  childType?: 'text' | 'icon' | 'both'

  /**
   * @enum 'filled' | 'outlined' | 'simplied'
   * @default filled
   */
  type?: "filled" | "outlined" | "simplied"

  /**
   * @enum 'wrap' | 'no-wrap' | 'free'
   * @default no-wrap
   */
  wrap?: 'wrap' | 'no-wrap' | 'free'

  /**
   * invokes when press
   */
  onPress: () => void;

  /**
   * invokes when long press
   */
  onLongPress?: () => void

  /**
   *
   */
  icon?: IIconProps | ReactNode

  /**
   * @default Button
   */
  title?: string

  /**
   *  
   */
  titleWeight?: ITextProps["weigth"]

  /**
   *  
   */
  titleSize?: ITextProps["size"]

  /**
   * @see https://reactnative.dev/docs/text#style
   */
  titleStyle?: ITextProps["style"]

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
  titleSize = "l",
  titleWeight = "semibold",
  containerStyle,
  onPress = () => { },
  onLongPress = () => { },
  ...props
}) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const theme = useTheme();
  const { colors } = theme
  // FIXME: active passive durumu
  const defineBackgroundColor = (): ColorValue | undefined => {
    if (clickType === "opacity" || (clickType === "changeable" && !pressed)) {
      switch (type) {
        case "filled":
        default:
          return props.disabled ? makeColorPassive(colors.primary) : colors.primary
        case "outlined":
          return props.disabled ? makeColorPassive(colors.pageBackground) : colors.pageBackground
        case "simplied":
          return colors.transparent
      }
    } else {
      switch (type) {
        case "filled":
        default:
          return colors.componentBackground
        case "outlined":
          return colors.primary
        case "simplied":
          return colors.componentBackground
      }
    }
  }

  const defineBorderColor = (): ColorValue | undefined => {
    if (clickType === "opacity" || (clickType === "changeable" && !pressed)) {
      switch (type) {
        case "filled":
        default:
          return props.disabled ? colors.transparent : colors.primary
        case "outlined":
          return props.disabled ? makeColorPassive(colors.primary) : colors.primary
        case "simplied":
          return colors.transparent
      }
    } else {
      switch (type) {
        case "filled":
        default:
          return colors.primary
        case "outlined":
          return colors.primary
        case "simplied":
          return colors.transparent
      }
    }
  }

  const defineChildrenColor = (): ColorValue | undefined => {
    if (clickType === "opacity" || (clickType === "changeable" && !pressed)) {
      switch (type) {
        case "filled":
        default:
          return props.disabled ? makeColorPassive(colors.componentText) : colors.componentText
        case "outlined":
          return props.disabled ? makeColorPassive(colors.primary) : colors.primary
        case "simplied":
          return props.disabled ? makeColorPassive(colors.primary) : colors.primary
      }
    } else {
      switch (type) {
        case "filled":
        default:
          return colors.primary
        case "outlined":
          return colors.componentText
        case "simplied":
          return colors.primary
      }
    }
  }

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
      backgroundColor: defineBackgroundColor(),
      borderRadius: tokens.component.radius,
      borderWidth: tokens.component.border,
      borderColor: defineBorderColor(),
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
          color={CoreIcon.color ? CoreIcon.color : defineChildrenColor()}
        />
      );
    }
  };

  const renderTitle = (): ReactNode => {

    return (
      <Text
        weigth={titleWeight}
        size={titleSize}
        style={
          [
            {
              color: defineChildrenColor()
            },
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
  }
})

// TODO: Butonda ikon pozisyonu sağ sol
// TODO: Seperatoru flexDirection durumuna göre ayarla