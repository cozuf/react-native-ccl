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
import { useThemeContext } from '../../Context/ThemeContext';

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

const Warning: FC<IModalTypes> = ({
  testID,
  title = 'Uyarı',
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
  const [theme] = useThemeContext();
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
            <Icon family="AntDesign" name="warning" size={24} />
            <View style={styles.titleContainer}>
              <Text weigth="Bold" size={'XL'} style={styles.title}>
                {title}
              </Text>
            </View>
          </View>
          <View style={styles.messageContainer}>
            <Text size="XL" weigth="Medium">
              {message}
            </Text>
          </View>
          <Button title={buttonTitle} onPress={onButtonPress} />
        </Pressable>
      </Pressable>
    </NativeModal>
  );
};

export default Warning;

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
