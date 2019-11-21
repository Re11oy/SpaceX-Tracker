import React from 'react';
import styled from 'styled-components/native';
import { FlatList, Linking } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import ScreenBackground from '../../Common/ScreenBackground';
import Button from '../../Common/Button';
import HeaderBack from '../../Common/HeaderBack';
import { Links } from '../../Models/Launch';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack';

const Wrapper = styled(ScreenBackground)`
  flex: 1;
`;

const ItemWrapper = styled.View`
  padding: 20px;
`;

const TYPES = {
  presskit: { icon: 'newspaper', name: 'Presskit', color: 'primary' },
  wikipedia: { icon: 'wikipedia-w', name: 'Wikipedia', color: 'blue' },
  article_link: { icon: 'newspaper', name: 'Article', color: 'primary' },
  reddit_campaign: { icon: 'reddit-alien', name: 'Reddit Campaign', color: 'red' },
  reddit_media: { icon: 'reddit-alien', name: 'Reddit Media', color: 'red' },
  reddit_launch: { icon: 'reddit-alien', name: 'Reddit Launch', color: 'red' },
  reddit_recovery: { icon: 'reddit-alien', name: 'Reddit Recovery', color: 'red' }
};

const ListItem = ({ item }) => {
  const link = TYPES[item[0]];
  const data = item[1];
  return (
    <ItemWrapper>
      <Button
        title={link.name}
        type={link.color}
        fontSize={15}
        icon={link.icon}
        onPress={() => Linking.openURL(data)}
      />
    </ItemWrapper>
  );
};

type Params = {
  links: Links;
};
type Props = {};
export default class LinksScreen extends React.Component<NavigationStackScreenProps<Params, Props>> {
  static navigationOptions: NavigationStackOptions = {
    header: null
  };

  render() {
    const links = Object.entries(this.props.navigation.getParam('links', new Links())).filter(
      item => !!TYPES[item[0]] && item[1]
    );
    return (
      <Wrapper>
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderBack screenTitle="Links" navigateBack={() => this.props.navigation.goBack()} />
          <FlatList data={links} renderItem={ListItem} keyExtractor={(_, i) => i.toString()} />
        </SafeAreaView>
      </Wrapper>
    );
  }
}
