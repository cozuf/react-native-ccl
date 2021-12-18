import React, { FC } from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { CheckBoxGroup, Modal, RadioButtonGroup, SearchBar, Seperator } from '../..';

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
  selectionType: 'singleSelect' | 'multiSelect';

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

  // setData: (data: ItemT[]) => void;

  /**
   * invokes when click the option
   */
  onSelect?: (item: ItemT, index: number) => void;

  /**
   * invokes when selection complete and press submit button
   */
  onSubmit?: (selectedData: ItemT[]) => void;

  /**
   * callback if you want render custom item
   */
  renderItem?: (info: ListRenderItemInfo<ItemT>) => React.ReactElement | null;

  /**
   *
   */
  maxChoice?: number;

  /**
   *
   */
  minChoice?: number;
};

const SelectBoxModal: FC<SelectBoxModalTypes<any>> = ({
  visible = false,
  setVisible = () => { },
  searchable,
  data,
  value,
  selectionType = 'singleSelect',
  onSearch = () => { },
  onSelect = () => { },
  onSubmit = () => { },
  renderItem,
  maxChoice = 0,
  minChoice = 0,
}) => {
  const renderSearch = () => {
    if (searchable) {
      return <SearchBar value={value} onSearch={onSearch} />;
    }
    return null
  };

  const renderSeperator = () => {
    if (searchable) {
      return <Seperator type="vertical" />
    }
    return null
  };

  const renderSingleSelect = () => {
    return (
      <RadioButtonGroup
        data={data}
        onSelect={(item: any, index: number) => {
          if (typeof onSelect === 'function') {
            onSelect(item, index);
          }
        }}
        renderItem={renderItem || undefined}
        onSubmit={(data: any[]) => {
          if (typeof onSubmit === 'function') {
            onSubmit(data);
          }
          setVisible(false);
        }}
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
        }}
        renderItem={renderItem || undefined}
        minChoice={minChoice}
        maxChoice={maxChoice}
        onSubmit={(data: any[]) => {
          if (typeof onSubmit === 'function') {
            onSubmit(data);
          }
          setVisible(false);
        }}
      />
    );
  };

  const renderChildren = () => {
    switch (selectionType) {
      case 'singleSelect':
        return renderSingleSelect();
      case 'multiSelect':
        return renderMultiSelect();
    }
  };

  return (
    <Modal
      type='default'
      visible={visible}
      onTouchOutSide={(v) => {
        setVisible(v);
      }}
      containerStyle={styles.modalContainer}
    >
      {renderSearch()}
      {renderSeperator()}
      {renderChildren()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1
  }
})

export default SelectBoxModal;
