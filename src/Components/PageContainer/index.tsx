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

interface IPageContainerProps {
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

type IPageContainerTypes = IPageContainerProps &
  (
    | Omit<ViewProps, 'style'>
    | Omit<ScrollViewProps, 'style' | 'contentContainerStyle'>
  );

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
  const { pageContainer } = colors;
  const { page } = tokens;

  if (loading) {
    return (
      <View
        testID={testID}
        style={[
          styles.container,
          {
            backgroundColor: pageContainer.background,
            paddingVertical: page.vertical,
            paddingHorizontal: page.horizontal,
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
              backgroundColor: pageContainer.background,
              paddingVertical: page.vertical,
              paddingHorizontal: page.horizontal,
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
                backgroundColor: pageContainer.background,
              },
              style
            ]
          }
          contentContainerStyle={
            [
              styles?.contentContainer,
              {
                backgroundColor: pageContainer.background,
                paddingVertical: page.vertical,
                paddingHorizontal: page.horizontal,
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
              backgroundColor: pageContainer.background,
              paddingVertical: page.vertical,
              paddingHorizontal: page.horizontal,
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