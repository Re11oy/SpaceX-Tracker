import React from 'react';
import { SafeAreaView } from 'react-navigation';
import ScreenBackground from '../Common/ScreenBackground';
import ScreenTitle from '../Common/ScreenTitle';
import styled from 'styled-components/native';
import { RefreshControl, ScrollView } from 'react-native';
import NextLaunchCard from './NextLaunchCard';
import CountdownCard from '../Common/CountdownCard';
import { NavigationStackProp } from 'react-navigation-stack';
import { inject, observer } from 'mobx-react';
import { STATES } from '../constants';
import { IObservableStoreProps } from '../Models/IObservableStoreProps';

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 40px 0 0 0;
`;

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
`;

export interface Props extends IObservableStoreProps {
  navigation: NavigationStackProp;
}
export interface State {}
@inject('launches')
@observer
class DashboardScreen extends React.Component<Props, State> {
  componentDidMount() {
    this.props.launches.loadLaunches();
  }

  navigateToDetails() {
    const data = this.props.launches.upcomingLaunch;
    this.props.navigation.navigate('details', { data });
  }

  render() {
    const { state } = this.props.launches;
    const data = this.props.launches.upcomingLaunch;
    return (
      <Wrapper>
        <ScreenTitle title="Next launch" />
        <ContentWrapper>
          {state === STATES.SUCCESS && (
            <ScrollView
              contentContainerStyle={{ flex: 1 }}
              refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} tintColor="#fff" />}
            >
              <NextLaunchCard data={data} navigateToDetails={() => this.navigateToDetails()} />
              <CountdownCard timestamp={data.launch_date_unix} />
            </ScrollView>
          )}
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default DashboardScreen;
