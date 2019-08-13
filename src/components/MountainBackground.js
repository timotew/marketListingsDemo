import React from 'react';
import PropTypes from 'prop-types';
import { Image, ImageBackground, View, ScrollView } from 'react-native';

const tlikesLogo = require('../img/logo.png');
const grid = require('../img/ngrid.png');

const Mountain = ({ children }) => {
  return (
    <ImageBackground
      imageStyle={{ resizeMode: 'cover' }}
      style={{
        flex: 1,
        width: null,
        alignSelf: 'stretch',
      }}
      source={grid}
    >
      <ScrollView>
        <View style={{ flex: 1, padding: 20 }}>
          <View
            style={{
              marginTop: 50,
              alignSelf: 'center',
            }}
          >
            <Image resizeMode="contain" style={{ height: 100, width: 150 }} source={tlikesLogo} />
          </View>
          {children}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

Mountain.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Mountain;
