import React, { FC, useLayoutEffect } from 'react';
import type { NavigationProp, RouteProp } from '@react-navigation/core';
import type { ParamListBase } from '@react-navigation/routers';
import {
  Button,
  CheckBoxGroup,
  PageContainer,
  RadioButtonGroup,
  SearchBar,
} from '../..';
import { ListRenderItemInfo, View } from 'react-native';

export type PageParamsList<ItemT> = {
  base: {
    title: string;

    /**
     * type to choose
     * @default SingleSelect
     */
    selectionType: 'SingleSelect' | 'MultiSelect';

    /**
     * set true if you want to search in given list
     * @default false
     */
    searchable?: boolean;

    /**
     *
     */
    searchText?: string;

    /**
     * invokes when enter text to input
     */
    onSearch?: (
      _navigation: NavigationProp<ParamListBase>,
      text: string,
    ) => void;

    /**
     * Array of selectable options.
     * it must contain {title} and {value} keys.
     * {title} to show
     * {value} to operate
     *
     * it is better to include {active} and {selected} keys.
     * {active} to be selectable
     * {selected} to show selected before
     */
    data: ReadonlyArray<ItemT>;

    setData: (data: ItemT[]) => void;
    /**
     * invokes when click the option
     */
    onSelect?: (
      navigation: NavigationProp<ParamListBase>,
      item: ItemT,
      index: number,
    ) => void;

    /**
     * invokes when selection complete and press submit button
     */
    onSubmit?: (selectedData: ReadonlyArray<ItemT>) => void;

    /**
     * callback if you want render custom item
     */
    renderItem?: (info: ListRenderItemInfo<ItemT>) => React.ReactElement | null;

    /**
     * 
     */
    maxChoice?: number

    /**
     * 
     */
    minChoice?: number
  };
};

export interface ISelectBoxPageProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<PageParamsList<any>, 'base'>;
}

const SelectPage: FC<ISelectBoxPageProps> = ({ navigation, route }) => {
  const {
    title = 'Başlık',
    searchable,
    data,
    setData = () => { },
    searchText,
    selectionType = 'SingleSelect',
    onSearch = () => { },
    onSelect = () => { },
    onSubmit = () => { },
    renderItem,
    maxChoice = 0,
    minChoice = 0
  } = route.params;
  console.log({ data })
  useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  });

  const renderSearch = () => {
    return (
      <SearchBar
        value={searchText || ''}
        onSearch={(text: string) => {
          onSearch(navigation, text);
        }}
      />
    );
  };

  const renderSingleSelect = () => {
    return (
      <RadioButtonGroup
        data={data}
        onSelect={(item: any, index: number) => {
          if (typeof onSelect === 'function') {
            onSelect(navigation, item, index);
          }
          const nData = data.map((v: any, i: number) => ({ ...v, selected: index === i }));
          setData(nData);
        }}
        renderItem={renderItem || undefined}
      />
    );
  };

  const renderMultiSelect = () => {
    return (
      <CheckBoxGroup
        data={data}
        onSelect={(item: any, index: number) => {
          if (typeof onSelect === 'function') {
            onSelect(navigation, item, index);
          }
          const nData = data.map((v: any, i: number) => ({
            ...v,
            selected: index === i ? !v.selected : v.selected,
          }));
          if (maxChoice !== 0) {
            const selectedData = nData.filter((v: any) => v.selected);
            console.log({ maxChoice, selectedData: selectedData.length, case: maxChoice === selectedData.length })
            if (selectedData.length === maxChoice) {
              const mData = nData.map((v: any) => ({
                ...v,
                active: v.selected
              }));
              console.log({ mData })
              setData(mData)
            } else {
              const mData = nData.map((v: any) => ({
                ...v,
                active: true
              }));
              setData(mData)
            }
          } else {
            setData(nData);
          }
        }}
        renderItem={renderItem || undefined}
      />
    );
  };

  const renderChildren = (): JSX.Element | undefined => {
    switch (selectionType) {
      case 'SingleSelect':
        return renderSingleSelect();
      case 'MultiSelect':
        return renderMultiSelect();
    }
  };

  const isButtonDisabled = (): boolean => {
    if (minChoice !== 0 || maxChoice !== 0) {
      const selectedCount = data.filter((v: any) => v.selected).length;
      console.log({ selectedCount })
      if (selectedCount < minChoice) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  const renderSubmit = () => {
    return (
      <Button
        title={'Tamam'}
        disabled={isButtonDisabled()}
        onPress={() => {
          if (typeof onSubmit === 'function') {
            onSubmit(data.filter((v: any) => v.selected));
          }
          navigation.goBack();
        }}
      />
    );
  };

  return (
    <PageContainer type="Default">
      {searchable ? renderSearch() : null}
      {searchable ? <View style={{ height: 8 }} /> : null}
      {renderChildren()}
      {renderSubmit()}
    </PageContainer>
  );
};

export default SelectPage;
