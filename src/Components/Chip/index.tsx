import type { ITextProps } from 'lib/typescript/src';
import React, { FC, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Button } from '..';

export interface IChipProps {
  /**
   * 
   */
  testID?: string

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
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * 
   */
  titleStyle?: ITextProps["style"]
}

const Chip: FC<IChipProps> = ({
  testID,
  selected = false,
  title = `Chip ${selected}`,
  active = true,
  onSelect = () => { },
  containerStyle = {},
  titleStyle = {}
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected);

  return (
    <Button
      testID={testID}
      disabled={!active}
      clickType={'opacity'}
      wrap={'wrap'}
      type={selected ? 'filled' : 'outlined'}
      title={title}
      titleStyle={[styles.title, titleStyle]}
      onPress={() => {
        setIsSelected(!isSelected);
        if (typeof onSelect === 'function') {
          onSelect(!isSelected);
        }
      }}
      containerStyle={[styles.container, containerStyle]}
    />
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {

  },
  title: {

  }
})