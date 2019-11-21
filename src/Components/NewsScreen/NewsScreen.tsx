import React from 'react';
import styled from 'styled-components/native';
import { observer, inject } from 'mobx-react';
import { MONTHS_FULL, STATES } from '../../constants';
import ScreenTitle from '../../Common/ScreenTitle';
import ErrorCard from '../ErrorCard';
import { IObservableStoreProps } from '../../Models/IObservableStoreProps';
import { NavigationStackProp } from 'react-navigation-stack';
import ScreenBackground from '../../Common/ScreenBackground';
import NewsCard from './NewsCard';

const Wrapper = styled(ScreenBackground)`
  padding: 40px 0 0 0;
  flex: 1;
`;

const ScrollWrapper = styled.ScrollView`
  margin-top: 15px;
`;

const DateTitle = styled.Text`
  color: white;
  font-weight: bold;
  margin: 10px;
  font-size: 22px;
`;

export interface Props extends IObservableStoreProps {
  navigation: NavigationStackProp;
}
export interface State {}
@inject('news')
@observer
export default class NewsScreen extends React.Component<Props, State> {
  componentDidMount() {
    this.loadNews();
  }

  loadNews = () => {
    this.props.news.getNews();
  };

  render() {
    const { news } = this.props;
    const dateTS = new Date();
    const date = `${MONTHS_FULL[dateTS.getMonth()]} ${dateTS.getDate()}`;

    if (news.state === STATES.ERROR) {
      return (
        <Wrapper>
          <ScreenTitle title="News" />
          <ErrorCard onPress={this.loadNews} details="Error while retrieving Space News articles" />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <ScreenTitle title="News" />
        {news.state === STATES.SUCCESS && (
          <ScrollWrapper
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around'
            }}
          >
            <DateTitle>{date}</DateTitle>
            {news.articles.map((item, index) => (
              <NewsCard key={item._id} data={item} fullWidth={index % 3 === 0} />
            ))}
          </ScrollWrapper>
        )}
      </Wrapper>
    );
  }
}
