// import * as React from 'react';

// import { StyleSheet, View, } from 'react-native';
// import { multiply, Text, Button, Icon } from 'react-native-ccl';

// export default function App() {
//   const [result, setResult] = React.useState<number | undefined>();

//   React.useEffect(() => {
//     multiply(3, 7).then(setResult);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text weigth="Bold" style={{ fontSize: 20 }}>Result: {result}</Text>
//       <Text weigth="SemiBold" style={{ fontSize: 20 }}>Result: {result}</Text>
//       <Text weigth="Medium" style={{ fontSize: 20 }}>Result: {result}</Text>
//       <Text weigth="Regular" style={{ fontSize: 20 }}>Result: {result}</Text>
//       <Text weigth="Light" style={{ fontSize: 20 }}>Result: {result}</Text>
//       <Button childType={"Both"} clickType={"Changeable"} onPress={() => { }} icon={{ family: "Fontisto", name: "react", size: 20 }} />
//       <Icon size={40} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   box: {
//     width: 60,
//     height: 60,
//     marginVertical: 20,
//   },
// });

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './app/Navigation';
import { ThemeProvider, useThemeContext, GlobalStateProvider, UseGlobalState } from 'react-native-ccl';

const App = () => {
  return (
    <GlobalStateProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Child />
        </NavigationContainer>
      </ThemeProvider>
    </GlobalStateProvider>
  );
};

export default App;

const Child = () => {
  const [theme] = useThemeContext();
  const { common } = theme.colors;
  const [state, setState] = UseGlobalState();
  return (
    <SafeAreaView
      style={[styles.safeAreaContainer, { backgroundColor: common.statusbar }]}>
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
 // TODO: Listelemeli componentlerde searchable'yi unutma
 // TODO: SelectBox componentini tekrar gözden geçir navigationProps ile ilgili
 // TODO: Tüm comoponentlerde eksikleri tamamla (containerStyle vs.)
 // TODO: Tüm padding, borderWidth, borderRadius belirle color scheme gibi
 // TODO: CheckBoxGroup ve RadioButtonGroup alt borderları kaldır seperator olarak ver
 // TODO: Örnek Sayfalar da varyantları ekle
 // TODO: Düzenlemsi gereken componentleri unutma
 // TODO: Yapılacak componentler var (bottomsheet vs.)
 // Context Yapısını oluştur √
 // Tema Context √
 // TODO: Style Context
 // TODO: Language Context
 // TODO: SelectBox renderItem ekle
/**
 * theme.colors|styles|fonts
 * setTheme({colors,styles,fonts})
 */
