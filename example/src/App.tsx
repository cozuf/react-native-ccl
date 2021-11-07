import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './app/Navigation';
import {
  ThemeProvider,
  useThemeContext,
  GlobalStateProvider,
  BottomSheetProvider
} from 'react-native-ccl';

const App = () => {
  return (
    <GlobalStateProvider>
      <ThemeProvider>
        <BottomSheetProvider>
          <NavigationContainer>
            <Child />
          </NavigationContainer>
        </BottomSheetProvider>
      </ThemeProvider>
    </GlobalStateProvider>
  );
};

export default App;

const Child = () => {
  const [theme] = useThemeContext();
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

// TODO: Tüm comoponentlere testID ekle
// TODO: Inner Style'ları kaldır
// TODO: Listelemeli componentlerde searchable'yi ekle
// TODO: SelectBox componentini tekrar gözden geçir navigationProps ile ilgili
// TODO: Tüm comoponentlerde eksikleri tamamla (containerStyle vs.)
// TODO: Tüm padding, borderWidth, borderRadius belirle color scheme gibi
// TODO: Örnek Sayfalar da varyantları ekle
// TODO: Düzenlemsi gereken componentleri unutma
// TODO: Style Context
// TODO: Language Context
// TODO: SelectBox renderItem ekle
/**
 * theme.colors|styles|fonts
 * setTheme({colors,styles,fonts})
 */
