import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import firebase from 'react-native-firebase';
import * as appActions from '../reducers/app/actions';
// this is a traditional React component connected to the redux store
const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
class Talents extends Component {
  // state = {
  //   posts: [],
  //   selected: new Map(),
  //   refreshingTrends: true,
  // };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  navigationButtonPressed({ buttonId }) {
    const { menuOpened, toggleMenu, componentId } = this.props;
    if (buttonId === 'menu') {
      toggleMenu();
      Navigation.mergeOptions(componentId, {
        sideMenu: {
          left: {
            visible: !menuOpened,
          },
        },
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
    );
  }
}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    menuOpened: state.app.menuOpened,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch(appActions.toggleMenu()),
  };
};

Talents.propTypes = {
  menuOpened: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  componentId: PropTypes.string.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Talents);
