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
import { Seperator, Text, ITextProps, CheckBoxGroup, RadioButtonGroup, Icon, IIconProps } from '..';
import { useTheme } from '../../Context/Theme';
import { useBottomSheet, useSetBottomSheet } from '../../Context/BottomSheet';
import { useModal, useSetModal } from '../../Context/Modal';
import { getBottomSpace, makeColorPassive } from '../../Utils';

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
  onSubmit?: (data: ReadonlyArray<ItemT>, selectedItems: ReadonlyArray<ItemT>) => void;

  /**
   * 
   */
  onComponentPress?: () => void

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

  /**
   * 
   */
  containerStyle?: ViewStyle

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
  // searchText,
  onSearch,
  data,
  onSelect,
  onComponentPress,
  onSubmitTitle,
  onSubmitTitleSize,
  onSubmitTitleWeight,
  onSubmitTitleStyle,
  onSubmit,
  renderItem,
  maxChoice,
  minChoice,
  containerStyle,
  error,
  errorSize = "m",
  errorWeight = "regular",
  errorStyle,
  errorContainerStyle
}) => {
  const bottomSheet = useBottomSheet();
  const setBottomSheet = useSetBottomSheet();

  const Modal = useModal();
  const setModal = useSetModal()

  const theme = useTheme();
  const { colors, tokens } = theme;
  const { innerSpace, borders, radiuses } = tokens

  const [dataList, setDataList] = useState<any[]>(data as any[]);
  // const [value, setValue] = useState<string>(searchText || '');

  useEffect(() => { setDataList(data as any[]) }, [data])

  const onSubmitSelection = (data: any[], seletedItems: any[]) => {
    setDataList(data)
    if (typeof onSubmit === 'function') {
      onSubmit(data, seletedItems);
    }
    switch (displayType) {
      case "bottomSheet":
        return bottomSheet.close()
      case "modal":
        return Modal.close()
    }
  }

  const renderContent = () => {
    if (selectionType === "singleSelect") {
      return (
        <RadioButtonGroup
          showsVerticalScrollIndicator={false}
          data={dataList}
          searchable={searchable}
          renderItem={renderItem}
          onSelect={onSelect}
          onSearch={onSearch}
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
          showsVerticalScrollIndicator={false}
          data={dataList}
          searchable={searchable}
          renderItem={renderItem}
          onSelect={onSelect}
          onSearch={onSearch}
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
        containerStyle: { flex: searchable ? 1 : undefined, maxHeight: "100%", minHeight: "50%" }
      },
      renderChildren: renderContent
    })
    Modal.show()
  };

  const openBottomSheet = () => {
    setBottomSheet({
      props: {
        adjustToContentHeight: searchable ? false : true,
        modalStyle: {
          backgroundColor: colors.pageBackground
        },
        overlayStyle: {
          backgroundColor: colors.modalOutside
        },
        handlePosition: "inside",
        childrenStyle: {
        },

        disableScrollIfPossible: false,
        customRenderer: (
          <Animated.View style={{
            height: searchable ? "100%" : undefined,
            maxHeight: "100%",
            paddingVertical: innerSpace.componentVertical,
            paddingHorizontal: innerSpace.componentHorizontal,
          }}>
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

  const onPress = () => {
    switch (displayType) {
      case 'modal':
        openModal();
        break;
      case 'bottomSheet':
        openBottomSheet();
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
              color={CoreIcon.color || error ? colors.error : active ? colors.text : makeColorPassive(colors.text)}
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
        <Seperator type='horizontal' size={innerSpace.componentVertical} />
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
        <Fragment>
          <View style={[styles.titleContainer, titleContainerStyle]}>
            <Text
              active={active}
              size={titleSize}
              weigth={titleWeight}
              style={
                [
                  error ?
                    {
                      color: colors.error
                    }
                    :
                    {},
                  styles.title,
                  titleStyle
                ]
              }
            >
              {title}
            </Text>
          </View>
          <Seperator type="vertical" size="small" style={[styles.seperator]} />
        </Fragment>
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
        {renderValue()}
      </View>
    )
  }

  const renderErrorSeperator = () => {
    if (error) {
      return <Seperator type='vertical' size={2} />
    }
    return null
  }

  const renderError = () => {
    if (error) {
      return (
        <View style={[{ paddingHorizontal: innerSpace.componentHorizontal }, styles.errorContainer, errorContainerStyle]}>
          <Text weigth={errorWeight} size={errorSize} style={[styles.error, { color: colors.error }, errorStyle]}>{error}</Text>
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
        onPress={onComponentPress || onPress}
        style={[
          {
            borderWidth: error ? borders.textInputFocused : borders.component,
            borderRadius: radiuses.component,
            paddingVertical: innerSpace.componentVertical,
            paddingHorizontal: innerSpace.componentHorizontal,
            backgroundColor: colors.componentBackground,
            borderColor: error ? colors.error : colors.text,
          },
          styles.container,
          containerStyle
        ]}
      >
        {renderIcon()}
        {renderSeperator()}
        {renderTitleAndValue()}
      </TouchableOpacity>
      {renderErrorSeperator()}
      {renderError()}
    </Fragment>
  );
};

export default SelectBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
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