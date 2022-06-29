import React, { useState } from 'react';
import { PageContainer, RadioButtonGroup } from 'react-native-ccl';

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

const RadioButtonGroupPage = () => {
  const [dataList, setDataList] = useState(DATA)
  return (
    <PageContainer type="default">
      <RadioButtonGroup
        data={dataList}
        onSelect={(item: any, index: number) => {
          console.log({ item, index });
        }}
        onSubmit={(data: any[]) => {
          setDataList(data)
        }}
      />
    </PageContainer>
  );
};

export default RadioButtonGroupPage;
