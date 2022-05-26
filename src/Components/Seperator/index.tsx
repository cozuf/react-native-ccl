import React, { FC } from "react";
import { FlexStyle, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export interface ISperatorProps {
  /**
   *  Seperator Direction
   */
  type?: "vertical" | "horizontal"

  /**
   * small = 4
   * medium = 8
   * large = 16
   */
  size?: "small" | "medium" | "large" | string | number

  /**
   * 
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * 
   */
  style?: StyleProp<ViewStyle>
}

const Seperator: FC<ISperatorProps> = ({
  type = "horizontal",
  size = "small",
  containerStyle = {},
  style = {}
}) => {

  const defineSize = (): FlexStyle["height"] | FlexStyle["width"] => {
    switch (size) {
      case "small":
        return 4;
      case "medium":
        return 8
      case "large":
        return 16
    }
    return size
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={
          [
            type === "horizontal" ?
              { width: defineSize() }
              :
              { height: defineSize() },
            styles.style,
            style
          ]
        }
      />
    </View>
  )
}

export default Seperator

const styles = StyleSheet.create({
  container: {},
  style: {}
})