import React, {FC, useEffect, useRef, useState} from 'react';
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
import {ActivityIndicator, IActivityIndicatorProps, Text} from '..';
import {useThemeContext} from '../../Context/ThemeContext';

export interface IModalProps {
  visible: boolean;
  outsideStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  message?: string;
}

export type IModalTypes = IModalProps &
  Omit<ModalProps, 'visible' | 'style'> &
  IActivityIndicatorProps;

const Loading: FC<IModalTypes> = ({
  message = 'Lütfen Bekleyin',
  visible,
  outsideStyle,
  containerStyle,
  type,
  ...props
}) => {
  const ModalRef = useRef<NativeModal | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(visible);
  const [theme] = useThemeContext();
  const {modal} = theme.colors;

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  return (
    <NativeModal
      ref={ref => {
        ModalRef.current = ref;
      }}
      animationType="fade"
      visible={isVisible}
      transparent={true}
      {...props}>
      <Pressable
        style={[
          styles.outside,
          {
            backgroundColor: modal.outsideBackground,
          },
          outsideStyle,
        ]}>
        <Pressable
          style={[
            styles.container,
            {
              backgroundColor: modal.containerBackground,
              shadowColor: modal.shadow,
            },
            containerStyle,
          ]}>
          <ActivityIndicator type={type} size={40} />
          <Text size="XL" weigth="Medium" style={{textAlign: 'center'}}>
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
});
