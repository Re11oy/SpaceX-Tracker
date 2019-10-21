import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { ScrollView, Linking } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HeaderBack from '../Common/HeaderBack';
import ScreenBackground from '../Common/ScreenBackground';
import { theme } from '../theme';
import Button from '../Common/Button';
import CountdownCard from './CountdownCard';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack';
import Label from '../Common/Label';

const Wrapper = styled(ScreenBackground)`
  flex: 1;
`;

const DetailsWrapper = styled.View`
  background: ${theme.colors.cardBackground};
  margin: 25px;
  border-radius: 20px;
  padding: 20px;
  overflow: hidden;
  flex: 1;
  justify-content: flex-end;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.3;
`;

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
`;

const SectionTitle = styled.Text`
  color: white;
  font-weight: bold;
`;

const InfoText = styled.Text`
  color: white;
  font-size: 16px;
  margin-bottom: 15px;
  margin-left: 5px;
`;

const DescText = styled.Text`
  color: white;
  text-align: justify;
  margin: 25px;
`;

const LinksWrapper = styled.View`
  margin: 20px;
`;

const ShuttleIcon = styled(Icon)`
  align-self: center;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const LinkButton = styled(Button)`
  width: 80%;
`;

const ButtonLabel = styled.Text`
  color: #bbb;
  margin: 3px;
`;

const ButtonWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

type Params = {
  data: any;
};
type Props = {};
class LaunchDetailsScreen extends React.Component<NavigationStackScreenProps<Params, Props>> {
  static navigationOptions: NavigationStackOptions = {
    title: 'Launch details',
    headerStyle: {
      backgroundColor: '#222437'
    },
    header: null,
    headerTintColor: '#fff'
  };

  openMap({ longitude, latitude }) {}

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('data', {});

    data.missions = [];
    const videoLink = ''; //data.vidURLs.length > 0 && data.vidURLs[0];
    const location = 'Location'; //data.location.name;
    const rocket = 'Rocket name'; //data.rocket.name;
    const pad = null; //data.location.pads[0];
    const time = null; //data.net;
    const rocketImg = 'https://via.placeholder.com/150'; //data.rocket.imageURL;

    return (
      <Wrapper>
        <ContentWrapper>
          <HeaderBack screenTitle="Launch Details" navigateBack={() => this.props.navigation.goBack()} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <DetailsWrapper>
              {rocket && (
                <>
                  <BackgroundImage source={{ uri: rocketImg }} />
                  <SectionTitle>Rocket</SectionTitle>
                  <InfoText>{rocket}</InfoText>
                </>
              )}
              <SectionTitle>
                Mission
                {data.missions.length > 1 && 's'}
              </SectionTitle>
              {data.missions.map(mission => (
                <InfoText key={mission.id}>{mission.name}</InfoText>
              ))}
              {location && (
                <>
                  <SectionTitle>Location</SectionTitle>
                  <InfoText>{location}</InfoText>
                </>
              )}
              {time && (
                <>
                  <SectionTitle>Time</SectionTitle>
                  <InfoText>{data.net}</InfoText>
                </>
              )}
            </DetailsWrapper>
            <ShuttleIcon name="space-shuttle" size={28} color="#eee" />
            {data.missions.map(mission => (
              <DescText key={mission.id}>{mission.description}</DescText>
            ))}
            <CountdownCard data={data} />
            <LinksWrapper>
              <Row>
                <ButtonWrapper>
                  <LinkButton
                    icon="video"
                    type="red"
                    disabled={!videoLink}
                    onPress={() => Linking.openURL(videoLink)}
                  />
                  <ButtonLabel>Livestream</ButtonLabel>
                </ButtonWrapper>
                <ButtonWrapper>
                  <LinkButton icon="map-marked-alt" type="blue" disabled={!pad} onPress={() => this.openMap(pad)} />
                  <ButtonLabel>Location</ButtonLabel>
                </ButtonWrapper>
              </Row>
            </LinksWrapper>

            <Label text="Hello" />
            <Label text="Test" />
            <Button onPress={() => {}} type="secondary" title="Press me" />
            <Button onPress={() => {}} title="And me" />
          </ScrollView>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default LaunchDetailsScreen;
