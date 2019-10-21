import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Wrapper = styled.View`
  width: 100%;
  height: 60px;
  align-items: center;
  flex-direction: row;
`;

const Title = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  width: 50%;
  text-align: center;
`;

const BackArrowWrapper = styled.TouchableOpacity`
  width: 25%;
  align-items: center;
`;

export interface Props {
  screenTitle: string;
  navigateBack: () => void;
}
const HeaderBack: React.FC<Props> = ({ screenTitle, navigateBack }) => {
  return (
    <Wrapper>
      <BackArrowWrapper onPress={navigateBack}>
        <Icon name="long-arrow-alt-left" size={25} color="white" />
      </BackArrowWrapper>
      <Title>{screenTitle}</Title>
    </Wrapper>
  );
};

export default HeaderBack;
