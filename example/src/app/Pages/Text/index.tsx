import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  PageContainer,
  Seperator,
  TapSelector,
  Text,
} from 'react-native-ccl';

const SIZES = [
  {
    title: 'XXS',
    size: 'XXS',
  },
  {
    title: 'XS',
    size: 'XS',
  },
  {
    title: 'S',
    size: 'S',
  },
  {
    title: 'M',
    size: 'M',
  },
  {
    title: 'L',
    size: 'L',
  },
  {
    title: 'XL',
    size: 'XL',
  },
  {
    title: 'XXL',
    size: 'XXL',
  },
];

const WEIGHTS = [
  {
    title: 'Light',
    weight: 'Light',
  },
  {
    title: 'Regular',
    weight: 'Regular',
  },
  {
    title: 'Medium',
    weight: 'Medium',
  },
  {
    title: 'SemiBold',
    weight: 'SemiBold',
  },
  {
    title: 'Bold',
    weight: 'Bold',
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
    <PageContainer type="Scroll" bounces={false}>
      <View>
        <Text
          onPress={onPress}
          onLongPress={onLongPress}
          size={
            SIZES[sizeIndex].size as
              | 'XXS'
              | 'XS'
              | 'S'
              | 'M'
              | 'L'
              | 'XL'
              | 'XXL'
          }
          active={ACTIVE_DATA[activeIndex].value}
          style={[styles.common]}
          weigth={
            WEIGHTS[weightIndex].weight as
              | 'Light'
              | 'Regular'
              | 'Medium'
              | 'SemiBold'
              | 'Bold'
          }>
          {WEIGHTS[weightIndex].title}
        </Text>
        {/* <Text
          onPress={onPress}
          onLongPress={onLongPress}
          active={ACTIVE_DATA[activeIndex].value}
          style={[styles.common]}
          weigth="Regular">
          {'Regular'}
        </Text>
        <Text
          onPress={onPress}
          onLongPress={onLongPress}
          active={ACTIVE_DATA[activeIndex].value}
          style={[styles.common]}
          weigth="Medium">
          {'Medium'}
        </Text>
        <Text
          onPress={onPress}
          onLongPress={onLongPress}
          active={ACTIVE_DATA[activeIndex].value}
          style={[styles.common]}
          weigth="SemiBold">
          {'SemiBold'}
        </Text>
        <Text
          onPress={onPress}
          onLongPress={onLongPress}
          active={ACTIVE_DATA[activeIndex].value}
          style={[styles.common]}
          weigth="Bold">
          {'Bold'}
        </Text> */}
      </View>
      <View style={{paddingVertical: 16}}>
        <TapSelector
          data={ACTIVE_DATA}
          onTap={(_, index) => {
            setActiveIndex(index);
          }}
        />
        <Seperator.Vertical />
        <TapSelector
          data={SIZES}
          onTap={(_, index) => {
            setSizeIndex(index);
          }}
        />
        <Seperator.Vertical />
        <TapSelector
          data={WEIGHTS}
          onTap={(_, index) => {
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
  },
});

export default TextPage;
