import React, { useState } from 'react';
import { View } from 'react-native';
import { PageContainer, RadioButton, TapSelector } from 'react-native-ccl';

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

const RadioButtonPage = () => {
  const [active, setActive] = useState<boolean>(true);
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <PageContainer type="default">
      <RadioButton
        active={active}
        selected={selected}
        onSelect={() => {
          setSelected(v => !v);
        }}
      />
      <View style={{ paddingVertical: 16 }}>
        <TapSelector
          data={ACTIVE_DATA}
          onTap={() => {
            setActive(v => !v);
          }}
        />
      </View>
    </PageContainer>
  );
};

export default RadioButtonPage;
