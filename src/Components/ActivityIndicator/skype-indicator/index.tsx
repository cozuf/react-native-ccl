import React, { PureComponent } from 'react';
import { View, Animated, Easing, ColorValue, ViewStyle } from 'react-native';

import Indicator, { IIndicatorProps, ParameterType } from '../indicator';
import styles from './styles';

interface ISkypeIndicatorProps extends IIndicatorProps {
  color: ColorValue
  size: number
  minScale?: number
  maxScale?: number
}

export default class SkypeIndicator extends PureComponent<ISkypeIndicatorProps, any> {
  static defaultProps = {
    animationDuration: 1600,

    color: 'rgb(0, 0, 0)',
    count: 5,
    size: 40,

    minScale: 0.2,
    maxScale: 1.0,
  };

  constructor(props: ISkypeIndicatorProps) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({ index, count, progress }: ParameterType) {
    let { size = 40, minScale = 0.2, maxScale = 1.0, color: backgroundColor = "rgb(0, 0, 0)", animationDuration = 1600 } = this.props;
    let frames = 60 * animationDuration / 1000;
    let offset = index / (count - 1);
    let easing = Easing.bezier(0.5, offset, 0.5, 1.0);

    let inputRange = Array
      .from(new Array(frames), (_, index) => index / (frames - 1));

    let outputRange = Array
      .from(new Array(frames), (_, index) => easing(index / (frames - 1)) * 360 + 'deg');

    let layerStyle = {
      transform: [{
        rotate: progress.interpolate({ inputRange, outputRange }),
      }],
    };

    let ballStyle: ViewStyle = {
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      backgroundColor,
      transform: [{
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [
            maxScale - (maxScale - minScale) * offset,
            minScale + (maxScale - minScale) * offset,
          ],
        }) as any,
      }],
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={ballStyle} />
      </Animated.View>
    );
  }

  render() {
    let { style, count = 5, size: width = 40, size: height = 40, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height }}
          count={count}
          renderComponent={this.renderComponent}
          {...props}
        />
      </View>
    );
  }
}
