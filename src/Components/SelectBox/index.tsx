import React, { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import {
  FlatListProps,
  ListRenderItemInfo,
  Omit,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Seperator, Text, Button, CheckBox, RadioButton, } from '..';
import type { NavigationProp } from '@react-navigation/core';
import type { ParamListBase } from '@react-navigation/routers';
import SelectBoxModal from './Modal';
import { useThemeContext } from '../../Context/ThemeContext';
import { useBottomSheet } from '../../Context/BottomSheetContext';
import type { ModalizeProps } from 'react-native-modalize';

export interface ISelectBoxProps<ItemT> {
  /**
   * @default true
   */
  active?: boolean;
  /**
   * type to display
   * @default Modal
   */
  displayType: 'Modal' | "BottomSheet" | 'Page';

  /**
   * type to choose
   * @default SingleSelect
   */
  selectionType: 'SingleSelect' | 'MultiSelect';

  /**
   * @default Başlık
   */
  title?: string;

  /**
   * @default Placeholder
   */
  placeholder?: string;

  /**
   * set true if you want to search in given list
   * @default false
   */
  searchable?: boolean;

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

  /**
   * invokes when click the option
   */
  onSelect?: (item: ItemT, index: number) => void;

  /**
   * invokes when selection complete and press submit button
   */
  onSubmit?: (data: ReadonlyArray<ItemT>) => void;

  /**
   * callback if you want render custom item
   */
  renderItem?: (info: ListRenderItemInfo<ItemT>) => React.ReactElement | null;

  /**
   *
   */
  navigation?: NavigationProp<ParamListBase>;

  /**
   *
   */
  page?: string;

  /**
   *
   */
  maxChoice?: number;

  /**
   *
   */
  minChoice?: number;
}

export type ISelectBoxTypes = ISelectBoxProps<any> &
  Omit<FlatListProps<any>, 'data' | 'renderItem'>;

const SelectBox: FC<ISelectBoxTypes> = ({
  active = true,
  displayType = 'Modal',
  selectionType = 'SingleSelect',
  title = 'Başlık',
  placeholder = 'Placeholder',
  searchable = false,
  searchText,
  // onSearch,
  data,
  // onSelect,
  onSubmit,
  renderItem,
  navigation,
  page = 'SelectPage',
  maxChoice,
  minChoice,
}) => {
  const [bottomSheet, setBottomSheet] = useBottomSheet();
  const [bottomSheetData, setBottomSheetData] = useState<any[]>(data as any[]);
  const [dataList, setDataList] = useState<any[]>(data as any[]);
  const [value, setValue] = useState<string>(searchText || '');
  const [visible, setVisible] = useState<boolean>(false);
  const [theme] = useThemeContext();
  const { selectBox, modal } = theme.colors;

  const renderModal = (): ReactNode => {
    return (
      <SelectBoxModal
        visible={visible}
        setVisible={setVisible}
        searchable={searchable}
        value={value}
        setValue={setValue}
        onSearch={(text) => {
          setValue(text);
          if (text.length > 0) {
            const nDataList = data.filter((v) =>
              v.title?.toLowerCase().includes(text.toLowerCase())
            );
            setDataList(nDataList);
          } else {
            setDataList(data as any[]);
          }
        }}
        data={dataList}
        selectionType={selectionType}
        minChoice={minChoice}
        maxChoice={maxChoice}
        onSubmit={(data: any[]) => {
          setDataList(data);
          setBottomSheetData(data);
        }}
      />
    );
  };

  const renderRest = (): ReactNode | null => {
    switch (displayType) {
      case 'Modal':
        return renderModal();
      default:
        return null;
    }
  };

  const openModal = () => {
    setVisible(true);
  };

  const onButtonSelect = (index: number) => {
    if (selectionType === "SingleSelect") {
      const tData = bottomSheetData.map((v, i) => ({ ...v, selected: i === index }));
      setBottomSheetData(tData);
    } else {
      const tData = bottomSheetData.map((v: any, i: number) => ({
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
          setBottomSheetData(mData);
        } else {
          const mData = tData.map((v: any) => ({
            ...v,
            active: true,
          }));
          setBottomSheetData(mData);
        }
      } else {
        setBottomSheetData(tData);
      }
    }
  };

  const isDisabled = (): boolean => {
    if (minChoice && minChoice !== 0) {
      const selectedLength = bottomSheetData.filter((v: any) => v.selected).length;
      return selectedLength < minChoice;
    } else {
      return false;
    }
  };

  const bottomSheetProps: ModalizeProps = {
    adjustToContentHeight: true,
    modalStyle: {
      backgroundColor: modal.containerBackground
    },
    overlayStyle: {
      backgroundColor: modal.outsideBackground,
    },
    handlePosition: "inside",
    childrenStyle: {
      padding: 8
    },
    flatListProps: {
      keyExtractor: (_, index) => index.toString(),
      data: bottomSheetData,
      renderItem: (info: ListRenderItemInfo<any>): ReactElement | null => {
        const { item, index } = info;
        if (selectionType === "SingleSelect") {
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
        } else {
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
        }
      },
      ListHeaderComponent: () => {
        return (
          <Text size="L" style={{ textAlign: "center", marginTop: 12 }}>{title}</Text>
        )
      },
      ListFooterComponent: () => {
        return (
          <Button
            title="Onayla"
            disabled={isDisabled()}
            onPress={() => {
              setDataList(bottomSheetData)
              bottomSheet.close()
            }} />
        )
      }
    }
  }

  const openBottomSheet = () => {
    setBottomSheet({
      props: bottomSheetProps,
    })
    bottomSheet.show();
  }

  useEffect(() => {
    if (displayType === "BottomSheet") {
      setBottomSheet({
        props: bottomSheetProps,
      })
    }
  }, [bottomSheetData])

  const openPage = () => {
    if (!navigation) {
      console.error('Navigation is undefined');
      return;
    }
    if (!page) {
      console.error('page prop is undefined');
      return;
    }

    navigation.navigate(page, {
      title,
      data: dataList,
      setData: setDataList,
      selectionType,
      searchable,
      searchText,
      onSearch: (_navigation: NavigationProp<ParamListBase>, text: string) => {
        setValue(text);
        let nData;
        if (text.length > 0) {
          const nDataList = data.filter((v) =>
            v.title?.toLowerCase().includes(text.toLowerCase())
          );
          setDataList(nDataList);
          nData = nDataList;
        } else {
          setDataList(data as any[]);
          nData = data;
        }
        _navigation.setParams({ searchText: text, data: nData });
      },
      onSubmit: (data: any[]) => {
        setBottomSheetData(data);
        setDataList(data);
        if (typeof onSubmit === 'function') {
          onSubmit(data);
        }
      },
      renderItem,
      minChoice: minChoice,
      maxChoice: maxChoice,
    });
  };

  const onPress = () => {
    switch (displayType) {
      case 'Modal':
        openModal();
        break;
      case 'BottomSheet':
        openBottomSheet();
        break;
      case 'Page':
        openPage();
        break;
    }
  };

  const renderPlaceholder = () => {
    const selectedData = dataList.filter((v) => v.selected);
    if (selectedData.length > 0) {
      let result: string = '';
      selectedData.map((v) => {
        result += v.title + ', ';
      });
      return result.substr(0, result.length - 2);
    } else {
      return placeholder;
    }
  };

  return (
    <TouchableOpacity
      disabled={!active}
      onPress={onPress}
      style={[
        {
          backgroundColor: selectBox[active ? 'active' : 'passive'].background,
          borderColor: selectBox[active ? 'active' : 'passive'].border,
        },
        styles.container,
      ]}
    >
      {
        <Text
          style={{
            color: selectBox[active ? 'active' : 'passive'].title,
          }}
        >
          {title}
        </Text>
      }
      {<Seperator.Vertical height={4} />}
      {
        <Text
          numberOfLines={1}
          style={{
            color:
              renderPlaceholder() === placeholder
                ? selectBox[active ? 'active' : 'passive'].placeholder
                : selectBox[active ? 'active' : 'passive'].value,
          }}
        >
          {renderPlaceholder()}
        </Text>
      }
      {renderRest()}
    </TouchableOpacity>
  );
};

export default SelectBox;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
