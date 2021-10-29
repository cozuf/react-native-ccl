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
  type:
    | 'Default'
    | 'BallIndicator'
    | 'BarIndicator'
    | 'DotIndicator'
    | 'MaterialIndicator'
    | 'PacmanIndicator'
    | 'PulseIndicator'
    | 'SkypeIndicator'
    | 'UIActivityIndicator'
    | 'WaveIndicator';

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
  type = 'Default',
  color,
  size = 24,
}) => {
  const [theme] = useThemeContext();
  const { common } = theme.colors;
  const COLOR = color ? color : common.active;
  switch (type) {
    case 'BallIndicator':
      return <BallIndicator color={COLOR} size={size} />;
    case 'BarIndicator':
      return <BarIndicator color={COLOR} size={size} />;
    case 'DotIndicator':
      return <DotIndicator color={COLOR} size={size} />;
    case 'MaterialIndicator':
      return <MaterialIndicator color={COLOR} size={size} />;
    case 'PacmanIndicator':
      return <PacmanIndicator color={COLOR} size={size} />;
    case 'PulseIndicator':
      return <PulseIndicator color={COLOR} size={size} />;
    case 'SkypeIndicator':
      return <SkypeIndicator color={COLOR} size={size} />;
    case 'UIActivityIndicator':
      return <UIActivityIndicator color={COLOR} size={size} />;
    case 'WaveIndicator':
      return <WaveIndicator color={COLOR} size={size} />;
    default:
      return (
        <ActivityIndicator color={COLOR} size={size > 15 ? 'large' : 'small'} />
      );
  }
};

export default NActivityIndicator;

// TODO: Belki Container konulabilir
