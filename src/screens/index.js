import { Navigation } from 'react-native-navigation';

import WelcomeScreen from './auth/WelcomeScreen';
import LoginScreen from './auth/LoginScreen';
import SignUpScreen from './auth/SignUpScreen';
import BottomTabsSideMenu from './BottomTabsSideMenu';
import Trending from './Trending';
import Talents from './Talents';
import Contests from './Contests';

// register all screens of the app (including internal ones)
export default function registerScreens(store, Provider) {
  Navigation.registerComponentWithRedux(
    'tlikes.WelcomeScreen',
    () => WelcomeScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux('tlikes.ContestsScreen', () => Contests, Provider, store);

  Navigation.registerComponentWithRedux('tlikes.TalentsScreen', () => Talents, Provider, store);

  Navigation.registerComponentWithRedux('tlikes.TrendingScreen', () => Trending, Provider, store);

  Navigation.registerComponentWithRedux('tlikes.SignUpScreen', () => SignUpScreen, Provider, store);

  Navigation.registerComponentWithRedux('tlikes.LoginScreen', () => LoginScreen, Provider, store);

  Navigation.registerComponentWithRedux(
    'tlikes.BottomTabsSideMenu',
    () => BottomTabsSideMenu,
    Provider,
    store
  );
}
