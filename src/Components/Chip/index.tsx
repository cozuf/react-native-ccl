import React, { FC, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from "../../Context/Theme"
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
}

const Chip: FC<IChipProps> = ({
  testID,
  selected = false,
  title = `Chip ${selected}`,
  active = true,
  onSelect = () => { },
  containerStyle = {},
}) => {
  const [theme] = useTheme()
  const { styles } = theme
  const { chipStyle } = styles
  const [isSelected, setIsSelected] = useState<boolean>(selected);

  return (
    <Button
      testID={testID}
      disabled={!active}
      clickType={'opacity'}
      wrap={'wrap'}
      type={selected ? 'filled' : 'outlined'}
      title={title}
      titleStyle={chipStyle?.title}
      onPress={() => {
        setIsSelected(!isSelected);
        if (typeof onSelect === 'function') {
          onSelect(!isSelected);
        }
      }}
      containerStyle={[chipStyle?.container, containerStyle]}
    />
  );
};

export default Chip;
