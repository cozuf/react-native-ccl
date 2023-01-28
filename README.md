# react-native-ccl

react native cozuf component library

## explanation
When I first started developing React Native, I had a dream of making my own component library. Later, this desire increased even more because in the projects I developed; I'm tired of creating a 'components' folder, editing the theme structure and copy-pasting the folder from previous projects.<br>
I do not intend to compete with widely used react-native libraries. I just tried to do this for the purpose of using it myself. Still, friends who want to use it or who want to help develop it, of course, can use it.

I would like to thank [Ziya Doğramacı](https://dogramaciziya.medium.com/), [Furkan Atakan Bozkurt](https://github.com/lfabl) and the [NİBGAT](https://github.com/nibgat) for their inspiration and help in developing this library.

## Installation
This library then uses the following libraries, so you need to install them as well.

[react-navigation](https://reactnavigation.org/docs/5.x/getting-started)<br>
[react-native-modal](https://github.com/react-native-modal/react-native-modal)<br>
[react-native-date-picker](https://github.com/henninghall/react-native-date-picker)<br>
[react-native-modalize](https://github.com/jeremybarbet/react-native-modalize)<br>
[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)<br>

```sh
npm install react-native-ccl
```

## Components

1. [Badge](https://github.com/cozuf/react-native-ccl/tree/develop#badge) <br>
2. [Button](https://github.com/cozuf/react-native-ccl/tree/develop#button) <br>
3. [Card](https://github.com/cozuf/react-native-ccl/tree/develop#card) <br>
4. [CheckBox](https://github.com/cozuf/react-native-ccl/tree/develop#checkbox) <br>
5. [CheckBoxGroup](https://github.com/cozuf/react-native-ccl/tree/develop#checkboxgroup) <br>
6. [Chip](https://github.com/cozuf/react-native-ccl/tree/develop#chip) <br>
7. [ChipGroup](https://github.com/cozuf/react-native-ccl/tree/develop#chipgroup) <br>
8. [DateTimePicker](https://github.com/cozuf/react-native-ccl/tree/develop#datetimepicker) <br>
9.  [Icon](https://github.com/cozuf/react-native-ccl/tree/develop#icon) <br>
10. [Modal](https://github.com/cozuf/react-native-ccl/tree/develop#modal) <br>
11. [RadioButton](https://github.com/cozuf/react-native-ccl/tree/develop#radiobutton) <br>
12. [RadioButtonGroup](https://github.com/cozuf/react-native-ccl/tree/develop#radiobuttongroup) <br>
13. [SearchBar](https://github.com/cozuf/react-native-ccl/tree/develop#searchbar) <br>
14. [SelectBox](https://github.com/cozuf/react-native-ccl/tree/develop#selectbox) <br>
15. [Seperator](https://github.com/cozuf/react-native-ccl/tree/develop#seperator) <br>
16. [SnackBar](https://github.com/cozuf/react-native-ccl/tree/develop#snackbar) <br>
17. [Switch](https://github.com/cozuf/react-native-ccl/tree/develop#switch) <br>
18. [TapSelector](https://github.com/cozuf/react-native-ccl/tree/develop#tapselector) <br>
19. [Text](https://github.com/cozuf/react-native-ccl/tree/develop#text) <br>
20. [TextInput](https://github.com/cozuf/react-native-ccl/tree/develop#textinput) <br>

## Usage

## Badge
```js
import { Badge } from "react-native-ccl";

(
    <Badge
        testID={string}
        size={'small' | 'medium' | 'large' | number}
        value={number | string}
   />
)
```

## Button
```js
import { Button } from "react-native-ccl";

(
    <Button
        testID={string}
        clickType={'opacity' | 'changeable'}
        childType={'text' | 'icon' | 'both'}
        type={'filled' | 'outlined' | 'simplied'}
        wrap={'wrap' | 'no-wrap' | 'free'}
        onPress={()=> void}
        onLongPress={()=> void}
        icon={IIconProps | ReactNode}
        title={string}
        titleStyle={StyleProp<TextStyle>}
        containerStyle={StyleProp<ViewStyle>}
   />
)
```

## Card
```js
import { Card } from "react-native-ccl";

(
    <Card
        expandable={boolean}
        active={boolean}
        headerComponent={()=> ReactNode}
        footerComponent={()=> ReactNode}
        containerStyle={ViewStyle}
        headerContainerStyle={ViewStyle}
        footerContainerStyle={ViewStyle}
        bodyContainerStyle={ViewStyle}
   />
)
```

## CheckBox
```js
import { CheckBox } from "react-native-ccl";

(
    <CheckBox
        testID={string}
        active={boolean}
        selected={boolean}
        title={string}
        value={any}
        iconSet={
            selected: IIconProps | React.ReactNode;
            notSelected: IIconProps | React.ReactNode;
        }
        onSelect={(selected: boolean)=> void}
        containerStyle={ViewStyle}
        titleContainerStyle={ViewStyle}
        titleStyle={ViewStyle}
   />
)
```

## CheckBoxGroup
```js
import { CheckBoxGroup } from "react-native-ccl";

(
    <CheckBoxGroup
        data={ReadonlyArray<ItemT>}
        onSelect={(item: ItemT, index: number) => void}
        renderItem={(info: ListRenderItemInfo<ItemT>) => React.ReactElement | null}
        onSubmit={(data: ItemT[]) => void}
        submitTitle={string}
        minChoice={number}
        maxChoice={number}
        selectAllTitle={string}
        unSelectAllTitle={string}
   />
)
```

## Chip
```js
import { Chip } from "react-native-ccl";

(
    <Chip
        testID={string}
        selected={boolean}
        title={string}
        active={boolean}
        onSelect={(selected: boolean) => void}
        containerStyle={StyleProp<ViewStyle>}
        titleStyle={StyleProp<TextStyle>}
   />
)
```

## ChipGroup
```js
import { ChipGroup } from "react-native-ccl";

(
    <ChipGroup
        data={ReadonlyArray<ItemT>}
        onSelect={(item: ItemT, index: number) => void}
        renderItem={(info: ListRenderItemInfo<ItemT>) => React.ReactElement | null}
        containerStyle={StyleProp<ViewStyle>}
        selectionType={"multiSelect" | "singleSelect"}
   />
)
```

## DateTimePicker
```js
import { DateTimePicker } from "react-native-ccl";

(
    <DateTimePicker
        testID={string}
        active={boolean}
        display={'modal' | 'bottomSheet'}
        title={string}
        placeholder={string}
        date={Date}
        mode={'date' | 'time' | 'datetime'}
        onDateChange={(date: Date) => void}
        onSubmit={(date: Date) => void}
        containerStyle={StyleProp<ViewStyle>}
        titleContainerStyle={StyleProp<ViewStyle>}
        titleStyle={StyleProp<TextStyle>}
        textContainerStyle={StyleProp<ViewStyle>}
        textStyle={StyleProp<TextStyle>}
   />
)
```

## Icon
```js
import { Icon } from "react-native-ccl";

(
    <Icon
        family={'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'FontAwesome5' | 'FontAwesome5Pro' | 'Fontisto' | 'Foundation' | 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'Octicons' | 'SimpleLineIcons' | 'Zocial'}
        name={string} (https://oblador.github.io/react-native-vector-icons/)
        size={number}
        color={ColorValue}
        active={boolean}
        containerStyle={StyleProp<ViewStyle>}
   />
)
```

## Modal
```js
import { Modal } from "react-native-ccl";

(
    <Modal
        testID={string}
        type={"default" | "loading" | "fault" | "warning" | "selective"}
        visible={boolean}
        outsideStyle={StyleProp<ViewStyle>}
        containerStyle={StyleProp<ViewStyle>}
        onTouchOutSide={(value: boolean) => void}
        indicatorProps={Partial<Omit<IActivityIndicatorProps, "testID">>}
        title={string}
        message={string}
        acceptButtonTitle={string}
        onAcceptButtonPress={() => void}
        rejectButtonTitle={string}
        onRejectButtonPress={() => void}
   />
)
```

// ## Contributing

//See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## RadioButton
```js
import { RadioButton } from "react-native-ccl";

(
    <RadioButton
        testID={string}
        active={boolean}
        selected={boolean}
        title={string}
        value={any}
        iconSet={
            selected: IIconProps | ReactNode
            notSelected: IIconProps | ReactNode
        }
        onSelect={(selected: boolean) => void}
        containerStyle={StyleProp<ViewStyle>}
        iconContainerStyle={StyleProp<ViewStyle>}
        titleContainerStyle={StyleProp<ViewStyle>}
        titleStyle={StyleProp<TextStyle>}
   />
)
```

## RadioButtonGroup
```js
import { RadioButtonGroup } from "react-native-ccl";

(
    <RadioButtonGroup
        data={ReadonlyArray<ItemT>}
        onSelect={(item: ItemT, index: number) => void}
        renderItem={(info: ListRenderItemInfo<ItemT>) => React.ReactElement | null}
        onSubmit={( selectedList: ItemT[] ) => void}
        submitTitle={string}
   />
)
```

## SearchBar
```js
import { SearchBar } from "react-native-ccl";

(
    <SearchBar
        testID={string}
        value={string}
        minimumCharToInvoke={number}
        onSearch={(text: string) => void}
   />
)
```

## SelectBox
```js
import { SelectBox } from "react-native-ccl";

(
    <SelectBox
        testID={string}
        active={boolean}
        displayType={'modal' | "bottomSheet" | 'page'}
        selectionType={'singleSelect' | 'multiSelect'}
        title={string}
        titleStyle={StyleProp<TextStyle>}
        titleContainerStyle={StyleProp<TextStyle>}
        placeholder={string}
        textStyle={StyleProp<TextStyle>}
        textContainerStyle={StyleProp<TextStyle>}
        searchable={boolean}
        searchText={string}
        onSearch={(text: string) => void}
        data={ReadonlyArray<ItemT>}
        onSelect={(item: ItemT, index: number) => void}
        onSubmit={(data: ReadonlyArray<ItemT>) => void}
        renderItem={(info: ListRenderItemInfo<ItemT>) => React.ReactElement | null}
        navigation={NavigationProp<ParamListBase>}
        page={string}
        maxChoice={number}
        minChoice={number}
        containerStyle={ViewStyle}
   />
)
```

## Seperator
```js
import { Seperator } from "react-native-ccl";

(
    <Seperator
        type={"vertical" | "horizontal"}
        size={"small" | "medium" | "large" | string | number}
        containerStyle={StyleProp<ViewStyle>}
        style={StyleProp<ViewStyle>}
   />
)
```

## SnackBar
```js
import { SnackBar } from "react-native-ccl";

(
    <SnackBar
        duration={"short" | "medium" | "long" | "infinite"}
        containerStyle={StyleProp<ViewStyle>}
   />
)
```

## Switch
```js
import { Switch } from "react-native-ccl";

(
    <Switch
        testID={string}
        active={boolean}
        title={string}
        value={boolean}
        onValueChange={(value: boolean) => void}
        containerStyle={StyleProp<ViewStyle>}
        titleContainerStyle={StyleProp<ViewStyle>}
        titleStyle={StyleProp<TextStyle>}
   />
)
```

## TapSelector
```js
import { TapSelector } from "react-native-ccl";

(
    <TapSelector
        testID={string}
        data={ReadonlyArray<ItemT>}
        onTap={(selectedItem: ItemT, selectedIndex: number) => void}
        titleStyle={StyleProp<TextStyle>}
        containerStyle={StyleProp<ViewStyle>}
   />
)
```

## Text
```js
import { Text } from "react-native-ccl";

(
    <Text
        testID={string}
        size={'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'}
        weigth={'light' | 'regular' | 'medium' | 'semiBold' | 'bold'}
        active={boolean}
        style={StyleProp<TextStyle>}
        onPress={() => void}
        onLongPress={() => void}
   />
)
```

## TextInput
```js
import { TextInput } from "react-native-ccl";

(
    <TextInput
        testID={string}
        active={boolean}
        type={'email' | 'password' | 'default' | "phone" | "calculator"}
        titleContainerStyle={StyleProp<ViewStyle>}
        title={string}
        titleStyle={StyleProp<TextStyle>}
        icon={IIconProps | ReactNode}
        value={string}
        onChangeText={(text: string) => void}
        onFocus={(e: NativeSyntheticEvent<TextInputFocusEventData>) => void}
        onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => void}
        inputStyle={StyleProp<TextStyle>}
        warning={string}
        warningStyle={StyleProp<TextStyle>}
        warningContainerStyle={StyleProp<TextStyle>}
        error={string}
        errorStyle={StyleProp<TextStyle>}
        errorContainerStyle={StyleProp<TextStyle>}
        containerStyle={StyleProp<ViewStyle>}
        cleanable={boolean}
        isRequired={boolean}
   />
)
```

## License

MIT

