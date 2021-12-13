import React, { useState } from 'react';
import { View } from 'react-native';
import { PageContainer, Seperator, TapSelector, TextInput } from 'react-native-ccl';

const ACTIVE_DATA = [
  {
    title: 'Active',
    value: true,
  },
  {
    title: 'Passive',
    value: false,
  },
];

const PASSWORD_DATA = [
  {
    title: 'Text',
    value: false,
  },
  {
    title: 'Password',
    value: true,
  }
];

const TextInputPage = () => {
  const [value, setValue] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <PageContainer type="default">
      <TextInput
        active={active}
        value={value}
        onChangeText={setValue}
        cleanable={true}
        type={showPassword ? "password" : "default"}
      />

      <View style={{ paddingVertical: 16 }}>
        <TapSelector
          data={ACTIVE_DATA}
          onTap={() => {
            setActive((prev) => !prev);
          }}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={PASSWORD_DATA}
          onTap={(item) => {
            setShowPassword(item.value);
          }}
        />
      </View>
    </PageContainer>
  );
};

export default TextInputPage;
