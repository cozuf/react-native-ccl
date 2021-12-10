import React, { FC, ReactNode, useRef, useState } from "react";
import { Animated, View, Omit, Pressable, Easing, ViewStyle } from "react-native";
import { Icon, } from "..";
import { useThemeContext } from '../../Context/ThemeContext';
export interface ICardProps {
    /**
     * 
     */
    expandable?: boolean

    /**
     * 
     */
    headerComponent?: () => ReactNode

    /**
     * 
     */
    footerComponent?: () => ReactNode

    /**
     * 
     */
    containerStyle?: ViewStyle

    /**
     * 
     */
    headerContainerStyle?: ViewStyle

    /**
     * 
     */
    footerContainerStyle?: ViewStyle

    /**
     * 
     */
    bodyContainerStyle?: ViewStyle
}

const ExpandableCard: FC<Omit<ICardProps, "expandable">> = ({
    headerComponent = () => null,
    footerComponent = () => null,
    containerStyle,
    headerContainerStyle,
    bodyContainerStyle,
    footerContainerStyle,
    children
}) => {
    const [theme] = useThemeContext()
    const { colors, styles } = theme
    const { cardStyle } = styles
    const [open, setOpen] = useState(false);
    const animatedController = useRef(new Animated.Value(0)).current;
    const [bodySectionHeight, setBodySectionHeight] = useState<number>(0);

    const bodyHeight = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: [0, bodySectionHeight],
    });

    const arrowAngle = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: ['0rad', `${Math.PI}rad`],
    });

    const toggleListItem = () => {
        if (open) {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 0,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 1,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                useNativeDriver: false,
            }).start();
        }
        setOpen(!open);
    };

    return (
        <Pressable onPress={() => toggleListItem()} style={[containerStyle, cardStyle?.container]}>
            <View style={[headerContainerStyle, cardStyle?.titleContainer]}>
                {headerComponent()}
                <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
                    <Icon family="MaterialIcons" name="keyboard-arrow-down" size={20} color="black" />
                </Animated.View>
            </View>
            <Animated.View style={[cardStyle?.bodyBackground, { height: bodyHeight }]}>
                <View
                    style={[bodyContainerStyle, cardStyle?.bodyContainer]}
                    onLayout={event =>
                        setBodySectionHeight(event.nativeEvent.layout.height)
                    }>
                    {children}
                </View>
            </Animated.View>
            <View style={[footerContainerStyle]}>
                {footerComponent()}
            </View>
        </Pressable>
    );
}

const DefaultCard: FC<Omit<ICardProps, "expandable">> = ({
    headerComponent = () => null,
    footerComponent = () => null,
    containerStyle,
    headerContainerStyle,
    bodyContainerStyle,
    footerContainerStyle, children
}) => {
    return (
        <View style={[containerStyle]}>
            <View style={[headerContainerStyle]}>
                {headerComponent()}
            </View>
            <View style={[bodyContainerStyle]}>
                {children}
            </View>
            <View style={[footerContainerStyle]}>
                {footerComponent()}
            </View>
        </View>
    )
}

const Card: FC<ICardProps> = ({ expandable = true, ...props }) => {
    if (expandable) {
        return <ExpandableCard  {...props} />
    } else {
        return <DefaultCard  {...props} />
    }
}


export default Card;

// TODO: Geliştirlmeye devam edilecek