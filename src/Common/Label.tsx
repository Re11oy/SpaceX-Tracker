import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const Wrapper = styled(LinearGradient)`
  border-radius: 10px;
  padding: 10px 15px;
  margin: 0 10px;
`;

const LabelText = styled.Text`
  color: #8183a5;
  font-weight: bold;
`;

export interface Props {
  text: string;
  numberOfLines?: number;
}
const Label: React.FC<Props> = ({ text, numberOfLines = 1 }) => {
  return (
    <Wrapper colors={['#3a3a63', '#2c2f52']} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }}>
      <LabelText numberOfLines={numberOfLines}>{text}</LabelText>
    </Wrapper>
  );
};

export default Label;
