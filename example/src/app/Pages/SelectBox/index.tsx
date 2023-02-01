import React, { useState } from 'react';
import { View } from 'react-native';
import {
  ISelectBoxProps,
  PageContainer,
  SelectBox,
  Seperator,
  TapSelector
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

const DATA_TYPE = [
  {
    title: 'Default',
    value: 1,
  },
  {
    title: 'Fetch',
    value: 2,
  },
]

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

const TITLE_DATA = [
  {
    title: 'Başlık Gösterme',
    value: undefined,
  },
  {
    title: 'Başlık Göster',
    value: "Bölge",
  }
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


const SelectBoxPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);
  const [areas, setAreas] = useState<any[]>(DATA);
  const [selectTypeIndex, setSelectTypeIndex] = useState<number>(0);
  const [displayTypeIndex, setDisplayTypeIndex] = useState<number>(0);
  const [error, setError] = useState("");
  const [titleIndex, setTitleIndex] = useState<number>(0);
  const [searchableIndex, setSearchableIndex] = useState<number>(0);

  const fetchData = () => {
    setLoading(true)
    fetch("http://app.mobilitre.com/main/country_list")
      .then(response => response.json())
      .then(data => {
        const newData = data.data.map((v: any) => ({
          title: v.country,
          value: v.countryID,
          selected: false,
          active: true
        }))
        setAreas(newData)
      })
      .catch((error) => {
        console.error("error fetching data", { error })
      })
      .finally(() => {
        setLoading(false)
      });
  }

  const defaultData = () => {
    setAreas(DATA)
  }

  return (
    <PageContainer type="default">
      <View style={{ height: 64 }}>
        <SelectBox
          active={active}
          selectionType={SELECT_TYPE_DATA[selectTypeIndex].value as ISelectBoxProps<any>["selectionType"]}
          displayType={DISPLAY_TYPE_DATA[displayTypeIndex].value as ISelectBoxProps<any>["displayType"]}
          data={areas}
          title={TITLE_DATA[titleIndex].value}
          searchable={SEARCHABLE_DATA[searchableIndex].value as ISelectBoxProps<any>["searchable"]}
          onSubmit={(selectedItems: any, data: any) => {
            console.warn({ selectedItems })
            setAreas(data);
          }}
          icon={{
            family: "Entypo",
            name: "location",
            size: 20
          }}
          minChoice={2}
          maxChoice={4}
          error={error}
        />
      </View>
      <Seperator type="vertical" size={16} />
      <View>
        <TapSelector
          data={ACTIVE_DATA}
          onTap={() => {
            setActive(!active);
          }}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={DATA_TYPE}
          loading={loading}
          onTap={(item: any, _: number) => {
            if (item.value === 1) {
              defaultData()
            } else {
              fetchData()
            }
          }}
        />
        <Seperator type="vertical" />
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
          data={TITLE_DATA}
          onTap={(_, index: number) => setTitleIndex(index)}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={SEARCHABLE_DATA}
          onTap={(_, index: number) => setSearchableIndex(index)}
        />
      </View>
    </PageContainer>
  );
};

export default SelectBoxPage;
