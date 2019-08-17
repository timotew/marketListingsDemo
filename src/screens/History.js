import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { Text, LoaderScreen, Colors, View} from 'react-native-ui-lib';
import { View as AnimatableView } from 'react-native-animatable';
import * as appActions from '../reducers/app/actions';
// this is a traditional React component connected to the redux store

class History extends Component {
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
      <View flex bg-white center>
        <Text text10>History data, only available for premium API.</Text>
        <AnimatableView>
          <LoaderScreen color={Colors.blue30} message="Loading..." overlay />
        </AnimatableView>
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

History.propTypes = {
  menuOpened: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  componentId: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
