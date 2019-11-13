import React from 'react';
import styled from 'styled-components';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
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

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 40px 0 0 0;
`;

const LoadMoreButton = styled(Button)`
  margin: 0 20% 20px 20%;
`;

export interface Props extends IObservableStoreProps {
  navigation: NavigationStackProp;
}
export interface State {
  page: number;
}
@inject('launches')
@observer
export default class LaunchCalendarScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  componentDidMount() {
    this.refreshCalendar();
  }

  navigateToDetails(data) {
    this.props.navigation.navigate('details', { data });
  }

  refreshCalendar = () => {
    this.setState({ page: 0 });
    this.props.launches.loadNextLaunches();
  };

  loadMore = () => {
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
    this.props.launches.loadMoreLaunches(5);
  };

  render() {
    const data = this.props.launches;
    const showMoreEnabled = this.state.page < 5;

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
        {data.state === STATES.LOADING && data.numberOfLaunches < 4 ? (
          <Loader />
        ) : (
          <FlatList
            data={data.launches}
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
                      title="Load more"
                      onPress={this.loadMore}
                      disabled={data.state === STATES.LOADING}
                    />
                  ))}
              </>
            )}
            refreshControl={
              <RefreshControl
                refreshing={data.state === STATES.LOADING && this.state.page === 0}
                onRefresh={this.refreshCalendar}
                tintColor="#fff"
              />
            }
          />
        )}
      </Wrapper>
    );
  }
}
