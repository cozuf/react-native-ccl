import React, { FC } from 'react';
import {
  View,
  Switch as NativeSwitch,
  SwitchProps,
  Omit,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Text } from '..';
import { useThemeContext } from '../../Context/ThemeContext';

export interface ISwitchProps {
  /**
   * 
   */
  testID?: string

  active?: boolean;
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  containerStyle?: ViewStyle;
  //   backgroundColorOn?: ColorValue;
  //   backgroundColorOff?: ColorValue;
  //   thumbcolor?: ColorValue;
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
  //   backgroundColorOn,
  //   backgroundColorOff,
  //   thumbcolor,
  ...props
}) => {
  const [theme] = useThemeContext();
  const { switchComponent } = theme.colors;
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {
          backgroundColor:
            switchComponent[active ? 'active' : 'passive'].background,
          borderColor: switchComponent[active ? 'active' : 'passive'].border,
        },
      ]}
    >
      <Text active={active} style={styles.titleContainer}>
        {title}
      </Text>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1
  }
});
