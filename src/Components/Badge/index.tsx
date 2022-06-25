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
  size?: 'small' | 'medium' | 'large' | number

  /**
   *
   */
  value: number | string | undefined

  /**
   * 
   */
  containerStyle?: StyleProp<ViewStyle>
}

const Badge: FC<IBadgeProps> = ({ testID, size = 20, value, containerStyle }) => {
  const { colors } = useTheme()

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
    if (typeof value === 'number') {
      if (value > 9) {
        return '9+';
      }
      return value.toString()
    }
    return value
  };

  const defineContainerStyle: StyleProp<ViewStyle> =
    value ?
      {
        height: Platform.OS === 'android' && Platform.Version < 28 ? calculateSize() : calculateSize() + 6,
        width: Platform.OS === 'android' && Platform.Version < 28 ? calculateSize() : calculateSize() + 6,
        borderRadius: Platform.OS === 'android' && Platform.Version < 28 ? calculateSize() / 2 : (calculateSize() + 6) / 2,
        borderColor: colors.pageBackground,
        backgroundColor: colors.primary,
        shadowColor: colors.shadow,
      }
      :
      {
        height: 16,
        width: 16,
        borderRadius: 8,
        borderColor: colors.pageBackground,
        backgroundColor: colors.primary,
        shadowColor: colors.shadow,
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
            color: colors.pageBackground,
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