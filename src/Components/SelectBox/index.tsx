import React, { FC, Fragment, isValidElement, ReactNode, useEffect, useState } from 'react';
import {
  Animated,
  FlatListProps,
  ListRenderItemInfo,
  Omit,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Seperator, Text, CheckBoxGroup, RadioButtonGroup } from '..';
import type { NavigationProp } from '@react-navigation/core';
import type { ParamListBase } from '@react-navigation/routers';
import { useTheme } from '../../Context/Theme';
import { useBottomSheet, useSetBottomSheet } from '../../Context/BottomSheet';
import type { ITextProps } from '../Text';
import type { IIconProps } from '../Icon';
import Icon from '../Icon';
import { getBottomSpace } from '../../Utils';
import { useModal, useSetModal } from '../../Context/Modal';

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
   *
   */
  icon?: IIconProps | ReactNode;

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
   * @default Başlık
   */
  onSubmitTitle?: string;

  /**
   *  
   */
  onSubmitTitleWeight?: ITextProps["weigth"]

  /**
   *  
   */
  onSubmitTitleSize?: ITextProps["size"]

  /**
   * 
   */
  onSubmitTitleStyle?: ITextProps["style"]

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
  icon,
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
  onSubmitTitle,
  onSubmitTitleSize,
  onSubmitTitleWeight,
  onSubmitTitleStyle,
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

  const Modal = useModal();
  const setModal = useSetModal()
  
  const theme = useTheme();
  const { colors, tokens } = theme;
  const { selectBox, common, modal } = colors;
  const { component } = tokens

  const [dataList, setDataList] = useState<any[]>(data as any[]);
  // const [value, setValue] = useState<string>(searchText || '');

  const STATE: keyof ColorScheme["selectBox"] = active ? "active" : "passive";

  // TODO: gözden geçir
  useEffect(() => {
    setDataList(data as any[])
  }, [data])

  const onSubmitSelection = (data: any) => {
    if (typeof onSubmit === 'function') {
      onSubmit(data);
    }
    switch (displayType) {
      case "bottomSheet":
        return bottomSheet.close()
      case "modal":
        return Modal.close();
      case "page":
        navigation?.goBack();
    }
  }

  const renderContent = () => {
    if (selectionType === "singleSelect") {
      return (
        <RadioButtonGroup
          data={dataList}
          onSelect={() => { }}
          submitTitle={onSubmitTitle}
          submitTitleSize={onSubmitTitleSize}
          submitTitleWeight={onSubmitTitleWeight}
          submitTitleStyle={onSubmitTitleStyle}
          onSubmit={onSubmitSelection}
        />
      )
    }
    if (selectionType === "multiSelect") {
      return (
        <CheckBoxGroup
          data={dataList}
          onSelect={() => { }}
          minChoice={minChoice}
          maxChoice={maxChoice}
          submitTitle={onSubmitTitle}
          submitTitleSize={onSubmitTitleSize}
          submitTitleWeight={onSubmitTitleWeight}
          submitTitleStyle={onSubmitTitleStyle}
          onSubmit={onSubmitSelection}
        />
      )
    }
    return null
  }

  const openModal = () => {
    setModal({
      props: {
        onTouchOutSide: () => Modal.close()
      },
      renderChildren: renderContent
    })
    Modal.show()
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
        },
        disableScrollIfPossible: false,
        customRenderer: (
          <Animated.View style={{ height: "100%" }}>
            {renderContent()}
          </Animated.View >
        ),
        HeaderComponent: () => (
          <Text size={"l"} style={{ marginTop: 12, textAlign: "center" }}>{title}</Text>
        ),
        FooterComponent: <View style={{ height: getBottomSpace() }} />
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
        // setValue(text);
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

  //#region Render Funcrions

  const renderIcon = () => {
    if (icon) {
      if (isValidElement(icon)) {
        return icon;
      } else {
        const CoreIcon = icon as IIconProps;
        return (
          <View style={styles.iconContainer}>
            <Icon
              family={CoreIcon.family}
              name={CoreIcon.name}
              size={CoreIcon.size}
              color={CoreIcon.color || error ? common.error : selectBox[STATE].title}
            />
          </View>
        );
      }
    }
    return null
  };

  const renderSeperator = () => {
    if (icon) {
      return (
        <Seperator type='horizontal' size={"medium"} />
      )
    }
    return null
  }

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

  const renderValue = () => {
    return (
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
    )
  }

  const renderTitleAndValue = () => {
    return (
      <View>
        {renderTitle()}
        <Seperator type="vertical" size="small" style={[styles.seperator]} />
        {renderValue()}
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

  //#endregion

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
        {renderIcon()}
        {renderSeperator()}
        {renderTitleAndValue()}
      </TouchableOpacity>
      {renderWarning()}
      {renderError()}
      {/* {renderRest()} */}
    </Fragment>
  );
};

export default SelectBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center"
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