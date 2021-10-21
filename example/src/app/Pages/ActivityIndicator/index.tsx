import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  IActivityIndicatorProps,
  PageContainer,
} from 'react-native-ccl';
const INDICATORS: IActivityIndicatorProps[] = [
  {
    type: 'BallIndicator',
  },
  {
    type: 'BarIndicator',
  },
  {
    type: 'DotIndicator',
  },
  {
    type: 'MaterialIndicator',
  },
  {
    type: 'PacmanIndicator',
  },
  {
    type: 'PulseIndicator',
  },
  {
    type: 'SkypeIndicator',
  },
  {
    type: 'UIActivityIndicator',
  },
  {
    type: 'WaveIndicator',
  },
  {
    type: 'Default',
  },
];
const ActivityIndicatorPage = () => {
  return (
    <PageContainer type={'Default'}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={INDICATORS}
        renderItem={({item, index}) => {
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
