import React, { FC, useState } from 'react';
import type { Omit } from 'react-native';
import { Button, IButtonProps } from '..';

export interface ITapSelectorProps<ItemT> {
  /**
   *it must contain 'title' and 'value' key
   */
  data: ReadonlyArray<ItemT>;

  /**
   * invokes press the component
   */
  onTap: (selectedItem: ItemT, selectedIndex: number) => void;
}

export type ITapSelectorTypes = ITapSelectorProps<any> &
  Omit<IButtonProps, 'onPress' | 'title'>;

const TapSelector: FC<ITapSelectorTypes> = ({ data, onTap, ...props }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const onButtonTap = (index: number) => {
    setSelectedIndex(index);
    onTap(data[index], index);
  };

  const calculateIndex = (index: number): number => {
    if (index > data.length - 1) {
      return 0;
    } else {
      return index;
    }
  };

  return (
    <Button
      type="Outlined"
      title={data[selectedIndex].title}
      onPress={() => {
        onButtonTap(calculateIndex(selectedIndex + 1));
      }}
      {...props}
    />
  );
};

export default TapSelector;