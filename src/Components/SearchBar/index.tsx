import React, { FC } from 'react';
import type { Omit } from 'react-native';
import { ITextInputTypes, TextInput } from '..';
export interface ISearchBarProps {
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
  title = '',
  minimumCharToInvoke = 1,
  value,
  onSearch,
  ...props
}) => {
  return (
    <TextInput
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
      {...props}
    />
  );
};

export default SearchBar;

// TODO: Belki onClear ayırılabilir
