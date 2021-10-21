import React from 'react';
import {ColorValue, FlatList, View} from 'react-native';

const ColorsPage = () => {
  const LIMIT: number = 256;
  let colorsArray: ColorValue[] = [];
  for (let red = 0; red < LIMIT; red++) {
    //   for (let green = 0; green < LIMIT; green++) {
    //     for (let blue = 0; blue < LIMIT; blue++) {
    // colorsArray.push(`rgb(${red}, ${green}, ${blue})`);
    colorsArray.push(`rgb(${red}, 0, 0)`);
    //     }
    //   }
  }
  return (
    <FlatList
      bounces={false}
      data={colorsArray}
      renderItem={({item}) => {
        return <View style={{height: 50, backgroundColor: item}} />;
      }}
    />
  );
};

export default ColorsPage;
