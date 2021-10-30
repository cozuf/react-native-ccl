import React from "react";
import { View } from "react-native";
import { Button, PageContainer, Text, useBottomSheet } from "react-native-ccl";

const BottomSheetPage = () => {
    const [bottomSheet, setBottomSheet] = useBottomSheet();
    return (
        <PageContainer type="Default">
            <Button
                title={"OPne BottomSheet"}
                onPress={() => {
                    setBottomSheet({
                        props: {
                            adjustToContentHeight: true
                        },
                        renderContent: () => {
                            return (

                                <View style={{ height: 100, backgroundColor: "red" }}>
                                    <Text>Yusuf</Text>
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