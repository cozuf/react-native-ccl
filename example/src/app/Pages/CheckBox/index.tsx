import React, { useState } from 'react';
import { View } from 'react-native';
import { PageContainer, CheckBox, TapSelector } from 'react-native-ccl';

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

const CheckBoxPage = () => {
  const [active, setActive] = useState<boolean>(true);
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <PageContainer type="default">
      <CheckBox
        active={active}
        selected={selected}
        value={`${selected}`}
        onSelect={(_: any, v: boolean) => {
          setSelected(v);
        }}
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

export default CheckBoxPage;
