import React from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

const FullWidthWrapper = styled.View`
  align-items: center;
  margin: 10px;
`;

const Wrapper = styled(Animated.View)`
  align-items: center;
  width: 46px;
`;

const Center = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background: white;
`;

const OrbitLine = styled.View`
  height: 46px;
  width: 46px;
  border-radius: 23px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: white;
`;

const Moon = styled.View`
  height: 14px;
  width: 14px;
  border-radius: 7px;
  background: white;
  position: absolute;
  left: 34px;
  top: 0;
`;

export interface Props {}
export interface State {
  moonAnim: Animated.Value;
  appearAnim: Animated.Value;
}
export default class extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      moonAnim: new Animated.Value(0),
      appearAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.loop(Animated.timing(this.state.moonAnim, { toValue: 1, duration: 1000 })).start();
    Animated.timing(this.state.appearAnim, {
      toValue: 1,
      duration: 400
    }).start();
  }

  render() {
    const moonRotation = this.state.moonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <FullWidthWrapper>
        <Wrapper
          style={{
            transform: [{ rotate: moonRotation }],
            opacity: this.state.appearAnim
          }}
        >
          <OrbitLine>
            <Center />
          </OrbitLine>
          <Moon />
        </Wrapper>
      </FullWidthWrapper>
    );
  }
}
