import React from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native';
import ScreenBackground from '../../Common/ScreenBackground';
import ScreenTitle from '../../Common/ScreenTitle';
import PushableWrapper from '../../Common/PushableWrapper';
import { NavigationStackProp } from 'react-navigation-stack';
import CalendarCard from './CalendarCard';
import { inject, observer } from 'mobx-react';
import { STATES } from '../../constants';
import ErrorCard from '../ErrorCard';
import { IObservableStoreProps } from '../../Models/IObservableStoreProps';

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 40px 0 0 0;
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
    this.props.launches.loadNextLaunches();
  }

  navigateToDetails(data) {
    this.props.navigation.navigate('details', { data });
  }

  render() {
    const data = this.props.launches;

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
        {data.state === STATES.SUCCESS && (
          <FlatList
            data={data.launches}
            keyExtractor={item => item.mission_name}
            renderItem={({ item }) => (
              <PushableWrapper onPress={() => this.navigateToDetails(item)}>
                <CalendarCard data={item} />
              </PushableWrapper>
            )}
          />
        )}
      </Wrapper>
    );
  }
}
