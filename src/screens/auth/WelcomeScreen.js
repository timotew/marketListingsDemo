import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import * as appActions from '../../reducers/app/actions';

import CustomButton from '../../components/CustomButton';
import MountainBackground from '../../components/MountainBackground';
// this is a traditional React component connected to the redux store
class WelcomeScreen extends PureComponent {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  loginScreen() {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'tlikes.LoginScreen',
        passProps: {
          text: 'Pushed screen',
        },
        options: {
          topBar: {
            title: {
              text: 'LOGIN',
            },
          },
        },
      },
    });
  }

  signUpScreen() {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'tlikes.SignUpScreen',
        passProps: {
          text: 'Pushed signup screen',
        },
        options: {
          topBar: {
            title: {
              text: 'SIGNUP',
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <MountainBackground>
        <View style={{ marginTop: 80 }}>
          <CustomButton
            colors={['#FAFAFA', '#FFFFFF']}
            text="Create New Account!"
            onPress={() => this.signUpScreen()}
            buttonStyle={{}}
            textStyle={{ color: '#3c0e65' }}
          />

          <CustomButton
            colors={['#FAFAFA', '#FFFFFF']}
            text="Already Have an Account?"
            onPress={() => this.loginScreen()}
            buttonStyle={{}}
            textStyle={{ color: '#3c0e65' }}
          />

          <CustomButton
            colors={['#00c6ff', '#0072ff']}
            text="Facebook Signup"
            onPress={() => {}}
            buttonStyle={{}}
            textStyle={{
              color: '#FFFFFF',
              fontSize: 19,
            }}
          />

          <CustomButton
            colors={['#e52d27', '#b31217']}
            text="Google Signup"
            onPress={() => {}}
            buttonStyle={{}}
            textStyle={{
              color: '#FFFFFF',
              fontSize: 19,
            }}
          />
        </View>
      </MountainBackground>
    );
  }
}

// const styles = StyleSheet.create({
//   text: {
//     textAlign: 'center',
//     fontSize: 18,
//     marginBottom: 10,
//     marginTop: 10,
//   },
//   button: {
//     textAlign: 'center',
//     fontSize: 18,
//     marginBottom: 10,
//     marginTop: 10,
//     color: 'blue',
//   },
// });

const mapDispatchToProps = dispatch => {
  return {
    proceedToDashboard: () => dispatch(appActions.login()),
  };
};

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeScreen);
