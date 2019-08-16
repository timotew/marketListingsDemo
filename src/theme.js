import * as Animatable from 'react-native-animatable';
import {AnimatableManager, ThemeManager, Constants, Assets, Colors, Typography} from 'react-native-ui-lib'; //eslint-disable-line

/** Examples - uncomment when needed */
Typography.loadTypographies({
  h1: {fontSize: 58, fontWeight: '300', lineHeight: 80},
  h2: {fontSize: 46, fontWeight: '300', lineHeight: 64},
});

// Colors.loadColors({
//   pink: '#60A4F9',
//   gold: '#308DF7',
// });

ThemeManager.setTheme({
  primaryColor: '#5FA5FD',
  CTA: {
    backgroundColor: '#A8CDF6',
    textColor: '#E1EBF8',
  },
  titleColor: '#524E53',
  subtitleColor: '#C1ACC4',
});

// ThemeManager.setComponentTheme('Picker', (props) => {
//   if (props.useNativePicker) {
//     return {
//       topBarProps: {
//         doneLabel: Constants.isIOS ? 'Done2' : 'OK2',
//         cancelLabel: Constants.isIOS ? 'Cancel2' : 'CANCEL2',
//       },
//     };
//   }
// });

// Assets.loadAssetsGroup('icons.general', {
//   camera: require('./assets/icons/cameraSelected.png'),
// });

// AnimatableManager.loadAnimationPresets({
//   preset1: {
//     animation: 'fadeIn',
//     easing: 'ease-out-quint',
//     duration: 1000,
//     useNativeDriver: true,
//   },
//   preset2: {
//     animation: 'fadeInLeft',
//     easing: 'ease-out-expo',
//     duration: 500,
//     useNativeDriver: true,
//   },
// });

const customAnimationsDefinitions = {
  customAnimation1: {
    from: {opacity: 0, translateY: 20},
    to: {opacity: 1, translateY: 0},
  },
  customAnimation2: {
    from: {opacity: 0, translateY: 40},
    to: {opacity: 1, translateY: 0},
  },
};
// IMPORTANT! Make uilib's animations available globally for the app's use (option to pass adittional animation definitions)
Animatable.initializeRegistryWithDefinitions(
  AnimatableManager.loadAnimationDefinitions(customAnimationsDefinitions)
);

const getDefaultNavigationStyle = () => ({
  statusBar: {
    visible: true,
    style: 'light',
    backgroundColor: ThemeManager.primaryColor, // for Android
  },
  layout: {
    backgroundColor: Colors.white,
    orientation: ['portrait', 'landscape'],
  },
  topBar: {
    visible: true,
    noBorder: true, // for iOS
    elevation: 0, // for Android
    background: {
      color: ThemeManager.primaryColor,
    },
    title: {
      color: Colors.white,
      fontSize: Typography.text70.fontSize,
      fontFamily: Constants.isAndroid ? 'sans-serif-bold' : '.SFUIText-Heavy',
      alignment: 'center',
    },
    subtitle: {
      color: Colors.white,
      fontSize: Typography.text80.fontSize,
      fontFamily: Constants.isAndroid ? Typography.text80.fontFamily : '.SFUIText-Medium',
    },
    backButton: {
      // visible: true,
      color: Colors.white,
      showTitle: Constants.isIOS ? false : undefined,
      testID: 'pop',
    },
    leftButtonColor: Colors.white,
    leftButtonDisabledColor: Colors.rgba(Colors.white, 0.6),
    rightButtonColor: Colors.white,
    rightButtonDisabledColor: Colors.rgba(Colors.white, 0.6),
  },
});

export default getDefaultNavigationStyle;
