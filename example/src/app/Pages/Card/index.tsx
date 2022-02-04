import React, { ReactNode } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { PageContainer, Card, Text, Seperator } from "react-native-ccl";

const CardPage = () => {

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

    const renderItem = (info: ListRenderItemInfo<any>) => {
        const { index } = info
        return (
            <Card
                expandable={true}
                isExpanded={index % 2 === 0}
                icon={index % 2 === 0 ? {
                    color: "red"
                } : undefined}
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