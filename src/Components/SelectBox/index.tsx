import React, { FC, Fragment, isValidElement, ReactElement, ReactNode, useEffect, useState } from 'react';
import {
  Animated,
  FlatListProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Seperator, Text, ITextProps, CheckBoxGroup, RadioButtonGroup, Icon, IListItem, IIconProps, Button, SearchBar } from '..';
import { useTheme } from '../../Context/Theme';
import { useBottomSheet, useSetBottomSheet } from '../../Context/BottomSheet';
import { useModal, useSetModal } from '../../Context/Modal';
import { getBottomSpace, makeColorPassive } from '../../Utils';;

export type ListItemType = Required<IListItem>

export interface ISelectBoxProps<ItemT extends ListItemType> {
  //#region ComponentProps
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
   * @default modal
   */
  displayType: 'modal' | 'bottomSheet';

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
   * 
   */
  containerStyle?: ViewStyle

  /**
   * 
   */
  rightContainer?: () => ReactElement | null

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
  //#endregion

  //#region Selector Props
  /**
   * set true if you want to search in given list
   * @default false
   */
  searchable?: boolean;

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
  submitTitle?: string;

  /**
   *  
   */
  submitTitleWeight?: ITextProps["weigth"]

  /**
   *  
   */
  submitTitleSize?: ITextProps["size"]

  /**
   * 
   */
  submitTitleStyle?: ITextProps["style"]

  /**
   * invokes when selection complete and press submit button
   */
  onSubmit?: (selectedItems: ReadonlyArray<ItemT>, data: ReadonlyArray<ItemT>) => void;

  /**
   *
   */
  selectAllTitle?: string;

  /**
   *
   */
  unSelectAllTitle?: string;

  /**
   * 
   */
  onComponentPress?: () => void

  /**
   * callback if you want render custom item
   */
  renderItem?: (item: ItemT, index: number) => ReactElement | null;

  /**
   *
   */
  maxChoice?: number;

  /**
   *
   */
  minChoice?: number;
  //#endregion
}

export interface ISelectBoxTypes extends ISelectBoxProps<any>, Omit<FlatListProps<any>, 'data' | 'renderItem'> { }

const SelectBox: FC<ISelectBoxTypes> = ({
  testID,
  active = true,
  displayType = 'modal',
  selectionType = 'singleSelect',
  icon,
  textsContainerStyle,
  title,
  titleSize = "m",
  titleWeight = "regular",
  titleStyle,
  titleContainerStyle,
  placeholder = 'Placeholder',
  valueSize = "m",
  valueWeight = "regular",
  valueStyle,
  valueContainerStyle,
  containerStyle,
  error,
  errorSize = "m",
  errorWeight = "regular",
  errorStyle,
  errorContainerStyle,
  searchable = false,
  onSearch = () => { },
  data,
  onSelect,
  onComponentPress,
  submitTitle,
  submitTitleSize,
  submitTitleWeight,
  submitTitleStyle,
  onSubmit,
  // selectAllTitle,
  // unSelectAllTitle,
  renderItem,
  maxChoice,
  minChoice,
  rightContainer
}) => {
  const bottomSheet = useBottomSheet()
  const setBottomSheet = useSetBottomSheet()

  const modal = useModal()
  const setModal = useSetModal()

  const { colors, tokens } = useTheme()
  const { spaces, borders, radiuses } = tokens;

  const [searchText, setSearchText] = useState<string>("")
  const [dataList, setDataList] = useState<any[]>(data as any[])
  const [resultList, setResultList] = useState<any[]>(data as any[])

  useEffect(() => { setDataList(data as any[]) }, [data])

  useEffect(() => {
    if (searchText.length > 0) {
      setDataList((old) => old.filter((v) => (v.title as string).toLowerCase().includes(searchText.toLowerCase())))
    } else {
      setDataList(data as any[])
    }
  }, [searchText])

  useEffect(() => {
    renderDisplayer()
  }, [dataList])

  const onCustomSelect = (item: any, index: number) => {
    if (selectionType === "singleSelect") {
      setDataList((old) => old.map((v) => ({ ...v, selected: v.value === item.value })))
    }
    if (selectionType === "multiSelect") {
      setDataList((old) => old.map((v) => ({ ...v, selected: v.value === item.value ? item.selected : v.selected })))
    }
    if (typeof onSelect === "function") {
      onSelect(item, index)
    }
  }

  const onSubmitSelection = () => {
    const selectedItems = dataList.filter((v) => v.selected)
    setResultList(dataList)
    if (typeof onSubmit === 'function') {
      onSubmit(selectedItems, dataList);
    }
    setSearchText("")
    closeDisplayer()
  }

  const openModal = () => {
    modal.show()
  };

  const openBottomSheet = () => {
    bottomSheet.show();
  }

  const openDisplayer = () => {
    switch (displayType) {
      case 'modal':
        openModal();
        break;
      case 'bottomSheet':
        openBottomSheet();
        break;
    }
  }

  const closeDisplayer = () => {
    switch (displayType) {
      case "bottomSheet":
        return bottomSheet.close()
      case "modal":
        return modal.close()
    }
  }

  //#region Render Displayer
  const renderHeader = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View >
          <Button
            wrap='free'
            type='simplied'
            childType='icon'
            icon={{
              family: "Ionicons",
              name: "close",
              size: 24,
              color: colors.pageBackground
            }}
            onPress={() => { }} />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text size={"l"} weigth="bold" style={{ textAlign: "center" }}>{title}</Text>
        </View>
        <View >
          <Button
            wrap='free'
            type='simplied'
            childType='icon'
            icon={{
              family: "Ionicons",
              name: "close",
              size: 24,
              color: colors.text
            }}
            onPress={closeDisplayer} />
        </View>
      </View>
    )
  }

  const renderSearch = () => {
    if (searchable) {
      return (
        <SearchBar
          value={searchText}
          onSearch={(t) => {
            setSearchText(t)
            onSearch(t)
          }}
        />
      )
    }
    return null
  }

  const renderOptions = () => {
    if (selectionType === "singleSelect") {
      return (
        <RadioButtonGroup
          showsVerticalScrollIndicator={false}
          data={dataList}
          renderItem={renderItem}
          onSelect={onCustomSelect}
        />
      )
    }
    if (selectionType === "multiSelect") {
      return (
        <CheckBoxGroup
          showsVerticalScrollIndicator={false}
          data={dataList}
          renderItem={renderItem}
          onSelect={onCustomSelect}
          minChoice={minChoice}
          maxChoice={maxChoice}
        />
      )
    }
    return null
  }

  const renderSubmitButton = () => {
    return (
      <Button
        disabled={!dataList.some((v) => v.selected)}
        title={submitTitle}
        titleSize={submitTitleSize}
        titleWeight={submitTitleWeight}
        titleStyle={submitTitleStyle}
        onPress={onSubmitSelection}
      />
    )
  }

  const renderContent = () => {
    return (
      <Fragment>
        {renderHeader()}
        <Seperator type='vertical' />
        {renderSearch()}
        <Seperator type='vertical' />
        {renderOptions()}
        <Seperator type='vertical' />
        {renderSubmitButton()}
      </Fragment>
    )
  }

  const renderDisplayer = () => {
    if (displayType === "modal") {
      setModal({
        props: {
          onTouchOutSide: modal.close,
          containerStyle: { flex: searchable ? 1 : undefined, maxHeight: "100%" }
        },
        renderChildren: renderContent
      })
    }

    if (displayType === "bottomSheet") {
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
              paddingVertical: spaces.componentVertical,
              paddingHorizontal: spaces.componentHorizontal,
            }}>
              {renderContent()}
            </Animated.View >
          ),
          HeaderComponent: () => null,
          FooterComponent: <Seperator type='vertical' size={getBottomSpace()} />
        }
      })
    }
  }
  //#endregion

  const onPress = () => {
    renderDisplayer()
    openDisplayer()
  };

  //#region Render Component Funcrions

  const renderIcon = () => {
    if (icon) {
      if (isValidElement(icon)) {
        return icon;
      } else {
        const CoreIcon = icon as IIconProps;
        return (
          <View style={styles.sideContainer}>
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

  const renderSeperator = (shouldItBe: boolean) => {
    if (shouldItBe) {
      return (
        <Seperator type='horizontal' size={spaces.componentVertical} />
      )
    }
    return null
  }

  const renderPlaceholder = () => {
    const selectedData = resultList.filter((v) => v.selected);
    if (selectedData.length > 0) {
      return selectedData.map((v) => v.title).join(" - ")
    } else {
      return placeholder;
    }
  };

  const renderTitle = () => {
    if (title) {
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

  const renderRight = () => {
    if (typeof rightContainer === "function") {
      return (
        <View style={styles.sideContainer}>
          {rightContainer()}
        </View>
      )
    }
    return null
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
        <View style={[{ paddingHorizontal: spaces.componentHorizontal }, styles.errorContainer, errorContainerStyle]}>
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
            paddingVertical: spaces.componentVertical,
            paddingHorizontal: spaces.componentHorizontal,
            backgroundColor: colors.componentBackground,
            borderColor: error ? colors.error : colors.text,
          },
          styles.container,
          containerStyle
        ]}
      >
        {renderIcon()}
        {renderSeperator(icon !== undefined)}
        {renderTitleAndValue()}
        {renderSeperator(typeof rightContainer === "function")}
        {renderRight()}
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
  sideContainer: {
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