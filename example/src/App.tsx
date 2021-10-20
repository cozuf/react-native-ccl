import * as React from 'react';

import { StyleSheet, View, } from 'react-native';
import { multiply, Text } from 'react-native-ccl';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text weigth="Bold" style={{ fontSize: 20 }}>Result: {result}</Text>
      <Text weigth="SemiBold" style={{ fontSize: 20 }}>Result: {result}</Text>
      <Text weigth="Medium" style={{ fontSize: 20 }}>Result: {result}</Text>
      <Text weigth="Regular" style={{ fontSize: 20 }}>Result: {result}</Text>
      <Text weigth="Light" style={{ fontSize: 20 }}>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
