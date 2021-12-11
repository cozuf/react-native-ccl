import React, { FC, ReactNode, useState } from 'react';
import {
  FlatListProps,
  ListRenderItemInfo,
  Omit,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Seperator, Text } from '..';
import type { NavigationProp } from '@react-navigation/core';
import type { ParamListBase } from '@react-navigation/routers';
import SelectBoxModal from './Modal';
import { useTheme } from '../../Context/Theme';
import { useBottomSheet } from '../../Context/BottomSheet';
import SelectBoxBottomSheet from './BottomSheet';

export interface ISelectBoxProps<ItemT> {
  /**
   * 
   */
  testID?: string

  /**
   * @default true
   */
  active?: boolean;
  /**
   * type to display
   * @default Modal
   */
  displayType: 'modal' | "bottomSheet" | 'page';

  /**
   * type to choose
   * @default SingleSelect
   */
  selectionType: 'singleSelect' | 'multiSelect';

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

  /**
   * 
   */
  containerStyle?: ViewStyle
}

export type ISelectBoxTypes = ISelectBoxProps<any> &
  Omit<FlatListProps<any>, 'data' | 'renderItem'>;

const SelectBox: FC<ISelectBoxTypes> = ({
  testID,
  active = true,
  displayType = 'modal',
  selectionType = 'singleSelect',
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
  containerStyle,
}) => {
  const [bottomSheet, setBottomSheet] = useBottomSheet();
  const [dataList, setDataList] = useState<any[]>(data as any[]);
  const [value, setValue] = useState<string>(searchText || '');
  const [visible, setVisible] = useState<boolean>(false);
  const [theme] = useTheme();
  const { colors, styles } = theme;
  const { selectBox, modal } = colors;
  const { selectBoxStyle } = styles

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
        }}
      />
    );
  };

  const renderRest = (): ReactNode | null => {
    switch (displayType) {
      case 'modal':
        return renderModal();
      default:
        return null;
    }
  };

  const openModal = () => {
    setVisible(true);
  };

  const openBottomSheet = () => {
    setBottomSheet({
      props: {
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
      },
      renderContent: () => {
        return (
          <SelectBoxBottomSheet
            title={title}
            data={dataList}
            selectionType={selectionType}
            minChoice={minChoice}
            maxChoice={maxChoice}
            onSubmit={(data: any[]) => {
              setDataList(data);
              bottomSheet.close()
            }}
          />
        )
      }
    })
    bottomSheet.show();
  }

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
      case 'modal':
        openModal();
        break;
      case 'bottomSheet':
        openBottomSheet();
        break;
      case 'page':
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
      testID={testID}
      disabled={!active}
      onPress={onPress}
      style={[
        containerStyle,
        {
          backgroundColor: selectBox[active ? 'active' : 'passive'].background,
          borderColor: selectBox[active ? 'active' : 'passive'].border,
        },
        selectBoxStyle?.container,
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
      {<Seperator type="vertical" size="small" />}
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
