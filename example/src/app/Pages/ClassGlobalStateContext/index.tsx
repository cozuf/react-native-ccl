import React, { useState } from "react"
import { Alert } from "react-native";
import { Button, PageContainer, Text, TextInput, useClassGlobalState } from "react-native-ccl";

const ClassGlobalStatePage = () => {

    const [state, setState] = useClassGlobalState()

    const [value, setValue] = useState("");

    return (
        <PageContainer type="Default">
            <Text>{state.token}</Text>
            <TextInput value={value} onChangeText={setValue} />
            <Button title="Değiştir" onPress={() => {
                // setState({ token: value }, () => {
                //     Alert.alert("naber")
                // })

                // setState((prevState) => {
                //     return { token: `${prevState.token} aslanım` }
                // })
            }} />
        </PageContainer>
    )
}

export default ClassGlobalStatePage;