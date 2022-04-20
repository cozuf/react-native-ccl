import React, { FC, isValidElement, ReactNode, useState } from 'react';
import { View, TouchableOpacity, ViewStyle, StyleProp, TextStyle, StyleSheet } from 'react-native';
import { Icon, IIconProps, Seperator, Text } from '..';
import { useTheme } from '../../Context/Theme';

export interface IRadionButtonProps {
  /**
   * 
   */
  testID?: string

  /**
   *@default true
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
    selected: IIconProps | ReactNode;
    notSelected: IIconProps | ReactNode;
  };

  /**
   * invokes select the item
   */
  onSelect: (selected: boolean) => void;

  /**
   * 
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * 
   */
  iconContainerStyle?: StyleProp<ViewStyle>

  /**
   * 
   */
  titleContainerStyle?: StyleProp<ViewStyle>

  /**
   * 
   */
  titleStyle?: StyleProp<TextStyle>
}

const RadioButton: FC<IRadionButtonProps> = ({
  testID,
  active = true,
  selected = false,
  title = `Radio Button ${selected ? 1 : 0}`,
  value = 'Radion Button',
  iconSet = {
    selected: {
      family: 'MaterialIcons',
      name: 'radio-button-on',
      size: 24,
    },
    notSelected: {
      family: 'MaterialIcons',
      name: 'radio-button-off',
      size: 24,
    },
  },
  onSelect,
  containerStyle,
  iconContainerStyle,
  titleContainerStyle,
  titleStyle,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected);
  const theme = useTheme();
  const { colors, tokens } = theme;
  const { radioButton } = colors;
  const { component } = tokens;

  const renderIcon = (): React.ReactElement | null => {
    if (iconSet) {
      if (selected) {
        if (isValidElement(iconSet.selected)) {
          return iconSet.selected;
        } else {
          const coreIcon = iconSet.selected as IIconProps;
          const ICON_COLOR = radioButton[active ? 'active' : 'passive'].icon;
          return (
            <View style={[styles.iconContainer, iconContainerStyle]}>
              <Icon {...coreIcon} color={ICON_COLOR} />
            </View>
          )
        }
      } else {
        if (isValidElement(iconSet.notSelected)) {
          return iconSet.notSelected;
        } else {
          const coreIcon = iconSet.notSelected as IIconProps;
          const ICON_COLOR = radioButton[active ? 'active' : 'passive'].icon;
          return (
            <View style={[styles.iconContainer, iconContainerStyle]}>
              <Icon {...coreIcon} color={ICON_COLOR} />
            </View>
          )
        }
      }
    } else {
      return null;
    }
  };

  const renderTitle = (): React.ReactElement | null => {
    if (title) {
      const TEXT_COLOR = radioButton[active ? 'active' : 'passive'].text;
      return (
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <Text style={[{ color: TEXT_COLOR }, styles.title, titleStyle]}>{title}</Text>
        </View>
      )
    }
    return null;

  };

  const renderSeperator = (): React.ReactElement | null => {
    return <Seperator type="horizontal" size="large" />
  }

  return (
    <TouchableOpacity
      testID={testID}
      disabled={!active}
      key={value}
      style={[
        styles.container,
        {
          paddingVertical: component.vertical,
          paddingHorizontal: component.horizontal,
        },
        containerStyle
      ]}
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

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {},
  sperator: {},
  titleContainer: {},
  title: {},
})