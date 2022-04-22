import React, { FC, ReactElement, ReactNode, useRef, useState } from "react";
import { Animated, View, Omit, Pressable, Easing, ViewStyle, StyleSheet } from "react-native";
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
    const theme = useTheme()
    const { colors, tokens } = theme
    const { card } = colors
    const { component } = tokens
    const [open, setOpen] = useState(isExpanded);
    const animatedController = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
    const [bodySectionHeight, setBodySectionHeight] = useState<number>(0);

    const STATE: keyof ColorScheme["card"] = active ? "active" : "passive"

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
        return <Icon family={icon.family || "MaterialIcons"} name={icon.name || "keyboard-arrow-down"} size={icon.size || 20} color={icon?.color || card[STATE].border} />
    }

    return (
        <Pressable
            onPress={() => toggleListItem()}
            style={
                [
                    {
                        borderWidth: component.border,
                        borderRadius: component.radius,
                        paddingVertical: component.vertical,
                        paddingHorizontal: component.horizontal,
                        borderColor: card[STATE].border,
                        backgroundColor: card[STATE].background,
                    },
                    containerStyle
                ]
            }
        >
            <View style={[headerContainerStyle, styles.titleContainer]}>
                {headerComponent()}
                <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
                    {renderIcon()}
                </Animated.View>
            </View>
            <Animated.View style={[styles.bodyBackground, { height: bodyHeight }]}>
                <View
                    style={[bodyContainerStyle, styles.bodyContainer]}
                    onLayout={event =>
                        setBodySectionHeight(event.nativeEvent.layout.height)
                    }>
                    {children}
                </View>
            </Animated.View>
            <View style={[footerContainerStyle, styles.footerContainer]}>
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
    const theme = useTheme()
    const { colors, tokens } = theme
    const { card } = colors
    const { component } = tokens

    const STATE: keyof ColorScheme["card"] = active ? "active" : "passive"

    return (
        <View
            style={
                [
                    {
                        borderWidth: component.border,
                        borderRadius: component.radius,
                        paddingVertical: component.vertical,
                        paddingHorizontal: component.horizontal,
                        borderColor: card[STATE].border,
                        backgroundColor: card[STATE].background,
                    },
                    containerStyle
                ]
            }>
            <View style={[headerContainerStyle, styles.titleContainer]}>
                {headerComponent()}
            </View>
            <View style={[bodyContainerStyle]}>
                {children}
            </View>
            <View style={[footerContainerStyle, styles.footerContainer]}>
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

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bodyBackground: {
        overflow: 'hidden',
    },
    bodyContainer: {
        position: 'absolute',
        bottom: 0,
    },
    footerContainer: {

    },
})