import React, { PureComponent } from 'react';
import { View, Animated, ColorValue, ViewStyle } from 'react-native';

import Indicator, { IIndicatorProps, ParameterType } from '../indicator';
import styles from './styles';

interface IUIActivityIndicatorProps extends IIndicatorProps {
  color: ColorValue
  size: number
}

export default class UIActivityIndicator extends PureComponent<IUIActivityIndicatorProps, any> {
  static defaultProps = {
    color: 'rgb(0, 0, 0)',
    count: 12,
    size: 40,
  };

  constructor(props: IUIActivityIndicatorProps) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({ index, count, progress }: ParameterType) {
    let { size = 40, color: backgroundColor = "rgb(0, 0, 0)" } = this.props;
    let angle = index * 360 / count;

    let layerStyle = {
      transform: [{
        rotate: angle + 'deg',
      }],
    };

    let inputRange = Array
      .from(new Array(count + 1), (_, index) => (
        index / count
      ));

    let outputRange = Array
      .from(new Array(count), (_, index) => (
        Math.max(1.0 - index * (1 / (count - 1)), 0)
      ));

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop() as number);
    }

    outputRange.unshift(...outputRange.slice(-1));

    let barStyle: ViewStyle = {
      width: size / 10,
      height: size / 4,
      borderRadius: size / 20,
      backgroundColor,
      opacity: progress.interpolate({ inputRange, outputRange }) as any,
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={barStyle} />
      </Animated.View>
    );
  }

  render() {
    let { style = {}, count = 12, size: width = 40, size: height = 40, ...props } = this.props;

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
