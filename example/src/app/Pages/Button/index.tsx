import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, PageContainer, TapSelector } from 'react-native-ccl';

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
const CLICK_TYPES = [{ title: 'opacity' }, { title: 'changeable' }];
const CHILD_TYPES = [{ title: 'text' }, { title: 'icon' }, { title: 'both' }];
const TYPES = [
  { title: 'filled' },
  { title: 'outlined' },
  { title: 'simplied' },
];
const WRAP_TYPES = [{ title: 'wrap' }, { title: 'no-wrap' }, { title: 'free' }];

const ButtonPage = () => {
  const [active, setActive] = useState<boolean>(true);
  const [clickTypeIndex, setClickTypeIndex] = useState<number>(0);
  const [childTypeIndex, setChildTypeIndex] = useState<number>(0);
  const [typeIndex, setTypeIndex] = useState<number>(0);
  const [wrapIndex, setWrapIndex] = useState<number>(0);
  return (
    <PageContainer type="default">
      <Button
        disabled={!active}
        childType={
          CHILD_TYPES[childTypeIndex].title as 'text' | 'icon' | 'both'
        }
        clickType={
          CLICK_TYPES[clickTypeIndex].title as 'opacity' | 'changeable'
        }
        icon={{
          family: 'Ionicons',
          name: 'close',
          size: 20,
        }}
        type={TYPES[typeIndex].title as 'filled' | 'outlined' | 'simplied'}
        wrap={WRAP_TYPES[wrapIndex].title as 'wrap' | 'no-wrap' | 'free'}
        onPress={() => {}}
      />
      <View style={{ paddingVertical: 16 }}>
        <TapSelector
          data={ACTIVE_DATA}
          onTap={() => {
            setActive(!active);
          }}
        />
        <View style={{ paddingVertical: 8 }} />
        <TapSelector
          data={CHILD_TYPES}
          onTap={(_, index) => {
            setChildTypeIndex(index);
          }}
        />
        <View style={{ paddingVertical: 8 }} />
        <TapSelector
          data={CLICK_TYPES}
          onTap={(_, index) => {
            setClickTypeIndex(index);
          }}
        />
        <View style={{ paddingVertical: 8 }} />
        <TapSelector
          data={TYPES}
          onTap={(_, index) => {
            setTypeIndex(index);
          }}
        />
        <View style={{ paddingVertical: 8 }} />
        <TapSelector
          data={WRAP_TYPES}
          onTap={(_, index) => {
            setWrapIndex(index);
          }}
        />
      </View>
    </PageContainer>
  );
};

export default ButtonPage;
