import React, { FC } from 'react';
import {
  View,
  Switch as NativeSwitch,
  SwitchProps,
  Omit,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Seperator, Text } from '..';
import { useTheme } from '../../Context/Theme';

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
  titleStyle?: StyleProp<TextStyle>
}

export type ISwitchTypes = ISwitchProps &
  Omit<
    SwitchProps,
    | 'value'
    | 'onValueChange'
    | 'disabled'
    | 'thumbColor'
    | 'ios_backgroundColor'
    | 'trackColor'
  >;

const Switch: FC<ISwitchTypes> = ({
  testID,
  active = true,
  title = 'Başlık',
  value = false,
  onValueChange = () => { },
  containerStyle,
  titleContainerStyle,
  titleStyle,
  ...props
}) => {
  const theme = useTheme();
  const { colors, styles } = theme;
  const { switchComponent } = colors;
  const { switchStyle } = styles;
  return (
    <View
      style={[
        switchStyle?.container,
        containerStyle,
        {
          backgroundColor:
            switchComponent[active ? 'active' : 'passive'].background,
          borderColor: switchComponent[active ? 'active' : 'passive'].border,
        },
      ]}
    >
      <View style={[switchStyle?.titleContainer, titleContainerStyle]}>
        <Text active={active} style={[switchStyle?.title, titleStyle]}>
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
          switchComponent[active ? 'active' : 'passive'].backgroundOff
        }
        thumbColor={switchComponent[active ? 'active' : 'passive'].thumb}
        trackColor={{
          false: switchComponent[active ? 'active' : 'passive'].backgroundOff,
          true: switchComponent[active ? 'active' : 'passive'].backgroundOn,
        }}
        {...props}
      />
    </View>
  );
};

export default Switch;
