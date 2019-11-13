import React from 'react';
import styled from 'styled-components';
import { ActivityIndicator, FlatList, RefreshControl, SegmentedControlIOS } from 'react-native';
import ScreenBackground from '../../Common/ScreenBackground';
import ScreenTitle from '../../Common/ScreenTitle';
import PushableWrapper from '../../Common/PushableWrapper';
import { NavigationStackProp } from 'react-navigation-stack';
import CalendarCard from './CalendarCard';
import { inject, observer } from 'mobx-react';
import { STATES } from '../../constants';
import ErrorCard from '../ErrorCard';
import { IObservableStoreProps } from '../../Models/IObservableStoreProps';
import Loader from '../../Common/Loader';
import Button from '../../Common/Button';
import { theme } from '../../theme';

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 40px 0 0 0;
`;

const LoadMoreButton = styled(Button)`
  margin: 0 20% 20px 20%;
`;

const Tabs = styled(SegmentedControlIOS)`
  margin: 15px 30px 0;
  background-color: ${theme.colors.cardBackground};
`;

export interface Props extends IObservableStoreProps {
  navigation: NavigationStackProp;
}
export interface State {
  selectedTabIndex: number;
}
@inject('launches')
@observer
export default class LaunchCalendarScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0
    };
  }

  componentDidMount() {
    this.props.launches.loadLaunches(10, true);
    this.props.launches.loadLaunches(10, false);
  }

  navigateToDetails(data) {
    this.props.navigation.navigate('details', { data });
  }

  refreshCalendar = () => {
    this.props.launches.loadLaunches(10, this.state.selectedTabIndex === 0);
  };

  loadMore = () => {
    this.props.launches.loadMoreLaunches(5, this.state.selectedTabIndex === 0);
  };

  switchTab = event => {
    this.setState({ selectedTabIndex: event.nativeEvent.selectedSegmentIndex });
  };

  render() {
    const { selectedTabIndex } = this.state;
    const isUpcoming = selectedTabIndex === 0;
    const data = this.props.launches;
    const numberOfLaunches = isUpcoming ? data.numberOfUpcomingLaunches : data.numberOfPastLaunches;
    const showMoreEnabled = numberOfLaunches < 35;

    if (data.state === STATES.ERROR) {
      return (
        <Wrapper>
          <ScreenTitle title="Launch Calendar" />
          <ErrorCard onPress={() => {}} details="Error while fetching upcoming launches" />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <ScreenTitle title="Launch Calendar" />
        {data.state === STATES.LOADING && numberOfLaunches < 5 ? (
          <Loader />
        ) : (
          <>
            <Tabs values={['Upcoming', 'Past']} selectedIndex={this.state.selectedTabIndex} onChange={this.switchTab} />
            <FlatList
              data={isUpcoming ? data.upcomingLaunches : data.pastLaunches}
              keyExtractor={item => item.mission_name}
              renderItem={({ item }) => (
                <PushableWrapper onPress={() => this.navigateToDetails(item)}>
                  <CalendarCard data={item} />
                </PushableWrapper>
              )}
              ListFooterComponent={() => (
                <>
                  {showMoreEnabled &&
                    (data.state === STATES.LOADING ? (
                      <ActivityIndicator size="large" />
                    ) : (
                      <LoadMoreButton
                        type="secondary"
                        title="Load more"
                        onPress={this.loadMore}
                        disabled={data.state === STATES.LOADING}
                      />
                    ))}
                </>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={data.state === STATES.LOADING}
                  onRefresh={this.refreshCalendar}
                  tintColor="#fff"
                />
              }
            />
          </>
        )}
      </Wrapper>
    );
  }
}
