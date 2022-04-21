import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './app/Navigation';
import {
  useTheme,
  RNCCLProvider,
  light,
  fonts,
  tokens,
  dark
} from 'react-native-ccl';

const App = () => {
  const isDarkTheme = useColorScheme() === "dark"
  return (
    <RNCCLProvider
      globalState={{}}
      theme={{ name: isDarkTheme ? "Dark" : "Light", colors: isDarkTheme ? dark : light, fonts: fonts, tokens: tokens }}
    >
      <NavigationContainer>
        <Child />
      </NavigationContainer>
    </RNCCLProvider>
  );
};

export default App;

const Child = () => {
  const theme = useTheme();
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