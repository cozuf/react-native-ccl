import React, { FC, ReactNode } from 'react';
import { ColorValue, StyleProp, View, ViewStyle } from 'react-native';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
// @ts-ignore
import Entypo from 'react-native-vector-icons/Entypo';
// @ts-ignore
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// @ts-ignore
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
// @ts-ignore
import Fontisto from 'react-native-vector-icons/Fontisto';
// @ts-ignore
import Foundation from 'react-native-vector-icons/Foundation';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// @ts-ignore
import Octicons from 'react-native-vector-icons/Octicons';
// @ts-ignore
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// @ts-ignore
import Zocial from 'react-native-vector-icons/Zocial';
import { useTheme } from '../../Context/Theme';

export interface IIconProps {
  /**
   *
   */
  family?:
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome5Pro'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';
  /**
   * @see https://oblador.github.io/react-native-vector-icons/
   */
  name: string;

  /**
   *
   */
  size?: number;

  /**
   *
   */
  color?: ColorValue;

  /**
   * @default true
   */
  active?: boolean;

  /**
   * 
   */
  containerStyle?: StyleProp<ViewStyle>
}

const Icon: FC<IIconProps> = ({
  family = 'Fontisto',
  name = 'react',
  size = 10,
  color,
  active = true,
  containerStyle
}) => {
  const theme = useTheme();
  const { icon } = theme.colors;
  const COLOR = color ? color : icon[active ? 'active' : 'passive'];

  const renderIcon = (): ReactNode => {
    switch (family) {
      case 'AntDesign':
        return <AntDesign name={name} size={size} color={COLOR} />;
      case 'Entypo':
        return <Entypo name={name} size={size} color={COLOR} />;
      case 'EvilIcons':
        return <EvilIcons name={name} size={size} color={COLOR} />;
      case 'Feather':
        return <Feather name={name} size={size} color={COLOR} />;
      case 'FontAwesome':
        return <FontAwesome name={name} size={size} color={COLOR} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={name} size={size} color={COLOR} />;
      case 'FontAwesome5Pro':
        return <FontAwesome5Pro name={name} size={size} color={COLOR} />;
      case 'Fontisto':
        return <Fontisto name={name} size={size} color={COLOR} />;
      case 'Foundation':
        return <Foundation name={name} size={size} color={COLOR} />;
      case 'Ionicons':
        return <Ionicons name={name} size={size} color={COLOR} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={name} size={size} color={COLOR} />;
      case 'MaterialIcons':
        return <MaterialIcons name={name} size={size} color={COLOR} />;
      case 'Octicons':
        return <Octicons name={name} size={size} color={COLOR} />;
      case 'SimpleLineIcons':
        return <SimpleLineIcons name={name} size={size} color={COLOR} />;
      case 'Zocial':
        return <Zocial name={name} size={size} color={COLOR} />;
    }
  }

  return (
    <View style={[containerStyle]}>
      {renderIcon()}
    </View>
  )

};

export default Icon;
