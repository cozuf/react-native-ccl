import React from "react";
import { PageContainer, SegmentedButton } from "react-native-ccl";
const DATA = [
    {
        title: "1",
        value: 1,
        active: true
    },
    {
        title: "2",
        value: 2,
        active: false
    },
    {
        title: "3",
        value: 3,
        active: true
    },

]
const SegmentedButtonPage = () => {

    return (
        <PageContainer>
            <SegmentedButton
                data={DATA}
                onSelect={(item, index) => {
                    console.warn({ item, index })
                }} />
        </PageContainer>
    )
}

export default SegmentedButtonPage