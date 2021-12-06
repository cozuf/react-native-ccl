import React, { useState } from "react"
import { Button, PageContainer, Text, TextInput, useClassGlobalState } from "react-native-ccl";

const ClassGlobalStatePage = () => {

    const [state] = useClassGlobalState()

    const [value, setValue] = useState("");

    return (
        <PageContainer type="default">
            <Text>{state.token}</Text>
            <TextInput value={value} onChangeText={setValue} />
            <Button title="Değiştir" onPress={() => {
            }} />
        </PageContainer>
    )
}

export default ClassGlobalStatePage;