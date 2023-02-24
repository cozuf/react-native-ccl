import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Button, ISnackBarProps, PageContainer, Seperator, ISnackBarRef, TapSelector, useSetSnackBar, useSnackBar } from 'react-native-ccl';

const FORMS = [
    {
        title: "backToFront"
    },
    {
        title: "leftToRight"
    },
    {
        title: "rightToLeft"
    },
    {
        title: "bottomToTop"
    },
    {
        title: "hideToShow"
    },
]

const TYPES = [
    {
        title: "default"
    },
    {
        title: "success"
    },
    {
        title: "error"
    }
]

const DURATIONS = [
    {
        title: "infinite"
    },
    {
        title: "short"
    },
    {
        title: "medium"
    },
    {
        title: "long"
    }
]

const SnackBarPage = () => {
    const snackBar = useSnackBar()
    const setSnackBar = useSetSnackBar()
    const snackBarRef = useRef<ISnackBarRef>() as RefObject<ISnackBarRef>
    const [visible, setVisible] = useState<boolean | null>(false)
    const [formIndex, setFormIndex] = useState<number>(0);
    const [typeIndex, setTypeIndex] = useState<number>(0);
    const [durationIndex, setDurationIndex] = useState<number>(0);

    useEffect(() => {
        setSnackBar({
            props: {
                duration: DURATIONS[durationIndex].title as ISnackBarProps["duration"],
                displayForm: FORMS[formIndex].title as ISnackBarProps["displayForm"],
                type: TYPES[typeIndex].title as ISnackBarProps["type"],
                onCompleteHide: () => { setVisible(false) },
                onCompleteShow: () => { setVisible(true) }
            }
        })
    }, [formIndex, typeIndex, durationIndex])

    return (
        <PageContainer type="default">
            <TapSelector
                containerStyle={{ marginBottom: 8 }}
                data={FORMS}
                onTap={(_, index) => {
                    setFormIndex(index);
                }}
            />
            <TapSelector
                containerStyle={{ marginBottom: 8 }}
                data={TYPES}
                onTap={(_, index) => {
                    setTypeIndex(index);
                }}
            />
            <TapSelector
                containerStyle={{ marginBottom: 8 }}
                data={DURATIONS}
                onTap={(_, index) => {
                    setDurationIndex(index);
                }}
            />
            <Button
                title="Show"
                disabled={visible !== false}
                onPress={() => {
                    snackBarRef.current?.show()
                    snackBar.show()
                    setVisible(null)
                }}
            />

            <Seperator type='vertical' />

            <Button
                title="Close"
                disabled={visible !== true}
                onPress={() => {
                    snackBarRef.current?.close()
                    setVisible(null)
                    snackBar.close()
                }}
            />
        </PageContainer>
    );
};

export default SnackBarPage;
