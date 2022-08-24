import React, { useState } from 'react';
import { View } from 'react-native';
import { Icon, IRadioButtonGroupTypes, PageContainer, RadioButtonGroup, Seperator, TapSelector, Text } from 'react-native-ccl';

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
];

const SEARCHABLE_DATA = [
  {
    title: 'Aranamaz',
    value: false,
  },
  {
    title: 'Aranabilir',
    value: true,
  }
];

const CUSTOM_RENDER_DATA = [
  {
    title: 'Default',
    value: false,
  },
  {
    title: 'Custom',
    value: true,
  }
];

const CUSTOM_SEARCHBAR_DATA = [
  {
    title: 'Default SearchBar',
    value: false,
  },
  {
    title: 'Custom SearchBar',
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

const RadioButtonGroupPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [searchableIndex, setSearchableIndex] = useState<number>(0);
  const [customRenderIndex, setCustomRenderIndex] = useState<number>(0);
  const [customSearchBarIndex, setCustomSearchBarIndex] = useState<number>(0);

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

  const customSearchBarProps: IRadioButtonGroupTypes["searchBarProps"] = {
    containerStyle: {
      borderWidth: 0,
      borderBottomWidth: 1,
    },
    icon: null
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
          data={SEARCHABLE_DATA}
          onTap={(_, i) => {
            setSearchableIndex(i)
          }}
        />
        <Seperator type='vertical' size={"medium"} />
        <TapSelector
          data={CUSTOM_RENDER_DATA}
          onTap={(_, i) => {
            setCustomRenderIndex(i)
          }}
        />
        <Seperator type='vertical' size={"medium"} />
        <TapSelector
          data={CUSTOM_SEARCHBAR_DATA}
          onTap={(_, i) => {
            setCustomSearchBarIndex(i)
          }}
        />
      </View>
      <Seperator type='vertical' size={20} />
      <RadioButtonGroup
        loading={loading}
        data={DATA}
        searchable={SEARCHABLE_DATA[searchableIndex].value}
        renderItem={customRenderIndex === 1 ? customRender : undefined}
        onSelect={(item: any, index: number) => {
          console.log({ item, index });
        }}
        onSubmit={(data: any[]) => {
          console.log({ data });
        }}
        ItemSeparatorComponent={customRenderIndex === 1 ? customItemSeperator : undefined}
        searchBarProps={customSearchBarIndex === 1 ? customSearchBarProps : undefined}
      />
    </PageContainer>
  );
};

export default RadioButtonGroupPage;
