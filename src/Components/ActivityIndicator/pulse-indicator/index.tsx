import React, { PureComponent } from 'react';
import { View, Animated, Easing, ColorValue, ViewStyle } from 'react-native';

import Indicator, { IIndicatorProps, ParameterType } from '../indicator';
import styles from './styles';

interface IPulseIndicatorProps extends IIndicatorProps {
  color: ColorValue
  size: number
}

export default class PulseIndicator extends PureComponent<IPulseIndicatorProps, any> {
  static defaultProps = {
    animationEasing: Easing.out(Easing.ease),

    color: 'rgb(0, 0, 0)',
    size: 40,
  };

  constructor(props: IPulseIndicatorProps) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({ index, progress }: ParameterType) {
    let { size = 40, color = "rgb(0, 0, 0)" } = this.props;

    let pulseStyle: ViewStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: color,
      transform: [{
        scale: progress.interpolate({
          inputRange: [0, 0.67, 1],
          outputRange: index ?
            [0.4, 0.6, 0.4] :
            [0.4, 0.6, 1.0],
        }) as any,
      }],
      opacity: progress.interpolate({
        inputRange: [0, 0.67, 1],
        outputRange: index ?
          [1.0, 1.0, 1.0] :
          [0.5, 0.5, 0.0],
      }) as any,
    };

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={pulseStyle} />
      </Animated.View>
    );
  }

  render() {
    let { style = {}, size: width = 40, size: height = 40, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height }}
          renderComponent={this.renderComponent}
          {...props}
          count={2}
        />
      </View>
    );
  }
}
