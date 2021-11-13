import React, { Component } from "react";
import { Animated, View, Dimensions, Easing } from "react-native";

const SHORT_DURATION = 1000
const MEDIUM_DURATION = 3000
const LONG_DURATION = 5000
const INFINITE_DURATION = -1

const SHOWING_TIME = 700

const WIDTH = Dimensions.get("window").width
export interface ISnackBarProps {
    duration?: "short" | "medium" | "long" | "infinite"
}

interface State {
    opacity: Animated.Value
    zIndex: Animated.Value
    scale: Animated.Value,
    visible: boolean
}

export default class SnackBar extends Component<ISnackBarProps, State>{
    constructor(props: ISnackBarProps) {
        super(props)
        this.state = {
            opacity: new Animated.Value(0),
            zIndex: new Animated.Value(-1),
            scale: new Animated.Value(0),
            visible: false
        }
    }

    private fadeIn = () => {
        Animated.timing(
            this.state.opacity,
            {
                duration: SHOWING_TIME,
                toValue: 1,
                useNativeDriver: false,
            }
        ).start();
    }
    private fadeOut = () => {
        Animated.timing(
            this.state.opacity,
            {
                duration: SHOWING_TIME,
                toValue: 0,
                easing: Easing.back(0),
                useNativeDriver: false,
            }
        ).start();
    }

    private front = () => {
        Animated.timing(
            this.state.zIndex,
            {
                duration: SHOWING_TIME,
                toValue: 1,
                useNativeDriver: false,
            }
        ).start();
    }
    private back = () => {
        Animated.timing(
            this.state.zIndex,
            {
                duration: SHOWING_TIME,
                toValue: -1,
                useNativeDriver: false,
            }
        ).start();
    }

    private scaleIn = () => {
        Animated.timing(
            this.state.scale,
            {
                duration: SHOWING_TIME,
                toValue: 1,
                useNativeDriver: false,
            }
        ).start();
    }
    private scaleOut = () => {
        Animated.timing(
            this.state.scale,
            {
                duration: SHOWING_TIME,
                toValue: 0,
                useNativeDriver: false,
            }
        ).start();
    }

    show = () => {
        this.fadeIn()
        this.front()
        this.scaleIn()
        this.setState(
            { visible: true },
            () => {
                let DURATION: number;
                switch (this.props.duration) {
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
                setTimeout(() => {
                    this.close()
                }, DURATION);
            })
    }

    close = () => {
        this.fadeOut()
        this.back()
        this.scaleOut()
        this.setState({ visible: false })
    }

    render() {
        const { opacity, zIndex, scale } = this.state
        return (
            <Animated.View
                style={{
                    overflow: "hidden",
                    position: "absolute",
                    zIndex: zIndex,
                    bottom: 0,
                    height: 66,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    width: WIDTH,
                    opacity: opacity,
                    transform: [{ scale }],
                }}
            >
                <View style={{
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
                }}>
                    {this.props.children}
                </View>
            </Animated.View >
        );
    }

}