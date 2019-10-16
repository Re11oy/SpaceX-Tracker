import React from 'react';
import styled from 'styled-components/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScreenTitle from './src/Common/ScreenTitle';
import { SafeAreaView } from 'react-native';
import ScreenBackground from './src/Common/ScreenBackground';

const StyledView = styled.View`
  background-color: papayawhip;
`;

const StyledText = styled.Text`
  color: palevioletred;
`;

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 40px 0 0 0;
  margin: 100px;
`;

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  background-color: aqua;
`;

export interface Props {}

const HomeScreen: React.FC<Props> = () => {
  return (
    <Wrapper>
      <ScreenTitle title={'Test'} />
      <ContentWrapper>
        <StyledText>Open up App.tsx to start working on your app!!</StyledText>
        <Icon name="rocket" size={30} color="#900" />
      </ContentWrapper>
    </Wrapper>
  );
};

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default createAppContainer(AppNavigator);
