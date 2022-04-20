import React, { FC } from 'react';
import {
  Omit,
  StyleProp,
  Text as NativeText,
  TextProps as NativeTextProps,
  TextStyle as NativeTextStyle,
} from 'react-native';
import { useTheme } from '../../Context/Theme';

type TextStyle = Omit<NativeTextStyle, 'fontFamily' | 'fontWeight'>;

export interface ITextProps {
  /**
   * 
   */
  testID?: string

  /**
   * Text Sizes
   */
  size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | number

  /**
   *
   */
  weigth?: keyof FontScheme

  /**
   * enable or disable
   * @default true
   */
  active?: boolean;

  /**
   * @see https://reactnative.dev/docs/text#style
   */
  style?: StyleProp<TextStyle>;

  onPress?: () => void;
  onLongPress?: () => void;
}

export type ITextTypes = ITextProps &
  Omit<NativeTextProps, 'style' | 'onPress' | 'onLongPress'>;

const Regular: FC<ITextTypes> = ({
  testID,
  active = true,
  size = 'm',
  weigth = 'regular',
  style,
  children,
  ...props
}) => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const { text } = colors;

  const STATE: keyof ColorScheme["text"] = active ? "active" : "passive"

  const defineSize = (): number => {
    switch (size) {
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
        return size as number
    }
  };

  return (
    <NativeText
      testID={testID}
      style={[
        {
          fontFamily: fonts[weigth],
          fontSize: defineSize(),
          color: text[STATE],
        },
        style,
      ]
      }
      {...props}
    >
      {children}
    </NativeText>
  );
};

export default Regular;

// TODO: pasif durum için tıklanmayı engelle
