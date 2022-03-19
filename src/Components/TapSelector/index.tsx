import React, { FC, useState } from 'react';
import type { Omit, StyleProp, TextStyle, ViewStyle } from 'react-native';
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

  /**
   * 
   */
  titleStyle?: StyleProp<TextStyle>

  /**
   * 
   */
  containerStyle?: StyleProp<ViewStyle>
}

export type ITapSelectorTypes = ITapSelectorProps<any> &
  Omit<IButtonProps, 'onPress' | 'title' | "titleStyle" | "containerStyle">;

const TapSelector: FC<ITapSelectorTypes> = ({ testID, data, onTap, titleStyle, containerStyle, ...props }) => {
  const theme = useTheme();
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
      containerStyle={[tapSelectorStyle?.container, containerStyle]}
      titleStyle={[tapSelectorStyle?.title, titleStyle]}
      {...props}
    />
  );
};

export default TapSelector;
