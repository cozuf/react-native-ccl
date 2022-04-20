const VERTICAL = {
    full: 8,
    semi: 4,
    quarter: 2,
    double: 16
}
const HORIZONTAL = {
    full: 16,
    semi: 8,
    quarter: 4,
    double: 32
}

const BORDER = {
    full: 2,
    semi: 1,
    quarter: 0.5,
    double: 4
}
const RADIUS = {
    full: 8,
    semi: 4,
    quarter: 2,
    double: 16
}

export const page: Page = {
    vertical: VERTICAL.full,
    semiVertical: VERTICAL.semi,
    quarterVertical: VERTICAL.quarter,
    doubleVertical: VERTICAL.double,
    horizontal: HORIZONTAL.full,
    semiHorizontal: HORIZONTAL.semi,
    quarterHorizontal: HORIZONTAL.quarter,
    doubleHorizontal: HORIZONTAL.double
}

export const component: Component = {
    vertical: VERTICAL.full,
    semiVertical: VERTICAL.semi,
    quarterVertical: VERTICAL.quarter,
    doubleVertical: VERTICAL.double,
    horizontal: HORIZONTAL.full,
    semiHorizontal: HORIZONTAL.semi,
    quarterHorizontal: HORIZONTAL.quarter,
    doubleHorizontal: HORIZONTAL.double,
    radius: RADIUS.full,
    semiRadius: RADIUS.semi,
    quarterRadius: RADIUS.quarter,
    doubleRadius: RADIUS.double,
    border: BORDER.full,
    semiBorder: BORDER.semi,
    quarterBorder: BORDER.quarter,
    doubleBorder: BORDER.double
}

export const tokens: TokensScheme = {
    page,
    component
}