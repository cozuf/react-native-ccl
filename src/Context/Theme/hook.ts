import { Dispatch, useContext } from 'react';
import type { ThemeType } from './types';
import { ThemeContext, ThemeContextDispatch } from './context';

export const useTheme = (): ThemeType => useContext(ThemeContext)
export const useSetTheme = (): Dispatch<Partial<ThemeType>> => useContext(ThemeContextDispatch)