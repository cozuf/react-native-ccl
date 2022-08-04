
import React, { PureComponent } from 'react';
import { Animated, Easing, EasingFunction, StyleProp, ViewStyle } from 'react-native';

export type ParameterType = {
  index: number,
  count: number,
  progress: Animated.Value
}

export interface IIndicatorProps {
  animationEasing?: EasingFunction
  animationDuration?: number
  hideAnimationDuration?: number,

  animating?: boolean
  interaction?: boolean
  hidesWhenStopped?: boolean

  renderComponent?: (params: ParameterType) => JSX.Element,
  count?: number,

  style?: StyleProp<ViewStyle>
}

interface IIndicatorState {
  progress: Animated.Value
  hideAnimation: Animated.Value
}

export default class Indicator extends PureComponent<IIndicatorProps, IIndicatorState> {

  // static defaultProps = {
  //   animationEasing: Easing.linear,
  //   animationDuration: 1200,
  //   hideAnimationDuration: 200,

  //   animating: true,
  //   interaction: true,
  //   hidesWhenStopped: true,

  //   count: 1,
  //   style: []
  // };

  animationState: number;
  savedValue: number;

  constructor(props: IIndicatorProps) {
    super(props);

    /*
     *  0 -> 1
     *    | startAnimation
     *    | resumeAnimation
     *
     *  1 -> -1
     *    | stopAnimation
     *
     * -1 -> 0
     *    | saveAnimation
     */
    this.animationState = 0;
    this.savedValue = 0;

    let { animating = true } = this.props;

    this.state = {
      progress: new Animated.Value(0),
      hideAnimation: new Animated.Value(animating ? 1 : 0),
    };
  }

  componentDidMount() {
    let { animating = true } = this.props;

    if (animating) {
      this.startAnimation();
    }
  }

  componentDidUpdate(prevProps: IIndicatorProps) {
    let { animating = true } = this.props;

    if (animating && !prevProps.animating) {
      this.resumeAnimation();
    }

    if (!animating && prevProps.animating) {
      this.stopAnimation();
    }

    if (animating !== prevProps.animating) {
      let { hideAnimation } = this.state;
      let { hideAnimationDuration: duration } = this.props;

      Animated
        .timing(hideAnimation, {
          toValue: animating ? 1 : 0,
          duration,
          useNativeDriver: false
        })
        .start();
    }
  }

  startAnimation() {
    let { progress } = this.state;
    let { interaction = true, animationEasing = Easing.linear, animationDuration = 1200 } = this.props;

    if (0 !== this.animationState) {
      return;
    }

    let animation = Animated
      .timing(progress, {
        duration: animationDuration,
        easing: animationEasing,
        useNativeDriver: false,
        isInteraction: interaction,
        toValue: 1,
      });

    Animated
      .loop(animation)
      .start();

    this.animationState = 1;
  }

  stopAnimation() {
    let { progress } = this.state;

    if (1 !== this.animationState) {
      return;
    }

    let listener = progress
      .addListener(({ value }) => {
        progress.removeListener(listener);
        progress.stopAnimation(() => this.saveAnimation(value));
      });

    this.animationState = -1;
  }

  saveAnimation(value: number) {
    let { animating = true } = this.props;

    this.savedValue = value;
    this.animationState = 0;

    if (animating) {
      this.resumeAnimation();
    }
  }

  resumeAnimation() {
    let { progress } = this.state;
    let { interaction = true, animationDuration = 1200 } = this.props;

    if (0 !== this.animationState) {
      return;
    }

    Animated
      .timing(progress, {
        useNativeDriver: false,
        isInteraction: interaction,
        duration: (1 - this.savedValue) * animationDuration,
        toValue: 1,
      })
      .start(({ finished }) => {
        if (finished) {
          progress.setValue(0);

          this.animationState = 0;
          this.startAnimation();
        }
      });

    this.savedValue = 0;
    this.animationState = 1;
  }

  renderComponent(_: number, index: number) {
    let { progress } = this.state;
    let { renderComponent, count = 1 } = this.props;

    if ('function' === typeof renderComponent) {
      return renderComponent({ index, count, progress });
    }

    return null;
  }

  render() {
    let { hideAnimation } = this.state;
    let { count = 1, hidesWhenStopped = true, ...props } = this.props;

    return (
      <Animated.View style={[props.style, hidesWhenStopped ? { opacity: hideAnimation } : {}]} {...props}>
        {Array.from(new Array(count), this.renderComponent, this)}
      </Animated.View>
    );
  }
}
