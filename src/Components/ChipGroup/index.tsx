import React, { FC, Fragment, useState } from 'react';
import { FlatListProps, Omit, View } from 'react-native';
import { Chip } from '..';

export interface IChipGroupProps<ItemT> {
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

  // /**
  //  * invokes when selection complete and press submit button
  //  */
  // onSubmit?: (selectedData: ReadonlyArray<ItemT>) => void;

  /**
   * callback if you want render custom item
   */
  renderItem?: (
    value: ItemT,
    index: number,
    array: readonly ItemT[],
  ) => React.ReactElement | null;
}
export type IChipGroupTypes = IChipGroupProps<any> &
  Omit<FlatListProps<any>, 'data' | 'renderItem'>;

const ChipGroup: FC<IChipGroupTypes> = ({
  data,
  onSelect,
  // onSubmit,
  renderItem,
}) => {
  const [nData, setNData] = useState(data);

  const onButtonSelect = (index: number) => {
    const tData = nData.map((v, i) => ({
      ...v,
      selected: i === index ? !v.selected : v.selected,
    }));
    setNData(tData);
    // const sData = tData.filter(item => item.selected);
    if (typeof onSelect === 'function') {
      onSelect(tData[index], index);
    }
    // if (typeof onSubmit === 'function') {
    //   onSubmit(sData);
    // }
  };
  const customRenderItem = (
    item: any,
    index: number,
  ): React.ReactElement | null => {
    return (
      <Fragment key={index.toString()}>
        <Chip
          active={item.active}
          selected={item.selected}
          title={item.title}
          onSelect={() => {
            onButtonSelect(index);
          }}
          containerStyle={{ marginBottom: 4 }}
        />
        <View style={{ width: 8 }} />
      </Fragment>
    );
  };
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {nData.map(renderItem || customRenderItem)}
    </View>
  );
};

export default ChipGroup;

// TODO: Buraya tekrar bak
// TODO: Style ile ilgili margin padding
// TODO: maxchoice minchoice ekle
