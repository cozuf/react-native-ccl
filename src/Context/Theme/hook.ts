import { Dispatch, useContext } from 'react';
import { ThemeContext, ThemeContextDispatch } from './context';

export const useTheme = (): RNCCL.ThemeScheme => useContext(ThemeContext)
export const useSetTheme = (): Dispatch<Partial<RNCCL.ThemeScheme>> => useContext(ThemeContextDispatch)