import React, { FC } from "react";
import { FlexStyle, StyleProp, View, ViewStyle } from "react-native";

export interface ISperatorProps {
  /**
   * 
   */
  type?: "vertical" | "horizontal"

  /**
   * 
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
    <View style={[containerStyle]}>
      <View
        style={
          [
            type === "horizontal" ?
              { width: defineSize() }
              :
              { height: defineSize() },
            style
          ]
        }
      />
    </View>
  )
}

export default Seperator