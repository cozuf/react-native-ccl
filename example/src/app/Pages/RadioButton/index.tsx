import React, { useState } from 'react';
import { PageContainer, RadioButton } from 'react-native-ccl';

const RadioButtonPage = () => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <PageContainer type="default">
      <RadioButton
        selected={selected}
        onSelect={(v:boolean) => {
          setSelected(v);
        }}
      />
    </PageContainer>
  );
};

export default RadioButtonPage;
