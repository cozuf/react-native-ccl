import React, { FC, Fragment, ReactNode, useState } from 'react';
import {
  FlatListProps,
  ListRenderItemInfo,
  Omit,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Seperator, Text } from '..';
import type { NavigationProp } from '@react-navigation/core';
import type { ParamListBase } from '@react-navigation/routers';
import SelectBoxModal from './Modal';
import { useTheme } from '../../Context/Theme';
import { useBottomSheet, useSetBottomSheet } from '../../Context/BottomSheet';
import SelectBoxBottomSheet from './BottomSheet';
import type { ITextProps } from '../Text';

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
   *  
   */
  titleWeight?: ITextProps["weigth"]

  /**
   *  
   */
  titleSize?: ITextProps["size"]

  /**
   * 
   */
  titleStyle?: ITextProps["style"]

  /**
   * 
   */
  titleContainerStyle?: StyleProp<ViewStyle>

  /**
   * @default Placeholder
   */
  placeholder?: string;

  /**
   *  
   */
  valueWeight?: ITextProps["weigth"]

  /**
   *  
   */
  valueSize?: ITextProps["size"]

  /**
   * 
   */
  valueStyle?: ITextProps["style"]

  /**
   * 
   */
  valueContainerStyle?: StyleProp<ViewStyle>

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

  /**
   *
   */
  warning?: string

  /**
   *  
   */
  warningWeight?: ITextProps["weigth"]

  /**
   *  
   */
  warningSize?: ITextProps["size"]

  /**
   *
   */
  warningStyle?: ViewStyle

  /**
   *
   */
  warningContainerStyle?: StyleProp<View>

  /**
   *
   */
  error?: string

  /**
   *  
   */
  errorWeight?: ITextProps["weigth"]

  /**
   *  
   */
  errorSize?: ITextProps["size"]

  /**
   *
   */
  errorStyle?: ViewStyle

  /**
   *
   */
  errorContainerStyle?: StyleProp<View>
}

export interface ISelectBoxTypes extends ISelectBoxProps<any>, Omit<FlatListProps<any>, 'data' | 'renderItem'> { }

const SelectBox: FC<ISelectBoxTypes> = ({
  testID,
  active = true,
  displayType = 'modal',
  selectionType = 'singleSelect',
  title = 'Başlık',
  titleSize = "m",
  titleWeight = "regular",
  titleStyle,
  titleContainerStyle,
  placeholder = 'Placeholder',
  valueSize = "m",
  valueWeight = "regular",
  valueStyle,
  valueContainerStyle,
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
  error,
  errorSize = "m",
  errorWeight = "regular",
  errorStyle,
  errorContainerStyle,
  warning,
  warningSize = "m",
  warningWeight = "regular",
  warningStyle,
  warningContainerStyle,
}) => {
  const bottomSheet = useBottomSheet();
  const setBottomSheet = useSetBottomSheet();
  const [dataList, setDataList] = useState<any[]>(data as any[]);
  const [value, setValue] = useState<string>(searchText || '');
  const [visible, setVisible] = useState<boolean>(false);
  const theme = useTheme();
  const { colors, tokens } = theme;
  const { selectBox, common, modal } = colors;
  const { component } = tokens

  const STATE: keyof ColorScheme["selectBox"] = active ? "active" : "passive";

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
          if (typeof onSubmit === 'function') {
            onSubmit(data);
          }
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
              if (typeof onSubmit === 'function') {
                onSubmit(data);
              }
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

  const renderTitle = () => {
    return (
      <View style={[styles.titleContainer, titleContainerStyle]}>
        <Text
          size={titleSize}
          weigth={titleWeight}
          style={
            [
              {
                color: selectBox[STATE].title,
              },
              styles.title,
              titleStyle
            ]
          }
        >
          {title}
        </Text>
      </View>
    )
  }

  const renderWarning = () => {
    if (warning) {
      return (
        <View style={[styles.warningContainer, warningContainerStyle]}>
          <Text weigth={warningWeight} size={warningSize} style={[styles.warning, { color: common.warning }, warningStyle]}>{warning}</Text>
        </View>
      )
    }
    return null
  };

  const renderError = () => {
    if (error) {
      return (
        <View style={[styles.errorContainer, errorContainerStyle]}>
          <Text weigth={errorWeight} size={errorSize} style={[styles.error, { color: common.error }, errorStyle]}>{error}</Text>
        </View>
      )
    }
    return null
  };

  return (
    <Fragment>
      <TouchableOpacity
        testID={testID}
        disabled={!active}
        onPress={onPress}
        style={[
          {
            borderWidth: component.border,
            borderRadius: component.radius,
            paddingVertical: component.vertical,
            paddingHorizontal: component.horizontal,
            backgroundColor: selectBox[STATE].background,
            borderColor: error ? common.error : selectBox[STATE].border,
          },
          styles.container,
          containerStyle
        ]}
      >
        {renderTitle()}
        <Seperator type="vertical" size="small" style={[styles.seperator]} />
        <View
          style={[styles.valueContainer, valueContainerStyle]}>
          <Text
            numberOfLines={1}
            size={valueSize}
            weigth={valueWeight}
            style={[
              {
                color:
                  renderPlaceholder() === placeholder
                    ? selectBox[STATE].placeholder
                    : selectBox[STATE].value,
              },
              styles.value,
              valueStyle
            ]}
          >
            {renderPlaceholder()}
          </Text>
        </View>
        {renderRest()}
      </TouchableOpacity>
      {renderWarning()}
      {renderError()}
    </Fragment>
  );
};

export default SelectBox;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  titleContainer: {},
  title: {},
  seperator: {},
  valueContainer: {},
  value: {},
  warningContainer: {},
  warning: {},
  errorContainer: {},
  error: {},
})