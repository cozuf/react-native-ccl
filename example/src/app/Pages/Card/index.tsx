import React, { ReactNode, useState } from "react";
import { FlatList } from "react-native";
import { PageContainer, Card, Text, Seperator, TapSelector } from "react-native-ccl";

const EXPANDABLE_DATA = [
    {
        title: 'Expandable',
        value: true,
    },
    {
        title: 'Default',
        value: false,
    },
];

const EXPANDED_DATA = [
    {
        title: 'Expanded',
        value: true,
    },
    {
        title: 'Not Expanded',
        value: false,
    },
];

const CardPage = () => {
    const [expandable, setExpandable] = useState<boolean>(true);
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const ARRAY: Array<number> = new Array(10);
    ARRAY.fill(0)
    const renderHeader = (): ReactNode => {
        return (
            <Text>
                Başlık
            </Text>
        )
    }
    const renderFooter = (): ReactNode => {
        return (
            <Text>
                Altlık
            </Text>
        )
    }

    const renderItem = () => {
        return (
            <Card
                expandable={expandable}
                isExpanded={isExpanded}
                headerComponent={renderHeader}
                footerComponent={renderFooter}>
                <Text>
                    Yusuf
                </Text>
                <Text>
                    Yusuf
                </Text>
                <Text>
                    Yusuf
                </Text>
            </Card>
        )
    }

    return (
        <PageContainer type="default" >
            <TapSelector
                data={EXPANDABLE_DATA}
                onTap={() => { setExpandable((v: boolean) => !v) }}
            />
            <Seperator type="vertical" size="medium" />
            <TapSelector
                data={EXPANDED_DATA}
                disabled={expandable}
                onTap={() => { setIsExpanded((v: boolean) => !v) }}
            />
            <Seperator type="vertical" size="medium" />
            <FlatList
                keyExtractor={(_, i: number) => i.toString()}
                data={ARRAY}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <Seperator type="vertical" size="large" />} />
        </PageContainer>
    )
}

export default CardPage