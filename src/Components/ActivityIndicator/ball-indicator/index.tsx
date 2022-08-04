import React, { PureComponent } from 'react';
import { View, Animated, ColorValue, ViewStyle } from 'react-native';

import Indicator, { IIndicatorProps, ParameterType } from '../indicator';
import styles from './styles';

export interface IBallIndicatorProps extends IIndicatorProps {
  color: ColorValue
  size: number
}

export default class BallIndicator extends PureComponent<IBallIndicatorProps, any> {
  static defaultProps = {
    color: 'rgb(0, 0, 0)',
    count: 8,
    size: 40,
  };

  constructor(props: IBallIndicatorProps) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({ index, count, progress }: ParameterType) {
    let { size = 40, color: backgroundColor = "rgba(0, 0, 0)" } = this.props;
    let angle = index * 360 / count;

    let layerStyle = {
      transform: [{
        rotate: angle + 'deg',
      }],
    };

    let inputRange: number[] = Array
      .from(new Array(count + 1), (_, index) => (
        index / count
      ));

    let outputRange: number[] = Array
      .from(new Array(count), (_, index) => (
        1.2 - 0.5 * index / (count - 1)
      ));

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop() as number);
    }

    outputRange.unshift(...outputRange.slice(-1));

    let ballStyle: ViewStyle = {
      margin: size / 20,
      backgroundColor,
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      transform: [{
        scale: progress.interpolate({ inputRange, outputRange }) as any,
      }],
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={ballStyle} />
      </Animated.View>
    );
  }

  render() {
    let { style = {}, size: width = 40, size: height = 40, count = 8, ...props } = this.props;

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
