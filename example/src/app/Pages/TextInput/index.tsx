import React, {useState} from 'react';
import {View} from 'react-native';
import {PageContainer, TapSelector, TextInput} from 'react-native-ccl';

const ACTIVE_DATA = [
  {
    title: 'Active',
    value: true,
  },
  {
    title: 'Passive',
    value: false,
  },
];

const TextInputPage = () => {
  const [value, setValue] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  return (
    <PageContainer type="Default">
      <TextInput
        active={active}
        value={value}
        onChangeText={setValue}
        cleanable={true}
      />

      <View style={{paddingVertical: 16}}>
        <TapSelector
          data={ACTIVE_DATA}
          onTap={() => {
            setActive(!active);
          }}
        />
      </View>
    </PageContainer>
  );
};

export default TextInputPage;
