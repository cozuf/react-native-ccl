import React, { FC, isValidElement, ReactNode } from 'react';
import { View, TouchableOpacity, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import { makeColorPassive } from '../../Utils';
import { Icon, IIconProps, Seperator, Text } from '..';
import { useTheme } from '../../Context/Theme';
import type { ITextProps } from '../Text';

export interface IRadioButtonProps {
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
  onSelect: (selectedValue: any) => void;

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

const RadioButton: FC<IRadioButtonProps> = ({
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
  titleSize = "m",
  titleWeight = "regular"
}) => {
  const theme = useTheme();
  const { colors, tokens } = theme;
  const { spaces } = tokens

  const renderIcon = (): React.ReactElement | null => {
    if (iconSet) {
      if (selected) {
        if (isValidElement(iconSet.selected)) {
          return iconSet.selected;
        } else {
          const coreIcon = iconSet.selected as IIconProps;
          const ICON_COLOR = active ? colors.primary : makeColorPassive(colors.primary);
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
          const ICON_COLOR = active ? colors.primary : makeColorPassive(colors.primary);
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
      return (
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <Text
            active={active}
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
          paddingVertical: spaces.componentVertical,
          paddingHorizontal: spaces.componentHorizontal,
        },
        containerStyle
      ]}
      onPress={() => {
        if (typeof onSelect === 'function') {
          onSelect(value);
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