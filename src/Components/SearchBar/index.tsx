import React, { FC } from 'react';
import { Omit, StyleSheet } from 'react-native';
import { ITextInputTypes, TextInput } from '..';

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
  ...props
}) => {

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
      containerStyle={[styles.container, containerStyle]}
      titleContainerStyle={[styles.titleContainer, titleContainerStyle]}
      titleStyle={[styles.title, titleStyle]}
      inputStyle={[styles.input, inputStyle]}
      {...props}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {},
  titleContainer: {},
  title: {},
  inputContainer: {},
  iconContainer: {},
  seperatorContainer: {},
  seperator: {},
  nativeInputContainer: {},
  input: {},
  cleanContainer: {},
})