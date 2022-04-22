import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ITextTypes, PageContainer, Seperator, TapSelector, Text } from 'react-native-ccl';

const SIZES = [
  {
    title: 'XXS',
    size: 'xxs',
  },
  {
    title: 'XS',
    size: 'xs',
  },
  {
    title: 'S',
    size: 's',
  },
  {
    title: 'M',
    size: 'm',
  },
  {
    title: 'L',
    size: 'l',
  },
  {
    title: 'XL',
    size: 'xl',
  },
  {
    title: 'XXL',
    size: 'xxl',
  },
];

const WEIGHTS = [
  {
    title: 'Light',
    weight: 'light',
  },
  {
    title: 'Regular',
    weight: 'regular',
  },
  {
    title: 'Medium',
    weight: 'medium',
  },
  {
    title: 'SemiBold',
    weight: 'semibold',
  },
  {
    title: 'Bold',
    weight: 'bold',
  },
];

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

const TextPage = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [sizeIndex, setSizeIndex] = useState<number>(0);
  const [weightIndex, setWeightIndex] = useState<number>(0);

  const onPress = () => {
    console.warn('onPress');
  };

  const onLongPress = () => {
    console.warn('onLongPress');
  };

  return (
    <PageContainer type="scroll" bounces={false}>
      <View>
        <Text
          onPress={onPress}
          onLongPress={onLongPress}
          size={SIZES[sizeIndex].size as ITextTypes["size"]}
          active={ACTIVE_DATA[activeIndex].value}
          style={[styles.common]}
          weigth={WEIGHTS[weightIndex].weight as ITextTypes["weigth"]}
        >
          {WEIGHTS[weightIndex].title}
        </Text>
      </View>
      <View style={{ paddingVertical: 16 }}>
        <TapSelector
          data={ACTIVE_DATA}
          onTap={(_: any, index: number) => {
            setActiveIndex(index);
          }}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={SIZES}
          onTap={(_: any, index: number) => {
            setSizeIndex(index);
          }}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={WEIGHTS}
          onTap={(_: any, index: number) => {
            setWeightIndex(index);
          }}
        />
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  common: {
    textAlign: 'center',
    fontWeight: "100"
  },
});

export default TextPage;
