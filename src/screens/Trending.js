import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { GiftedChat } from 'react-native-gifted-chat';
import * as appActions from '../reducers/app/actions';
import * as mikeActions from '../reducers/mike/actions';

// this is a traditional React component connected to the redux store

class Trending extends Component {
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
    // TODO: get messages from reducer
    const { messages, sendMessages } = this.props;
    return (
      <GiftedChat
        messages={messages}
        onSend={sendMessages}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    menuOpened: state.app.menuOpened,
    messages: state.mike.messages,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch(appActions.toggleMenu()),
    sendMessages: messages => dispatch(mikeActions.sendMessages(messages)),
  };
};
Trending.propTypes = {
  menuOpened: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  messages: PropTypes.object.isRequired,
  sendMessages: PropTypes.func.isRequired,
  componentId: PropTypes.string.isRequired,
};
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#3c0e65',
//     ...Platform.select({
//       ios: {
//         paddingTop: 64,
//       },
//     }),
//   },
//   progressBar: {
//     backgroundColor: '#3c0e65',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   listHeading: {
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//     marginTop: 30,
//   },
//   listHeadingLeft: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   listHeadingRight: {
//     color: 'white',
//     ...Platform.select({
//       ios: {
//         fontSize: 15,
//       },
//       android: {
//         fontSize: 16,
//       },
//     }),
//   },
//   browseList: {
//     marginTop: 30,
//     paddingHorizontal: 16,
//     ...Platform.select({
//       ios: {
//         marginBottom: 60,
//       },
//       android: {
//         marginBottom: 30,
//       },
//     }),
//   },
//   browseListItem: {
//     ...Platform.select({
//       ios: {
//         paddingVertical: 8,
//       },
//       android: {
//         paddingVertical: 10,
//       },
//     }),
//     flexDirection: 'row',
//   },
//   browseListItemText: {
//     flex: 1,
//     color: 'white',
//     paddingLeft: 10,
//     ...Platform.select({
//       ios: {
//         fontSize: 15,
//         fontWeight: '500',
//       },
//       android: {
//         fontSize: 16,
//         fontWeight: '100',
//       },
//     }),
//   },
// });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trending);
