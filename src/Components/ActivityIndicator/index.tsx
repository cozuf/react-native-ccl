import React, { FC } from 'react';
import { ColorValue, ActivityIndicator } from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
  // @ts-ignore
} from 'react-native-indicators';
import { useThemeContext } from '../../Context/ThemeContext';

export interface IActivityIndicatorProps {
  /**
   * 
   */
  testID?: string

  /**
   *
   */
  type:
  | 'default'
  | 'ballIndicator'
  | 'barIndicator'
  | 'dotIndicator'
  | 'materialIndicator'
  | 'pacmanIndicator'
  | 'pulseIndicator'
  | 'skypeIndicator'
  | 'uIActivityIndicator'
  | 'waveIndicator';

  /**
   *
   */
  color?: ColorValue;

  /**
   *
   */
  size?: number;
}

const NActivityIndicator: FC<IActivityIndicatorProps> = ({
  testID,
  type = 'default',
  color,
  size = 24,
}) => {
  const [theme] = useThemeContext();
  const { common } = theme.colors;
  const COLOR = color ? color : common.active;
  switch (type) {
    case 'ballIndicator':
      return <BallIndicator color={COLOR} size={size} />;
    case 'barIndicator':
      return <BarIndicator color={COLOR} size={size} />;
    case 'dotIndicator':
      return <DotIndicator color={COLOR} size={size} />;
    case 'materialIndicator':
      return <MaterialIndicator color={COLOR} size={size} />;
    case 'pacmanIndicator':
      return <PacmanIndicator color={COLOR} size={size} />;
    case 'pulseIndicator':
      return <PulseIndicator color={COLOR} size={size} />;
    case 'skypeIndicator':
      return <SkypeIndicator color={COLOR} size={size} />;
    case 'uIActivityIndicator':
      return <UIActivityIndicator color={COLOR} size={size} />;
    case 'waveIndicator':
      return <WaveIndicator color={COLOR} size={size} />;
    case "default":
    default:
      return (
        <ActivityIndicator testID={testID} color={COLOR} size={size > 15 ? 'large' : 'small'} />
      );
  }
};

export default NActivityIndicator;

// TODO: Belki Container konulabilir
