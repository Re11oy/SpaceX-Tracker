import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ScreenBackground from '../Common/ScreenBackground';
import { theme } from '../theme';
import ScreenTitle from '../Common/ScreenTitle';

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

const Credits = styled.Text`
  color: #aaa;
  text-align: center;
  margin-bottom: 22px;
`;

const hitSlopValue = 60;
const touchableHitSlop = {
  top: hitSlopValue / 2,
  left: hitSlopValue,
  right: hitSlopValue,
  bottom: hitSlopValue / 2
};

export interface Props {}
export interface State {}
export default class SettingsScreen extends React.Component<Props, State> {
  render() {
    return (
      <Wrapper>
        <ContentWrapper>
          <ScreenTitle title="Settings" />
          <SectionsWrapper>
            <Section top onPress={() => {}}>
              <SectionTitle>Say hi 👋</SectionTitle>
              <Icon name="twitter" size={22} color="#fff" />
            </Section>
          </SectionsWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
