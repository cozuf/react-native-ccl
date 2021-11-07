import React, { useState } from 'react';
import { View } from 'react-native';
import { DateTimePicker, PageContainer, TapSelector } from 'react-native-ccl';

const DISPLAY_TYPE_DATA = [
  { title: 'Modal', value: 'Modal' },
  { title: 'BottomSheet', value: 'BottomSheet' }
];
const DateTimePickerPage = () => {
  const [displayTypeIndex, setDisplayTypeIndex] = useState<number>(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <PageContainer type="Default">
      <DateTimePicker
        date={date}
        display={
          DISPLAY_TYPE_DATA[displayTypeIndex].value as 'Modal' | "BottomSheet"
        }
        // onDateChange={setDate}
        androidVariant="iosClone"
        mode={'date'}
        locale={'tr'}
        onSubmit={setDate}
      />
      <View style={{ paddingTop: 16 }}>
        <TapSelector
          data={DISPLAY_TYPE_DATA}
          onTap={(_, index) => {
            setDisplayTypeIndex(index);
          }}
        />
      </View>
    </PageContainer>
  );
};

export default DateTimePickerPage;
