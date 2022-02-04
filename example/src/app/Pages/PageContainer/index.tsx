import React, { useState } from 'react';
import { View } from 'react-native';
import {
    Button,
    PageContainer, Text,
} from 'react-native-ccl';

const PageContainerPage = () => {

    const [state, setState] = useState<{ length: number, type: 'safeArea' | 'default' | 'scroll'; }>({ length: 4, type: "default" })
    const ARRAY: Array<string> = new Array(state.length)
    ARRAY.fill("Array");

    return (
        <PageContainer>
            <Button
                title={state.type}
                onPress={() => {
                    setState(({ length }) => ({ length: length === 4 ? 24 : 4, type: length === 4 ? "scroll" : "default" }))
                }} />
            <PageContainer type={state.type} bounces={false} showsVerticalScrollIndicator={false}>
                {
                    ARRAY.map((value: string, index: number) => {
                        return (
                            <View key={`${index}`} style={{ backgroundColor: index % 2 === 0 ? "red" : "orange", justifyContent: "center", paddingVertical: 18, borderRadius: 4, marginBottom: 8, }}>
                                <Text size='xxl' weigth='bold'
                                    style={{ textAlign: "center" }}>
                                    {`${value} - ${index}`}
                                </Text>
                            </View>
                        )
                    })
                }
            </PageContainer>
        </PageContainer>
    );
};

export default PageContainerPage;
