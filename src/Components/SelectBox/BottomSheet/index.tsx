import React, { FC, Fragment, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, CheckBox, Seperator, RadioButton } from '../..';
import { useTheme } from '../../../Context/Theme';

type SelectBoxBottomSheetTypes<ItemT> = {

    /**
     * type to choose
     * @default SingleSelect
     */
    selectionType: 'singleSelect' | 'multiSelect';

    /**
     * 
     */
    title?: string

    /**
     * Array of selectable options.
     * it must contain {title} and {value} keys.
     * {title} to show
     * {value} to operate
     *
     * it is better to include {active} and {selected} keys.
     * {active} to be selectable
     * {selected} to show selected before
     */
    data: ReadonlyArray<ItemT>;

    // setData: (data: ItemT[]) => void;

    /**
     * invokes when click the option
     */
    onSelect?: (item: ItemT, index: number) => void;

    /**
     * 
     */
    submitTitle?: string

    /**
     * invokes when selection complete and press submit button
     */
    onSubmit?: (selectedData: ItemT[]) => void;

    /**
     * callback if you want render custom item
     */
    renderItem?: (info: { item: ItemT, index: number }) => React.ReactElement | null;

    /**
     *
     */
    maxChoice?: number;

    /**
     *
     */
    minChoice?: number;
};

const SelectBoxBottomSheet: FC<SelectBoxBottomSheetTypes<any>> = ({
    title = "Başlık",
    data,
    selectionType = 'singleSelect',
    onSelect = () => { },
    submitTitle = "Onayla",
    onSubmit = () => { },
    renderItem,
    maxChoice = 0,
    minChoice = 0,
}) => {
    const [theme] = useTheme();
    const { checkBoxGroup } = theme.colors;

    const [nData, setNData] = useState(data);

    const onButtonSelect = (index: number) => {
        if (selectionType === "singleSelect") {
            const tData = nData.map((v, i) => ({ ...v, selected: i === index }));
            setNData(tData);
            if (typeof onSelect === 'function') {
                onSelect(tData[index], index);
            } else {
                console.error("'onSelect' is undefined");
            }

        } else {
            const tData = nData.map((v: any, i: number) => ({
                ...v,
                selected: i === index ? !v.selected : v.selected,
            }));
            if (maxChoice !== 0) {
                const selectedDataLength = tData.filter((v: any) => v.selected).length;
                if (selectedDataLength === maxChoice) {
                    const mData = tData.map((v: any) => ({
                        ...v,
                        active: v.selected,
                    }));
                    setNData(mData);
                } else {
                    const mData = tData.map((v: any) => ({
                        ...v,
                        active: true,
                    }));
                    setNData(mData);
                }
            } else {
                setNData(tData);
            }
            if (typeof onSelect === 'function') {
                onSelect(nData[index], index);
            } else {
                console.error("'onSelect' is undefined");
            }
        }
    };

    const isDisabled = (): boolean => {
        if (selectionType === "multiSelect" && minChoice !== 0) {
            const selectedLength = nData.filter((v: any) => v.selected).length;
            return selectedLength < minChoice;
        } else if (selectionType === "singleSelect") {
            const selectedLength = nData.filter((v: any) => v.selected).length;
            return selectedLength < 1;
        }
        else {
            return false;
        }
    };

    const renderSingleSelect = () => {
        return nData.map((v: any, i: number) => {
            return (
                <Fragment>
                    {typeof renderItem === "function" ?
                        renderItem({ item: v, index: i })
                        :
                        <RadioButton
                            key={i.toString()}
                            active={v.active}
                            selected={v.selected}
                            title={v.title}
                            onSelect={() => {
                                onButtonSelect(i);
                            }}
                        />}
                    {i !== nData.length - 1 ?
                        <Seperator
                            type="vertical"
                            size={1}
                            style={{ width: "96%", backgroundColor: checkBoxGroup.active.seperator }}
                            containerStyle={styles.seperatorContainer}
                        />
                        :
                        null
                    }
                </Fragment>
            )
        })
    };

    const renderMultiSelect = () => {
        return nData.map((v: any, i: number) => {
            return (
                <Fragment>
                    {typeof renderItem === "function" ?
                        renderItem({ item: v, index: i })
                        :
                        <CheckBox
                            key={i.toString()}
                            active={v.active}
                            selected={v.selected}
                            title={v.title}
                            onSelect={() => {
                                onButtonSelect(i);
                            }}
                        />
                    }
                    {i !== nData.length - 1 ?
                        <Seperator
                            type="vertical"
                            size={1}
                            style={{ width: "96%", backgroundColor: checkBoxGroup.active.seperator }}
                            containerStyle={styles.seperatorContainer}
                        />
                        :
                        null
                    }
                </Fragment>
            )
        })
    };

    const renderChildren = () => {
        switch (selectionType) {
            case 'singleSelect':
                return renderSingleSelect();
            case 'multiSelect':
                return renderMultiSelect();
        }
    };

    return (
        <View>
            <Text size="l" style={styles.title}>{title}</Text>
            {renderChildren()}
            <Button
                wrap="no-wrap"
                disabled={isDisabled()}
                title={submitTitle}
                onPress={() => {
                    onSubmit(nData.map((v: any) => ({ ...v })));
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: "center"
    },
    seperatorContainer: {
        alignItems: 'center',
        paddingVertical: 4
    }
})

export default SelectBoxBottomSheet;
