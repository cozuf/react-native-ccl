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
import { getBottomSpace, makeColorPassive } from '../../Utils';
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
   * 
   */
  textsContainerStyle?: StyleProp<ViewStyle>

  /**
   * @default true
   */
  showTitle?: boolean;

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
  textsContainerStyle,
  showTitle = true,
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
  const { page: pageTokens, component } = tokens

  const [dataList, setDataList] = useState<any[]>(data as any[]);
  // const [value, setValue] = useState<string>(searchText || '');

  // TODO: gözden geçir
  useEffect(() => {
    setDataList(data as any[])
  }, [data])

  const onSubmitSelection = (data: any) => {
    setDataList(data)
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
        onTouchOutSide: () => Modal.close(),
        containerStyle: { maxHeight: "100%", minHeight: "50%" }
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
          backgroundColor: colors.componentBackground
        },
        overlayStyle: {
          backgroundColor: colors.modalOutside
        },
        handlePosition: "inside",
        childrenStyle: {
        },
        disableScrollIfPossible: false,
        customRenderer: (
          <Animated.View style={{ maxHeight: "100%", paddingVertical: pageTokens.vertical, paddingHorizontal: pageTokens.horizontal }}>
            {renderContent()}
          </Animated.View >
        ),
        HeaderComponent: () => (
          <Fragment>
            <Seperator type='vertical' size={"medium"} />
            <Text size={"l"} weigth="bold" style={{ marginTop: 12, textAlign: "center" }}>{title}</Text>
          </Fragment>
        ),
        FooterComponent: <Seperator type='vertical' size={getBottomSpace()} />
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
              color={CoreIcon.color || error ? colors.destructive : active ? colors.text : makeColorPassive(colors.text)}
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
        <Seperator type='horizontal' size={"large"} />
      )
    }
    return null
  }

  const renderPlaceholder = () => {
    const selectedData = dataList.filter((v) => v.selected);
    if (selectedData.length > 0) {
      return selectedData.map((v) => v.title).join(" - ")
    } else {
      return placeholder;
    }
  };

  const renderTitle = () => {
    if (showTitle) {
      return (
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <Text
            active={active}
            size={titleSize}
            weigth={titleWeight}
            style={
              [
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
    return null
  }

  const renderValue = () => {
    return (
      <View
        style={[styles.valueContainer, valueContainerStyle]}>
        <Text
          active={active}
          numberOfLines={1}
          size={valueSize}
          weigth={valueWeight}
          style={[
            renderPlaceholder() === placeholder ?
              {
                color: active ? colors.placeholder : makeColorPassive(colors.placeholder)
              }
              :
              {},
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
      <View style={[styles.textsContainer, textsContainerStyle]}>
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
          <Text weigth={warningWeight} size={warningSize} style={[styles.warning, { color: colors.warning }, warningStyle]}>{warning}</Text>
        </View>
      )
    }
    return null
  };

  const renderError = () => {
    if (error) {
      return (
        <View style={[styles.errorContainer, errorContainerStyle]}>
          <Text weigth={errorWeight} size={errorSize} style={[styles.error, { color: colors.destructive }, errorStyle]}>{error}</Text>
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
            backgroundColor: colors.componentBackground,
            borderColor: error ? colors.destructive : colors.text,
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
  textsContainer: {
    flex: 1,
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