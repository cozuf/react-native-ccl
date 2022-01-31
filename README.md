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
[react-native-indicators](https://github.com/n4kz/react-native-indicators)<br>
[react-native-modalize](https://github.com/jeremybarbet/react-native-modalize)<br>
[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)<br>

```sh
npm install react-native-ccl
```

## Components

1. [ActivityIndicator](https://github.com/cozuf/react-native-ccl/tree/develop#activityindicator) <br>
2. [Badge](https://github.com/cozuf/react-native-ccl/tree/develop#badge) <br>
3. [Button](https://github.com/cozuf/react-native-ccl/tree/develop#button) <br>
4. [Card](https://github.com/cozuf/react-native-ccl/tree/develop#card) <br>
5. [CheckBox](https://github.com/cozuf/react-native-ccl/tree/develop#checkbox) <br>
6. [CheckBoxGroup](https://github.com/cozuf/react-native-ccl/tree/develop#checkboxgroup) <br>
7. [Chip](https://github.com/cozuf/react-native-ccl/tree/develop#chip) <br>
8. [ChipGroup](https://github.com/cozuf/react-native-ccl/tree/develop#chipgroup) <br>
9. [DateTimePicker](https://github.com/cozuf/react-native-ccl/tree/develop#datetimepicker) <br>
10. [Icon](https://github.com/cozuf/react-native-ccl/tree/develop#icon) <br>
11. [Modal](https://github.com/cozuf/react-native-ccl/tree/develop#modal) <br>
12. [RadioButton](https://github.com/cozuf/react-native-ccl/tree/develop#radiobutton) <br>
13. [RadioButtonGroup](https://github.com/cozuf/react-native-ccl/tree/develop#radiobuttongroup) <br>
14. [SearchBar](https://github.com/cozuf/react-native-ccl/tree/develop#searchbar) <br>
15. [SelectBox](https://github.com/cozuf/react-native-ccl/tree/develop#selectbox) <br>
16. [SnackBar](https://github.com/cozuf/react-native-ccl/tree/develop#snackbar) <br>
17. [Seperator](https://github.com/cozuf/react-native-ccl/tree/develop#seperator) <br>
18. [Switch](https://github.com/cozuf/react-native-ccl/tree/develop#switch) <br>
19. [TapSelector](https://github.com/cozuf/react-native-ccl/tree/develop#tapselector) <br>
20. [Text](https://github.com/cozuf/react-native-ccl/tree/develop#text) <br>
21. [TextInput](https://github.com/cozuf/react-native-ccl/tree/develop#textinput) <br>

## Usage

## ActivityIndicator
```js
import { ActivityIndicator } from "react-native-ccl";

(
    <ActivityIndicator
        testID
        type = 'default' | 'ballIndicator' | 'barIndicator' | 'dotIndicator' | 'materialIndicator' | 'pacmanIndicator' | 'pulseIndicator' | 'skypeIndicator' | 'uIActivityIndicator' | 'waveIndicator'
        color
        size = {24}
   />
)
```

## Badge
```js
import { ActivityIndicator } from "react-native-ccl";

(
    <Badge
        testID
        size = 'small' | 'medium' | 'large' | number
        value = number | string
   />
)
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
