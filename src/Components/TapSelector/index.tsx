import React, { FC, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Button, IButtonTypes } from '..';
import type { ITextProps } from '../Text';

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
  titleStyle?: ITextProps["style"]

  /**
   * 
   */
  containerStyle?: StyleProp<ViewStyle>
}

export interface ITapSelectorTypes extends ITapSelectorProps<any>, Omit<IButtonTypes, 'onPress' | 'title' | "titleStyle" | "containerStyle"> { }

const TapSelector: FC<ITapSelectorTypes> = ({ testID, data, onTap, titleStyle, containerStyle, ...props }) => {

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
      containerStyle={[styles.container, containerStyle]}
      titleStyle={[styles.title, titleStyle]}
      {...props}
    />
  );
};

export default TapSelector;

const styles = StyleSheet.create({
  container: {},
  title: {},
})