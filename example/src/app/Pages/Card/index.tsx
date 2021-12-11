import React, { ReactNode } from "react";
import { FlatList } from "react-native";
import { PageContainer, Card, Text, Seperator } from "react-native-ccl";

const CardPage = () => {
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
            <Card expandable={true}
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

    const ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

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