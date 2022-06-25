import React, { useState } from 'react';
import { View } from 'react-native';
import { Badge, Button, IBadgeProps, PageContainer, TapSelector } from 'react-native-ccl';

const SIZES = [{ title: 'small' }, { title: 'medium' }, { title: 'large' }];
const VALUES = [{ title: 5 }, { title: 10 }];

const BadgePage = () => {
  const [sizeIndex, setSizeIndex] = useState<number>(0);
  const [valueIndex, setValueIndex] = useState<number>(0);

  return (
    <PageContainer type="default">
      <View style={{ alignItems: 'center', paddingVertical: 12 }}>
        <View style={{ padding: sizeIndex === 0 ? 10 : sizeIndex === 1 ? 12 : 14 }}>
          <Button onPress={() => { }} />
          <Badge
            size={SIZES[sizeIndex].title as IBadgeProps["size"]}
            value={VALUES[valueIndex].title}
          />
        </View>
      </View>
      <View style={{ paddingVertical: 16 }}>
        <TapSelector
          containerStyle={{ marginBottom: 8 }}
          data={SIZES}
          onTap={(_, index) => {
            setSizeIndex(index);
          }}
        />
        <TapSelector
          data={VALUES}
          onTap={(_, index) => {
            setValueIndex(index);
          }}
        />
      </View>
    </PageContainer>
  );
};

export default BadgePage;
