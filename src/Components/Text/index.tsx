import React, { FC } from 'react';
import {
  Omit,
  StyleProp,
  Text as NativeText,
  TextProps as NativeTextProps,
  TextStyle as NativeTextStyle,
} from 'react-native';
import { useThemeContext } from '../../Context/ThemeContext';

type TextStyle = Omit<NativeTextStyle, 'fontFamily' | 'fontWeight'>;

export interface ITextProps {
  /**
   * 
   */
  testID?: string

  /**
   * Text Sizes
   */
  size?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

  /**
   *
   */
  weigth?: 'Light' | 'Regular' | 'Medium' | 'SemiBold' | 'Bold';

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
  size = 'M',
  weigth = 'Regular',
  style,
  children,
  ...props
}) => {
  const [theme] = useThemeContext();
  const { colors, fonts } = theme;
  const { text } = colors;

  const defineSize = (): number => {
    switch (size) {
      case 'XXS':
        return 8;
      case 'XS':
        return 10;
      case 'S':
        return 12;
      case 'M':
        return 14;
      case 'L':
        return 16;
      case 'XL':
        return 18;
      case 'XXL':
        return 20;
    }
  };

  const defineFont = (): string => {
    switch (weigth) {
      case 'Light':
        return fonts.light;
      case 'Regular':
        return fonts.regular;
      case 'Medium':
        return fonts.medium;
      case 'SemiBold':
        return fonts.semibold;
      case 'Bold':
        return fonts.bold;
    }
  };

  return (
    <NativeText
      testID={testID}
      style={[
        {
          fontFamily: defineFont(),
          fontSize: defineSize(),
          color: text[active ? 'active' : 'passive'],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </NativeText>
  );
};

export default Regular;

// TODO: pasif durum için tıklanmayı engelle
