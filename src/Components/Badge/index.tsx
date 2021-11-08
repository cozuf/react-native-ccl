import React, { FC } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Text } from '..';
import { FONTS } from '../../Assets';
import { useThemeContext } from '../../Context/ThemeContext';
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
  const [theme] = useThemeContext();
  const { badge } = theme.colors;

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

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
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
          ...Platform.select({
            ios: {
              shadowColor: badge.shadow,
            },
          }),
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: Number(((calculateSize() / 3) * 2).toFixed(0)),
            color: badge.text,
          },
        ]}
      >
        {getValue()}
      </Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        justifyContent: 'center',
      },
    }),
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    textAlign: 'center',
    fontFamily: FONTS.bold,
  },
});

// TODO: Tekrar bak
