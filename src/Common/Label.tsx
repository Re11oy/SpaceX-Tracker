import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const Wrapper = styled(LinearGradient)<{ maxWidth?: string }>`
  border-radius: 10px;
  padding: 10px 15px;
  margin: 0 10px;
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
`;

const LabelText = styled.Text`
  color: #8183a5;
  font-weight: bold;
`;

export interface Props {
  text: string;
  numberOfLines?: number;
  maxWidth?: string;
}
const Label: React.FC<Props> = ({ text, numberOfLines = 1, maxWidth }) => {
  return (
    <Wrapper maxWidth={maxWidth} colors={['#3a3a63', '#2c2f52']} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }}>
      <LabelText numberOfLines={numberOfLines}>{text}</LabelText>
    </Wrapper>
  );
};

export default Label;
