import React, { FC, isValidElement, memo, ReactElement, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { makeColorPassive } from '../../Utils';
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
  title?: string | ReactElement

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
  const { spaces } = tokens

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
              borderColor: active ? colors.primary : selected ? colors.transparent : makeColorPassive(colors.primary),
              backgroundColor: selected ? active ? colors.primary : makeColorPassive(colors.primary) : colors.transparent,
            },
          ]}
        >
          {
            selected ? (
              <Icon
                family="FontAwesome"
                name="check"
                size={16}
                color={active ? colors.componentBackground : makeColorPassive(colors.componentBackground)
                }
              />
            ) : null}
        </View >
      );
    }
  };

  const renderSeperator = (): ReactElement => {
    return <Seperator type="horizontal" size="large" />
  }

  const renderTitle = (): ReactElement | null => {
    if (typeof title === "string") {
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
    if (isValidElement(title)) {
      return title
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
            paddingVertical: spaces.componentVertical,
            paddingHorizontal: spaces.componentHorizontal
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
