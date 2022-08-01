import React, { FC, Fragment, useEffect, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import { ITextProps, RadioButton, Button, Seperator, SearchBar } from '..';
import { useTheme } from '../../Context/Theme';

export interface IListItem {
  active?: boolean
  value: any
  title: string
  selected: boolean
}

export type ListItemType = Required<IListItem>

export interface IRadioButtonGroupProps<ItemT> {
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

  /**
   * invokes when click the option
   */
  onSelect?: (item: ItemT, index: number) => void;

  /**
   * callback if you want render custom item
   */
  renderItem?: (info: ListRenderItemInfo<ItemT>) => React.ReactElement | null;

  /**
   *
   */
  onSubmit?: (selectedList: ItemT[], selectedItems: ItemT[]) => void;

  /**
   * 
   */
  searchable?: boolean

  /**
   * 
   */
  onSearch?: (searchedText: string) => void

  /**
   *
   */
  submitTitle?: string;

  /**
   *  
   */
  submitTitleWeight?: ITextProps["weigth"]

  /**
   *  
   */
  submitTitleSize?: ITextProps["size"]

  /**
   * 
   */
  submitTitleStyle?: ITextProps["style"]
}

export interface IRadioButtonGroupTypes extends IRadioButtonGroupProps<ListItemType>, Omit<FlatListProps<ListItemType>, 'data' | 'renderItem'> { }

const RadioButtonGroup: FC<IRadioButtonGroupTypes> = ({
  data,
  onSelect,
  renderItem,
  onSubmit = () => { },
  searchable,
  onSearch = () => { },
  submitTitle = 'Tamam',
  submitTitleWeight,
  submitTitleSize,
  submitTitleStyle,
  ...props
}) => {
  const theme = useTheme()
  const { colors, tokens } = theme
  const { innerSpace } = tokens

  const [searchText, setSearchText] = useState<string>("")
  const [dataList, setDataList] = useState(data)

  useEffect(() => {
    setDataList(data.map((v: ListItemType) => ({ ...v, selected: v.selected || false })));
  }, [data]);

  /**
   * warning useEffect
   */
  useEffect(() => {
    if (data.some((v) => v.active === undefined)) {
      console.warn("It would be good if items of data contain 'active' key");
    }
    if (data.some((v) => !v.selected === undefined)) {
      console.warn(
        'It would be good to define selected item at the begining, to show them.'
      );
    }
  });

  const onItemSelect = (selectedValue: IListItem["value"]) => {
    const newData = dataList.map((v) => ({ ...v, selected: v.value === selectedValue }));
    const selectedItem = newData.find((v) => v.selected)
    const selectedIndex = newData.findIndex((v) => v.selected)
    setDataList(newData);

    if (typeof onSelect === 'function') {
      onSelect(selectedItem as ListItemType, selectedIndex);
    } else {
      console.error("'onSelect' is undefined");
    }
  };

  const renderSearchInput = () => {
    if (searchable) {
      return (
        <Fragment>
          <SearchBar
            value={searchText}
            autoCapitalize="none"
            onSearch={(value: string) => {
              setSearchText(value)
              onSearch(value)
              setDataList(data.filter((v: IListItem) => v.title.toLowerCase().includes(value.toLowerCase())))
            }} />
          <Seperator type='vertical' />
        </Fragment>
      )
    }
    return null
  }

  const renderSeperator = (): JSX.Element => {
    return (
      <Seperator
        type="vertical"
        size={1}
        style={[{ width: "96%", backgroundColor: colors.listItemSeperator }, styles.seperator]}
        containerStyle={
          [
            styles.seperatorContainer,
            {
              paddingVertical: innerSpace.thin
            }
          ]
        } />
    );
  };

  const renderDefaultItem = (
    info: ListRenderItemInfo<Required<ListItemType>>
  ): React.ReactElement | null => {
    const { item, index } = info;
    if (!item.title || !item.value) {
      console.error("Items of 'data' property In RadioButtonGroup Component must contain 'title' and 'value' keys");
      return null;
    }

    return (
      <RadioButton
        key={index.toString()}
        active={item.active}
        selected={item.selected}
        title={item.title}
        value={item.value}
        onSelect={onItemSelect}
      />
    );
  };

  return (
    <Fragment>
      {renderSearchInput()}
      <FlatList
        bounces={false}
        keyExtractor={(_, index: number) => index.toString()}
        data={dataList}
        renderItem={renderItem || renderDefaultItem}
        ItemSeparatorComponent={renderSeperator}
        {...props}
      />
      <Button
        wrap="no-wrap"
        disabled={dataList.every((v) => !v.selected)}
        title={submitTitle}
        titleSize={submitTitleSize}
        titleWeight={submitTitleWeight}
        titleStyle={submitTitleStyle}
        onPress={() => {
          const selectedItems = dataList.filter((v) => v.selected)
          onSubmit(dataList as ListItemType[], selectedItems);
        }}
      />
    </Fragment>
  );
};

export default RadioButtonGroup;

const styles = StyleSheet.create({
  container: {},
  seperatorContainer: {
    alignItems: 'center',
  },
  seperator: {},
})