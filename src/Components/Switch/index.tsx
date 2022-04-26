import React, { FC } from 'react';
import {
  View,
  Switch as NativeSwitch,
  SwitchProps,
  Omit,
  ViewStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { Seperator, Text } from '..';
import { useTheme } from '../../Context/Theme';
import type { ITextProps } from '../Text';

export interface ISwitchProps {
  /**
   * 
   */
  testID?: string

  /**
   * 
   */
  active?: boolean;

  /**
   * 
   */
  title: string;

  /**
   * 
   */
  value: boolean;

  /**
   * 
   */
  onValueChange: (value: boolean) => void;

  /**
   * 
   */
  containerStyle?: StyleProp<ViewStyle>;

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

export interface ISwitchTypes extends ISwitchProps,
  Omit<
  SwitchProps,
  | 'value'
  | 'onValueChange'
  | 'disabled'
  | 'thumbColor'
  | 'ios_backgroundColor'
  | 'trackColor'
  > { }

const Switch: FC<ISwitchTypes> = ({
  testID,
  active = true,
  title = 'Başlık',
  value = false,
  onValueChange = () => { },
  containerStyle,
  titleContainerStyle,
  titleStyle,
  titleSize = "m",
  titleWeight = "regular",
  ...props
}) => {
  const theme = useTheme();
  const { colors, tokens } = theme;
  const { switchComponent } = colors;
  const { component } = tokens;

  const STATE: keyof ColorScheme["switchComponent"] = active ? "active" : "passive"

  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: component.border,
          borderRadius: component.radius,
          paddingVertical: component.semiVertical,
          paddingHorizontal: component.semiHorizontal,
          backgroundColor: switchComponent[STATE].background,
          borderColor: switchComponent[STATE].border,
        },
        containerStyle
      ]}
    >
      <View style={[styles.titleContainer, titleContainerStyle]}>
        <Text active={active}
          size={titleSize}
          weigth={titleWeight}
          style={[styles.title, titleStyle]}>
          {title}
        </Text>
      </View>
      <Seperator type="horizontal" />
      <NativeSwitch
        testID={testID}
        disabled={!active}
        value={value}
        onValueChange={onValueChange}
        ios_backgroundColor={
          switchComponent[STATE].backgroundOff
        }
        thumbColor={switchComponent[STATE].thumb}
        trackColor={{
          false: switchComponent[STATE].backgroundOff,
          true: switchComponent[STATE].backgroundOn,
        }}
        {...props}
      />
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center"
  },
  title: {

  },
})