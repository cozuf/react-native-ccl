import React, { Component } from "react";
import { Button, PageContainer, Seperator, Text, TextInput, withGlobalState, } from "react-native-ccl";

interface Props extends RNCCL.IGlobalState { }

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
    componentDidUpdate = () => { }
    getSnapshotBeforeUpdate = () => {
        console.log({ gState: this.props.globalState })
        return null
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
                <Button title="Değiştir" onPress={() => {
                    setGlobalState({
                        token: value,
                        location: {
                            address: {
                                country: "Türkiye",
                                city: "Kütahya",
                                town: "Altıntaş"
                            }
                        }
                    })
                }}
                />

                <Text size={"l"}>
                    {JSON.stringify(globalState).replaceAll("{", "{\n\t").replaceAll("}", "\n}").replaceAll(",", ",\n\t")}
                </Text>
            </PageContainer>
        )
    }
}

export default withGlobalState(Example)