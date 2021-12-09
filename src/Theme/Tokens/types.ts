export interface Page {
    paddingVertical: number,
    paddingHorizontal: number
}

export interface Component {
    paddingVertical: number,
    paddingHorizontal: number,
    borderRadius: number,
    borderWidth: number,
}

export interface TokensScheme {
    page: Page,
    component: Component
}