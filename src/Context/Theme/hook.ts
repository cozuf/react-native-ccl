import { Dispatch, useContext } from 'react';
import { ThemeContext, ThemeContextDispatch } from './context';

export const useTheme = (): ThemeScheme => useContext(ThemeContext)
export const useSetTheme = (): Dispatch<Partial<ThemeScheme>> => useContext(ThemeContextDispatch)