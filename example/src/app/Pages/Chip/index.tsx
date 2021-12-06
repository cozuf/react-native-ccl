import React, { useState } from 'react';
import { Chip, PageContainer } from 'react-native-ccl';

const ChipPage = () => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <PageContainer type="default">
      <Chip
        selected={selected}
        title={`Chip ${selected}`}
        active={true}
        onSelect={() => {
          setSelected(!selected);
        }}
      />
    </PageContainer>
  );
};

export default ChipPage;
