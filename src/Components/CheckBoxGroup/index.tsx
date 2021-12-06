import React, { FC, Fragment, memo, useEffect, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  Omit,
  StyleSheet,
  View,
} from 'react-native';
import { CheckBox, Button, Seperator } from '..';
import { useThemeContext } from '../../Context/ThemeContext';

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
  renderItem?: (info: ListRenderItemInfo<ItemT>) => React.ReactElement | null;

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

export type ICheckBoxGroupTypes = ICheckBoxGroupProps<any> &
  Omit<FlatListProps<any>, 'data' | 'renderItem'>;

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
  const [theme] = useThemeContext();
  const { checkBoxGroup } = theme.colors;

  const [nData, setNData] = useState(data);

  useEffect(() => {
    if (maxChoice !== 0) {
      const selectedDataLength = data.filter((v: any) => v.selected).length;
      if (selectedDataLength === maxChoice) {
        setNData(data.map((v: any) => ({ ...v, active: v.selected })));
      } else {
        setNData(data.map((v: any) => ({ ...v, active: true })));
      }
    } else {
      setNData(
        data.map((v: any) => ({
          ...v,
          selected: v.selected || false,
          active: v.active || true,
        }))
      );
    }
  }, [data, maxChoice]);

  const onButtonSelect = (index: number) => {
    const tData = nData.map((v: any, i: number) => ({
      ...v,
      selected: i === index ? !v.selected : v.selected,
    }));
    if (maxChoice !== 0) {
      const selectedDataLength = tData.filter((v: any) => v.selected).length;
      if (selectedDataLength === maxChoice) {
        const mData = tData.map((v: any) => ({
          ...v,
          active: v.selected,
        }));
        setNData(mData);
      } else {
        const mData = tData.map((v: any) => ({
          ...v,
          active: true,
        }));
        setNData(mData);
      }
    } else {
      setNData(tData);
    }
    if (typeof onSelect === 'function') {
      onSelect(nData[index], index);
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
    if (data.some((v) => v.active === undefined)) {
      console.warn(
        'It would be good to define selected item at the begining, to show them.'
      );
    }
  }, [data]);

  const isDisabled = (): boolean => {
    if (minChoice !== 0) {
      const selectedLength = nData.filter((v: any) => v.selected).length;
      return selectedLength < minChoice;
    } else {
      return false;
    }
  };

  const renderSeperator = (): JSX.Element => {
    return (
      <View style={styles.seperatorContainer}>
        <Seperator.Vertical
          width={'96%'}
          height={1}
          color={checkBoxGroup.active.seperator}
        />
      </View>
    );
  };

  const customRenderItem = (
    info: ListRenderItemInfo<any>
  ): React.ReactElement | null => {
    const { item, index } = info;
    return (
      <CheckBox
        key={index.toString()}
        active={item.active}
        selected={item.selected}
        title={item.title}
        onSelect={() => {
          onButtonSelect(index);
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
          type="simplied"
          containerStyle={styles.buttons}
          onPress={() => {
            setNData(
              nData.map((v: any) => ({ ...v, selected: false, active: true }))
            );
          }}
        />
        <Button
          wrap={'wrap'}
          title={selectAllTitle}
          type="simplied"
          containerStyle={styles.buttons}
          onPress={() => {
            setNData(nData.map((v: any) => ({ ...v, selected: true })));
          }}
        />
      </View>

      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={nData}
        renderItem={renderItem || customRenderItem}
        ItemSeparatorComponent={renderSeperator}
      />

      <Button
        wrap="no-wrap"
        title={submitTitle}
        disabled={isDisabled()}
        onPress={() => {
          onSubmit(nData.map((v: any) => ({ ...v })));
        }}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  seperatorContainer: {
    alignItems: 'center',
    paddingVertical: 4
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttons: {
    paddingHorizontal: 0
  }
})

export default memo(CheckBoxGroup);
