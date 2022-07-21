import React, { FC, isValidElement, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text, Button, Seperator, ITextProps, IIconProps } from "../..";
import { useTheme } from "../../Context";

export interface IStateCardProps {

    /**
     *
     */
    icon?: IIconProps | ReactNode;

    /**
     * 
     */
    title?: string

    /**
     *  
     */
    titleWeight?: ITextProps["weigth"]

    /**
     *  
     */
    titleSize?: ITextProps["size"]

    /**
     * @see https://reactnative.dev/docs/text#style
     */
    titleStyle?: ITextProps["style"]

    /**
     * 
     */
    onPress?: () => void

    /**
     * 
     */
    buttonTitle?: string

    /**
     *  
     */
    buttonTitleWeight?: ITextProps["weigth"]

    /**
     *  
     */
    buttonTitleSize?: ITextProps["size"]

    /**
     * @see https://reactnative.dev/docs/text#style
     */
    buttonTitleStyle?: ITextProps["style"]
}

const StateCard: FC<IStateCardProps> = ({
    icon = {
        family: "Feather",
        name: "wifi-off",
        size: 50
    },
    title = "Title",
    titleWeight = "semibold",
    titleSize = 40,
    titleStyle,
    buttonTitle = "Yeniden Dene",
    buttonTitleSize = "l",
    buttonTitleWeight = "semibold",
    buttonTitleStyle,
    onPress = () => { }
}) => {

    const theme = useTheme()
    const { colors, tokens } = theme
    const { innerSpace } = tokens

    const renderIcon = () => {
        if (isValidElement(icon)) {
            return icon;
        } else {
            const CoreIcon = icon as IIconProps;
            return (
                <View style={styles.iconContainer}>
                    <Icon
                        family={CoreIcon.family}
                        name={CoreIcon.name}
                        size={CoreIcon.size}
                        color={CoreIcon.color || colors.primary}
                    />
                </View>
            );
        }
    };

    const renderTitle = () => {
        return (
            <Text
                weigth={titleWeight}
                size={titleSize}
                style={titleStyle}
            >
                {title}
            </Text>
        )
    }

    const renderButton = () => {
        return (
            <View>
                <Button
                    type="outlined"
                    wrap="wrap"
                    title={buttonTitle}
                    titleSize={buttonTitleSize}
                    titleWeight={buttonTitleWeight}
                    titleStyle={buttonTitleStyle}
                    onPress={onPress}
                />
            </View>
        )
    }

    return (
        <View
            style={
                [
                    {
                        paddingHorizontal: innerSpace.componentHorizontal,
                        paddingVertical: innerSpace.componentVertical
                    },
                    styles.stateContainer
                ]
            }
        >
            {renderIcon()}
            <Seperator type="vertical" size={"small"} />
            {renderTitle()}
            <Seperator type="vertical" size={"large"} />
            {renderButton()}
        </View>
    )
}

export default StateCard

const styles = StyleSheet.create({
    stateContainer: {
        alignItems: "center"
    },
    iconContainer: {

    }
})