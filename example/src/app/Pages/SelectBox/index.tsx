import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  ISelectBoxProps,
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
  { title: 'Modal', value: 'modal' },
  { title: 'BottomSheet', value: 'bottomSheet' },
  { title: 'Page', value: 'page' },
];

const SELECT_TYPE_DATA = [
  { title: 'Multi Select', value: 'multiSelect' },
  { title: 'Single Select', value: 'singleSelect' },
];

const ERROD_DATA = [
  {
    title: 'Hata Yok',
    value: false,
  },
  {
    title: 'Hata Var',
    value: true,
  }
];

const WARNING_DATA = [
  {
    title: 'Uyarı Yok',
    value: false,
  },
  {
    title: 'Uyarı Var',
    value: true,
  }
];


const SelectBoxPage = () => {
  const navigation = useNavigation();
  const [areas, setAreas] = useState<any[]>(DATA);
  const [selectTypeIndex, setSelectTypeIndex] = useState<number>(0);
  const [displayTypeIndex, setDisplayTypeIndex] = useState<number>(0);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  return (
    <PageContainer type="default">
      <SelectBox
        selectionType={SELECT_TYPE_DATA[selectTypeIndex].value as ISelectBoxProps<any>["selectionType"]}
        displayType={DISPLAY_TYPE_DATA[displayTypeIndex].value as ISelectBoxProps<any>["displayType"]}
        data={areas}
        title="Bölge"
        searchable={true}
        navigation={navigation}
        onSubmit={(data: any) => {
          setAreas(data);
        }}
        minChoice={2}
        maxChoice={4}
        warning={warning}
        error={error}
      />
      <View style={{ paddingTop: 16 }}>
        <TapSelector
          data={SELECT_TYPE_DATA}
          onTap={(_: any, index: number) => {
            setSelectTypeIndex(index);
          }}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={DISPLAY_TYPE_DATA}
          onTap={(_: any, index: number) => {
            setDisplayTypeIndex(index);
          }}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={ERROD_DATA}
          onTap={() => setError((pValue: string) => pValue.length > 0 ? "" : "Hata Var")}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={WARNING_DATA}
          onTap={() => setWarning((pValue: string) => pValue.length > 0 ? "" : "Uyarı Var")}
        />
      </View>
    </PageContainer>
  );
};

export default SelectBoxPage;
