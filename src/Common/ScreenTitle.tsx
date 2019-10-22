import React from 'react';
import styled from 'styled-components/native';
import { Animated, Text, Easing } from 'react-native';

const Wrapper = styled.View`
  padding: 0 25px;
  overflow: visible;
  height: 80px;
`;

const MainText = styled.Text`
  font-size: 30px;
  color: #eee;
  margin-top: 15px;
`;

const BackgroundText = styled(Animated.createAnimatedComponent(Text))`
  position: absolute;
  left: 25px;
  right: 0;
  top: -20px;
  font-size: 100px;
  color: #aaaaaa;
  font-weight: bold;
`;

export interface Props {
  title: string;
  noBackgroundText?: boolean;
  style?: any;
}

export interface State {
  AppearAnim: Animated.Value;
}

export default class ScreenTitle extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      AppearAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.AppearAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad)
    }).start();
  }

  render() {
    const { title, noBackgroundText = false, style = {} } = this.props;
    const { AppearAnim } = this.state;
    const left = AppearAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 25]
    });
    const opacity = AppearAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.3]
    });

    return (
      <Wrapper style={style}>
        {!noBackgroundText && (
          <BackgroundText style={{ left, opacity }} numberOfLines={1} ellipsizeMode="clip">
            {title}
          </BackgroundText>
        )}
        <MainText>{title}</MainText>
      </Wrapper>
    );
  }
}
