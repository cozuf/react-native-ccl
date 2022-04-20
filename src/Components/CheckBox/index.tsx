import React, { FC, isValidElement, memo, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Icon, IIconProps, Text, Seperator } from '..';
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
  value?: any;

  /**
   *
   */
  iconSet?: {
    selected: IIconProps | React.ReactNode;
    notSelected: IIconProps | React.ReactNode;
  };

  /**
   * invokes select item
   */
  onSelect?: (selected: boolean) => void;

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
  titleStyle?: ViewStyle
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
  titleStyle
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected);
  const theme = useTheme();
  const { colors, tokens } = theme
  const { checkBox } = colors
  const { component } = tokens

  const STATE: keyof ColorScheme["checkBox"] = active ? "active" : "passive"

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const renderIcon = (): React.ReactElement | null => {
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
              borderWidth: component.border,
              borderRadius: component.semiRadius,
              borderColor: checkBox[STATE].iconBorder,
              backgroundColor: isSelected
                ? checkBox[STATE].iconBorder
                : 'transparent',
            },
          ]}
        >
          {isSelected ? (
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

  const renderSeperator = (): React.ReactElement => {
    return <Seperator type="horizontal" size="large" />
  }

  const renderTitle = (): React.ReactElement | null => {
    if (title) {
      return (
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <Text style={[styles.title, titleStyle]}>
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
        setIsSelected(!isSelected);
        if (typeof onSelect === 'function') {
          onSelect(!isSelected);
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