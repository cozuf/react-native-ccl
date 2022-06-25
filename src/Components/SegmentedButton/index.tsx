import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "../../Context";
import { Text, ITextProps } from ".."

export interface ISegmentedButtonProps<ItemT> {

    /**
     * Array of selectable options.
     * it must contain {title} and {value} keys.
     * {title} to show
     * {value} to operate
     *
     * it is better to include {active} and {selected} keys.
     * {selected} to show selected before
     */
    data: ReadonlyArray<ItemT>;

    /**
     * 
     */
    initialIndex?: number

    /**
     * 
     */
    onSelect?: (selectedItem: ItemT, selectedIndex: number) => void

    /**
     * 
     */
    renderItem?: (value: ItemT, index: number) => ReactElement | null

    /***
     * 
     */
    containerStyle?: StyleProp<ViewStyle>

    /**
     * 
     */
    itemContainerStyle?: StyleProp<ViewStyle>

    /**
     *  
     */
    itemTitleSize?: ITextProps["size"]

    /**
     *  
     */
    itemTitleWeight?: ITextProps["weigth"]
}

const SegmentedButton: FC<ISegmentedButtonProps<any>> = ({
    data,
    initialIndex = 0,
    onSelect,
    containerStyle,
    itemContainerStyle,
    renderItem,
    itemTitleSize = "l",
    itemTitleWeight = "semibold"
}) => {
    const theme = useTheme()
    const { colors, tokens } = theme

    const [dataList, setDataList] = useState(data.map((v: any, i: number) => ({ ...v, selected: i === initialIndex })))

    useEffect(() => {
        setDataList(data.map((v: any, i: number) => ({ ...v, selected: i === initialIndex })))
        if (typeof onSelect === "function") {
            onSelect(data[initialIndex], initialIndex)
        }
    }, [data])

    const onButtonSelect = (selectedIndex: number) => {
        const newDataList = dataList.map((v: any, i: number) => ({
            ...v,
            selected: i === selectedIndex
        }))
        setDataList(newDataList)
        if (typeof onSelect === "function") {
            onSelect(newDataList[selectedIndex], selectedIndex)
        }
    }

    const rendetCustomItem = (v: any, i: number): ReactNode => {

        return (
            <TouchableOpacity
                key={`${i}`}
                onPress={() => { onButtonSelect(i) }}
                disabled={!v.active || v.selected}
                style={[
                    itemContainerStyle,
                    styles.itemContainerStyle,
                    {
                        borderRadius: tokens.semiRadius,
                        paddingVertical: tokens.semiInner,
                        backgroundColor: v.selected ? colors.pageBackground : colors.transparent
                    }
                ]}>
                <Text
                    active={v.active}
                    size={itemTitleSize}
                    weigth={itemTitleWeight}
                >{v.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View
            style={
                [
                    {
                        borderRadius: tokens.radius,
                        paddingVertical: tokens.inner,
                        paddingHorizontal: tokens.doubleInner,
                        backgroundColor: colors.componentBackground
                    },
                    containerStyle,
                    styles.containerStyle
                ]
            }>
            {
                dataList.map(renderItem ? renderItem : rendetCustomItem)
            }
        </View>
    )
}

export default SegmentedButton

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: "row"
    },
    itemContainerStyle: {
        flex: 1,
        alignItems: "center"
    }
})

// TODO: animated ekle
// TODO: ColorScheme ye ekle