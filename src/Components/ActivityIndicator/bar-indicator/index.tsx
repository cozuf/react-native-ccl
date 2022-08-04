import React, { PureComponent } from 'react';
import { View, Animated, ColorValue, ViewStyle } from 'react-native';

import Indicator, { IIndicatorProps, ParameterType } from '../indicator';
import styles from './styles';

interface IBarIndicatorProps extends IIndicatorProps {
  color: ColorValue
  size: number
}

export default class BarIndicator extends PureComponent<IBarIndicatorProps, any> {
  static defaultProps = {
    count: 3,

    color: 'rgb(0, 0, 0)',
    size: 40,
  };


  constructor(props: IBarIndicatorProps) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  outputRange(base: number, index: number, count: number, samples: number) {
    let range = Array
      .from(new Array(samples), (_, index) => (
        base * Math.abs(Math.cos(Math.PI * index / (samples - 1)))
      ));

    for (let j = 0; j < index * (samples / count); j++) {
      range.unshift(range.pop() as number);
    }

    range.unshift(...range.slice(-1));

    return range;
  }

  renderComponent({ index, count, progress }: ParameterType) {
    let { color: backgroundColor = "rgb(0, 0, 0)", size = 40, animationDuration = 1200 } = this.props;

    let frames = 60 * animationDuration / 1000;
    let samples = 0;

    do
      samples += count;
    while (samples < frames);

    let inputRange = Array
      .from(new Array(samples + 1), (_, index) => index / samples);

    let
      width = Math.floor(size / 5),
      height = Math.floor(size / 2),
      radius = Math.ceil(width / 2);

    let containerStyle = {
      height: size,
      width: width,
      marginHorizontal: radius,
    };

    let topStyle: ViewStyle = {
      width,
      height,
      backgroundColor,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      transform: [{
        translateY: progress.interpolate({
          inputRange,
          outputRange: this.outputRange(+(height - radius) / 2, index, count, samples),
        }) as any,
      }],
    };

    let bottomStyle: ViewStyle = {
      width,
      height,
      backgroundColor,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
      transform: [{
        translateY: progress.interpolate({
          inputRange,
          outputRange: this.outputRange(-(height - radius) / 2, index, count, samples),
        }) as any,
      }],
    };

    return (
      <View style={containerStyle} {...{ key: index }}>
        <Animated.View style={topStyle} />
        <Animated.View style={bottomStyle} />
      </View>
    );
  }

  render() {
    let { style = {}, count = 3, ...props } = this.props;

    return (
      <Indicator
        style={[styles.container, style]}
        count={count}
        renderComponent={this.renderComponent}
        {...props}
      />
    );
  }
}
