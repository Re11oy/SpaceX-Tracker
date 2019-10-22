import React from 'react';
import { SafeAreaView } from 'react-navigation';
import ScreenBackground from '../Common/ScreenBackground';
import ScreenTitle from '../Common/ScreenTitle';
import styled from 'styled-components/native';
import { RefreshControl, ScrollView } from 'react-native';
import NextLaunchCard from './NextLaunchCard';
import CountdownCard from './CountdownCard';
import { NavigationStackProp } from 'react-navigation-stack';

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 40px 0 0 0;
`;

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
`;

export interface Props {
  navigation: NavigationStackProp;
}
export interface State {}
class DashboardScreen extends React.Component<Props, State> {
  componentDidMount() {}

  navigateToDetails() {
    // const data = this.props.launches.upcomingLaunch;
    this.props.navigation.navigate('details', {});
  }

  render() {
    return (
      <Wrapper>
        <ScreenTitle title="Next launch" />
        <ContentWrapper>
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} tintColor="#fff" />}
          >
            <NextLaunchCard
              data={{ name: 'Iridium NEXT Mission 8', windowstart: 'Falcon 9' }}
              navigateToDetails={() => this.navigateToDetails()}
            />
            <CountdownCard data={{ wsstamp: 1000 }} />
          </ScrollView>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default DashboardScreen;
