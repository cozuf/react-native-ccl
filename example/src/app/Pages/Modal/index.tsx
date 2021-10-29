import React, { useState } from 'react';
import {
  Button,
  Modal,
  PageContainer,
  Seperator,
  Text,
} from 'react-native-ccl';

const ModalPage = () => {
  const [visibleDefault, setVisibleDefault] = useState<boolean>(false);
  const [visibleLoading, setVisibleLoading] = useState<boolean>(false);
  const [visibleWarning, setVisibleWarning] = useState<boolean>(false);
  const [visibleFault, setVisibleFault] = useState<boolean>(false);
  const [visibleYesNo, setVisibleYesNo] = useState<boolean>(false);

  const renderDefaultModal = () => {
    return (
      <Modal.Default
        visible={visibleDefault}
        containerStyle={{ flex: 1 }}
        onTouchOutSide={(v) => {
          setVisibleDefault(v);
        }}
      >
        <Text
          onPress={() => {
            // setVisible(false);
          }}
        >
          Yusuf
        </Text>
      </Modal.Default>
    );
  };

  const renderLoadingModal = () => {
    return (
      <Modal.Loading
        type="UIActivityIndicator"
        visible={visibleLoading}
        containerStyle={{ flex: 1 }}
      />
    );
  };

  const renderWarningModal = () => {
    return (
      <Modal.Warning
        visible={visibleWarning}
        containerStyle={{ flex: 1 }}
        onButtonPress={() => {
          setVisibleWarning(false);
        }}
      />
    );
  };

  const renderFaultModal = () => {
    return (
      <Modal.Fault
        visible={visibleFault}
        containerStyle={{ flex: 1 }}
        onButtonPress={() => {
          setVisibleFault(false);
        }}
      />
    );
  };

  const renderYesNoModal = () => {
    return (
      <Modal.YesNo
        visible={visibleYesNo}
        containerStyle={{ flex: 1 }}
        onYesButtonPress={() => {
          setVisibleYesNo(false);
        }}
        onNoButtonPress={() => {
          setVisibleYesNo(false);
        }}
      />
    );
  };

  return (
    <PageContainer type="Default">
      <Button
        childType="Text"
        title={'Show Default Modal'}
        onPress={() => {
          setVisibleDefault(true);
        }}
      />
      <Seperator.Vertical />
      <Button
        childType="Text"
        title={'Show Loading Modal'}
        onPress={() => {
          setVisibleLoading(true);
          setTimeout(() => {
            setVisibleLoading(false);
          }, 2000);
        }}
      />
      <Seperator.Vertical />
      <Button
        childType="Text"
        title={'Show Warning Modal'}
        onPress={() => {
          setVisibleWarning(true);
        }}
      />
      <Seperator.Vertical />
      <Button
        childType="Text"
        title={'Show Fault Modal'}
        onPress={() => {
          setVisibleFault(true);
        }}
      />
      <Seperator.Vertical />
      <Button
        childType="Text"
        title={'Show Yes No Modal'}
        onPress={() => {
          setVisibleYesNo(true);
        }}
      />
      {renderDefaultModal()}
      {renderLoadingModal()}
      {renderWarningModal()}
      {renderFaultModal()}
      {renderYesNoModal()}
    </PageContainer>
  );
};

export default ModalPage;
