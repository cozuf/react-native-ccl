import React, {useState} from 'react';
import {View} from 'react-native';
import {PageContainer, TapSelector, Text} from 'react-native-ccl';

const DATA = [
  {title: 'Sade', value: 0},
  {title: 'Orta', value: 1},
  {title: 'Şekerli', value: 2},
];

const TapSelectorPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <PageContainer type="Default">
      <Text
        style={{
          textAlign: 'center',
        }}>{`value = ${DATA[selectedIndex].value}`}</Text>
      <View style={{paddingTop: 16}}>
        <TapSelector
          data={DATA}
          onTap={(_, index) => {
            setSelectedIndex(index);
          }}
        />
      </View>
    </PageContainer>
  );
};

export default TapSelectorPage;
