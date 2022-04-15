import type { Component, Page, TokensScheme } from "./types";

const PADDING_VERTICAL = 8;
const PADDING_HORIZONTAL = 16;
const BORDER_WIDTH = 2;
const BORDER_RADIUS = 8;

export const page: Page = {
    paddingVertical: PADDING_VERTICAL,
    paddingHorizontal: PADDING_HORIZONTAL
}

export const component: Component = {
    paddingVertical: PADDING_VERTICAL,
    paddingHorizontal: PADDING_HORIZONTAL,
    borderRadius: BORDER_RADIUS,
    borderWidth: BORDER_WIDTH,
}


export const tokens: TokensScheme = {
    page,
    component
}