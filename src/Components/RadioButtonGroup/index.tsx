import React, { FC, Fragment, useEffect, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import { RadioButton, Button, Seperator } from '..';
import { useTheme } from '../../Context/Theme';
import type { ITextProps } from '../Text';

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
  onSelect: (item: ItemT, index: number) => void;

  /**
   * callback if you want render custom item
   */
  renderItem?: (info: ListRenderItemInfo<ItemT>) => React.ReactElement | null;

  /**
   *
   */
  onSubmit?: (
    selectedList: ItemT[] /* data: ItemT[], selectedIndexes: number[]*/
  ) => void;

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
  submitTitle = 'Tamam',
  submitTitleWeight,
  submitTitleSize,
  submitTitleStyle
}) => {
  const theme = useTheme();
  const { colors, tokens } = theme;
  const { radioButtonGroup } = colors;
  const { component } = tokens;

  const [dataList, setDataList] = useState(data);

  const onButtonSelect = (selectedValue: IListItem["value"]) => {
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

  const renderSeperator = (): JSX.Element => {
    return (
      <Seperator
        type="vertical"
        size={1}
        style={[{ width: "96%", backgroundColor: radioButtonGroup.active.seperator }, styles.seperator]}
        containerStyle={
          [
            styles.seperatorContainer,
            {
              paddingVertical: component.semiVertical
            }
          ]
        } />
    );
  };

  const customRenderItem = (
    info: ListRenderItemInfo<Required<ListItemType>>
  ): React.ReactElement | null => {
    const { item, index } = info;
    if (!item.title || !item.value) {
      console.error(
        "Items of 'data' property In RadioButtonGroup Component must contain 'title' and 'value' keys"
      );
      return null;
    }

    return (
      <RadioButton
        key={index.toString()}
        active={item.active}
        selected={item.selected}
        title={item.title}
        value={item.value}
        onSelect={onButtonSelect}
      />
    );
  };

  return (
    <Fragment>
      <FlatList
        keyExtractor={(_, index: number) => index.toString()}
        data={dataList}
        renderItem={renderItem || customRenderItem}
        ItemSeparatorComponent={renderSeperator}
      />
      <Button
        wrap="no-wrap"
        disabled={dataList.every((v) => !v.selected)}
        title={submitTitle}
        titleSize={submitTitleSize}
        titleWeight={submitTitleWeight}
        titleStyle={submitTitleStyle}
        onPress={() => {
          onSubmit(dataList.map((v: ListItemType) => ({ ...v })));
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