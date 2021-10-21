import React from 'react';
import { PageContainer, RadioButtonGroup } from 'react-native-ccl';

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

const RadioButtonGroupPage = () => {
  return (
    <PageContainer type="Default">
      <RadioButtonGroup
        data={DATA}
        onSelect={(item, index) => {
          console.log({ item, index });
        }}
      />
    </PageContainer>
  );
};

export default RadioButtonGroupPage;

// TODO: Araya border koy