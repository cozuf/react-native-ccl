import React, { FC, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { Modal as NativeModal, Platform, Pressable, StyleSheet, View } from "react-native";
import type { ModalProps, Omit, StyleProp, ViewStyle } from "react-native";
import { ActivityIndicator, Button, IActivityIndicatorProps, Icon, Seperator, Text } from "..";
import { useTheme } from "../../Context";
import { getBottomSpace, getStatusBarHeight } from "../../Utils";

export interface IModalProps {
    /**
     * 
     */
    testID?: string

    /**
     * 
     */
    type?: "default" | "loading" | "fault" | "warning" | "selective"

    /**
     * 
     */
    visible: boolean

    /**
     * 
     */
    outsideStyle?: StyleProp<ViewStyle>

    /**
     * 
     */
    containerStyle?: StyleProp<ViewStyle>

    /**
     * 
     */
    onTouchOutSide: (value: boolean) => void

    /**
     * 
     */
    indicatorProps?: Partial<Omit<IActivityIndicatorProps, "testID">>

    /**
     * 
     */
    title?: string

    /**
     * 
     */
    message?: string

    /**
     * 
     */
    acceptButtonTitle?: string

    /**
     * 
     */
    onAcceptButtonPress?: () => void

    /**
     * 
     */
    rejectButtonTitle?: string

    /**
     * 
     */
    onRejectButtonPress?: () => void
}

export interface CCLModalProps extends IModalProps, Omit<ModalProps, "testID" | "visible"> { }

const Modal: FC<CCLModalProps> = ({
    testID,
    type = "default",
    visible,
    outsideStyle,
    containerStyle,
    onTouchOutSide = (v: boolean) => {
        visible = v
    },
    indicatorProps,
    title = "Title",
    message = "Message",
    acceptButtonTitle = "Accept",
    onAcceptButtonPress = () => { },
    rejectButtonTitle = "Reject",
    onRejectButtonPress = () => { },
    children,
    ...props
}) => {
    const ModalRef = useRef<NativeModal | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(visible);
    const theme = useTheme();
    const { colors, tokens } = theme;
    const { innerSpace, radiuses } = tokens

    useEffect(() => {
        setIsVisible(visible);
    }, [visible]);

    const defineOutSideStyle = (): ViewStyle => {
        switch (type) {
            case "default":
            default:
                return Platform.select({
                    ios: {
                        paddingTop: getBottomSpace() || getStatusBarHeight(),
                        paddingBottom: getBottomSpace() || innerSpace.pageVertical,
                        paddingHorizontal: innerSpace.pageHorizontal
                    },
                    android: {
                        paddingVertical: innerSpace.pageVertical,
                        paddingHorizontal: innerSpace.pageHorizontal
                    }
                }) as ViewStyle
            case "fault":
            case "warning":
                return {
                    alignItems: "center",
                    paddingHorizontal: innerSpace.componentHorizontal
                }
            case "loading":
                return {
                    alignItems: "center",
                    paddingHorizontal: innerSpace.componentHorizontal
                }
            case "selective":
                return {
                    paddingHorizontal: innerSpace.componentHorizontal
                }
        }
    }

    const defineContainerStyle = (): ViewStyle => {
        switch (type) {
            case "default":
            default:
                return {
                }
            case "loading":
                return {
                    height: 200,
                    width: 200,
                    alignItems: "center",
                    justifyContent: "center"
                }
            case "fault":
            case "warning":
                return {
                    width: "90%",
                }
            case "selective":
                return {
                }
        }
    }

    const renderChildren = (): ReactNode => {
        switch (type) {
            case "default":
            default:
                return children;

            case "loading":
                return <Loading message={message} indicatorProps={indicatorProps} />

            case "fault":
                return <Fault title={title} message={message} acceptButtonTitle={acceptButtonTitle} onAcceptButtonPress={onAcceptButtonPress} />

            case "warning":
                return <Warning title={title} message={message} acceptButtonTitle={acceptButtonTitle} onAcceptButtonPress={onAcceptButtonPress} />

            case "selective":
                return <Selective title={title} message={message} acceptButtonTitle={acceptButtonTitle} onAcceptButtonPress={onAcceptButtonPress} rejectButtonTitle={rejectButtonTitle} onRejectButtonPress={onRejectButtonPress} />
        }
    }

    return (
        <NativeModal
            testID={testID}
            ref={(ref) => {
                ModalRef.current = ref;
            }}
            animationType="fade"
            visible={isVisible}
            transparent={true}
            {...props}
        >
            <Pressable
                style={
                    [
                        styles.outside,
                        defineOutSideStyle(),
                        {
                            backgroundColor: colors.modalOutside,
                        },
                        outsideStyle,
                    ]
                }
                onPress={() => {
                    if (type !== "loading") {
                        setIsVisible(!isVisible);
                    }
                    if (typeof onTouchOutSide === 'function') {
                        onTouchOutSide(!isVisible);
                    }
                }}
            >
                <Pressable
                    style={
                        [
                            styles.container,
                            defineContainerStyle(),
                            {
                                padding: innerSpace.componentHorizontal,
                                borderRadius: radiuses.component * 2,
                                backgroundColor: colors.pageBackground,
                                shadowColor: colors.shadow,
                            },
                            containerStyle,
                        ]
                    }
                >
                    {renderChildren()}
                </Pressable>
            </Pressable>
        </NativeModal>
    );
}

export default Modal

const styles = StyleSheet.create({
    outside: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.5,
                shadowRadius: 4.65,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1
    },
    title: {
        textAlign: 'center'
    },
    messageContainer: {
        justifyContent: 'center',
        paddingVertical: 8
    },
    message: {
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    }
});

const Loading: FC<Pick<CCLModalProps, "message" | "indicatorProps">> = ({ message, indicatorProps }) => {
    return (
        <Fragment>
            <ActivityIndicator type={indicatorProps?.type} size={indicatorProps?.size || 40} />
            <Text size="xl" weigth="medium" style={styles.message}>
                {message}
            </Text>
        </Fragment>
    )
}

const Fault: FC<Pick<CCLModalProps, "title" | "message" | "acceptButtonTitle" | "onAcceptButtonPress">> = ({
    title, message, acceptButtonTitle, onAcceptButtonPress = () => { } }) => {
    const { colors } = useTheme()
    return (
        <Fragment>
            <View
                style={styles.headerContainer}
            >
                <Icon family="AntDesign" name="closecircle" size={24} color={colors.error} />
                <View style={styles.titleContainer}>
                    <Text weigth="bold" size={'xl'} style={styles.title}>
                        {title}
                    </Text>
                </View>
                <Icon family="AntDesign" name="closecircle" size={24} color={colors.transparent} />
            </View>
            <View style={styles.messageContainer}>
                <Text size="xl" weigth="medium">
                    {message}
                </Text>
            </View>
            <Button title={acceptButtonTitle} onPress={onAcceptButtonPress} />
        </Fragment>
    )
}

const Warning: FC<Pick<CCLModalProps, "title" | "message" | "acceptButtonTitle" | "onAcceptButtonPress">> = ({
    title, message, acceptButtonTitle, onAcceptButtonPress = () => { } }) => {
    const { colors } = useTheme()
    return (
        <Fragment>
            <View
                style={styles.headerContainer}
            >
                <Icon family="AntDesign" name="warning" size={24} color={colors.warning} />
                <View style={styles.titleContainer}>
                    <Text weigth="bold" size={'xl'} style={styles.title}>
                        {title}
                    </Text>
                </View>
                <Icon family="AntDesign" name="warning" size={24} color={colors.transparent} />
            </View>
            <View style={styles.messageContainer}>
                <Text size="xl" weigth="medium">
                    {message}
                </Text>
            </View>
            <Button title={acceptButtonTitle} onPress={onAcceptButtonPress} />
        </Fragment>
    )
}

const Selective: FC<Pick<CCLModalProps, "title" | "message" | "acceptButtonTitle" | "onAcceptButtonPress" | "rejectButtonTitle" | "onRejectButtonPress">> = ({
    title, message, acceptButtonTitle, onAcceptButtonPress = () => { }, rejectButtonTitle, onRejectButtonPress = () => { } }) => {
    return (
        <Fragment>
            <View
                style={styles.headerContainer}
            >
                <View style={styles.titleContainer}>
                    <Text weigth="bold" size={'xl'} style={styles.title}>
                        {title}
                    </Text>
                </View>
            </View>
            <View style={styles.messageContainer}>
                <Text size="xl" weigth="medium">
                    {message}
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    type="outlined"
                    containerStyle={styles.buttonContainer}
                    title={rejectButtonTitle}
                    onPress={onRejectButtonPress}
                />
                <Seperator type="horizontal" />
                <Button
                    containerStyle={styles.buttonContainer}
                    title={acceptButtonTitle}
                    onPress={onAcceptButtonPress}
                />
            </View>
        </Fragment>
    )
}