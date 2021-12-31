import React, { useState } from "react";
import { View } from "react-native";
import { Button, PageContainer, Seperator, Text, useBottomSheet } from "react-native-ccl";

const BottomSheetPage = () => {
    const [bottomSheet, setBottomSheet] = useBottomSheet();
    const [handlePosition, setHandlePosition] = useState<"inside" | "outside">("inside");
    const [adjustToContentHeight, setAdjustToContentHeight] = useState<boolean>(false);
    return (
        <PageContainer type="default">
            <Button
                title={`Handle Position = ${handlePosition}`}
                onPress={() => {
                    setHandlePosition((v) => {
                        if (v === "inside") {
                            return "outside"
                        } else {
                            return "inside"
                        }
                    })
                }} />
            <Seperator type="vertical" />
            <Button
                title={`Adjust To Content Height = ${adjustToContentHeight}`}
                onPress={() => {
                    setAdjustToContentHeight(v => !v)
                }} />
            <Seperator type="vertical" />
            <Button
                title={"Open BottomSheet"}
                onPress={() => {
                    setBottomSheet({
                        props: {
                            adjustToContentHeight,
                            handlePosition
                        },
                        renderContent: () => {
                            return (
                                <View style={{ height: 100, }}>
                                    <Text style={{ textAlign: "center", color: "#000" }}>Yusuf</Text>
                                </View>
                            )
                        }
                    })

                    bottomSheet.show()
                }} />
        </PageContainer>
    )
}

export default BottomSheetPage;