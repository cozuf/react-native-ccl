import React, { PureComponent } from 'react';
import { View, Animated, I18nManager, ColorValue, ViewStyle, TransformsStyle } from 'react-native';

import Indicator, { IIndicatorProps, ParameterType } from '../indicator';
import styles from './styles';

interface IPacmanIndicatorProps extends IIndicatorProps {
  color: ColorValue
  size: number
}

export default class PacmanIndicator extends PureComponent<IPacmanIndicatorProps, any> {
  static defaultProps = {
    animationDuration: 600,

    color: 'rgb(0, 0, 0)',
    size: 48,
  };

  constructor(props: IPacmanIndicatorProps) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderBlock({ index, count, progress }: ParameterType) {
    let { size = 48, color: backgroundColor = "rgb(0, 0, 0)" } = this.props;

    let transform: TransformsStyle["transform"] = [{
      translateX: progress.interpolate({
        inputRange: [0.5, 1],
        outputRange: [0, size / (I18nManager.isRTL ? 4 : -4)],
        extrapolate: 'clamp',
      }) as any,
    }];

    let style: ViewStyle = {
      position: 'absolute',
      top: size / 2 - size / 16,
      left: size / 2 + size / 16 + (index - 2) * size / 4,
      width: size / 8,
      height: size / 8,
      borderRadius: size / 16,
      backgroundColor,
      transform,
    };

    if (index === count - 1) {
      transform.push({
        scale: progress.interpolate({
          inputRange: [0, 0.5],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }) as any,
      });

      style.opacity = progress.interpolate({
        inputRange: [0, 0.25],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }) as any;
    }

    return (
      <Animated.View style={style} key={index} />
    );
  }

  renderComponent({ index, count, progress }: ParameterType) {
    let { size = 48, color: backgroundColor = "rgb(0, 0, 0)" } = this.props;

    if (index > 1) {
      return this.renderBlock({ index, count, progress });
    }

    let hf = size / 2;
    let qr = size / 4;

    let pacmanStyle: ViewStyle = {
      position: 'absolute',
      top: qr,
      left: 0,

      width: hf,
      height: hf,

      transform: [{
        rotate: progress.interpolate({
          inputRange: [0, 0.67, 1],
          outputRange: (true) ?
            ['0deg', '45deg', '0deg'] :
            ['0deg', '-45deg', '0deg'],
          extrapolate: 'clamp',
        }) as any,
      }],
    };

    let containerStyle: ViewStyle = {
      overflow: 'hidden',

      width: hf,
      height: qr,

      ...(index ? {
        top: qr,
        borderBottomLeftRadius: qr,
        borderBottomRightRadius: qr,
      } : {
        borderTopLeftRadius: qr,
        borderTopRightRadius: qr,
      }),

      backgroundColor,
    };

    return (
      <Animated.View style={pacmanStyle} key={index}>
        <Animated.View style={containerStyle} />
      </Animated.View>
    );
  }

  render() {
    let { style = {}, size = 48, ...props } = this.props;

    let indicatorStyle = {
      width: size * 1.25,
      height: size,
    };

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={indicatorStyle}
          renderComponent={this.renderComponent}
          {...props}
          count={5}
        />
      </View>
    );
  }
}
