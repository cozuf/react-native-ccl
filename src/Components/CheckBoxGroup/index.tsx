import type { ListType } from 'lib/typescript/src/Components/RadioButtonGroup';
import React, { FC, Fragment, memo, ReactElement, useEffect, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  Omit,
  StyleSheet,
  View,
} from 'react-native';
import { CheckBox, Button, Seperator } from '..';
import { useTheme } from '../../Context/Theme';

export interface IListItem {
  active?: boolean
  value: any
  title: string
  selected: boolean
}

export type ListItemType = Required<IListItem>

export interface ICheckBoxGroupProps<ItemT> {
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
  renderItem?: (info: ListRenderItemInfo<ItemT>) => ReactElement | null;

  /**
   *
   */
  onSubmit?: (data: ItemT[]) => void;

  /**
   *
   */
  submitTitle?: string;

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
  selectAllTitle?: string;

  /**
   *
   */
  unSelectAllTitle?: string;
}

export type ICheckBoxGroupTypes = ICheckBoxGroupProps<ListItemType> & Omit<FlatListProps<ListItemType>, 'data' | 'renderItem'>;

const CheckBoxGroup: FC<ICheckBoxGroupTypes> = ({
  data,
  onSelect,
  renderItem,
  onSubmit = () => { },
  submitTitle = 'Tamam',
  minChoice = 0,
  maxChoice = 0,
  selectAllTitle = 'Tümünü Seç',
  unSelectAllTitle = 'Tümünü Kaldır',
}) => {
  const theme = useTheme();
  const { colors, tokens } = theme
  const { checkBoxGroup } = colors
  const { component } = tokens

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

  const onButtonSelect = (selectedValue: IListItem["value"], selected: IListItem["selected"]) => {
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
    } else {
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
      console.warn(
        'It would be good to define selected item at the begining, to show them.'
      );
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

  const renderSeperator = (): JSX.Element => {
    return (
      <Seperator
        type="vertical"
        size={1}
        style={{ width: "96%", backgroundColor: checkBoxGroup.active.seperator }}
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

  const customRenderItem = (info: ListRenderItemInfo<ListItemType>): ReactElement | null => {
    const { item, index } = info;
    return (
      <CheckBox
        key={`${index}`}
        active={item.active}
        selected={item.selected}
        title={item.title}
        value={item.value}
        onSelect={(selectedValue, selected) => {
          onButtonSelect(selectedValue, selected);
        }}
      />
    );
  };

  return (
    <Fragment>
      <View style={styles.buttonsContainer}>
        <Button
          wrap={'wrap'}
          title={unSelectAllTitle}
          disabled={!dataList.some((v) => v.selected)}
          type="simplied"
          containerStyle={styles.buttons}
          onPress={() => {
            setDataList((oldDataList) => oldDataList.map((v: ListItemType) => ({ ...v, selected: false, active: true })));
          }}
        />
        <Button
          wrap={'wrap'}
          title={selectAllTitle}
          disabled={maxChoice !== 0 || !dataList.some((v) => !v.selected)}
          type="simplied"
          containerStyle={styles.buttons}
          onPress={() => {
            setDataList((oldDataList) => oldDataList.map((v: ListItemType) => ({ ...v, selected: true })));
          }}
        />
      </View>

      <FlatList
        keyExtractor={(_, index) => `${index}`}
        data={dataList}
        renderItem={renderItem || customRenderItem}
        ItemSeparatorComponent={renderSeperator}
      />

      <Button
        wrap="no-wrap"
        title={submitTitle}
        disabled={isDisabled()}
        onPress={() => {
          onSubmit(dataList as ListType[]);
        }}
      />
    </Fragment>
  );
};

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