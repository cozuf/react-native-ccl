import React, { useEffect, useImperativeHandle, useState, forwardRef, Ref, PropsWithChildren, useRef } from "react";
import { Animated, Dimensions, Easing, StyleProp, StyleSheet, View, ViewStyle } from "react-native";


const SHORT_DURATION = 1000
const MEDIUM_DURATION = 3000
const LONG_DURATION = 5000
const INFINITE_DURATION = -1

const SHOWING_TIME = 700

const WIDTH = Dimensions.get("window").width

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
            style={[
                styles.animatedContainer,
                {
                    zIndex: zIndex,
                    opacity: opacity,
                    transform: [{ scale }],
                }
            ]}
        >
            <View style={[containerStyle, styles.contentContainer]}>
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
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: WIDTH,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "black",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})

// TODO: https://github.com/cooperka/react-native-snackbar bunu da kullanabilirsin