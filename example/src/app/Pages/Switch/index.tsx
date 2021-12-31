import React, { useState } from 'react';
import { PageContainer, Switch } from 'react-native-ccl';

const SwitchPage = () => {
  const [value, setValue] = useState<boolean>(false);
  return (
    <PageContainer type="default">
      <Switch
        title={'Tema'}
        value={value}
        onValueChange={setValue}
      />
    </PageContainer>
  );
};

export default SwitchPage;
