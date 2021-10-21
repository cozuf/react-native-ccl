import React, {useState} from 'react';
import {Switch as RNSwitch} from 'react-native';
import {PageContainer, Switch} from 'react-native-ccl';

const SwitchPage = () => {
  const [value, setValue] = useState<boolean>(false);
  return (
    <PageContainer type="Default">
      <Switch
        title={'Tema'}
        value={value}
        onValueChange={setValue}
        // backgroundColorOn={'red'}
        // backgroundColorOff={'grey'}
        // thumbcolor={'green'}
      />
      <RNSwitch value={value} onValueChange={setValue} />
    </PageContainer>
  );
};

export default SwitchPage;
