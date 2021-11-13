import React, { createRef, useState } from 'react';
import { Button, PageContainer, SnackBar } from 'react-native-ccl';

const SnackBarPage = () => {
    const snackBarRef = createRef<SnackBar>()
    const [visible, setVisible] = useState(false)

    return (
        <PageContainer type="Default">
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
