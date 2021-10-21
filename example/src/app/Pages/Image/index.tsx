import React, {useState} from 'react';
import {Dimensions, Image, View} from 'react-native';
import {PageContainer, Text} from 'react-native-ccl';

const ImagePage = () => {
  const [_loaded, _setLoaded] = useState<number>(0);
  const [_total, _setTotal] = useState<number>(0);
  return (
    <PageContainer type="Default">
      <View>
        <Text>{`${_loaded} / ${_total}`}</Text>
        <Text>{`${((_loaded / _total) * 100).toFixed(0)}%`}</Text>
      </View>
      <Image
        style={{
          marginTop: 16,
          height: Dimensions.get('window').width - 32,
          width: Dimensions.get('window').width - 32,
        }}
        source={{
          uri: 'https://images.wallpapersden.com/image/download/4k-goku-ultra-2020_bGloaG2UmZqaraWkpJRobWllrWdma2U.jpg',
        }}
        onLoadStart={() => {
          console.warn('start');
        }}
        onProgress={({nativeEvent}) => {
          _setLoaded(nativeEvent.loaded);
          _setTotal(nativeEvent.total);
        }}
        onLoadEnd={() => {
          console.warn('finished');
        }}
      />
      <View
        style={{
          marginTop: 16,
          backgroundColor: 'red',
          height: 6,
          borderRadius: 3,
          width: `${((_loaded / _total) * 100).toFixed(0)}%`,
        }}
      />
    </PageContainer>
  );
};

export default ImagePage;
