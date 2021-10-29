import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  PageContainer,
  SelectBox,
  Seperator,
  TapSelector,
} from 'react-native-ccl';

const DATA = [
  {
    selected: false,
    title: 'Akdeniz',
    value: 1,
  },
  {
    selected: false,
    title: 'Karadeniz',
    value: 2,
  },
  {
    selected: false,
    title: 'İç Anadolu',
    value: 3,
  },
  {
    selected: false,
    title: 'Ege',
    value: 4,
  },
  {
    selected: false,
    title: 'Marmara',
    value: 5,
  },
  {
    selected: false,
    title: 'Doğu Anadolu',
    value: 6,
  },
  {
    selected: false,
    title: 'Güney Doğu Anadolu',
    value: 7,
  },
];
const DISPLAY_TYPE_DATA = [
  { title: 'Modal', value: 'Modal' },
  { title: 'Page', value: 'Page' },
];
const SELECT_TYPE_DATA = [
  { title: 'Multi Select', value: 'MultiSelect' },
  { title: 'Single Select', value: 'SingleSelect' },
];

const SelectBoxPage = () => {
  const navigation = useNavigation();
  const [areas, setAreas] = useState<any[]>(DATA);
  const [selectTypeIndex, setSelectTypeIndex] = useState<number>(0);
  const [displayTypeIndex, setDisplayTypeIndex] = useState<number>(0);

  return (
    <PageContainer type="Default">
      <SelectBox
        selectionType={
          SELECT_TYPE_DATA[selectTypeIndex].value as
          | 'SingleSelect'
          | 'MultiSelect'
        }
        displayType={
          DISPLAY_TYPE_DATA[displayTypeIndex].value as 'Modal' | 'Page'
        }
        data={areas}
        title="Bölge"
        searchable={true}
        navigation={navigation}
        onSubmit={data => {
          setAreas(data as any[]);
        }}
        minChoice={2}
        maxChoice={4}
      />
      <View style={{ paddingTop: 16 }}>
        <TapSelector
          data={SELECT_TYPE_DATA}
          onTap={(_, index) => {
            setSelectTypeIndex(index);
          }}
        />
        <Seperator.Vertical />
        <TapSelector
          data={DISPLAY_TYPE_DATA}
          onTap={(_, index) => {
            setDisplayTypeIndex(index);
          }}
        />
      </View>
    </PageContainer>
  );
};

export default SelectBoxPage;
