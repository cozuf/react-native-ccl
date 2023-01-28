import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, PageContainer, SearchBar } from 'react-native-ccl';

type ComponentListType = {
  name: string;
  navigation: string;
};

const COMPONENTS: ComponentListType[] = [
  {
    name: 'Text',
    navigation: 'TextPage',
  },
  {
    name: 'Icon',
    navigation: 'IconPage',
  },
  {
    name: 'TextInput',
    navigation: 'TextInputPage',
  },
  {
    name: 'Button',
    navigation: 'ButtonPage',
  },
  {
    name: 'TapSelector',
    navigation: 'TapSelectorPage',
  },
  {
    name: 'RadioButton',
    navigation: 'RadioButtonPage',
  },
  {
    name: 'RadioButtonGroup',
    navigation: 'RadioButtonGroupPage',
  },
  {
    name: 'CheckBox',
    navigation: 'CheckBoxPage',
  },
  {
    name: 'CheckBoxGroup',
    navigation: 'CheckBoxGroupPage',
  },
  {
    name: 'Chip',
    navigation: 'ChipPage',
  },
  {
    name: 'ChipGroup',
    navigation: 'ChipGroupPage',
  },
  {
    name: 'Badge',
    navigation: 'BadgePage',
  },
  {
    name: 'Image',
    navigation: 'ImagePage',
  },
  {
    name: 'SearchBar',
    navigation: 'SearchBarPage',
  },
  {
    name: 'Modal',
    navigation: 'ModalPage',
  },
  {
    name: 'SelectBox',
    navigation: 'SelectBoxPage',
  },
  {
    name: 'DateTimePicker',
    navigation: 'DateTimePickerPage',
  },
  {
    name: 'Switch',
    navigation: 'SwitchPage',
  },
  // {
  //   name: 'Colors',
  //   navigation: 'ColorsPage',
  // },
  {
    name: 'BottomSheet',
    navigation: 'BottomSheetPage',
  },
  {
    name: 'SnackBar',
    navigation: 'SnackBarPage',
  },
  {
    name: 'Card',
    navigation: 'CardPage',
  },
  // {
  //   name: 'ClassGlobalState',
  //   navigation: 'ClassGlobalStatePage',
  // },
  {
    name: 'PageContainer',
    navigation: 'PageContainerPage',
  },
  {
    name: 'ClassExample',
    navigation: 'ClassExample',
  },
  {
    name: 'StateCard',
    navigation: 'StateCardPage',
  },
  {
    name: 'SegmentedButton',
    navigation: 'SegmentedButtonPage',
  }
];

const MainPage = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState<string>('');
  const [componentList, setComponentList] = useState<ComponentListType[]>(
    COMPONENTS
  );

  return (
    <PageContainer type={'default'}>
      <View style={{ paddingBottom: 16 }}>
        <SearchBar
          placeholder={'Ara'}
          icon={{
            family: 'Ionicons',
            name: 'search',
            size: 24,
          }}
          cleanable={true}
          value={searchText}
          onSearch={(text: string) => {
            setSearchText(text);
            if (text.length > 0) {
              const nComponentList: ComponentListType[] = COMPONENTS.filter(
                (component) =>
                  component.name.toLowerCase().includes(text.toLowerCase())
              );
              setComponentList(nComponentList);
            } else {
              setComponentList(COMPONENTS);
            }
          }}
        />
      </View>

      <FlatList
        bounces={false}
        keyExtractor={(item, index) => item.name + index.toString()}
        data={componentList.sort((f, s) => {
          const nameF = f.name.toUpperCase();
          const nameS = s.name.toUpperCase();
          if (nameF < nameS) {
            return -1
          }
          if (nameF > nameS) {
            return 1
          }
          return 0
        })}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View key={item.name + index.toString()}>
              <Button
                type="outlined"
                title={item.name}
                onPress={() => {
                  navigation.navigate(item.navigation);
                }}
              />
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
      />
    </PageContainer>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  seperator: {
    height: 8,
  },
});
