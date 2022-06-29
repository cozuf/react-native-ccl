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
import { makeColorPassive } from '../../Utils';
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

  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: tokens.thinBorder,
          borderRadius: tokens.radius,
          paddingVertical: tokens.semiInner,
          paddingHorizontal: tokens.inner,
          backgroundColor: active ? colors.componentBackground : makeColorPassive(colors.componentBackground),
          borderColor: active ? colors.text : makeColorPassive(colors.text),
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
        // ios background
        ios_backgroundColor={value ? active ? colors.error : makeColorPassive(colors.error) : colors.seperator}
        // ball of switch
        thumbColor={active ? colors.pageBackground : makeColorPassive(colors.pageBackground)}
        trackColor={{
          // android off background
          false: active ? colors.seperator : makeColorPassive(colors.seperator),
          // both side on background
          true: active ? colors.primary : makeColorPassive(colors.primary),
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

// TODO: Kendin yap animated ile böylelikle ikiside aynı olur
// TODO: Sağlı Sollu tasarım olabilir