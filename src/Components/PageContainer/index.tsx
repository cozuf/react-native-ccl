import React, { FC } from 'react';
import {
  ViewProps,
  ScrollViewProps,
  View,
  ViewStyle,
  Omit,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { ActivityIndicator } from '..';
import { useTheme } from '../../Context/Theme';

export interface IPageContainerProps {
  /**
   * 
   */
  testID?: string

  /**
   *
   */
  type?: 'safeArea' | 'default' | 'scroll';

  /**
   *
   */
  style?: ViewStyle;

  /**
   *
   */
  contentContainerStyle?: ViewStyle;

  /**
   * 
   */
  loading?: boolean
}

export interface IPageContainerTypes extends IPageContainerProps, Omit<ViewProps, 'style'>, Omit<ScrollViewProps, 'style' | 'contentContainerStyle'> { }

const PageContainer: FC<IPageContainerTypes> = ({
  testID,
  type = 'default',
  style,
  contentContainerStyle,
  children,
  loading,
  ...props
}) => {
  const theme = useTheme();
  const { colors, tokens } = theme;
  const { innerSpace } = tokens

  if (loading) {
    return (
      <View
        testID={testID}
        style={[
          styles.container,
          {
            backgroundColor: colors.pageBackground,
            paddingVertical: innerSpace.pageVertical,
            paddingHorizontal: innerSpace.pageHorizontal,
            alignItems: "center",
            justifyContent: "center"
          },
          style,
        ]}
        {...props}
      >
        <ActivityIndicator />
      </View>
    )
  }

  switch (type) {
    case 'safeArea':
      return (
        <SafeAreaView
          testID={testID}
          style={[
            styles.container,
            {
              backgroundColor: colors.pageBackground,
              paddingVertical: innerSpace.pageVertical,
              paddingHorizontal: innerSpace.pageHorizontal,
            },
            style,
          ]}
          {...props}
        >
          {children}
        </SafeAreaView>
      );

    case 'scroll':
      return (
        <ScrollView
          testID={testID}
          style={
            [
              {
                backgroundColor: colors.pageBackground,
              },
              style
            ]
          }
          contentContainerStyle={
            [
              styles?.contentContainer,
              {
                backgroundColor: colors.pageBackground,
                paddingVertical: innerSpace.pageVertical,
                paddingHorizontal: innerSpace.pageHorizontal,
              }
              ,
              contentContainerStyle,
            ]
          }
          {...props}
        >
          {children}
        </ScrollView>
      );

    case 'default':
    default:
      return (
        <View
          testID={testID}
          style={[
            styles.container,
            {
              backgroundColor: colors.pageBackground,
              paddingVertical: innerSpace.pageVertical,
              paddingHorizontal: innerSpace.pageHorizontal,
            },
            style,
          ]}
          {...props}
        >
          {children}
        </View>
      );
  }
};

export default PageContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
})