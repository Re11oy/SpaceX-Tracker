import React from 'react';
import styled from 'styled-components/native';
import { theme } from '../theme';
import { Rocket } from '../Models/Launch';
import { View } from 'react-native';

const DetailsWrapper = styled.View<{ expanded: boolean }>`
  background: ${theme.colors.cardBackground};
  margin: 0 25px 25px;
  border-radius: 10px;
  padding: 15px 20px;
  overflow: hidden;
  flex: 1;
  justify-content: flex-end;
  ${({ expanded }) => !expanded && 'max-height: 200px;'}
`;

const SectionTitle = styled.Text<{ root?: boolean }>`
  color: white;
  font-weight: bold;
  margin: ${({ root }) => (root ? 0 : 15)}px;
  ${({ root }) => root && 'margin-top: 15px;'}
`;

const InfoText = styled.Text`
  color: #aaaaaa;
  margin-left: 15px;
`;

const Section = styled.View`
  flex-direction: row;
  padding-left: 40px;
  margin-bottom: 10px;
`;

const Label = styled.Text`
  font-weight: bold;
  color: white;
`;

const SECTIONS = ['first_stage', 'second_stage'];

export interface Props {
  data: Rocket;
  expanded: boolean;
}
export interface State {}
export default class RocketDetailsCard extends React.Component<Props, State> {
  render() {
    const sections = Object.entries(this.props.data).filter(item => SECTIONS.includes(item[0]));
    const { expanded } = this.props;
    return (
      <DetailsWrapper expanded={expanded}>
        {sections.map(item => (
          <View key={item[0]}>
            <SectionTitle root>First Stage</SectionTitle>
            <SectionTitle>Cores</SectionTitle>
            <Section>
              <Label>Serial:</Label>
              <InfoText>B1047</InfoText>
            </Section>
            <Section>
              <Label>Flight:</Label>
              <InfoText>3</InfoText>
            </Section>
            <Section>
              <Label>Reused:</Label>
              <InfoText>Yes</InfoText>
            </Section>
            <Section>
              <Label>Landing vehicle:</Label>
              <InfoText>N/A</InfoText>
            </Section>
          </View>
        ))}
      </DetailsWrapper>
    );
  }
}
