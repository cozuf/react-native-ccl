import React, { FC, isValidElement, memo, ReactElement, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Icon, IIconProps, ITextProps, Text, Seperator } from '..';
import { useTheme } from '../../Context/Theme';

export interface ICheckBoxProps {
  /**
   * 
   */
  testID?: string

  /**
   * @default true
   */
  active?: boolean;

  /**
   * @default false
   */
  selected: boolean;

  /**
   * to show value
   */
  title?: string;

  /**
   * unique value
   */
  value: any;

  /**
   *
   */
  iconSet?: {
    selected: IIconProps | ReactNode;
    notSelected: IIconProps | ReactNode;
  };

  /**
   * invokes select item
   */
  onSelect?: (selectedValue: any, selected: boolean) => void;

  /**
   * 
   */
  containerStyle?: ViewStyle

  /**
   * 
   */
  titleContainerStyle?: ViewStyle

  /**
   * 
   */
  titleStyle?: ITextProps["style"]

  /**
   *  
   */
  titleWeight?: ITextProps["weigth"]

  /**
   *  
   */
  titleSize?: ITextProps["size"]
}

const CheckBox: FC<ICheckBoxProps> = ({
  testID,
  active = true,
  selected,
  title = `Check Box ${selected ? 1 : 0}`,
  value,
  iconSet,
  onSelect,
  containerStyle,
  titleContainerStyle,
  titleStyle,
  titleSize = "m",
  titleWeight = "regular"
}) => {
  const theme = useTheme();
  const { colors, tokens } = theme
  const { checkBox } = colors
  const { component } = tokens

  const STATE: keyof ColorScheme["checkBox"] = active ? "active" : "passive"


  const renderIcon = (): ReactElement | null => {
    if (iconSet) {
      if (selected) {
        if (isValidElement(iconSet.selected)) {
          return iconSet.selected;
        } else {
          const coreIcon = iconSet.selected as IIconProps;
          return <Icon {...coreIcon} />;
        }
      } else {
        if (isValidElement(iconSet.notSelected)) {
          return iconSet.notSelected;
        } else {
          const coreIcon = iconSet.notSelected as IIconProps;
          return <Icon {...coreIcon} />;
        }
      }
    } else {
      return (
        <View
          style={[
            styles.iconContainer,
            {
              borderWidth: 2,
              borderRadius: 4,
              borderColor: checkBox[STATE].iconBorder,
              backgroundColor: selected
                ? checkBox[STATE].iconBorder
                : 'transparent',
            },
          ]}
        >
          {selected ? (
            <Icon
              family="Feather"
              name="check"
              size={16}
              color={checkBox[STATE].icon}
            />
          ) : null}
        </View>
      );
    }
  };

  const renderSeperator = (): ReactElement => {
    return <Seperator type="horizontal" size="large" />
  }

  const renderTitle = (): ReactElement | null => {
    if (title) {
      return (
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <Text
            size={titleSize}
            weigth={titleWeight}
            style={[styles.title, titleStyle]}>
            {title}
          </Text>
        </View>
      )
    }
    return null;
  };

  return (
    <TouchableOpacity
      testID={testID}
      key={value}
      disabled={!active}
      style={
        [
          styles.container,
          {
            paddingVertical: component.vertical,
            paddingHorizontal: component.horizontal,
          },
          containerStyle,
        ]
      }
      onPress={() => {
        if (typeof onSelect === 'function') {
          onSelect(value, !selected);
        }
      }}
    >
      {renderIcon()}
      {renderSeperator()}
      {renderTitle()}
    </TouchableOpacity>
  );
};

export default memo(CheckBox);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {},
  title: {},
  seperator: {},
  iconContainer: {
    minHeight: 24,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

// FIXME: Text font weight düzeltilmeli