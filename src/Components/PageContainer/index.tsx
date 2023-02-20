import React, { FC, ReactNode } from 'react';
import {
  ViewProps,
  ScrollViewProps,
  View,
  ViewStyle,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
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

  /**
   * 
   */
  loadingComponent?: () => JSX.Element | ReactNode
}

export interface IPageContainerTypes extends IPageContainerProps, Omit<ViewProps, 'style'>, Omit<ScrollViewProps, 'style' | 'contentContainerStyle'> { }

const PageContainer: FC<IPageContainerTypes> = ({
  testID,
  type = 'default',
  style,
  contentContainerStyle,
  children,
  loading,
  loadingComponent,
  ...props
}) => {
  const theme = useTheme();
  const { colors, tokens } = theme;
  const { spaces } = tokens

  if (loading) {
    return (
      <View
        testID={testID}
        style={[
          styles.container,
          {
            backgroundColor: colors.pageBackground,
            paddingVertical: spaces.pageVertical,
            paddingHorizontal: spaces.pageHorizontal,
            alignItems: "center",
            justifyContent: "center"
          },
          style,
        ]}
        {...props}
      >
        {loadingComponent ? loadingComponent() : <ActivityIndicator size="large" color={colors.primary} />}
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
              paddingVertical: spaces.pageVertical,
              paddingHorizontal: spaces.pageHorizontal,
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
                paddingVertical: spaces.pageVertical,
                paddingHorizontal: spaces.pageHorizontal,
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
              paddingVertical: spaces.pageVertical,
              paddingHorizontal: spaces.pageHorizontal,
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