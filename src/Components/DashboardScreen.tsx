import React from 'react';
import { SafeAreaView } from 'react-navigation';
import ScreenBackground from '../Common/ScreenBackground';
import ScreenTitle from '../Common/ScreenTitle';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  color: red;
  background-color: green;
  font-size: 30px;
`;

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 40px 0 0 0;
`;

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
`;

export interface Props {}
export interface State {}
class DashboardScreen extends React.Component<Props, State> {
  componentDidMount() {}

  render() {
    return (
      <Wrapper>
        <ScreenTitle title="Next launch" />
        <ContentWrapper>
          <StyledText>Test</StyledText>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default DashboardScreen;
