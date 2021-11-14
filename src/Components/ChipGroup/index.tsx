import React, { FC, Fragment, useState } from 'react';
import { FlatListProps, Omit, StyleSheet, View } from 'react-native';
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
    array: readonly ItemT[]
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
    index: number
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
          containerStyle={styles.chipContainer}
        />
        <View style={styles.seperator} />
      </Fragment>
    );
  };
  return (
    <View style={styles.container}>
      {nData.map(renderItem || customRenderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  chipContainer: {
    marginBottom: 4
  },
  seperator: {
    width: 8
  }
})

export default ChipGroup;
