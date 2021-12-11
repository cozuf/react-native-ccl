import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Modal as NativeModal,
  ModalProps,
  Omit,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { ActivityIndicator, IActivityIndicatorProps, Text } from '..';
import { useTheme } from '../../Context/Theme';

export interface IModalProps {
  /**
   * 
   */
  testID?: string

  visible: boolean;
  outsideStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  message?: string;
}

export type IModalTypes = IModalProps &
  Omit<ModalProps, 'visible' | 'style'> &
  IActivityIndicatorProps;

const Loading: FC<IModalTypes> = ({
  testID,
  message = 'Lütfen Bekleyin',
  visible,
  outsideStyle,
  containerStyle,
  type,
  ...props
}) => {
  const ModalRef = useRef<NativeModal | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(visible);
  const [theme] = useTheme();
  const { modal } = theme.colors;

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  return (
    <NativeModal
      testID={testID}
      ref={(ref) => {
        ModalRef.current = ref;
      }}
      animationType="fade"
      visible={isVisible}
      transparent={true}
      {...props}
    >
      <Pressable
        style={[
          styles.outside,
          {
            backgroundColor: modal.outsideBackground,
          },
          outsideStyle,
        ]}
      >
        <Pressable
          style={[
            styles.container,
            {
              backgroundColor: modal.containerBackground,
              shadowColor: modal.shadow,
            },
            containerStyle,
          ]}
        >
          <ActivityIndicator type={type} size={40} />
          <Text size="xl" weigth="medium" style={styles.message}>
            {message}
          </Text>
        </Pressable>
      </Pressable>
    </NativeModal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  outside: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  container: {
    maxHeight: 200,
    width: 200,
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  message: {
    textAlign: 'center'
  }
});
