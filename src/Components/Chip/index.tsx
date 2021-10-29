import React, { FC, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Button } from '..';

export interface IChipProps {
  /**
   * @default false
   */
  selected: boolean;

  /**
   *
   */
  title: string;

  /**
   * @default true
   */
  active?: boolean;

  /**
   * invokes when select option
   */
  onSelect: (selected: boolean) => void;

  /**
   *
   */
  containerStyle?: ViewStyle;
}

const Chip: FC<IChipProps> = ({
  selected = false,
  title = `Chip ${selected}`,
  active = true,
  onSelect = () => { },
  containerStyle = {},
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected);
  return (
    <Button
      disabled={!active}
      clickType={'Opacity'}
      wrap={'wrap'}
      type={selected ? 'Filled' : 'Outlined'}
      title={title}
      onPress={() => {
        setIsSelected(!isSelected);
        if (typeof onSelect === 'function') {
          onSelect(!isSelected);
        }
      }}
      containerStyle={containerStyle}
    />
  );
};

export default Chip;