import React, { useState } from 'react';
import { DateTimePicker, PageContainer } from 'react-native-ccl';

const DateTimePickerPage = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <PageContainer type="Default">
      <DateTimePicker
        date={date}
        onDateChange={setDate}
        androidVariant="iosClone"
        mode={'date'}
        locale={'tr'}
      />
    </PageContainer>
  );
};

export default DateTimePickerPage;
