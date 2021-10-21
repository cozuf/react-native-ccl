import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, PageContainer, TapSelector} from 'react-native-ccl';

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
const CLICK_TYPES = [{title: 'Opacity'}, {title: 'Changeable'}];
const CHILD_TYPES = [{title: 'Text'}, {title: 'Icon'}, {title: 'Both'}];
const TYPES = [{title: 'Filled'}, {title: 'Outlined'}, {title: 'Simplied'}];
const WRAP_TYPES = [{title: 'wrap'}, {title: 'no-wrap'}, {title: 'free'}];

const ButtonPage = () => {
  const [active, setActive] = useState<boolean>(true);
  const [clickTypeIndex, setClickTypeIndex] = useState<number>(0);
  const [childTypeIndex, setChildTypeIndex] = useState<number>(0);
  const [typeIndex, setTypeIndex] = useState<number>(0);
  const [wrapIndex, setWrapIndex] = useState<number>(0);
  return (
    <PageContainer type="Default">
      <Button
        disabled={!active}
        childType={
          CHILD_TYPES[childTypeIndex].title as 'Text' | 'Icon' | 'Both'
        }
        clickType={
          CLICK_TYPES[clickTypeIndex].title as 'Opacity' | 'Changeable'
        }
        icon={{
          family: 'Ionicons',
          name: 'close',
          size: 20,
        }}
        type={TYPES[typeIndex].title as 'Filled' | 'Outlined' | 'Simplied'}
        wrap={WRAP_TYPES[wrapIndex].title as 'wrap' | 'no-wrap' | 'free'}
        onPress={() => {}}
      />
      <View style={{paddingVertical: 16}}>
        <TapSelector
          data={ACTIVE_DATA}
          onTap={() => {
            setActive(!active);
          }}
        />
        <View style={{paddingVertical: 8}} />
        <TapSelector
          data={CHILD_TYPES}
          onTap={(item, index) => {
            setChildTypeIndex(index);
          }}
        />
        <View style={{paddingVertical: 8}} />
        <TapSelector
          data={CLICK_TYPES}
          onTap={(item, index) => {
            setClickTypeIndex(index);
          }}
        />
        <View style={{paddingVertical: 8}} />
        <TapSelector
          data={TYPES}
          onTap={(item, index) => {
            setTypeIndex(index);
          }}
        />
        <View style={{paddingVertical: 8}} />
        <TapSelector
          data={WRAP_TYPES}
          onTap={(item, index) => {
            setWrapIndex(index);
          }}
        />
      </View>
    </PageContainer>
  );
};

export default ButtonPage;
