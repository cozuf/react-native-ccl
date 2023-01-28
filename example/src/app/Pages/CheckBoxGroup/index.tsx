import React, { useState } from 'react';
import { View } from 'react-native';
import { PageContainer, CheckBoxGroup, Seperator, TapSelector, Text, Icon, Button } from 'react-native-ccl';

const DATA = [
  {
    selected: false,
    active: true,
    title: 'Akdeniz',
    value: 1,
  },
  {
    selected: false,
    active: true,
    title: 'Karadeniz',
    value: 2,
  },
  {
    selected: false,
    active: true,
    title: 'İç Anadolu',
    value: 3,
  },
  {
    selected: false,
    active: true,
    title: 'Ege',
    value: 4,
  },
  {
    selected: false,
    active: true,
    title: 'Marmara',
    value: 5,
  },
  {
    selected: false,
    active: true,
    title: 'Doğu Anadolu',
    value: 6,
  },
  {
    selected: false,
    active: true,
    title: 'Güney Doğu Anadolu',
    value: 7,
  },
  // {
  //   selected: false,
  //   active: true,
  //   title: 'Akdeniz',
  //   value: 1,
  // },
  // {
  //   selected: false,
  //   active: true,
  //   title: 'Karadeniz',
  //   value: 2,
  // },
  // {
  //   selected: false,
  //   active: true,
  //   title: 'İç Anadolu',
  //   value: 3,
  // },
  // {
  //   selected: false,
  //   active: true,
  //   title: 'Ege',
  //   value: 4,
  // },
  // {
  //   selected: false,
  //   active: true,
  //   title: 'Marmara',
  //   value: 5,
  // },
  // {
  //   selected: false,
  //   active: true,
  //   title: 'Doğu Anadolu',
  //   value: 6,
  // },
  // {
  //   selected: false,
  //   active: true,
  //   title: 'Güney Doğu Anadolu',
  //   value: 7,
  // },
];

const CUSTOM_RENDER_DATA = [
  {
    title: 'Default Item',
    value: false,
  },
  {
    title: 'Custom Item',
    value: true,
  }
];

const LOADING_DATA = [
  {
    title: 'yüklendi',
    value: false,
  },
  {
    title: 'yükleniyor',
    value: true,
  }
];

const CheckBoxGroupPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [customRenderIndex, setCustomRenderIndex] = useState<number>(0);

  const customRender = (item: any) => {
    return (
      <View style={{ flexDirection: "row", height: 24 }}>
        <View style={{ flex: 1 }}>
          <Text>
            {item.title}
          </Text>
        </View>
        <View>
          {
            item.selected
              ?
              <Icon family='AntDesign' name="checkcircle" color={"#FF0000"} size={20} />
              :
              null
          }
        </View>
      </View>
    )
  }

  const customItemSeperator = () => {
    return (
      <Seperator type='vertical' size={"medium"} />
    )
  }

  return (
    <PageContainer type="default">
      <View>
        <TapSelector
          data={LOADING_DATA}
          onTap={() => {
            setLoading((v) => !v)
          }}
        />
        <Seperator type='vertical' size={"medium"} />
        <TapSelector
          data={CUSTOM_RENDER_DATA}
          onTap={(_, i) => {
            setCustomRenderIndex(i)
          }}
        />
      </View>
      <Seperator type='vertical' size={20} />
      <CheckBoxGroup
        loading={loading}
        data={DATA}
        renderItem={customRenderIndex === 1 ? customRender : undefined}
        onSelect={(item: any, index: number) => {
          console.log({ item, index });
        }}
        ItemSeparatorComponent={customRenderIndex === 1 ? customItemSeperator : undefined}
      />
      <Button onPress={() => { }} />
    </PageContainer>
  );
};

export default CheckBoxGroupPage;
