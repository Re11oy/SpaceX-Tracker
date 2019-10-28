import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Linking, ActivityIndicator } from 'react-native';

const Image = styled.ImageBackground<{ fullWidth?: boolean }>`
  margin-top: 5px;
  height: 250px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '49%')};
  align-self: stretch;
`;

export interface Props {
  url: any;
  fullWidth: boolean;
}
export interface State {
  loaded: boolean;
}
export default class GalleryCard extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  _onLoadEnd = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { loaded } = this.state;
    const { url, fullWidth } = this.props;
    return (
      <Image resizeMode="cover" source={{ uri: url }} fullWidth={fullWidth} onLoadEnd={this._onLoadEnd}>
        {loaded ? (
          <TouchableOpacity onPress={() => Linking.openURL(url)} style={{ flex: 1 }} />
        ) : (
          <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} animating={true} />
        )}
      </Image>
    );
  }
}
