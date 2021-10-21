import React, { FC } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { Button, CheckBoxGroup, Modal, RadioButtonGroup, SearchBar } from '../..';

type SelectBoxModalTypes<ItemT> = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  value: string;
  setValue: (value: string) => void;
  /**
   * set true if you want to search in given list
   * @default false
   */
  searchable?: boolean;

  /**
   * type to choose
   * @default SingleSelect
   */
  selectionType: 'SingleSelect' | 'MultiSelect';

  /**
   *
   */
  searchText?: string;

  /**
   * invokes when enter text to input
   */
  onSearch?: (text: string) => void;

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

  setData: (data: ItemT[]) => void;

  /**
   * invokes when click the option
   */
  onSelect?: (item: ItemT, index: number) => void;

  /**
   * invokes when selection complete and press submit button
   */
  onSubmit?: (selectedData: ReadonlyArray<ItemT>) => void;

  /**
   * callback if you want render custom item
   */
  renderItem?: (info: ListRenderItemInfo<ItemT>) => React.ReactElement | null;

  /**
   * 
   */
  maxChoice?: number

  /**
   * 
   */
  minChoice?: number
};

const SelectBoxModal: FC<SelectBoxModalTypes<any>> = ({
  visible = false,
  setVisible = () => { },
  searchable,
  data,
  setData = () => { },
  value,
  selectionType = 'SingleSelect',
  onSearch = () => { },
  onSelect = () => { },
  onSubmit = () => { },
  renderItem,
  maxChoice = 0,
  minChoice = 0
}) => {
  const renderSearch = () => {
    return <SearchBar value={value} onSearch={onSearch} />;
  };

  const renderSingleSelect = () => {
    return (
      <RadioButtonGroup
        data={data}
        onSelect={(item: any, index: number) => {
          if (typeof onSelect === 'function') {
            onSelect(item, index);
          }
          const nData = data.map((v, i) => ({ ...v, selected: index === i }));
          setData(nData);
        }}
        renderItem={renderItem || undefined}
      />
    );
  };

  const renderMultiSelect = () => {
    return (
      <CheckBoxGroup
        data={data}
        onSelect={(item: any, index: number) => {
          if (typeof onSelect === 'function') {
            onSelect(item, index);
          }
          const nData = data.map((v, i) => ({
            ...v,
            selected: index === i ? !v.selected : v.selected,
          }));
          if (maxChoice !== 0) {
            const selectedData = nData.filter((v: any) => v.selected);
            if (selectedData.length === maxChoice) {
              const mData = nData.map((v: any) => ({
                ...v,
                active: v.selected
              }));
              setData(mData)
            } else {
              const mData = nData.map((v: any) => ({
                ...v,
                active: true
              }));
              setData(mData)
            }
          } else {
            setData(nData);
          }
        }}
        renderItem={renderItem || undefined}
      />
    );
  };

  const renderChildren = () => {
    switch (selectionType) {
      case 'SingleSelect':
        return renderSingleSelect();
      case 'MultiSelect':
        return renderMultiSelect();
    }
  };

  const isButtonDisabled = (): boolean => {
    if (minChoice !== 0 || maxChoice !== 0) {
      const selectedCount = data.filter((v: any) => v.selected).length;
      if (selectedCount < minChoice) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  const renderSubmit = () => {
    return (
      <Button
        title={'Tamam'}
        disabled={isButtonDisabled()}
        onPress={() => {
          if (typeof onSubmit === 'function') {
            onSubmit(data.filter(v => v.selected));
          }
          setVisible(false);
        }}
      />
    );
  };

  return (
    <Modal.Default
      visible={visible}
      onTouchOutSide={v => {
        setVisible(v);
      }}
      containerStyle={{ flex: 1 }}>
      {searchable ? renderSearch() : null}
      {searchable ? <View style={{ height: 8 }} /> : null}
      {renderChildren()}
      {renderSubmit()}
    </Modal.Default>
  );
};

export default SelectBoxModal;
