import React from 'react';
import {
  createStackNavigator,
  StackHeaderLeftButtonProps,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import { PAGES_NAMES } from '../Pages';
import type { NavigationProp } from '@react-navigation/core';
import type { ParamListBase } from '@react-navigation/routers';
import {
  Button,
  Switch,
  useThemeContext,
  FONTS,
  dark,
  light,
  SelectPage as SelectBoxSelectPage,
} from 'react-native-ccl';

//#region Pages
import TextPage from '../Pages/Text';
import MainPage from '../Pages/MainPage';
import IconPage from '../Pages/Icon';
import TextInputPage from '../Pages/TextInput';
import ActivityIndicatorPage from '../Pages/ActivityIndicator';
import ButtonPage from '../Pages/Button';
import TapSelectorPage from '../Pages/TapSelector';
import RadioButtonPage from '../Pages/RadioButton';
import RadioButtonGroupPage from '../Pages/RadioButtonGroup';
import CheckBoxPage from '../Pages/CheckBox';
import CheckBoxGroupPage from '../Pages/CheckBoxGroup';
import ChipPage from '../Pages/Chip';
import ChipGroupPage from '../Pages/ChipGroup';
import BadgePage from '../Pages/Badge';
import ImagePage from '../Pages/Image';
import SearchBarPage from '../Pages/SearchBar';
import ModalPage from '../Pages/Modal';
import SelectBoxPage from '../Pages/SelectBox';
import DateTimePickerPage from '../Pages/DateTimePicker';
import SwitchPage from '../Pages/Switch';
import ColorsPage from '../Pages/Colors';
import BottomSheetPage from '../Pages/BottomSheet';

//#endregion

const Stack = createStackNavigator();

const Router = () => {
  const [theme, setTheme] = useThemeContext();
  const { common, text, pageContainer } = theme.colors;

  const renderHeaderLeft = (
    props: StackHeaderLeftButtonProps,
    navigation: NavigationProp<ParamListBase>
  ): React.ReactNode => {
    if (!props.canGoBack) {
      return null;
    }
    return (
      <Button
        childType="Icon"
        wrap="wrap"
        type="Simplied"
        icon={{
          family: 'AntDesign',
          name: 'arrowleft',
          color: common.secondary,
          size: 24,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      />
    );
  };

  return (
    <Stack.Navigator
      screenOptions={({ navigation }): StackNavigationOptions => ({
        ...TransitionPresets.SlideFromRightIOS,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: FONTS.semibold,
          fontWeight: undefined,
          color: text.active,
        },
        headerStyle: {
          backgroundColor: pageContainer.background,
          elevation: 0,
          shadowColor: 'transparent',
          shadowOpacity: undefined,
          shadowRadius: undefined,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        },
        headerLeft: (props: StackHeaderLeftButtonProps) => {
          return renderHeaderLeft(props, navigation);
        },
        headerRight: () => {
          return (
            <Switch
              title={'Koyu Tema'}
              value={theme.name === 'Dark'}
              onValueChange={(v) => {
                if (v) {
                  setTheme({ name: 'Dark', colors: dark });
                } else {
                  setTheme({ name: 'Light', colors: light });
                }
              }}
              containerStyle={{ paddingVertical: 2 }}
            />
          );
        },
      })}
      headerMode="screen"
      initialRouteName={PAGES_NAMES.MainPage}
    >
      <Stack.Screen name={PAGES_NAMES.MainPage} component={MainPage} />

      <Stack.Screen name={PAGES_NAMES.TextPage} component={TextPage} />
      <Stack.Screen name={PAGES_NAMES.IconPage} component={IconPage} />
      <Stack.Screen
        name={PAGES_NAMES.TextInputPage}
        component={TextInputPage}
      />
      <Stack.Screen
        name={PAGES_NAMES.ActivityIndicatorPage}
        component={ActivityIndicatorPage}
      />
      <Stack.Screen name={PAGES_NAMES.ButtonPage} component={ButtonPage} />
      <Stack.Screen
        name={PAGES_NAMES.TapSelectorPage}
        component={TapSelectorPage}
      />
      <Stack.Screen
        name={PAGES_NAMES.RadioButtonPage}
        component={RadioButtonPage}
      />
      <Stack.Screen
        name={PAGES_NAMES.RadioButtonGroupPage}
        component={RadioButtonGroupPage}
      />
      <Stack.Screen name={PAGES_NAMES.CheckBoxPage} component={CheckBoxPage} />
      <Stack.Screen
        name={PAGES_NAMES.CheckBoxGroupPage}
        component={CheckBoxGroupPage}
      />
      <Stack.Screen name={PAGES_NAMES.ChipPage} component={ChipPage} />
      <Stack.Screen
        name={PAGES_NAMES.ChipGroupPage}
        component={ChipGroupPage}
      />
      <Stack.Screen name={PAGES_NAMES.BadgePage} component={BadgePage} />
      <Stack.Screen name={PAGES_NAMES.ImagePage} component={ImagePage} />
      <Stack.Screen
        name={PAGES_NAMES.SearchBarPage}
        component={SearchBarPage}
      />
      <Stack.Screen name={PAGES_NAMES.ModalPage} component={ModalPage} />
      <Stack.Screen
        name={PAGES_NAMES.SelectBoxPage}
        component={SelectBoxPage}
      />
      <Stack.Screen
        name={PAGES_NAMES.SelectPage}
        component={SelectBoxSelectPage}
      />
      <Stack.Screen
        name={PAGES_NAMES.DateTimePickerPage}
        component={DateTimePickerPage}
      />
      <Stack.Screen name={PAGES_NAMES.SwitchPage} component={SwitchPage} />
      <Stack.Screen name={PAGES_NAMES.ColorsPage} component={ColorsPage} />
      <Stack.Screen name={PAGES_NAMES.BottomSheetPage} component={BottomSheetPage} />
    </Stack.Navigator>
  );
};

export default Router;
