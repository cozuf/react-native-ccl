import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  IActivityIndicatorProps,
  PageContainer,
} from 'react-native-ccl';
const INDICATORS: IActivityIndicatorProps[] = [
  {
    type: 'ballIndicator',
  },
  {
    type: 'barIndicator',
  },
  {
    type: 'dotIndicator',
  },
  {
    type: 'materialIndicator',
  },
  {
    type: 'pacmanIndicator',
  },
  {
    type: 'pulseIndicator',
  },
  {
    type: 'skypeIndicator',
  },
  {
    type: 'uIActivityIndicator',
  },
  {
    type: 'waveIndicator',
  },
  {
    type: 'default',
  },
];
const ActivityIndicatorPage = () => {
  return (
    <PageContainer type={'default'}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={INDICATORS}
        renderItem={({ item, index }) => {
          return (
            <View key={index.toString()} style={styles.container}>
              <ActivityIndicator type={item.type} />
            </View>
          );
        }}
      />
    </PageContainer>
  );
};

export default ActivityIndicatorPage;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    alignItems: 'center',
  },
});
