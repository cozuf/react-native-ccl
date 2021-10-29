import React, { FC } from 'react';
import { ColorValue, View } from 'react-native';

export interface IHorizontalProps {
  height?: 'small' | 'medium' | 'high' | string | number;
  width?: number;
  color?: ColorValue;
}

const Horizontal: FC<IHorizontalProps> = ({
  height = 'small',
  width = 8,
  color = 'transparent',
}) => {
  const calculateHeight = (): number | string | undefined => {
    if (typeof height === 'number') {
      return height;
    }
    switch (height) {
      case 'small':
        return 2;
      case 'medium':
        return 4;
      case 'high':
        return 8;
    }
    if (typeof height === 'string') {
      return height;
    }
    return undefined;
  };
  return (
    <View
      style={{
        height: calculateHeight(),
        width: width,
        backgroundColor: color,
      }}
    />
  );
};

export default Horizontal;
