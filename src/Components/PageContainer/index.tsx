import React, { FC } from 'react';
import {
  ViewProps,
  ScrollViewProps,
  View,
  ViewStyle,
  Omit,
  ScrollView,
  SafeAreaView,
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
  const [theme] = useTheme();
  const { colors, styles } = theme;
  const { pageContainer } = colors;
  const { pageContainerStyle } = styles;

  if (loading) {
    return (
      <View
        testID={testID}
        style={[
          pageContainerStyle?.container,
          { backgroundColor: pageContainer.background },
          { alignItems: "center", justifyContent: "center" },
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
            pageContainerStyle?.container,
            { backgroundColor: pageContainer.background },
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
              style,
              { backgroundColor: pageContainer.background }
            ]
          }
          contentContainerStyle={
            [
              pageContainerStyle?.contentContainer,
              { backgroundColor: pageContainer.background }
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
            pageContainerStyle?.container,
            { backgroundColor: pageContainer.background },
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
