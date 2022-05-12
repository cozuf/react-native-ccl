import React, { useState } from 'react';
import { PageContainer, CheckBox } from 'react-native-ccl';

const CheckBoxPage = () => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <PageContainer type="default">
      <CheckBox
        selected={selected}
        value={`${selected}`}
        onSelect={(v: boolean) => {
          setSelected(v);
        }}
      />
    </PageContainer>
  );
};

export default CheckBoxPage;
