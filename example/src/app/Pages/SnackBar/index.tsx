import React, { RefObject, useRef, useState } from 'react';
import { Button, ISnackBarProps, PageContainer, Seperator, SnackBar, SnackBarRef, TapSelector } from 'react-native-ccl';

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
    const snackBarRef = useRef<SnackBarRef>() as RefObject<SnackBarRef>
    const [visible, setVisible] = useState<boolean | null>(false)
    const [formIndex, setFormIndex] = useState<number>(0);
    const [durationIndex, setDurationIndex] = useState<number>(0);

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
                }}
            />
            <SnackBar
                ref={snackBarRef}
                duration={DURATIONS[durationIndex].title as ISnackBarProps["duration"]}
                displayForm={FORMS[formIndex].title as ISnackBarProps["displayForm"]}
                onCompleteHide={() => { setVisible(false) }}
                onCompleteShow={() => { setVisible(true) }}
            />
        </PageContainer>
    );
};

export default SnackBarPage;
