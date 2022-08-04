import React, { PureComponent } from 'react';
import { View, Animated, Easing, ColorValue } from 'react-native';

import Indicator, { IIndicatorProps, ParameterType } from '../indicator';
import styles from './styles';

interface IWaveIndicatorProps extends IIndicatorProps {
  waveFactor: number,
  waveMode: 'fill' | 'outline'
  color: ColorValue
  size: number
}

const floatEpsilon = Math.pow(2, -23);

export default class WaveIndicator extends PureComponent<IWaveIndicatorProps, any> {
  static defaultProps = {
    animationEasing: Easing.out(Easing.ease),
    animationDuration: 1600,

    waveFactor: 0.54,
    waveMode: 'fill',

    color: 'rgb(0, 0, 0)',
    count: 4,
    size: 40,
  };

  constructor(props: IWaveIndicatorProps) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({ index, progress }: ParameterType) {
    let { size = 40, color = "rgb(0, 0, 0)", waveFactor = 0.54, waveMode = "fill" } = this.props;
    let fill = 'fill' === waveMode;

    let factor = Math.max(1 - Math.pow(waveFactor, index), floatEpsilon);

    let waveStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      borderWidth: fill ? 0 : Math.floor(size / 20),
      [fill ? 'backgroundColor' : 'borderColor']: color,

      transform: [{
        scale: progress.interpolate({
          inputRange: [factor, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
      }],

      opacity: progress.interpolate({
        inputRange: [0, factor, 1],
        outputRange: [0, 1, 0],
      }),
    };

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={waveStyle} />
      </Animated.View>
    );
  }

  render() {
    let { style = {}, count = 4,
      size: width = 40, size: height = 40,
      animationEasing = Easing.out(Easing.ease),
      animationDuration = 1600, ...props
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height }}
          renderComponent={this.renderComponent}
          count={count}
          animationEasing={animationEasing}
          animationDuration={animationDuration}
          {...props}
        />
      </View>
    );
  }
}
