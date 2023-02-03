import { Dimensions, Platform, StatusBar } from 'react-native';

export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 780 || dimen.width === 780)
            || (dimen.height === 812 || dimen.width === 812)
            || (dimen.height === 844 || dimen.width === 844)
            || (dimen.height === 896 || dimen.width === 896)
            || (dimen.height === 926 || dimen.width === 926))
    );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

export function getStatusBarHeight(safe) {
    return Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: StatusBar.currentHeight,
        default: 0
    });
}

export function getBottomSpace() {
    return isIphoneX() ? 34 : 0;
}

export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width
export const WINDOW_HEIGHT = Dimensions.get("window").height
export const WINDOW_WIDTH = Dimensions.get("window").width

export const makeColorPassive = (color) => {
    // const colorType: "rgb" | "rgba" | "hsl" | "hsla" | "hex"| "hexa"
    const colorType = defineColorType(color)
    switch (colorType) {
        case "rgb":
            return color.replace(")", ",0.5)")
        case "rgba":
            return color.replace(color.substring(color.lastIndexOf(","), color.indexOf(")") + 1), ", 0.5)")
        case "hsl":
            return color.replace(")", ",0.5)")
        case "hsla":
            return color.replace(color.substring(color.lastIndexOf(","), color.indexOf(")") + 1), ", 0.5)")
        case "hex":
            return `${hex}05`
        case "hexa":
            return `${color.slice(0, -1)}05`
        case null:
        default:
            return color;
    }

}

const defineColorType = (color) => {
    if (color.includes("rgba")) {
        return "rgba"
    }
    if (color.includes("rgb")) {
        return "rgb"
    }
    if (color.includes("hsla")) {
        return "hsla"
    }
    if (color.includes("hsl")) {
        return "hsl"
    }
    if (color.includes("#")) {
        if (color.length === "7") {
            return "hex"
        }
        if (color.length === "9") {
            return "hexa"
        }
    }
    return null
}

export const isObject = (value) => {
    return typeof value === "object" && !Array.isArray(value)
}