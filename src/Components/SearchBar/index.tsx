import React, { FC } from 'react';
import type { Omit } from 'react-native';
import { ITextInputTypes, TextInput } from '..';
import { useTheme } from '../../Context/Theme';

export interface ISearchBarProps {
  /**
   * 
   */
  testID?: string

  /**
   *
   */
  value: string;

  /**
   * minimum character to invoke onSearch prop
   * @default 1
   */
  minimumCharToInvoke?: number;

  /**
   * invokes when text change
   */
  onSearch: (text: string) => void;
}

export type ISearchBarTypes = ISearchBarProps &
  Omit<ITextInputTypes, 'value' | 'onChangeText'>;

const SearchBar: FC<ISearchBarTypes> = ({
  testID,
  title = '',
  minimumCharToInvoke = 1,
  value,
  onSearch,
  containerStyle,
  titleContainerStyle,
  titleStyle,
  inputStyle,
  warningContainerStyle,
  warningStyle,
  errorContainerStyle,
  errorStyle,
  ...props
}) => {
  const theme = useTheme()
  const { styles } = theme;
  const { searchBarStyle } = styles
  return (
    <TextInput
      testID={testID}
      title={title}
      value={value}
      onChangeText={(text) => {
        if (text.length >= minimumCharToInvoke || text.length === 0) {
          onSearch(text);
        }
      }}
      icon={{
        family: 'Ionicons',
        name: 'search',
        size: 24,
      }}
      cleanable={true}
      containerStyle={[searchBarStyle?.container, containerStyle]}
      titleContainerStyle={[searchBarStyle?.titleContainer, titleContainerStyle]}
      titleStyle={[searchBarStyle?.title, titleStyle]}
      inputStyle={[searchBarStyle?.input, inputStyle]}
      {...props}
    />
  );
};

export default SearchBar;
