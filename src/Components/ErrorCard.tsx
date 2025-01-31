import React from 'react';
import styled from 'styled-components/native';
import { Animated, View, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../theme';
import Button from '../Common/Button';

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background: ${theme.colors.cardBackground};
  margin: 25px;
  border-radius: 20px;
  align-items: center;
  padding: 20px;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 22px;
  margin: 20px 0 10px 0;
`;

const Subtitle = styled.Text`
  color: white;
  font-size: 15px;
  margin: 10px 0 20px 0;
`;

type Props = {
  onPress: () => void;
  details: string;
};
type State = {
  appearAnim: Animated.Value;
};
export default class ErrorCard extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      appearAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.appearAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.quad)
    }).start();
  }

  render() {
    const { onPress, details = 'Error while fetching data' } = this.props;
    const { appearAnim } = this.state;
    return (
      <Wrapper
        style={{
          opacity: appearAnim,
          transform: [
            {
              translateY: this.state.appearAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [80, 0]
              })
            }
          ]
        }}
      >
        <Icon name="exclamation" size={35} color="white" />
        <Title>Something's wrong</Title>
        <Subtitle>{details}</Subtitle>
        <Button onPress={onPress} type="secondary" title="Retry" />
      </Wrapper>
    );
  }
}
