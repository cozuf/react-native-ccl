import React, { FC, isValidElement, memo, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, IIconProps, Text } from '..';
import { useThemeContext } from '../../Context/ThemeContext';
import { TOKENS } from '../../Theme';

export interface ICheckBoxProps {
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
}

const CheckBox: FC<ICheckBoxProps> = ({
  active = true,
  selected,
  title = `Check Box ${selected ? 1 : 0}`,
  value,
  iconSet,
  onSelect,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected);
  const [theme] = useThemeContext();
  const { checkBox } = theme.colors;

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
              borderColor: checkBox[active ? 'active' : 'passive'].iconBorder,
              backgroundColor: isSelected
                ? checkBox[active ? 'active' : 'passive'].iconBorder
                : 'transparent',
            },
          ]}
        >
          {isSelected ? (
            <Icon
              family="Feather"
              name="check"
              size={16}
              color={checkBox[active ? 'active' : 'passive'].icon}
            />
          ) : null}
        </View>
      );
    }
  };

  const renderTitle = (): React.ReactElement | null => {
    if (title) {
      return <Text>{title}</Text>;
    } else {
      return null;
    }
  };

  return (
    <TouchableOpacity
      key={value}
      disabled={!active}
      style={[styles.container]}
      onPress={() => {
        setIsSelected(!isSelected);
        if (typeof onSelect === 'function') {
          onSelect(!isSelected);
        }
      }}
    >
      {renderIcon()}
      {renderIcon() !== null ? (
        <View style={{ width: TOKENS.paddings.componentContainerVertical }} />
      ) : null}
      {renderTitle()}
    </TouchableOpacity>
  );
};

export default memo(CheckBox);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: TOKENS.paddings.componentContainerVertical,
    paddingHorizontal: TOKENS.paddings.componentContainerVertical,
  },
  iconContainer: {
    borderWidth: 2,
    borderRadius: 4,
    minHeight: 24,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
