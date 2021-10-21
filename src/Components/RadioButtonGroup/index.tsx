import React, { FC, Fragment, useEffect, useState } from 'react';
import { FlatList, FlatListProps, ListRenderItemInfo, View } from 'react-native';
import { Button, Seperator, useThemeContext } from 'react-native-ccl';
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

  /**
   * 
   */
  onSubmit?: (selectedList: ItemT[],/* data: ItemT[], selectedIndexes: number[]*/) => void
}

export type IRadioButtonGroupTypes = IRadioButtonGroupProps<any> &
  Omit<FlatListProps<any>, 'data' | 'renderItem'>;

const RadioButtonGroup: FC<IRadioButtonGroupTypes> = ({
  data,
  onSelect,
  renderItem,
  onSubmit = () => { }
}) => {
  const [theme] = useThemeContext();
  const { radioButtonGroup } = theme.colors;
  const [nData, setNData] = useState(data);

  const onButtonSelect = (index: number) => {
    const tData = nData.map((v, i) => ({ ...v, selected: i === index }));
    setNData(tData);
    if (typeof onSelect === 'function') {
      onSelect(tData[index], index);
    } else {
      console.error("'onSelect' is undefined");
    }
  };

  useEffect(() => {
    setNData(data.map((v: any) => ({ ...v, selected: v.selected || false })));
  }, [data]);

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

  const renderSeperator = (): JSX.Element => {
    return (
      <View style={{ alignItems: "center", paddingVertical: 4, }}>
        <Seperator.Vertical width={"96%"} height={1} color={radioButtonGroup.active.seperator} />
      </View>
    )
  }

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
    <Fragment>
      <FlatList
        keyExtractor={(_, index: number) => index.toString()}
        data={nData}
        renderItem={renderItem || customRenderItem}
        ItemSeparatorComponent={renderSeperator}
      />
      <Button wrap="no-wrap" onPress={() => {
        onSubmit(
          nData.map((v: any) => ({ ...v })),
          // nData.map((v: any) => ({ ...v })),
          // nData.map(
          //   (v: any, i: number) => {
          //     if (v.selected) {
          //       return i
          //     } else {
          //       return -1
          //     }
          //   }
          // ).filter((v) => v !== -1)
        )
      }} />
    </Fragment>
  );
};

export default RadioButtonGroup;

// TODO: onSubmit eklenecek
