import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ScreenBackground from '../../Common/ScreenBackground';
import { theme } from '../../theme';
import ScreenTitle from '../../Common/ScreenTitle';
import { Linking } from 'react-native';
import * as StoreReview from 'react-native-store-review';
import { version } from '../../../package.json';
import { NavigationStackProp } from 'react-navigation-stack';

const Wrapper = styled(ScreenBackground)`
  flex: 1;
`;

const ContentWrapper = styled(SafeAreaView)`
  padding-top: 30px;
  flex: 1;
`;

const SectionsWrapper = styled.ScrollView`
  padding: 0 25px;
  margin-top: 30px;
`;

interface SectionProps {
  top?: boolean;
  bottom?: boolean;
  disabled?: boolean;
}
const Section = styled.TouchableOpacity<SectionProps>`
  background: ${theme.colors.cardBackground};
  padding: 22px;
  height: 70px;
  ${props =>
    props.top &&
    `
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    `}
  ${props =>
    props.bottom &&
    `
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      margin-bottom: 22px;
    `} 
  margin-top: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${props => props.disabled && `opacity: 0.3;`};
`;

const SectionTitle = styled.Text`
  color: white;
`;

const hitSlopValue = 60;
const touchableHitSlop = {
  top: hitSlopValue / 2,
  left: hitSlopValue,
  right: hitSlopValue,
  bottom: hitSlopValue / 2
};

export interface Props {
  navigation: NavigationStackProp;
}
export interface State {
  secret: boolean;
}
export default class SettingsScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      secret: false
    };
  }

  render() {
    const { secret } = this.state;
    return (
      <Wrapper>
        <ContentWrapper>
          <ScreenTitle title="Settings" />
          <SectionsWrapper>
            <Section top onPress={() => Linking.openURL('https://t.me/talaluev')}>
              <SectionTitle>Say hi 👋</SectionTitle>
              <Icon name="telegram-plane" size={22} color="#fff" />
            </Section>
            <Section
              bottom
              onPress={() => {
                if (StoreReview.isAvailable) {
                  StoreReview.requestReview();
                } else {
                  Linking.openURL('https://itunes.apple.com/us/app/id');
                }
              }}
            >
              <SectionTitle>Give your feedback</SectionTitle>
              <Icon name="app-store-ios" size={22} color="#fff" />
            </Section>
            <Section top onPress={() => Linking.openURL('https://github.com/Re11oy/moonwalk')}>
              <SectionTitle>Source code</SectionTitle>
              <Icon name="github" size={22} color="#fff" />
            </Section>
            <Section bottom onPress={() => this.props.navigation.navigate('libraries')}>
              <SectionTitle>Licenses</SectionTitle>
              <Icon name="chevron-right" size={22} color="#fff" />
            </Section>
            <Section top bottom onPress={() => this.setState({ secret: !secret })}>
              <SectionTitle>About</SectionTitle>
              {secret ? (
                <Icon name="user-secret" size={30} color="#ffec2a" />
              ) : (
                <SectionTitle>Version {version}</SectionTitle>
              )}
            </Section>
          </SectionsWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
