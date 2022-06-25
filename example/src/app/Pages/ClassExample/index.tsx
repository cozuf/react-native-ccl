import React, { Component } from "react";
import { Button, PageContainer, Seperator, Text, TextInput, withGlobalState, } from "react-native-ccl";

interface Props extends IGlobalState { }

interface State {
    value: string
}

class Example extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            value: ""
        }
    }
    render(): React.ReactNode {
        const { value } = this.state
        const { globalState, setGlobalState } = this.props
        const { token } = globalState

        return (
            <PageContainer >
                <Text>{`Token is ${token}`}</Text>
                <Seperator type="vertical" size={"large"} />
                <TextInput value={value} onChangeText={(text: string) => { this.setState({ value: text }) }} />
                <Seperator type="vertical" size={"large"} />
                <Button title="Değiştir" onPress={() => { setGlobalState({ token: value }) }} />
            </PageContainer>
        )
    }
}

export default withGlobalState(Example)