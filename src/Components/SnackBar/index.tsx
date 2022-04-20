import React, { useEffect, useImperativeHandle, useState, forwardRef, Ref, PropsWithChildren, useRef } from "react";
import { Animated, Dimensions, Easing, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../../Context";

const SHORT_DURATION = 1000
const MEDIUM_DURATION = 3000
const LONG_DURATION = 5000
const INFINITE_DURATION = -1

const SHOWING_TIME = 700

const WIDTH = Dimensions.get("window").width

// https://github.com/cooperka/react-native-snackbar bunu da kullanabilirsin
export interface SnackBarRef {
    show: () => void
    close: () => void
}

export interface ISnackBarProps {
    /**
     * 
     */
    duration?: "short" | "medium" | "long" | "infinite",

    /**
     * 
     */
    containerStyle?: StyleProp<ViewStyle>
}

const SnackBar = forwardRef((props: PropsWithChildren<ISnackBarProps>, ref: Ref<SnackBarRef>) => {
    const theme = useTheme();
    const { colors, tokens } = theme;
    const { snackBar } = colors;
    const { component } = tokens;

    const { duration, containerStyle, children } = props
    const opacity = useRef(new Animated.Value(0)).current
    const zIndex = useRef(new Animated.Value(-1)).current
    const scale = useRef(new Animated.Value(0)).current
    const [visible, setVisible] = useState<boolean>(false)

    useImperativeHandle(ref, () => ({
        show: show,
        close: close
    }));

    useEffect(() => {
        if (visible) {
            let DURATION: number;
            switch (duration) {
                case "short":
                default:
                    DURATION = SHORT_DURATION
                    break;
                case "medium":
                    DURATION = MEDIUM_DURATION
                    break;
                case "long":
                    DURATION = LONG_DURATION
                    break;
                case "infinite":
                    DURATION = INFINITE_DURATION
                    break;
            }
            setTimeout(() => { close() }, DURATION);
        }
    }, [visible])

    //#region FADE
    const fadeIn = () => {
        Animated.timing(
            opacity,
            {
                duration: SHOWING_TIME,
                toValue: 1,
                useNativeDriver: false,
            }
        ).start();
    }
    const fadeOut = () => {
        Animated.timing(
            opacity,
            {
                duration: SHOWING_TIME,
                toValue: 0,
                easing: Easing.back(0),
                useNativeDriver: false,
            }
        ).start();
    }
    //#endregion

    //#region BRING
    const front = () => {
        Animated.timing(
            zIndex,
            {
                duration: SHOWING_TIME,
                toValue: 1,
                useNativeDriver: false,
            }
        ).start();
    }
    const back = () => {
        Animated.timing(
            zIndex,
            {
                duration: SHOWING_TIME,
                toValue: -1,
                useNativeDriver: false,
            }
        ).start();
    }
    //#endregion

    //#region SCALE
    const scaleIn = () => {
        Animated.timing(
            scale,
            {
                duration: SHOWING_TIME,
                toValue: 1,
                useNativeDriver: false,
            }
        ).start();
    }
    const scaleOut = () => {
        Animated.timing(
            scale,
            {
                duration: SHOWING_TIME,
                toValue: 0,
                useNativeDriver: false,
            }
        ).start();
    }
    //#endregion

    const show = () => {
        fadeIn()
        front()
        scaleIn()
        setVisible(true)
    }

    const close = () => {
        fadeOut()
        back()
        scaleOut()
        setVisible(false)
    }

    return (
        <Animated.View
            style={
                [
                    styles.animatedContainer,
                    {
                        paddingVertical: component.vertical,
                        paddingHorizontal: component.horizontal,
                        width: WIDTH,
                        zIndex: zIndex,
                        opacity: opacity,
                        transform: [{ scale }],
                    }
                ]
            }
        >
            <View
                style={
                    [
                        styles.contentContainer,
                        containerStyle,
                        {
                            borderRadius: component.semiRadius,
                            backgroundColor: snackBar.background,
                            shadowColor: snackBar.shadow
                        }
                    ]
                }
            >
                {children}
            </View>
        </Animated.View >
    );
})

export default SnackBar

const styles = StyleSheet.create({
    animatedContainer: {
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        height: 66,
    },
    contentContainer: {
        flex: 1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})