import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Navigation } from 'react-native-navigation';
import * as appActions from '../reducers/app/actions';

// this is a traditional React component connected to the redux store
class Favorite extends Component {
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
      <View style={{ marginTop: 80 }}>
        <Text>Contests Screen</Text>
      </View>
    );
  }
}

// const styles = StyleSheet.create({});
Favorite.propTypes = {
  menuOpened: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  componentId: PropTypes.string.isRequired,
};
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorite);
