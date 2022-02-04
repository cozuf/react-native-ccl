import React, { FC, ReactElement, ReactNode, useRef, useState } from "react";
import { Animated, View, Omit, Pressable, Easing, ViewStyle } from "react-native";
import { Icon, IIconProps, } from "..";
import { useTheme } from '../../Context/Theme';

export interface ICardProps {
    /**
     * 
     */
    expandable?: boolean

    /**
     * 
     */
    isExpanded?: boolean

    /**
     * 
     */
    active?: boolean

    /**
     * 
     */
    icon?: Partial<IIconProps>

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
    active = true,
    isExpanded = true,
    icon = {
        family: "MaterialIcons",
        name: "keyboard-arrow-down",
        size: 20
    },
    headerComponent = () => null,
    footerComponent = () => null,
    containerStyle,
    headerContainerStyle,
    bodyContainerStyle,
    footerContainerStyle,
    children
}) => {
    const [theme] = useTheme()
    const { colors, styles } = theme
    const { card } = colors
    const { cardStyle } = styles
    const [open, setOpen] = useState(isExpanded);
    const animatedController = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
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
            }).start(({ finished }) => {
                if (finished) {
                    setOpen(false)
                }
            });
        } else {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 1,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                useNativeDriver: false,
            }).start(({ finished }) => {
                if (finished) {
                    setOpen(true)
                }
            });
        }
    };

    const renderIcon = (): ReactElement | null => {
        return <Icon family={icon.family || "MaterialIcons"} name={icon.name || "keyboard-arrow-down"} size={icon.size || 20} color={icon?.color || card[active ? "active" : "passive"].border} />
    }

    return (
        <Pressable
            onPress={() => toggleListItem()}
            style={
                [
                    cardStyle?.container,
                    {
                        borderColor: card[active ? "active" : "passive"].border,
                        backgroundColor: card[active ? "active" : "passive"].background,
                    },
                    containerStyle
                ]
            }
        >
            <View style={[headerContainerStyle, cardStyle?.titleContainer]}>
                {headerComponent()}
                <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
                    {renderIcon()}
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
            <View style={[footerContainerStyle, cardStyle?.footerContainer]}>
                {footerComponent()}
            </View>
        </Pressable>
    );
}

const DefaultCard: FC<Omit<ICardProps, "expandable">> = ({
    active = true,
    headerComponent = () => null,
    footerComponent = () => null,
    containerStyle,
    headerContainerStyle,
    bodyContainerStyle,
    footerContainerStyle, children
}) => {
    const [theme] = useTheme()
    const { colors, styles } = theme
    const { card } = colors
    const { cardStyle } = styles

    return (
        <View
            style={
                [
                    cardStyle?.container,
                    {
                        borderColor: card[active ? "active" : "passive"].border,
                        backgroundColor: card[active ? "active" : "passive"].background,
                    },
                    containerStyle
                ]
            }>
            <View style={[headerContainerStyle, cardStyle?.titleContainer]}>
                {headerComponent()}
            </View>
            <View style={[bodyContainerStyle, cardStyle?.bodyContainer]}>
                {children}
            </View>
            <View style={[footerContainerStyle, cardStyle?.footerContainer]}>
                {footerComponent()}
            </View>
        </View>
    )
}

const Card: FC<ICardProps> = ({ expandable = false, ...props }) => {
    if (expandable) {
        return <ExpandableCard  {...props} />
    } else {
        return <DefaultCard  {...props} />
    }
}


export default Card;
