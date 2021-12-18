import React, { useState } from 'react';
import {
  Button,
  Modal,
  PageContainer,
} from 'react-native-ccl';
import type { IModalProps } from 'src/Components/Modal';

// const TYPES: IModalProps["type"][] = ["default", "fault", "loading", "selective", "warning"]

const ModalPage = () => {
  const [visibleNew, setVisibleNew] = useState<boolean>(false);

  const [type, setType] = useState<IModalProps["type"]>("selective")

  const renderNewModal = () => {
    return (
      <Modal
        type={type}
        visible={visibleNew}
        // containerStyle={{ flex: 1 }}
        onTouchOutSide={(v) => {
          setVisibleNew(v);
        }}
        onAcceptButtonPress={() => {
          setVisibleNew(false);
          // setType("default")
        }}
        onRejectButtonPress={() => {
          setVisibleNew(false);
          // setType("default")
        }}
        indicatorProps={{
          type: "uIActivityIndicator",
          size: 40
        }}
      />
    );
  };

  return (
    <PageContainer type="default">
      <Button
        childType="text"
        title={'Show New Modal'}
        onPress={() => {
          setVisibleNew(true);

          setTimeout(() => {
            setType("fault")
          }, 5000);
        }}
      />
      {renderNewModal()}
    </PageContainer>
  );
};

export default ModalPage;
