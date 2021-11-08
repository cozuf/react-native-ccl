import React, { FC } from 'react';
import {
  ViewProps,
  ScrollViewProps,
  View,
  ViewStyle,
  StyleSheet,
  Omit,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useThemeContext } from '../../Context/ThemeContext';
import { TOKENS } from '../../Theme';

interface IPageContainerProps {
  /**
   * 
   */
  testID?: string

  /**
   *
   */
  type: 'SafeArea' | 'Default' | 'Scroll';

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
  type = 'Default',
  style,
  contentContainerStyle,
  children,
  ...props
}) => {
  const [theme] = useThemeContext();
  const { pageContainer } = theme.colors;
  switch (type) {
    case 'SafeArea':
      return (
        <SafeAreaView
          testID={testID}
          style={[
            styles.view,
            { backgroundColor: pageContainer.background },
            style,
          ]}
          {...props}
        >
          {children}
        </SafeAreaView>
      );

    case 'Scroll':
      return (
        <ScrollView
          testID={testID}
          style={[style]}
          contentContainerStyle={[
            styles.scrollview,
            { backgroundColor: pageContainer.background },
            contentContainerStyle,
          ]}
          {...props}
        >
          {children}
        </ScrollView>
      );
    case 'Default':
    default:
      return (
        <View
          testID={testID}
          style={[
            styles.view,
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

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingVertical: TOKENS.paddings.pageVertical,
    paddingHorizontal: TOKENS.paddings.pageHorizontal,
  },
  scrollview: {
    flex: 1,
    paddingVertical: TOKENS.paddings.pageVertical,
    paddingHorizontal: TOKENS.paddings.pageHorizontal,
  },
});
