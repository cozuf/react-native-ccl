import { globalStateRef } from "../../../App";
import React, { Component, Fragment } from "react";
import { Button, PageContainer, Seperator, Text, TextInput, withGlobalState } from "react-native-ccl";
import { Alert } from "react-native";

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
                    changeTokenInStateWithoutHook(value)
                }}
                />
                <Seperator type="vertical" size={"large"} />
                <Button
                    title="Göster"
                    onPress={() => {
                        Alert.alert("", `Token => ${globalStateRef.current?.state.token}`)
                    }}
                />
                <Seperator type="vertical" size={"large"} />
                <Button
                    title="Konum Değiştir"
                    onPress={() => {
                        setGlobalState({
                            token: value,
                            location: {
                                address: {
                                    country: "Türkiye",
                                    city: "AfyonKaraHisar",
                                    town: "Merkez"
                                }
                            }
                        })
                    }}
                />
                <Seperator type="vertical" size={"large"} />
                <Text size={"l"}>
                    {globalStateRef.current?.state.token}
                </Text>
                <Seperator type="vertical" size={"large"} />
                <Text size={"l"}>
                    {globalState.token}
                </Text>
                <Fragment>
                    <Text>{globalState.location?.address.country}</Text>
                    <Text>{globalState.location?.address.city}</Text>
                    <Text>{globalState.location?.address.town}</Text>
                </Fragment>
            </PageContainer>
        )
    }
}

export default withGlobalState(Example)

const changeTokenInStateWithoutHook = (value: string) => {
    globalStateRef.current?.setState({ token: value })
}