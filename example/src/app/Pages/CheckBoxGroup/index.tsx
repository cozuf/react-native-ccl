import React from 'react';
import { PageContainer, CheckBoxGroup } from 'react-native-ccl';

const DATA = [
  {
    selected: false,
    active: true,
    title: 'Akdeniz',
    value: 1,
  },
  {
    selected: false,
    active: true,
    title: 'Karadeniz',
    value: 2,
  },
  {
    selected: false,
    active: true,
    title: 'İç Anadolu',
    value: 3,
  },
  {
    selected: false,
    active: true,
    title: 'Ege',
    value: 4,
  },
  {
    selected: false,
    active: true,
    title: 'Marmara',
    value: 5,
  },
  {
    selected: false,
    active: true,
    title: 'Doğu Anadolu',
    value: 6,
  },
  {
    selected: false,
    active: true,
    title: 'Güney Doğu Anadolu',
    value: 7,
  },
];

const CheckBoxGroupPage = () => {
  return (
    <PageContainer type="default">
      <CheckBoxGroup
        data={DATA}
        onSelect={(item: any, index: number) => {
          console.log({ item, index });
        }}
        onSubmit={(data: any[], selectedItems: any[]) => {
          console.log({ data, selectedItems });
        }}
      />
    </PageContainer>
  );
};

export default CheckBoxGroupPage;
