import React from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native';
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
export default class LaunchCalendarScreen extends React.Component<NavigationStackScreenProps<Params, Props>> {
  state = {
    page: 0
  };

  navigateToDetails(data) {
    //this.props.navigation.navigate('details', { data });
  }

  render() {
    const data: Launch[] = [
      {
        id: 'key',
        name: 'name'
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
