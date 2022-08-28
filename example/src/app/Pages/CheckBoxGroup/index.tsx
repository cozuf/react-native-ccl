import React, { useState } from 'react';
import { View } from 'react-native';
import { PageContainer, CheckBoxGroup, Seperator, TapSelector, Text, Icon, ICheckBoxGroupTypes, Button } from 'react-native-ccl';

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
    title: 'Default Item',
    value: false,
  },
  {
    title: 'Custom Item',
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

const SHORTCUT_DATA = [
  {
    title: 'Kısayol gösterme',
    value: false,
  },
  {
    title: 'Kısayol göster',
    value: true,
  }
];

const SUBMIT_DATA = [
  {
    title: 'Submit buton gösterme',
    value: false,
  },
  {
    title: 'Submit buton göster',
    value: true,
  }
];

const CheckBoxGroupPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [searchableIndex, setSearchableIndex] = useState<number>(0);
  const [shortcutIndex, setShortcutIndex] = useState<number>(0);
  const [submitIndex, setSubmitIndex] = useState<number>(0);
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

  const customOnSubmit = (data: any[], selectedItems: any[]) => {
    console.log({ data, selectedItems });
  }

  const customSearchBarProps: ICheckBoxGroupTypes["searchBarProps"] = {
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
          data={SHORTCUT_DATA}
          onTap={(_, i) => {
            setShortcutIndex(i)
          }}
        />
        <Seperator type='vertical' size={"medium"} />
        <TapSelector
          data={SUBMIT_DATA}
          onTap={(_, i) => {
            setSubmitIndex(i)
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
      <CheckBoxGroup
        loading={loading}
        data={DATA}
        // description={"Açıklama"}
        searchable={SEARCHABLE_DATA[searchableIndex].value}
        renderItem={customRenderIndex === 1 ? customRender : undefined}
        showShortcuts={SHORTCUT_DATA[shortcutIndex].value}
        onSelect={(item: any, index: number) => {
          console.log({ item, index });
        }}
        onSubmit={SUBMIT_DATA[submitIndex].value ? customOnSubmit : undefined}
        ItemSeparatorComponent={customRenderIndex === 1 ? customItemSeperator : undefined}
        searchBarProps={customSearchBarIndex === 1 ? customSearchBarProps : undefined}
      />
      {
        !SUBMIT_DATA[submitIndex].value ?
          <Button onPress={() => { }} />
          :
          null
      }
    </PageContainer>
  );
};

export default CheckBoxGroupPage;
