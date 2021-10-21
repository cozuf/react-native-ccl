import React, { useState } from 'react';
import { PageContainer, CheckBox } from 'react-native-ccl';

const CheckBoxPage = () => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <PageContainer type="Default">
      <CheckBox
        selected={selected}
        onSelect={v => {
          setSelected(v);
        }}
      />
    </PageContainer>
  );
};

export default CheckBoxPage;

// TODO: Alttaki border'ı kaldır