import React, { useState } from 'react';
import { View } from 'react-native';
import { PageContainer, Switch, TapSelector } from 'react-native-ccl';

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

const SwitchPage = () => {
  const [active, setActive] = useState<boolean>(true);
  const [value, setValue] = useState<boolean>(false);
  return (
    <PageContainer type="default">
      <Switch
        active={active}
        title={'Tema'}
        value={value}
        onValueChange={setValue}
      />
      <View style={{ paddingVertical: 16 }}>
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

export default SwitchPage;
