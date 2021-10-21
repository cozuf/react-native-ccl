import React, {useState} from 'react';
import {PageContainer, RadioButton} from 'react-native-ccl';

const RadioButtonPage = () => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <PageContainer type="Default">
      <RadioButton
        selected={selected}
        onSelect={v => {
          setSelected(v);
        }}
      />
    </PageContainer>
  );
};

export default RadioButtonPage;
