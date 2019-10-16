import React from 'react';
import styled from 'styled-components/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

const StyledView = styled.View`
  background-color: papayawhip;
`;

const StyledText = styled.Text`
  color: palevioletred;
`;

class HomeScreen extends React.Component {
  render() {
    return (
      <StyledView>
        <StyledText>Open up App.tsx to start working on your app!!</StyledText>
        <Icon name="rocket" size={30} color="#900" />
      </StyledView>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default createAppContainer(AppNavigator);
