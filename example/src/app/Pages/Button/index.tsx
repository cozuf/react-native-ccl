import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, IButtonProps, PageContainer, TapSelector } from 'react-native-ccl';

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
const TYPES = [{ title: 'filled' }, { title: 'outlined' }, { title: 'simplied' }];
const CLICK_TYPES = [{ title: 'opacity' }, { title: 'changeable' }];
const CHILD_TYPES = [{ title: 'text' }, { title: 'icon' }, { title: 'both' }];
const WRAP_TYPES = [{ title: 'wrap' }, { title: 'no-wrap' }, { title: 'free' }];
const TITLE_WEIGHT_TYPES = [{ title: 'light' }, { title: 'regular' }, { title: 'medium' }, { title: 'semibold' }, { title: 'bold' }];
const TITLE_SIZE_TYPES = [{ title: 'xxs' }, { title: 'xs' }, { title: 's' }, { title: 'm' }, { title: 'l' }, { title: 'xl' }, { title: 'xxl' }];

const ButtonPage = () => {
  const [active, setActive] = useState<boolean>(true);
  const [clickTypeIndex, setClickTypeIndex] = useState<number>(0);
  const [childTypeIndex, setChildTypeIndex] = useState<number>(0);
  const [typeIndex, setTypeIndex] = useState<number>(0);
  const [wrapIndex, setWrapIndex] = useState<number>(0);
  const [titleWeightIndex, setTitleWeightIndex] = useState<number>(0);
  const [titleSizeIndex, setTitleSizeIndex] = useState<number>(0);

  return (
    <PageContainer type="default">
      <Button
        disabled={!active}
        childType={CHILD_TYPES[childTypeIndex].title as IButtonProps["childType"]}
        clickType={CLICK_TYPES[clickTypeIndex].title as IButtonProps["clickType"]}
        icon={{
          family: 'Ionicons',
          name: 'close',
          size: 20,
        }}
        type={TYPES[typeIndex].title as IButtonProps["type"]}
        wrap={WRAP_TYPES[wrapIndex].title as IButtonProps["wrap"]}
        titleSize={TITLE_SIZE_TYPES[titleSizeIndex].title as IButtonProps["titleSize"]}
        titleWeight={TITLE_WEIGHT_TYPES[titleWeightIndex].title as IButtonProps["titleWeight"]}
        onPress={() => { }}
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
          onTap={(_: any, index: number) => {
            setChildTypeIndex(index);
          }}
        />
        <View style={{ paddingVertical: 8 }} />
        <TapSelector
          data={CLICK_TYPES}
          onTap={(_: any, index: number) => {
            setClickTypeIndex(index);
          }}
        />
        <View style={{ paddingVertical: 8 }} />
        <TapSelector
          data={TYPES}
          onTap={(_: any, index: number) => {
            setTypeIndex(index);
          }}
        />
        <View style={{ paddingVertical: 8 }} />
        <TapSelector
          data={WRAP_TYPES}
          onTap={(_: any, index: number) => {
            setWrapIndex(index);
          }}
        />
        <View style={{ paddingVertical: 8 }} />
        <TapSelector
          data={TITLE_WEIGHT_TYPES}
          onTap={(_: any, index: number) => {
            setTitleWeightIndex(index);
          }}
        />
        <View style={{ paddingVertical: 8 }} />
        <TapSelector
          data={TITLE_SIZE_TYPES}
          onTap={(_: any, index: number) => {
            setTitleSizeIndex(index);
          }}
        />
      </View>
    </PageContainer>
  );
};

export default ButtonPage;
