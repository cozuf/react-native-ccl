import React, { FC, useLayoutEffect } from 'react';
import type { NavigationProp, RouteProp } from '@react-navigation/core';
import type { ParamListBase } from '@react-navigation/routers';
import type { ListRenderItemInfo } from 'react-native';
import {
  CheckBoxGroup,
  PageContainer,
  RadioButtonGroup,
  SearchBar,
  Seperator
} from '../..';

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
      text: string
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

    // setData: (data: ItemT[]) => void;
    /**
     * invokes when click the option
     */
    onSelect?: (
      navigation: NavigationProp<ParamListBase>,
      item: ItemT,
      index: number
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
    maxChoice?: number;

    /**
     *
     */
    minChoice?: number;
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
    // setData = () => { },
    searchText,
    selectionType = 'SingleSelect',
    onSearch = () => { },
    onSelect = () => { },
    onSubmit = () => { },
    renderItem,
    maxChoice = 0,
    minChoice = 0,
  } = route.params;

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
        }}
        renderItem={renderItem || undefined}
        onSubmit={(data: any[]) => {
          if (typeof onSubmit === 'function') {
            onSubmit(data);
          }
          navigation.goBack();
        }}
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
        }}
        renderItem={renderItem || undefined}
        maxChoice={maxChoice}
        minChoice={minChoice}
        onSubmit={(data: any[]) => {
          if (typeof onSubmit === 'function') {
            onSubmit(data);
          }
          navigation.goBack();
        }}
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

  return (
    <PageContainer type="Default">
      {searchable ? renderSearch() : null}
      {searchable ? <Seperator.Vertical /> : null}
      {renderChildren()}
    </PageContainer>
  );
};

export default SelectPage;
