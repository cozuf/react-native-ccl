import React, { FC, useState } from 'react';
import type { Omit } from 'react-native';
import { Button, IButtonProps } from '..';
import { useTheme } from '../../Context/Theme';

export interface ITapSelectorProps<ItemT> {
  /**
   * 
   */
  testID?: string

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

const TapSelector: FC<ITapSelectorTypes> = ({ testID, data, onTap, ...props }) => {
  const [theme] = useTheme();
  const { styles } = theme
  const { tapSelectorStyle } = styles

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
      testID={testID}
      type="outlined"
      title={data[selectedIndex].title}
      onPress={() => {
        onButtonTap(calculateIndex(selectedIndex + 1));
      }}
      containerStyle={tapSelectorStyle?.container}
      {...props}
    />
  );
};

export default TapSelector;
