import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Modal as NativeModal,
  ModalProps,
  Omit,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Button, Icon, Text } from '..';
import { useTheme } from '../../Context/Theme';

export interface IModalProps {
  /**
   * 
   */
  testID?: string

  visible: boolean;
  outsideStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  message?: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
}

export type IModalTypes = IModalProps & Omit<ModalProps, 'visible' | 'style'>;

const Fault: FC<IModalTypes> = ({
  testID,
  title = 'Hata',
  message = 'Lütfen Bekleyin',
  visible,
  outsideStyle,
  containerStyle,
  buttonTitle = 'Tamam',
  onButtonPress = () => { },
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
          <View
            style={styles.headerContainer}
          >
            <Icon family="AntDesign" name="closecircle" size={24} />
            <View style={styles.titleContainer}>
              <Text weigth="bold" size={'xl'} style={styles.title}>
                {title}
              </Text>
            </View>
          </View>
          <View style={styles.messageContainer}>
            <Text size="xl" weigth="medium">
              {message}
            </Text>
          </View>
          <Button title={buttonTitle} onPress={onButtonPress} />
        </Pressable>
      </Pressable>
    </NativeModal>
  );
};

export default Fault;

const styles = StyleSheet.create({
  outside: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  container: {
    maxHeight: 200,
    width: '90%',
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1
  },
  title: {
    textAlign: 'center'
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});
