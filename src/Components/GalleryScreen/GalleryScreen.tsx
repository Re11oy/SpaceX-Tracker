import React from 'react';
import styled from 'styled-components/native';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack';
import ScreenBackground from '../../Common/ScreenBackground';
import HeaderBack from '../../Common/HeaderBack';
import { SafeAreaView } from 'react-navigation';
import GalleryCard from './GalleryCard';

const Wrapper = styled(ScreenBackground)`
  padding: 40px 0 0 0;
  flex: 1;
`;

const ScrollWrapper = styled.ScrollView`
  margin-top: 15px;
`;

type Params = {
  links: string[];
};
type Props = {};
export default class GalleryScreen extends React.Component<NavigationStackScreenProps<Params, Props>> {
  static navigationOptions: NavigationStackOptions = {
    header: null
  };

  render() {
    const links = this.props.navigation.getParam('links', []);
    return (
      <Wrapper>
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderBack screenTitle="Gallery" navigateBack={() => this.props.navigation.goBack()} />
          <ScrollWrapper
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around'
            }}
          >
            {links.map((url, index) => (
              <GalleryCard key={url} url={url} fullWidth={index % 3 === 0} />
            ))}
          </ScrollWrapper>
        </SafeAreaView>
      </Wrapper>
    );
  }
}
