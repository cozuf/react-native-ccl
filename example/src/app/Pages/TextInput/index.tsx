import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { ITextInputRef, PageContainer, Seperator, TapSelector, TextInput } from 'react-native-ccl';

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

const MULTILINE_DATA = [
  {
    title: 'Singleline',
    value: false,
  },
  {
    title: 'Multiline',
    value: true,
  }
];

const TITLE_DATA = [
  {
    title: 'Başlık Gösterme',
    value: undefined,
  },
  {
    title: 'Başlık Göster',
    value: "Bölge",
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

const TextInputPage = () => {
  const inputRef = useRef<ITextInputRef>(null)
  const [value, setValue] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [multilineIndex, setMultilineIndex] = useState<number>(0)
  const [titleIndex, setTitleIndex] = useState<number>(0);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef.current])

  return (
    <PageContainer type="default">
      <TextInput
        ref={inputRef}
        active={active}
        title={TITLE_DATA[titleIndex].value}
        value={value}
        onChangeText={setValue}
        cleanable={true}
        type={showPassword ? "password" : "default"}
        error={error}
        multiline={MULTILINE_DATA[multilineIndex].value}
        icon={{
          family: "AntDesign",
          name: "edit",
          size: 24
        }}
        inputStyle={MULTILINE_DATA[multilineIndex].value ? { height: 200 } : {}}
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
          data={MULTILINE_DATA}
          onTap={(_, selectedIndex) => { setMultilineIndex(selectedIndex) }}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={TITLE_DATA}
          onTap={(_, index: number) => setTitleIndex(index)}
        />
        <Seperator type="vertical" />
        <TapSelector
          data={ERROD_DATA}
          onTap={() => setError((pValue: string) => pValue.length > 0 ? "" : "Hata Var")}
        />
      </View>
    </PageContainer>
  );
};

export default TextInputPage;
