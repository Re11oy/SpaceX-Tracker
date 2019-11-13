import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import PushableWrapper from '../Common/PushableWrapper';
import Launch from '../Models/Launch';

const Wrapper = styled(LinearGradient)`
  border-radius: 10px;
  flex: 1;
  margin: 10px 25px;
`;

const Title = styled.Text<{ large?: boolean }>`
  color: #000;
  font-size: ${({ large }) => (large ? 20 : 18)}px;
  align-self: flex-end;
`;

const CompanyTitle = styled(Title)`
  align-self: flex-start;
  font-size: 24px;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.2;
`;

const ContentWrapper = styled.View`
  padding: 20px;
  flex: 1;
  justify-content: space-between;
`;

export interface Props {
  data: Launch;
  navigateToDetails: () => void;
}
const NextLaunchCard: React.FC<Props> = ({ data, navigateToDetails }) => {
  if (!data) {
    return <></>;
  }

  const launchDateUTC = new Date(data.launch_date_unix).toUTCString();

  return (
    <PushableWrapper style={{ flex: 1 }} onPress={navigateToDetails}>
      <Wrapper colors={['#e2e2e2', '#f0f0f0']} start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}>
        <BackgroundImage source={{ uri: 'https://farm5.staticflickr.com/4866/39745612523_14270b4b9d_o.jpg' }} />
        <ContentWrapper>
          <View>
            <CompanyTitle>{data.mission_name}</CompanyTitle>
          </View>
          <View>
            <Title large adjustsFontSizeToFit numberOfLines={1}>
              {data.rocket.rocket_name}
            </Title>
            <Title>{launchDateUTC}</Title>
          </View>
        </ContentWrapper>
      </Wrapper>
    </PushableWrapper>
  );
};

export default NextLaunchCard;
