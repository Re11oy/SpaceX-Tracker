import React from 'react';
import styled from 'styled-components';
import { Animated, FlatList } from 'react-native';
import ScreenBackground from '../Common/ScreenBackground';
import ScreenTitle from '../Common/ScreenTitle';
import PushableWrapper from '../Common/PushableWrapper';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import CalendarCard from './CalendarCard';
import Launch from '../Models/Launch';

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 40px 0 0 0;
`;

type Params = {};
type Props = {};
type State = {
  page: number;
};
export default class LaunchCalendarScreen extends React.Component<NavigationStackScreenProps<Params, Props>, State> {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  navigateToDetails(data) {
    //this.props.navigation.navigate('details', { data });
  }

  render() {
    const data: Launch[] = [
      {
        id: 'key',
        details: '',
        mission_name: 'name'
      }
    ];

    return (
      <Wrapper>
        <ScreenTitle title="Launch Calendar" />
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <PushableWrapper onPress={() => this.navigateToDetails(item)}>
              <CalendarCard data={item} />
            </PushableWrapper>
          )}
        />
      </Wrapper>
    );
  }
}
