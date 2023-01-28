import React, { useState } from 'react';
import {
  Button,
  Modal,
  PageContainer,
  Seperator,
  TapSelector,
} from 'react-native-ccl';
import type { IModalProps } from 'src/Components/Modal';

type TapDataType = {
  title: IModalProps["type"]
}

const TYPES: TapDataType[] = [
  { title: "default" },
  { title: "fault" },
  { title: "loading" },
  { title: "selective" },
  { title: "warning" }
]

const ModalPage = () => {
  const [visibleNew, setVisibleNew] = useState<boolean>(false);

  const [type, setType] = useState<IModalProps["type"]>("default")

  const renderNewModal = () => {
    return (
      <Modal
        type={type}
        visible={visibleNew}
        onTouchOutSide={(v: boolean) => {
          setVisibleNew(v);
        }}
        onAcceptButtonPress={() => {
          setVisibleNew(false);
        }}
        onRejectButtonPress={() => {
          setVisibleNew(false);
        }}
      />
    );
  };

  return (
    <PageContainer type="default">
      <TapSelector data={TYPES} onTap={(item: TapDataType) => { setType(item.title) }} />
      <Seperator type="vertical" />
      <Button
        childType="text"
        title={'Show New Modal'}
        onPress={() => {
          setVisibleNew(true);
        }}
      />
      {renderNewModal()}
    </PageContainer>
  );
};

export default ModalPage;
