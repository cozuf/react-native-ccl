import React, { FC, useEffect, useState } from 'react';
import { FlatList, FlatListProps, ListRenderItemInfo } from 'react-native';
import { RadioButton } from '..';

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
}

export type IRadioButtonGroupTypes = IRadioButtonGroupProps<any> &
  Omit<FlatListProps<any>, 'data' | 'renderItem'>;

const RadioButtonGroup: FC<IRadioButtonGroupTypes> = ({
  data,
  onSelect,
  renderItem,
}) => {
  const [nData, setNData] = useState(data);

  const onButtonSelect = (index: number) => {
    const tData = nData.map((v, i) => ({ ...v, selected: i === index }));
    setNData(tData);
    const sData = tData.filter(item => item.selected);
    if (typeof onSelect === 'function') {
      onSelect(sData[0], index);
    } else {
      console.error("'onSelect' is undefined");
    }
  };

  // useEffect(() => {
  //   setNData(data);
  // }, [data]);

  /**
   * warning useeffect
   */
  useEffect(() => {
    if (data.some(v => !v.active)) {
      console.warn("It would be good if items of data contain 'active' key");
    }
    if (data.some(v => !v.selected)) {
      console.warn(
        'It would be good to define selected item at the begining, to show them.',
      );
    }
  });

  const customRenderItem = (
    info: ListRenderItemInfo<Required<any>>,
  ): React.ReactElement | null => {
    const { item, index } = info;
    if (!item.title || !item.value) {
      console.error(
        "Items of 'data' property In RadioButtonGroup Component must contain 'title' and 'value' keys",
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
        onSelect={() => {
          onButtonSelect(index);
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(_, index: number) => index.toString()}
      data={nData}
      renderItem={renderItem || customRenderItem}
    />
  );
};

export default RadioButtonGroup;

// TODO: onSubnit eklenecek
