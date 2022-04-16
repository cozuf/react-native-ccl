import React, { FC } from 'react';
import { Platform, StyleProp, View, ViewStyle } from 'react-native';
import { Text } from '..';
import { useTheme } from '../../Context/Theme';
export interface IBadgeProps {
  /**
   * 
   */
  testID?: string

  /**
   *
   */
  size?: 'small' | 'medium' | 'large' | number;

  /**
   *
   */
  value: number | string;
}

const Badge: FC<IBadgeProps> = ({ testID, size = 20, value = 1 }) => {
  const theme = useTheme();
  const { colors, styles } = theme
  const { badgeStyle } = styles
  const { badge } = colors;

  const calculateSize = (): number => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
      default:
        return size < 20 ? 20 : size > 30 ? 30 : size;
    }
  };

  const getValue = (): string | undefined => {
    if (typeof value === 'number' && value > 9) {
      return '9+';
    } else {
      return value.toString();
    }
  };

  const containerStyle: StyleProp<ViewStyle> = {
    height:
      Platform.OS === 'android' ? calculateSize() : calculateSize() + 6,
    width:
      Platform.OS === 'android' ? calculateSize() : calculateSize() + 6,
    borderRadius:
      Platform.OS === 'android'
        ? calculateSize() / 2
        : (calculateSize() + 6) / 2,
    borderColor: badge.border,
    backgroundColor: badge.background,
    shadowColor: badge.shadow,
  }

  return (
    <View
      testID={testID}
      style={[
        badgeStyle?.container,
        containerStyle,
      ]}
    >
      <Text
        style={[
          badgeStyle?.text,
          {
            fontSize: Number(((calculateSize() / 3) * 2).toFixed(0)),
            color: badge.text,
          },
        ]}
      >
        {getValue()}
      </Text>
    </View >
  );
};

export default Badge;
