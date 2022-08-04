import React, { PureComponent } from 'react';
import { Animated, ColorValue, Easing, ViewStyle } from 'react-native';

import Indicator, { IIndicatorProps, ParameterType } from '../indicator';
import styles from './styles';

interface IDotIndicatorProps extends IIndicatorProps {
  color: ColorValue
  size: number
}

export default class DotIndicator extends PureComponent<IDotIndicatorProps, any> {
  static defaultProps = {
    animationEasing: Easing.inOut(Easing.ease),

    color: 'rgb(0, 0, 0)',
    count: 4,
    size: 16,
  };

  constructor(props: IDotIndicatorProps) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({ index, count, progress }: ParameterType) {
    let { size = 16, color: backgroundColor = "rgb(0, 0, 0)" } = this.props;

    let style: ViewStyle = {
      width: size,
      height: size,
      margin: size / 2,
      borderRadius: size / 2,
      backgroundColor,
      transform: [{
        scale: progress.interpolate({
          inputRange: [
            0.0,
            (index + 0.5) / (count + 1),
            (index + 1.0) / (count + 1),
            (index + 1.5) / (count + 1),
            1.0,
          ],
          outputRange: [
            1.0,
            1.36,
            1.56,
            1.06,
            1.0,
          ],
        }) as any,
      }],
    };

    return (
      <Animated.View style={style} {...{ key: index }} />
    );
  }

  render() {
    let { style = {}, count = 4, ...props } = this.props;

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
