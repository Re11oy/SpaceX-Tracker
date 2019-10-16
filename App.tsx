import React from 'react';
import styled from 'styled-components/native';

const StyledView = styled.View`
  background-color: papayawhip;
`;

const StyledText = styled.Text`
  color: palevioletred;
`;

export default function App() {
  return (
    <StyledView>
      <StyledText>Open up App.tsx to start working on your app!!</StyledText>
    </StyledView>
  );
}
