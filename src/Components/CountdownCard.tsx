import React from 'react';
import styled from 'styled-components/native';
import { theme } from '../theme';
import Launch from '../Models/Launch';

const Wrapper = styled.View`
  background: ${theme.colors.cardBackground};
  margin: 25px;
  border-radius: 10px;
  align-items: center;
  padding: 20px;
  flex-direction: row;
  justify-content: space-around;
`;

const UnitWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const Number = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: white;
`;

const Unit = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #aaa;
`;

export interface Props {
  timestamp: number;
}
export interface State {
  timeLeft: number;
}
class CountdownCard extends React.Component<Props, State> {
  private timer: any;

  constructor(props) {
    super(props);
    this.state = { timeLeft: 0 };
  }

  componentDidMount() {
    this.updateTimeLeft();
    if (this.props.timestamp) {
      this.timer = setInterval(() => {
        this.updateTimeLeft();
      }, 1000);
    } else {
      this.setState({ timeLeft: 0 });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTimeLeft() {
    const now = new Date();
    const timeLeft = this.props.timestamp * 1000 - now.getTime();
    this.setState({ timeLeft });
  }

  render() {
    const { timeLeft } = this.state;
    const seconds = Math.floor(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const NoData = timeLeft <= 0;

    return (
      <Wrapper>
        <UnitWrapper>
          <Number>{NoData ? '-' : days}</Number>
          <Unit>{`day${days !== 1 ? 's' : ''}`}</Unit>
        </UnitWrapper>
        <UnitWrapper>
          <Number>{NoData ? '-' : hours % 24}</Number>
          <Unit>{`hour${minutes % 24 !== 1 ? 's' : ''}`}</Unit>
        </UnitWrapper>
        <UnitWrapper>
          <Number>{NoData ? '-' : minutes % 60}</Number>
          <Unit>{`minute${minutes % 60 !== 1 ? 's' : ''}`}</Unit>
        </UnitWrapper>
        <UnitWrapper>
          <Number>{NoData ? '-' : seconds % 60}</Number>
          <Unit>{`second${seconds % 60 !== 1 ? 's' : ' '}`}</Unit>
        </UnitWrapper>
      </Wrapper>
    );
  }
}

export default CountdownCard;
