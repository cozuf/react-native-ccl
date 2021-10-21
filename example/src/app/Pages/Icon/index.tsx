import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {
  PageContainer,
  Icon,
  IIconProps,
  TapSelector,
} from 'react-native-ccl';

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

const SIZE = 30;

const ICONS: IIconProps[] = [
  {
    family: 'AntDesign',
    name: 'facebook-square',
    size: SIZE,
    // color: COLOR,
  },
  {
    family: 'Entypo',
    name: 'facebook-with-circle',
    size: SIZE,
    // color: COLOR,
  },
  {
    family: 'EvilIcons',
    name: 'sc-facebook',
    size: SIZE,
    // color: COLOR,
  },
  {
    family: 'Feather',
    name: 'facebook',
    size: SIZE,
    // color: COLOR,
  },
  {
    family: 'FontAwesome',
    name: 'facebook',
    size: SIZE,
    // color: COLOR,
  },
  {
    family: 'FontAwesome5',
    name: 'facebook',
    size: SIZE,
    // color: COLOR,
  },
  {
    family: 'Fontisto',
    name: 'facebook',
    size: SIZE,
    // color: COLOR,
  },
  {
    family: 'Foundation',
    name: 'social-facebook',
    size: SIZE,
    // color: COLOR,
  },
  {
    family: 'Ionicons',
    name: 'logo-facebook',
    size: SIZE,
    // color: COLOR,
  },
  {
    family: 'MaterialCommunityIcons',
    name: 'facebook',
    size: SIZE,
    // color: COLOR,
  },
  {
    family: 'MaterialIcons',
    name: 'facebook',
    size: SIZE,
    // color: COLOR,
  },
  {
    family: 'SimpleLineIcons',
    name: 'social-facebook',
    size: SIZE,
    // color: COLOR,
  },
  {
    family: 'Zocial',
    name: 'facebook',
    size: SIZE,
    // color: COLOR,
  },
];

const IconPage = () => {
  const [active, setActive] = useState<boolean>(true);
  return (
    <PageContainer type="Default">
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={ICONS}
        renderItem={({item, index}) => {
          return (
            <Icon
              key={index.toString()}
              active={active}
              family={item.family}
              name={item.name}
              size={item.size}
              color={item.color}
            />
          );
        }}
      />

      <View style={{paddingVertical: 16}}>
        <TapSelector
          data={ACTIVE_DATA}
          onTap={(sItem, sIndex) => {
            setActive(!active);
          }}
        />
      </View>
    </PageContainer>
  );
};

export default IconPage;
