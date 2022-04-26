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

const ERROD_DATA = [
  {
    title: 'Hata Yok',
    value: false,
  },
  {
    title: 'Hata Var',
    value: true,
  }
];
const WARNING_DATA = [
  {
    title: 'Uyarı Yok',
    value: false,
  },
  {
    title: 'Uyarı Var',
    value: true,
  }
];

const TextInputPage = () => {
  const [value, setValue] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  return (
    <PageContainer type="default">
      <TextInput
        active={active}
        value={value}
        onChangeText={setValue}
        cleanable={true}
        type={showPassword ? "password" : "default"}
        warning={warning}
        error={error}
        icon={{
          family: "AntDesign",
          name: "edit",
          size: 16
        }}
      />

      <View style={{ paddingVertical: 16 }}>
        <TapSelector
          data={ACTIVE_DATA}
          onTap={() => { setActive((prev) => !prev); }}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={PASSWORD_DATA}
          onTap={(item) => { setShowPassword(item.value) }}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={ERROD_DATA}
          onTap={() => setError((pValue: string) => pValue.length > 0 ? "" : "Hata Var")}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={WARNING_DATA}
          onTap={() => setWarning((pValue: string) => pValue.length > 0 ? "" : "Uyarı Var")}
        />
      </View>
    </PageContainer>
  );
};

export default TextInputPage;
