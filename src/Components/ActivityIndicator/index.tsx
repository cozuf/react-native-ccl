import React, { FC } from 'react';
import { ColorValue, ActivityIndicator as Default } from 'react-native';
import BallIndicator from './ball-indicator';
import BarIndicator from './bar-indicator';
import DotIndicator from './dot-indicator';
import MaterialIndicator from './material-indicator';
import PacmanIndicator from './pacman-indicator';
import PulseIndicator from './pulse-indicator';
import SkypeIndicator from './skype-indicator';
import UIActivityIndicator from './ui-activity-indicator';
import WaveIndicator from './wave-indicator';
import { useTheme } from '../../Context';

export interface IActivityIndicatorProps {
  /**
   * 
   */
  testID?: string

  /**
   *
   */
  type?:
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

const ActivityIndicator: FC<IActivityIndicatorProps> = ({
  testID,
  type = 'default',
  color,
  size = 24,
}) => {
  const { colors } = useTheme();
  const COLOR = color ? color : colors.primary;
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
      // TODO:Pacman ontrol edilecek
      return <PacmanIndicator color={COLOR} size={60} />;
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
      return <Default testID={testID} color={COLOR} size={size > 15 ? 'large' : 'small'} />
  }
};

export default ActivityIndicator;
