import React, { FC, memo, ReactElement, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { CheckBox, Seperator, IListItem } from '..';
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
  minChoice?: number

  /**
   *
   */
  maxChoice?: number

  /**
   * 
   */
  loading?: boolean

  /**
   * 
   */
  containerStyle?: StyleProp<ViewStyle>
}

export type ICheckBoxGroupTypes = ICheckBoxGroupProps<ListItemType> & Omit<FlatListProps<ListItemType>, 'data' | 'renderItem'>;

const CheckBoxGroup: FC<ICheckBoxGroupTypes> = ({
  data,
  onSelect,
  renderItem,
  minChoice = 0,
  maxChoice = 0,
  loading,
  containerStyle,
  ...props
}) => {
  const theme = useTheme();
  const { colors, tokens } = theme
  const { spaces } = tokens
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
  }, [data])

  const renderItemSeperator = (): JSX.Element => {
    return (
      <Seperator
        type="vertical"
        size={1}
        style={[{ width: "96%", backgroundColor: colors.listItemSeperator }, styles.seperator]}
        containerStyle={
          [
            styles.seperatorContainer,
            {
              paddingVertical: spaces.light
            }
          ]
        } />
    );
  }

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
  }

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
        data={dataList}
        renderItem={renderDefaultItem}
        ItemSeparatorComponent={renderItemSeperator}
        {...props}
      />
    )
  }

  return renderContent()
}

export default memo(CheckBoxGroup);

const styles = StyleSheet.create({
  seperatorContainer: {
    alignItems: 'center',
  },
  seperator: {},
})