import React from 'react';
import { PageContainer, CheckBoxGroup } from 'react-native-ccl';
const DATA = [
  {
    selected: false,
    title: '1',
    value: 1,
  },
  {
    selected: false,
    title: '2',
    value: 2,
  },
  {
    selected: false,
    title: '3',
    value: 3,
  },
  {
    selected: false,
    title: '4',
    value: 4,
  },
  {
    selected: false,
    title: '5',
    value: 5,
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
        onSubmit={(data: any[]) => {
          console.log({ data });
        }}
      />
    </PageContainer>
  );
};

export default CheckBoxGroupPage;
