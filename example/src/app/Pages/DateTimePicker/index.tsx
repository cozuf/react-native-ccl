import React, { useState } from 'react';
import { View } from 'react-native';
import { DateTimePicker, PageContainer, Seperator, TapSelector } from 'react-native-ccl';

const DISPLAY_TYPE_DATA = [
  { title: 'Modal', value: 'modal' },
  { title: 'BottomSheet', value: 'bottomSheet' }
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

const DateTimePickerPage = () => {
  const [displayTypeIndex, setDisplayTypeIndex] = useState<number>(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  return (
    <PageContainer type="default">
      <DateTimePicker
        date={date}
        display={
          DISPLAY_TYPE_DATA[displayTypeIndex].value as 'modal' | "bottomSheet"
        }
        // onDateChange={setDate}
        androidVariant="iosClone"
        mode={'date'}
        locale={'tr'}
        onSubmit={setDate}
        warning={warning}
        error={error}
      />
      <View style={{ paddingTop: 16 }}>
        <TapSelector
          data={DISPLAY_TYPE_DATA}
          onTap={(_: any, index: number) => {
            setDisplayTypeIndex(index);
          }}
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

export default DateTimePickerPage;
