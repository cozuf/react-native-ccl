import React from 'react';
import { PageContainer, ChipGroup } from 'react-native-ccl';
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
  {
    selected: false,
    title: '6',
    value: 6,
  },
  {
    selected: false,
    title: '7',
    value: 7,
  },
  {
    selected: false,
    title: '8',
    value: 8,
  },
  {
    selected: false,
    title: '9',
    value: 9,
  },
  {
    selected: false,
    title: '10',
    value: 10,
  },
  {
    selected: false,
    title: '11',
    value: 11,
  },
  {
    selected: false,
    title: '12',
    value: 12,
  },
  {
    selected: false,
    title: '13',
    value: 13,
  },
  {
    selected: false,
    title: '14',
    value: 14,
  },
  {
    selected: false,
    title: '15',
    value: 15,
  },
  {
    selected: false,
    title: '16',
    value: 16,
  },
  {
    selected: false,
    title: '17',
    value: 17,
  },
  {
    selected: false,
    title: '18',
    value: 18,
  },
  {
    selected: false,
    title: '19',
    value: 19,
  },
  {
    selected: false,
    title: '20',
    value: 20,
  },
];
const ChipGroupPage = () => {
  return (
    <PageContainer type="default">
      <ChipGroup
        data={DATA}
        onSelect={(item, index) => {
          console.log({ item, index });
        }}
      />
    </PageContainer>
  );
};

export default ChipGroupPage;
