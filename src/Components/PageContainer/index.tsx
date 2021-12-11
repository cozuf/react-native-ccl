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
  ...props
}) => {
  const [theme] = useTheme();
  const { colors, styles } = theme;
  const { pageContainer } = colors;
  const { pageContainerStyle } = styles;

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
          style={[style]}
          contentContainerStyle={[
            pageContainerStyle?.contentContainer,
            { backgroundColor: pageContainer.background },
            contentContainerStyle,
          ]}
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
