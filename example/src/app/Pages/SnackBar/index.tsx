import React, { RefObject, useRef, useState } from 'react';
import { Button, PageContainer, SnackBar, SnackBarRef } from 'react-native-ccl';

const SnackBarPage = () => {
    const snackBarRef = useRef<SnackBarRef>() as RefObject<SnackBarRef>
    const [visible, setVisible] = useState(false)

    return (
        <PageContainer type="default">
            <Button title="Show" disabled={visible} onPress={() => {
                snackBarRef.current?.show()
                setVisible(true)
            }} />
            <Button title="Close" disabled={!visible} onPress={() => {
                snackBarRef.current?.close()
                setVisible(false)
            }} />
            <SnackBar ref={snackBarRef} duration="long" />
        </PageContainer>
    );
};

export default SnackBarPage;
