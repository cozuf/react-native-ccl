import React, { FC, Fragment, useEffect, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import { RadioButton, Button, Seperator } from '..';
import { useTheme } from '../../Context/Theme';

export interface IList {
  active?: boolean
  value: any
  title: string
  selected: boolean
}

export type ListType = Required<IList>

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
}

export interface IRadioButtonGroupTypes extends IRadioButtonGroupProps<ListType>, Omit<FlatListProps<ListType>, 'data' | 'renderItem'> { }

const RadioButtonGroup: FC<IRadioButtonGroupTypes> = ({
  data,
  onSelect,
  renderItem,
  onSubmit = () => { },
  submitTitle = 'Tamam',
}) => {
  const theme = useTheme();
  const { colors, tokens } = theme;
  const { radioButtonGroup } = colors;
  const { component } = tokens;

  const [dataList, setDataList] = useState(data);

  const onButtonSelect = (selectedValue: IList["value"]) => {
    const newData = dataList.map((v) => ({ ...v, selected: v.value === selectedValue }));
    const selectedItem = newData.find((v) => v.selected)
    const selectedIndex = newData.findIndex((v) => v.selected)
    setDataList(newData);
    if (typeof onSelect === 'function') {
      onSelect(selectedItem as Required<IList>, selectedIndex);
    } else {
      console.error("'onSelect' is undefined");
    }
  };

  useEffect(() => {
    setDataList(data.map((v: ListType) => ({ ...v, selected: v.selected || false })));
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
    info: ListRenderItemInfo<Required<ListType>>
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
        title={submitTitle}
        onPress={() => {
          onSubmit(dataList.map((v: ListType) => ({ ...v })));
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