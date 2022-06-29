import type { ColorValue } from "react-native";

export function isIphoneX(): boolean
export function ifIphoneX<T, U>(iphoneXVal: T, regularVal: U): T | U
export function ifIphoneX<T>(iphoneXVal: T): T
export function getStatusBarHeight(safe?: boolean): number
export function getBottomSpace(): number
export const SCREEN_HEIGHT: number
export const SCREEN_WIDTH: number
export const WINDOW_HEIGHT: number
export const WINDOW_WIDTH: number
export const makeColorPassive: (color: ColorValue) => string