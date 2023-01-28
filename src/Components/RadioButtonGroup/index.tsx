import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { RadioButton, Seperator, IListItem } from '..';
import { useTheme } from '../../Context';

export type ListItemType = Required<IListItem>

export interface IRadioButtonGroupProps<ItemT extends ListItemType> {
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
  data: ReadonlyArray<ItemT>

  /**
   * invokes when click the option
   */
  onSelect?: (item: ItemT, index: number) => void

  /**
   * callback if you want render custom item
   */
  renderItem?: (item: ItemT, index: number) => React.ReactElement | null

  /**
   * 
   */
  loading?: boolean
}

export interface IRadioButtonGroupTypes extends IRadioButtonGroupProps<ListItemType>, Omit<FlatListProps<ListItemType>, 'data' | 'renderItem'> { }

const RadioButtonGroup: FC<IRadioButtonGroupTypes> = ({
  data,
  onSelect,
  renderItem,
  loading,
  ...props
}) => {
  const theme = useTheme()
  const { colors, tokens } = theme
  const { spaces } = tokens
  const [dataList, setDataList] = useState(data)

  useEffect(() => {
    setDataList(data.map((v: ListItemType) => ({ ...v, selected: v.selected || false })));
  }, [data])

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
  })

  const onItemSelect = (selectedValue: IListItem["value"]) => {
    const newData = dataList.map((v) => ({ ...v, selected: v.value === selectedValue }));
    const selectedItem = newData.find((v) => v.selected)
    const selectedIndex = newData.findIndex((v) => v.selected)
    setDataList(newData);

    if (typeof onSelect === 'function') {
      onSelect(selectedItem as ListItemType, selectedIndex);
    } else if (typeof renderItem === "function") {
      console.error("'onSelect' is undefined");
    }
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
              paddingVertical: spaces.light
            }
          ]
        } />
    );
  }

  const renderDefaultItem = (info: ListRenderItemInfo<Required<ListItemType>>): React.ReactElement | null => {
    const { item, index } = info;
    if (!item.title || !item.value) {
      console.error("Items of 'data' property In RadioButtonGroup Component must contain 'title' and 'value' keys");
      return null;
    }

    if (typeof renderItem === "function") {
      return (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => { onItemSelect(item.value) }}>
          {renderItem(item, index)}
        </TouchableOpacity>
      )
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
  }

  const renderSelection = () => {
    return (
      <FlatList
        bounces={false}
        keyExtractor={(_, index: number) => index.toString()}
        data={dataList}
        renderItem={renderDefaultItem}
        ItemSeparatorComponent={renderSeperator}
        {...props}
      />
    )
  }

  const renderLoading = () => {
    return (
      <View style={{ flex: 1 }}>
        <Seperator type='vertical' size={20} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  const renderContent = () => {
    if (loading) {
      return renderLoading()
    } else {
      return renderSelection()
    }
  }

  return renderContent()

};

export default RadioButtonGroup;

const styles = StyleSheet.create({
  container: {},
  seperatorContainer: {
    alignItems: 'center',
  },
  seperator: {},
})