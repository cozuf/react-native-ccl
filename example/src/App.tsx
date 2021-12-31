import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './app/Navigation';
import {
  ThemeProvider,
  useTheme,
  BottomSheetProvider,
  // ClassGlobalStateProvider,
  GlobalStateProvider,
  ModalProvider
} from 'react-native-ccl';

const App = () => {
  return (
    // <ClassGlobalStateProvider>
    <GlobalStateProvider>
      <ThemeProvider>
        <BottomSheetProvider>
          <ModalProvider>
            <NavigationContainer>
              <Child />
            </NavigationContainer>
          </ModalProvider>
        </BottomSheetProvider>
      </ThemeProvider>
    </GlobalStateProvider>
    // </ClassGlobalStateProvider>
  );
};

export default App;

const Child = () => {
  const [theme] = useTheme();
  const { common } = theme.colors;

  return (
    <SafeAreaView
      style={[styles.safeAreaContainer, { backgroundColor: common.statusbar }]}
    >
      <StatusBar
        backgroundColor={common.statusbar}
        barStyle={theme.name === 'Dark' ? 'light-content' : 'dark-content'}
      />
      <Router />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
});