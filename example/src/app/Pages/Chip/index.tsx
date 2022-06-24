import React, { useState } from 'react';
import { View } from 'react-native';
import { Chip, PageContainer, TapSelector } from 'react-native-ccl';

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

const ChipPage = () => {
  const [active, setActive] = useState<boolean>(true)
  const [selected, setSelected] = useState<boolean>(false)

  return (
    <PageContainer type="default">
      <Chip
        active={active}
        selected={selected}
        title={`Chip ${selected}`}
        titleSize="xxl"
        titleWeight='medium'
        onSelect={setSelected}
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
  )
}

export default ChipPage;
