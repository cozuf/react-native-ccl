import React, { FC, ReactNode, useRef, useState } from "react";
import { Animated, View, Omit, StyleSheet, Pressable, Easing } from "react-native";
import { Icon, } from "..";

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
}

const ExpandableCard: FC<Omit<ICardProps, "expandable">> = ({
    headerComponent = () => null,
    footerComponent = () => null,
    children
}) => {
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
        <Pressable onPress={() => toggleListItem()} style={{ borderWidth: 1, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 }}>
            <View style={styles.titleContainer}>
                {headerComponent()}
                <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
                    <Icon family="MaterialIcons" name="keyboard-arrow-down" size={20} color="black" />
                </Animated.View>
            </View>
            <Animated.View style={[styles.bodyBackground, { height: bodyHeight }]}>
                <View
                    style={styles.bodyContainer}
                    onLayout={event =>
                        setBodySectionHeight(event.nativeEvent.layout.height)
                    }>
                    {children}
                </View>
            </Animated.View>
            <View>
                {footerComponent()}
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    bodyBackground: {
        overflow: 'hidden',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bodyContainer: {
        position: 'absolute',
        bottom: 0,
    },
});

const DefaultCard: FC<Omit<ICardProps, "expandable">> = ({ children }) => {
    return (
        <View>
            {children}
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