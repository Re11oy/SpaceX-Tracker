import React from 'react';
import styled from 'styled-components/native';
import { FlatList, Linking } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import licenses from '../../licenses.json';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack';
import ScreenBackground from '../../Common/ScreenBackground';
import Button from '../../Common/Button';
import HeaderBack from '../../Common/HeaderBack';

const Wrapper = styled(ScreenBackground)`
  flex: 1;
`;

const ItemWrapper = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 8px;
`;

const LicenseName = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: white;
  margin-left: 14px;
`;

const BottomWrapper = styled.View`
  border-left-width: 3px;
  border-left-color: white;
  margin: 0 15px;
  padding: 20px 15px;
  flex-direction: row;
`;

const ListItem = ({ item }) => {
  const itemName = Object.keys(item)[0];
  const data = item[itemName];
  return (
    <ItemWrapper onPress={() => Linking.openURL(data.licenseUrl)}>
      <Button
        title={itemName}
        type="secondary"
        fontSize={15}
        icon="github"
        onPress={() => Linking.openURL(data.licenseUrl)}
      />
      <BottomWrapper>
        <Icon name="book" size={22} color="#fff" />
        <LicenseName>{data.licenses}</LicenseName>
      </BottomWrapper>
    </ItemWrapper>
  );
};

type Params = {};
type Props = {};
export default class extends React.Component<NavigationStackScreenProps<Params, Props>> {
  static navigationOptions: NavigationStackOptions = {
    header: null
  };

  render() {
    return (
      <Wrapper>
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderBack screenTitle="Licenses" navigateBack={() => this.props.navigation.goBack()} />
          <FlatList data={licenses} renderItem={ListItem} keyExtractor={(_, i) => i.toString()} />
        </SafeAreaView>
      </Wrapper>
    );
  }
}
