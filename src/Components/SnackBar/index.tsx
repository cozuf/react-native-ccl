import React, { useEffect, useImperativeHandle, useState, forwardRef, Ref, PropsWithChildren, useRef } from "react";
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { getBottomSpace, SCREEN_WIDTH, WINDOW_WIDTH } from "../../Utils";
import { useTheme } from "../../Context";

const SHORT_DURATION = 1000
const MEDIUM_DURATION = 3000
const LONG_DURATION = 5000
const INFINITE_DURATION = -1

const SHOWING_TIME = 700

// https://github.com/cooperka/react-native-snackbar bunu da kullanabilirsin
export interface ISnackBarRef {
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
    displayForm?: "hideToShow" | "backToFront" | "leftToRight" | "rightToLeft" | "bottomToTop"

    /**
     * 
     */
    type?: "default" | "success" | "error"

    /**
     * 
     */
    containerStyle?: StyleProp<ViewStyle>

    /**
     * 
     */
    onCompleteShow?: () => void

    /**
     * 
     */
    onCompleteHide?: () => void

    /**
     * A React node that will define the content of the modal.
     */
    children?: React.ReactNode;
}

const SnackBar = forwardRef((props: PropsWithChildren<ISnackBarProps>, ref: Ref<ISnackBarRef>) => {
    const theme = useTheme()
    const { colors, tokens } = theme
    const { spaces, radiuses } = tokens

    const { duration, displayForm = "backToFront", type = "default", containerStyle, onCompleteHide = () => { }, onCompleteShow = () => { }, children } = props

    const left = useRef(new Animated.Value(-SCREEN_WIDTH)).current
    const right = useRef(new Animated.Value(-SCREEN_WIDTH)).current
    const bottom = useRef(new Animated.Value(-66)).current
    const opacity = useRef(new Animated.Value(0)).current
    const zIndex = useRef(new Animated.Value(-1)).current
    const scale = useRef(new Animated.Value(0)).current

    const [state, setState] = useState<"SHOWING" | "SHOWED" | "CLOSING" | "CLOSED">("CLOSED")

    const [isLeftStartComplete, setIsLeftStartComplete] = useState<boolean>(false)
    const [isLeftFinishComplete, setIsLeftFinishComplete] = useState<boolean>(true)

    const [isRightStartComplete, setIsRightStartComplete] = useState<boolean>(false)
    const [isRightFinishComplete, setIsRightFinishComplete] = useState<boolean>(true)

    const [isBottomStartComplete, setIsBottomStartComplete] = useState<boolean>(false)
    const [isBottomFinishComplete, setIsBottomFinishComplete] = useState<boolean>(true)

    const [isOpacityStartComplete, setIsOpacityStartComplete] = useState<boolean>(false)
    const [isOpacityFinishComplete, setIsOpacityFinishComplete] = useState<boolean>(true)

    const [isZIndexStartComplete, setIsZIndexStartComplete] = useState<boolean>(false)
    const [isZIndexFinishComplete, setIsZIndexFinishComplete] = useState<boolean>(true)

    const [isScaleStartComplete, setIsScaleStartComplete] = useState<boolean>(false)
    const [isScaleFinishComplete, setIsScaleFinishComplete] = useState<boolean>(true)

    useImperativeHandle(ref, () => ({
        show: show,
        close: duration === "infinite" ? close : () => { }
    }));

    useEffect(() => {
        if (state === "SHOWED") {
            onCompleteShow()
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
            if (DURATION !== INFINITE_DURATION) {
                setTimeout(close, DURATION)
            }
        }
        if (state === "CLOSED") {
            onCompleteHide()
        }
    }, [state])

    useEffect(() => {
        if (state === "CLOSED" || state === "SHOWING") {
            if (displayForm === "backToFront") {
                setState((oldValue) => isOpacityStartComplete && isZIndexStartComplete && isScaleStartComplete ? "SHOWED" : oldValue)
            }

            if (displayForm === "leftToRight") {
                setState((oldValue) => isOpacityStartComplete && isLeftStartComplete ? "SHOWED" : oldValue)
            }

            if (displayForm === "rightToLeft") {
                setState((oldValue) => isOpacityStartComplete && isRightStartComplete ? "SHOWED" : oldValue)
            }

            if (displayForm === "bottomToTop") {
                setState((oldValue) => isOpacityStartComplete && isBottomStartComplete ? "SHOWED" : oldValue)
            }

            if (displayForm === "hideToShow") {
                setState((oldValue) => isOpacityStartComplete ? "SHOWED" : oldValue)
            }
        }
    }, [isLeftStartComplete, isRightStartComplete, isBottomStartComplete, isOpacityStartComplete, isZIndexStartComplete, isScaleStartComplete])

    useEffect(() => {
        if (state === "SHOWED" || state === "CLOSING") {
            if (displayForm === "backToFront") {
                setState((oldValue) => isOpacityFinishComplete && isZIndexFinishComplete && isScaleFinishComplete ? "CLOSED" : oldValue)
            }

            if (displayForm === "leftToRight") {
                setState((oldValue) => isOpacityFinishComplete && isLeftFinishComplete ? "CLOSED" : oldValue)
            }

            if (displayForm === "rightToLeft") {
                setState((oldValue) => isOpacityFinishComplete && isRightFinishComplete ? "CLOSED" : oldValue)
            }

            if (displayForm === "bottomToTop") {
                setState((oldValue) => isOpacityFinishComplete && isBottomFinishComplete ? "CLOSED" : oldValue)
            }

            if (displayForm === "hideToShow") {
                setState((oldValue) => isOpacityFinishComplete ? "CLOSED" : oldValue)
            }
        }
    }, [isLeftFinishComplete, isRightFinishComplete, isBottomFinishComplete, isOpacityFinishComplete, isZIndexFinishComplete, isScaleFinishComplete])

    //#region FADE
    const fadeIn = () => {
        Animated.timing(
            opacity,
            {
                duration: SHOWING_TIME,
                toValue: 1,
                useNativeDriver: false,
            }
        ).start(({ finished }) => {
            setIsOpacityStartComplete(finished)
            setIsOpacityFinishComplete(!finished)
        });
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
        ).start(({ finished }) => {
            setIsOpacityFinishComplete(finished)
            setIsOpacityStartComplete(!finished)
        });
    }
    //#endregion

    //#region ELEVATION
    const front = () => {
        Animated.timing(
            zIndex,
            {
                duration: SHOWING_TIME,
                toValue: 99,
                useNativeDriver: false,
            }
        ).start(({ finished }) => {
            setIsZIndexStartComplete(finished)
            setIsZIndexFinishComplete(!finished)
        });
    }
    const back = () => {
        Animated.timing(
            zIndex,
            {
                duration: SHOWING_TIME,
                toValue: -99,
                useNativeDriver: false,
            }
        ).start(({ finished }) => {
            setIsZIndexFinishComplete(finished)
            setIsZIndexStartComplete(!finished)
        });
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
        ).start(({ finished }) => {
            setIsScaleStartComplete(finished)
            setIsScaleFinishComplete(!finished)
        });
    }
    const scaleOut = () => {
        Animated.timing(
            scale,
            {
                duration: SHOWING_TIME,
                toValue: 0,
                useNativeDriver: false,
            }
        ).start(({ finished }) => {
            setIsScaleFinishComplete(finished)
            setIsScaleStartComplete(!finished)
        });
    }
    //#endregion

    //#region LEFT_TO_RIGHT
    const fromLeft = () => {
        Animated.timing(
            left,
            {
                duration: SHOWING_TIME,
                toValue: 0,
                useNativeDriver: false,
            }
        ).start(({ finished }) => {
            setIsLeftStartComplete(finished)
            setIsLeftFinishComplete(!finished)
        });
    }
    const toLeft = () => {
        Animated.timing(
            left,
            {
                duration: SHOWING_TIME,
                toValue: -SCREEN_WIDTH,
                useNativeDriver: false,
            }
        ).start(({ finished }) => {
            setIsLeftFinishComplete(finished)
            setIsLeftStartComplete(!finished)
        });
    }
    //#endregion

    //#region RIGHT_TO_LEFT
    const fromRgiht = () => {
        Animated.timing(
            right,
            {
                duration: SHOWING_TIME,
                toValue: 0,
                useNativeDriver: false,
            }
        ).start(({ finished }) => {
            setIsRightStartComplete(finished)
            setIsRightFinishComplete(!finished)
        });
    }
    const toRgiht = () => {
        Animated.timing(
            right,
            {
                duration: SHOWING_TIME,
                toValue: -SCREEN_WIDTH,
                useNativeDriver: false,
            }
        ).start(({ finished }) => {
            setIsRightFinishComplete(finished)
            setIsRightStartComplete(!finished)
        });
    }
    //#endregion

    //#region BOTTOM_TO_TOP
    const comeUp = () => {
        Animated.timing(
            bottom,
            {
                duration: SHOWING_TIME,
                toValue: getBottomSpace(),
                useNativeDriver: false,
            }
        ).start(({ finished }) => {
            setIsBottomStartComplete(finished)
        });
    }
    const goDown = () => {
        Animated.timing(
            bottom,
            {
                duration: SHOWING_TIME,
                toValue: -(66 + getBottomSpace()),
                useNativeDriver: false,
            }
        ).start(({ finished }) => {
            setIsBottomFinishComplete(finished)
        });
    }
    //#endregion

    const show = () => {
        setState("SHOWING")
        if (displayForm === "backToFront") {
            fadeIn()
            front()
            scaleIn()
        }

        if (displayForm === "leftToRight") {
            fadeIn()
            fromLeft()
        }

        if (displayForm === "rightToLeft") {
            fadeIn()
            fromRgiht()
        }

        if (displayForm === "bottomToTop") {
            fadeIn()
            comeUp()
        }

        if (displayForm === "hideToShow") {
            fadeIn()
        }
    }

    const close = () => {
        setState("CLOSING")
        if (displayForm === "backToFront") {
            fadeOut()
            back()
            scaleOut()
        }

        if (displayForm === "leftToRight") {
            fadeOut()
            toLeft()
        }

        if (displayForm === "rightToLeft") {
            fadeOut()
            toRgiht()
        }

        if (displayForm === "bottomToTop") {
            fadeOut()
            goDown()
        }

        if (displayForm === "hideToShow") {
            fadeOut()
        }
    }

    return (
        <Animated.View
            style={
                [
                    styles.animatedContainer,
                    {
                        paddingVertical: spaces.componentVertical,
                        paddingHorizontal: spaces.componentHorizontal,
                        width: WINDOW_WIDTH,
                        opacity: opacity,
                    },
                    displayForm === "backToFront"
                        ?
                        {
                            zIndex: zIndex,
                            transform: [{ scale }],
                        }
                        :
                        displayForm === "leftToRight"
                            ?
                            {
                                left: left
                            }
                            :
                            displayForm === "rightToLeft"
                                ?
                                {
                                    right: right
                                }
                                :
                                displayForm === "bottomToTop"
                                    ?
                                    {
                                        bottom: bottom
                                    }
                                    :
                                    {
                                        bottom: getBottomSpace(),
                                        left: 0,
                                        right: 0
                                    }
                ]
            }
        >
            <View
                style={
                    [
                        styles.contentContainer,
                        {
                            borderRadius: radiuses.component,
                            backgroundColor: type === "success" ? colors.success : type === "error" ? colors.error : colors.componentBackground,
                            shadowColor: colors.shadow
                        },
                        containerStyle
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
        bottom: getBottomSpace(),
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