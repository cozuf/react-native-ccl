import React, { FC, Fragment, isValidElement, memo, ReactElement, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  Omit,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CheckBox, Button, Seperator, SearchBar, ISearchBarTypes, ITextProps, IListItem, Text } from '..';
import { useTheme } from '../../Context';

export type ListItemType = Required<IListItem>

export interface ICheckBoxGroupProps<ItemT extends ListItemType> {
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
  renderItem?: (item: ItemT, index: number) => ReactElement | null;

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
  onSubmit?: (selectedItems: ItemT[], data: ItemT[]) => void;

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

  /**
   *
   */
  minChoice?: number;

  /**
   *
   */
  maxChoice?: number;

  /**
   * 
   */
  showShortcuts?: boolean

  /**
   *
   */
  selectAllTitle?: string;

  /**
   * 
   */
  onSelectAll?: (data: ItemT[]) => void;

  /**
   *
   */
  unSelectAllTitle?: string;

  /**
   * 
   */
  onUnSelectAll?: () => {}

  /**
   * 
   */
  searchBarProps?: Omit<ISearchBarTypes, "value" | "onSearch">

  /**
   * 
   */
  loading?: boolean

  /**
   * 
   */
  description?: string | ReactElement
}

export type ICheckBoxGroupTypes = ICheckBoxGroupProps<ListItemType> & Omit<FlatListProps<ListItemType>, 'data' | 'renderItem'>;

const CheckBoxGroup: FC<ICheckBoxGroupTypes> = ({
  data,
  onSelect,
  renderItem,
  searchable,
  onSearch = () => { },
  onSubmit,
  submitTitle = 'Tamam',
  submitTitleWeight,
  submitTitleSize,
  submitTitleStyle,
  minChoice = 0,
  maxChoice = 0,
  showShortcuts = false,
  selectAllTitle = 'Tümünü Seç',
  unSelectAllTitle = 'Tümünü Kaldır',
  onSelectAll = () => { },
  onUnSelectAll = () => { },
  searchBarProps,
  loading,
  description,
  ...props
}) => {
  const theme = useTheme();
  const { colors, tokens } = theme
  const { spaces } = tokens

  const [searchText, setSearchText] = useState<string>("")
  const [dataList, setDataList] = useState(data);

  useEffect(() => {
    if (maxChoice !== 0) {
      const selectedDataLength = data.filter((v: ListItemType) => v.selected).length;
      if (selectedDataLength === maxChoice) {
        setDataList(data.map((v: ListItemType) => ({ ...v, active: v.selected })));
      } else {
        setDataList(data.map((v: ListItemType) => ({ ...v, active: true })));
      }
    } else {
      setDataList(
        data.map((v: ListItemType) => ({
          ...v,
          selected: v.selected || false,
          active: v.active || true,
        }))
      );
    }

  }, [data, maxChoice]);

  const onItemSelect = (selectedValue: IListItem["value"], selected: IListItem["selected"]) => {
    const newData = dataList.map((v: ListItemType) => ({ ...v, selected: v.value === selectedValue ? selected : v.selected, }));
    if (maxChoice !== 0) {
      const selectedDataLength = newData.filter((v: ListItemType) => v.selected).length;
      if (selectedDataLength === maxChoice) {
        const modificateData = newData.map((v: ListItemType) => ({ ...v, active: v.selected, }));
        setDataList(modificateData);
      } else {
        const modificateData = newData.map((v: ListItemType) => ({ ...v, active: true, }));
        setDataList(modificateData);
      }
    } else {
      setDataList(newData);
    }
    if (typeof onSelect === 'function') {
      const selectedItem = newData.find((v) => v.value === selectedValue)
      const selectedIndex = newData.findIndex((v) => v.value === selectedValue)
      onSelect(selectedItem as ListItemType, selectedIndex);
    } else if (typeof renderItem === "function") {
      console.error("'onSelect' is undefined");
    }
  };

  /**
   * warning useEffect
   */
  useEffect(() => {
    if (data.some((v) => v.active === undefined)) {
      console.warn("It would be good if items of data contain 'active' key");
    }
    if (data.some((v) => v.selected === undefined)) {
      console.warn('It would be good to define selected item at the begining, to show them.');
    }
  }, [data]);

  const isDisabled = (): boolean => {
    if (minChoice !== 0) {
      const selectedLength = dataList.filter((v: ListItemType) => v.selected).length;
      return selectedLength < minChoice;
    } else {
      return false;
    }
  };

  const renderDescription = () => {
    if (typeof description === "string") {
      return (
        <Text style={{ paddingVertical: spaces.componentVertical }}>
          {description}
        </Text>
      )
    }
    if (isValidElement(description)) {
      return description
    }
    return null
  }

  const renderSearchInput = () => {
    if (searchable) {
      return (
        <SearchBar
          value={searchText}
          autoCapitalize="none"
          onSearch={(value: string) => {
            setSearchText(value)
            onSearch(value)
            const mappedData = data.map((firstV: IListItem,) => dataList.find((secondV: IListItem) => firstV.value === secondV.value) || { ...firstV } as Required<IListItem>)
            const fiteredData = mappedData.filter((v: IListItem) => v.title.toLowerCase().includes(value.toLowerCase()))
            setDataList(fiteredData)
          }}
          {...searchBarProps}
        />
      )
    }
    return null
  }

  const renderShortcuts = () => {
    if (showShortcuts) {
      return (
        <View style={styles.buttonsContainer}>
          <Button
            wrap={'wrap'}
            title={unSelectAllTitle}
            disabled={!dataList.some((v) => v.selected)}
            type="simplied"
            containerStyle={styles.buttons}
            onPress={() => {
              setDataList((oldDataList) => oldDataList.map((v: ListItemType) => ({ ...v, selected: false, active: true })));
              onUnSelectAll()
            }}
          />
          <Button
            wrap={'wrap'}
            title={selectAllTitle}
            disabled={maxChoice !== 0 || !dataList.some((v) => !v.selected)}
            type="simplied"
            containerStyle={styles.buttons}
            onPress={() => {
              const newDataList = dataList.map((v: ListItemType) => ({ ...v, selected: true }))
              setDataList(newDataList);
              onSelectAll(newDataList)
            }}
          />
        </View>
      )
    }
    return null
  }

  const renderItemSeperator = (): JSX.Element => {
    return (
      <Seperator
        type="vertical"
        size={1}
        style={{ width: "96%", backgroundColor: colors.listItemSeperator }}
        containerStyle={
          [
            styles.seperatorContainer,
            {
              paddingVertical: spaces.light
            }
          ]
        } />
    );
  };

  const renderDefaultItem = (info: ListRenderItemInfo<ListItemType>): ReactElement | null => {
    const { item, index } = info;
    if (!item.title || !item.value) {
      console.error("Items of 'data' property In RadioButtonGroup Component must contain 'title' and 'value' keys");
      return null;
    }

    if (typeof renderItem === "function") {
      return (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => { onItemSelect(item.value, !item.selected) }}>
          {renderItem(item, index)}
        </TouchableOpacity>
      )
    }
    return (
      <CheckBox
        key={`${index}`}
        active={item.active}
        selected={item.selected}
        title={item.title}
        value={item.value}
        onSelect={onItemSelect}
      />
    );
  };

  const renderContent = () => {
    if (loading) {
      return renderLoading()
    } else {
      return renderSelection()
    }
  }

  const renderLoading = () => {
    return (
      <View style={{ flex: 1 }}>
        <Seperator type='vertical' size={20} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  const renderSelection = () => {
    return (
      <FlatList
        bounces={false}
        keyExtractor={(_, index) => `${index}`}
        ListHeaderComponent={renderShortcuts}
        data={dataList}
        renderItem={renderDefaultItem}
        ItemSeparatorComponent={renderItemSeperator}
        {...props}
      />
    )
  }

  const renderSubmitButton = () => {
    if (typeof onSubmit === "function") {
      return (
        <Button
          wrap="no-wrap"
          title={submitTitle}
          titleSize={submitTitleSize}
          titleWeight={submitTitleWeight}
          titleStyle={submitTitleStyle}
          disabled={isDisabled()}
          onPress={() => {
            const selectedItems = dataList.filter((v: IListItem) => v.selected)
            onSubmit(selectedItems, dataList as ListItemType[]);
          }}
        />
      )
    }
    return null
  }

  if (typeof onSubmit === "function") {
    return (
      <Fragment>
        {renderDescription()}
        {renderSearchInput()}
        {renderContent()}
        {renderSubmitButton()}
      </Fragment>
    )
  } else {
    return (
      <View>
        {renderDescription()}
        {renderSearchInput()}
        {renderContent()}
      </View>
    )
  }
}

export default memo(CheckBoxGroup);

const styles = StyleSheet.create({
  seperatorContainer: {
    alignItems: 'center',
  },
  seperator: {},
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttons: {
    paddingHorizontal: 0
  },
})