import React, { FC, Fragment, useState } from 'react';
import { FlatListProps, ListRenderItemInfo, Omit, StyleProp, View, ViewStyle } from 'react-native';
import { useThemeContext } from '../../Context/ThemeContext';
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

  /**
   * callback if you want render custom item
   */
  renderItem?: (info: ListRenderItemInfo<ItemT>) => React.ReactElement | null;

  /**
   * 
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * 
   */
  selectionType?: "multiSelect" | "singleSelect"
}
export type IChipGroupTypes = IChipGroupProps<any> &
  Omit<FlatListProps<any>, 'data' | 'renderItem'>;

const ChipGroup: FC<IChipGroupTypes> = ({
  data,
  onSelect,
  renderItem,
  containerStyle,
  selectionType = "multiSelect"
}) => {
  const [theme] = useThemeContext()
  const { styles } = theme
  const { chipGroupStyle } = styles

  const [nData, setNData] = useState(data);

  const onButtonSelect = (index: number) => {
    const tData = nData.map((v, i) => ({
      ...v,
      selected: selectionType === "multiSelect" ? i === index ? !v.selected : v.selected : i === index,
    }));
    setNData(tData);
    if (typeof onSelect === 'function') {
      onSelect(tData[index], index);
    }
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
          containerStyle={chipGroupStyle?.chipContainer}
        />
        <View style={chipGroupStyle?.seperator} />
      </Fragment>
    );
  };
  return (
    <View style={[containerStyle, chipGroupStyle?.container]}>
      {nData.map(renderItem || customRenderItem)}
    </View>
  );
};


export default ChipGroup;
