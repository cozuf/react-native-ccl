import React, { useState } from 'react';
import { View } from 'react-native';
import { DateTimePicker, IDateTimePickerProps, PageContainer, Seperator, TapSelector } from 'react-native-ccl';

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

const DateTimePickerPage = () => {
  const [active, setActive] = useState<boolean>(true)
  const [displayTypeIndex, setDisplayTypeIndex] = useState<number>(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState("");

  return (
    <PageContainer type="default">
      <DateTimePicker
        active={active}
        date={date}
        display={DISPLAY_TYPE_DATA[displayTypeIndex].value as IDateTimePickerProps["display"]}
        // onDateChange={setDate}
        androidVariant="iosClone"
        mode={'date'}
        locale={'tr'}
        onSubmit={setDate}
        error={error}
      />
      <View style={{ paddingTop: 16 }}>
        <TapSelector
          data={ACTIVE_DATA}
          onTap={() => {
            setActive(!active);
          }}
        />
        <Seperator type="vertical" />
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
      </View>
    </PageContainer>
  );
};

export default DateTimePickerPage;
