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
import {useThemeContext} from '../../Context/ThemeContext';

export interface IModalProps {
  visible: boolean;
  outsideStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onTouchOutSide: (value: boolean) => void;
}

export type IModalTypes = IModalProps & Omit<ModalProps, 'visible' | 'style'>;

const Default: FC<IModalTypes> = ({
  visible,
  outsideStyle,
  containerStyle,
  onTouchOutSide = (v: boolean) => {
    visible = v;
  },
  children,
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
        ]}
        onPress={() => {
          setIsVisible(!isVisible);
          if (typeof onTouchOutSide === 'function') {
            onTouchOutSide(!isVisible);
          }
        }}>
        <Pressable
          style={[
            styles.container,
            {
              backgroundColor: modal.containerBackground,
              shadowColor: modal.shadow,
            },
            containerStyle,
          ]}>
          {children}
        </Pressable>
      </Pressable>
    </NativeModal>
  );
};

export default Default;

const styles = StyleSheet.create({
  outside: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  container: {
    maxHeight: '80%',
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
