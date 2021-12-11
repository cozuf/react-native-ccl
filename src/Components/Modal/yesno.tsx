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
import { Button, Seperator, Text } from '..';
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
  buttonYesTitle?: string;
  buttonNoTitle?: string;
  onYesButtonPress?: () => void;
  onNoButtonPress?: () => void;
}

export type IModalTypes = IModalProps & Omit<ModalProps, 'visible' | 'style'>;

const YesNo: FC<IModalTypes> = ({
  testID,
  title = 'Uyarı',
  message = 'Lütfen Bekleyin',
  visible,
  outsideStyle,
  containerStyle,
  buttonYesTitle = 'Tamam',
  buttonNoTitle = 'İptal',
  onYesButtonPress = () => { },
  onNoButtonPress = () => { },
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
          <View style={styles.buttonsContainer}>
            <Button
              type="outlined"
              containerStyle={styles.buttonContainer}
              title={buttonNoTitle}
              onPress={onNoButtonPress}
            />
            <Seperator type="horizontal" />
            <Button
              containerStyle={styles.buttonContainer}
              title={buttonYesTitle}
              onPress={onYesButtonPress}
            />
          </View>
        </Pressable>
      </Pressable>
    </NativeModal>
  );
};

export default YesNo;

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
  },
  buttonsContainer: {
    flexDirection: "row"
  },
  buttonContainer: {
    flex: 1
  }
});
