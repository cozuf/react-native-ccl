import React, { FC } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
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

  /**
   * 
   */
  containerStyle?: StyleProp<ViewStyle>
}

const Badge: FC<IBadgeProps> = ({ testID, size = 20, value = 1, containerStyle }) => {
  const theme = useTheme();
  const { colors } = theme
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

  const defineContainerStyle: StyleProp<ViewStyle> = {
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
        styles.container,
        containerStyle,
        defineContainerStyle
      ]}
    >
      <Text
        weigth='semibold'
        size={Number(((calculateSize() / 3) * 2).toFixed(0))}
        style={[
          styles.text,
          {
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

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 99,
    top: 0,
    right: 0,
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
    textAlignVertical: "center"
  }
})

// TODO: value'siz durum