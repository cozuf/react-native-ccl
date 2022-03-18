import React from 'react';
import { PageContainer, RadioButtonGroup } from 'react-native-ccl';

const DATA = [
  {
    active: true,
    selected: false,
    title: '1',
    value: 1,
  },
  {
    active: true,
    selected: false,
    title: '2',
    value: 2,
  },
  {
    active: true,
    selected: false,
    title: '3',
    value: 3,
  },
  {
    active: true,
    selected: false,
    title: '4',
    value: 4,
  },
  {
    active: true,
    selected: false,
    title: '5',
    value: 5,
  },
];

const RadioButtonGroupPage = () => {
  return (
    <PageContainer type="default">
      <RadioButtonGroup
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

export default RadioButtonGroupPage;
