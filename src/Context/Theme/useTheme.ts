import { useContext } from 'react';
import type { ThemeType } from './types';
import { ThemeContext, ThemeContextDispatch } from './context';

const useTheme = (): [
    ThemeType,
    (newTheme: Partial<ThemeType>) => void
] => [
        useContext(ThemeContext).theme,
        useContext(ThemeContextDispatch).setTheme,
    ];

export default useTheme